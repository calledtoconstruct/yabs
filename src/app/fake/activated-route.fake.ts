import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { ComponentFixture } from '@angular/core/testing';
import { CountContainer } from '../test/count-container.type';

export class FakeActivatedRoute {
  private readonly paramMapSubject = new ReplaySubject<ParamMap>(1);
  private readonly queryParamMapSubject = new ReplaySubject<ParamMap>(1);

  public readonly paramMap = this.paramMapSubject.asObservable();
  public readonly queryParamMap = this.queryParamMapSubject.asObservable();

  public static setupParamMap(params: Params): [ParamMap, CountContainer, CountContainer] {
    const paramMap = convertToParamMap(params);

    const hasWas = paramMap.has.bind(paramMap);
    const hasWasCalledFor: CountContainer = {};
    Object.keys(params).forEach((key: string) => hasWasCalledFor[key] = 0);
    paramMap.has = (name: string): boolean => {
      hasWasCalledFor[name]++;
      return hasWas(name);
    };

    const getWas = paramMap.get.bind(paramMap);
    const getWasCalledFor: CountContainer = {};
    Object.keys(params).forEach((key: string) => getWasCalledFor[key] = 0);
    paramMap.get = (name: string): string | null => {
      getWasCalledFor[name]++;
      return getWas(name);
    };

    return [paramMap, hasWasCalledFor, getWasCalledFor];
  }

  public nextParamMap(params: Params): [CountContainer, CountContainer] {
    const [paramMap, hasWasCalledFor, getWasCalledFor] = FakeActivatedRoute.setupParamMap(params);
    this.paramMapSubject.next(paramMap);
    return [hasWasCalledFor, getWasCalledFor];
  }

  public nextQueryParamMap(params: Params): [CountContainer, CountContainer] {
    const [paramMap, hasWasCalledFor, getWasCalledFor] = FakeActivatedRoute.setupParamMap(params);
    this.queryParamMapSubject.next(paramMap);
    return [hasWasCalledFor, getWasCalledFor];
  }

  public tearDown(): void {
    this.paramMapSubject.complete();
    this.queryParamMapSubject.complete();
  }

  public static whenRouteIsActivated<TComponent>(
    route: {
      paramMap?: { [key: string]: string },
      queryParamMap?: { [key: string]: string }
    },
    expectedCount: {
      paramMap?: { [key: string]: number },
      queryParamMap?: { [key: string]: number }
    },
    get: () => [ComponentFixture<TComponent>, FakeActivatedRoute],
    then: () => void
  ): void {
    FakeActivatedRoute.whenRouteIsActivatedImplementation(
      route,
      expectedCount,
      () => [get()[0], get()[1], of(null)],
      null,
      then
    );
  }

  public static whenRouteIsActivatedVerifyEmittedValue<TComponent, TObserved>(
    route: {
      paramMap?: { [key: string]: string },
      queryParamMap?: { [key: string]: string }
    },
    expectedCount: {
      paramMap?: { [key: string]: number },
      queryParamMap?: { [key: string]: number }
    },
    get: () => [ComponentFixture<TComponent>, FakeActivatedRoute, Observable<TObserved>],
    expectedValue: TObserved,
    then: () => void
  ): () => TObserved {
    return FakeActivatedRoute.whenRouteIsActivatedImplementation(
      route,
      expectedCount,
      get,
      expectedValue,
      then
    );
  }

  private static whenRouteIsActivatedImplementation<TComponent, TObserved>(
    route: {
      paramMap?: { [key: string]: string },
      queryParamMap?: { [key: string]: string }
    },
    expectedCount: {
      paramMap?: { [key: string]: number },
      queryParamMap?: { [key: string]: number }
    },
    get: () => [ComponentFixture<TComponent>, FakeActivatedRoute, Observable<TObserved>],
    expectedValue: TObserved,
    then: () => void
  ): () => TObserved {
    const routeString = JSON.stringify(route);

    let emittedValue: TObserved;
    let paramMapHasWasCalledFor: CountContainer;
    let paramMapGetWasCalledFor: CountContainer;
    let queryParamMapHasWasCalledFor: CountContainer;
    let queryParamMapGetWasCalledFor: CountContainer;

    describe(`when route '${routeString}' is activated`, () => {

      beforeEach(() => {
        const [fixture, activatedRoute, observable] = get();
        const subscription = observable.subscribe(data => emittedValue = data);
        if (route.paramMap) {
          [paramMapHasWasCalledFor, paramMapGetWasCalledFor] = activatedRoute.nextParamMap(route.paramMap);
        }
        if (route.queryParamMap) {
          [queryParamMapHasWasCalledFor, queryParamMapGetWasCalledFor] = activatedRoute.nextQueryParamMap(route.queryParamMap);
        }
        subscription.unsubscribe();
        fixture.detectChanges();
      });

      if (expectedValue) {
        it('should emit', () => {
          expect(emittedValue).toBeTruthy();
        });
      }

      Object.keys(expectedCount.paramMap || {}).forEach(key => {

        if (expectedCount.paramMap) {
          const count = expectedCount.paramMap[key];

          it(`should call has for ${key}`, () => {
            expect(paramMapHasWasCalledFor[key]).toBe(count);
          });

          it(`should call get for ${key}`, () => {
            expect(paramMapGetWasCalledFor[key]).toBe(count);
          });
        }

      });

      Object.keys(expectedCount.queryParamMap || {}).forEach(key => {

        if (expectedCount.queryParamMap) {
          const count = expectedCount.queryParamMap[key];

          it(`should call has for ${key}`, () => {
            expect(queryParamMapHasWasCalledFor[key]).toBe(count);
          });

          it(`should call get for ${key}`, () => {
            expect(queryParamMapGetWasCalledFor[key]).toBe(count);
          });
        }

      });

      it('should emit correct value', () => {
        expect(emittedValue).toEqual(expectedValue);
      });

      then();

    });

    return () => emittedValue;
  }
}
