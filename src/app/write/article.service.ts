import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService implements OnDestroy {

  private readonly articlesSubject = new ReplaySubject<Array<Article>>(1);

  constructor() { }

  public collection(state: string): Observable<Array<Article>> {
    setTimeout(() => this.articlesSubject.next(new Array<Article>(<Article>{
      title: 'sakldfjasdf',
      text: 'ghqauwnviuw'
    })), 0);
    return this.articlesSubject.asObservable();
  }

  public saveArticle(): void {
  }

  public ngOnDestroy(): void {
    this.articlesSubject.complete();
  }
}

export interface Article {
  title: string,
  text: string
}
