import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { CountContainer } from '../test/count-container.type';

export class FakeActivatedRoute {
  private readonly paramMapSubject = new ReplaySubject<ParamMap>(1);
  private readonly queryParamMapSubject = new ReplaySubject<ParamMap>(1);

  public readonly paramMap = this.paramMapSubject.asObservable();
  public readonly queryParamMap = this.queryParamMapSubject.asObservable();

  public static setupParamMap(params: Params): [ParamMap, CountContainer] {
    const paramMap = convertToParamMap(params);
    const hasWas = paramMap.has.bind(paramMap);
    const hasWasCalledFor: CountContainer = {};
    Object.keys(params).forEach((key: string) => hasWasCalledFor[key] = 0);
    paramMap.has = (name: string): boolean => {
      hasWasCalledFor[name]++;
      return hasWas(name);
    };
    return [paramMap, hasWasCalledFor];
  };

  public nextParamMap(params: Params): CountContainer {
    const [paramMap, hasWasCalledFor] = FakeActivatedRoute.setupParamMap(params);
    this.paramMapSubject.next(paramMap);
    return hasWasCalledFor;
  }

  public nextQueryParamMap(params: Params): CountContainer {
    const [paramMap, hasWasCalledFor] = FakeActivatedRoute.setupParamMap(params);
    this.queryParamMapSubject.next(paramMap);
    return hasWasCalledFor;
  }

  public tearDown(): void {
    this.paramMapSubject.complete();
    this.queryParamMapSubject.complete();
  }
}
