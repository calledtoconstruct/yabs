import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';
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
  };

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
}
