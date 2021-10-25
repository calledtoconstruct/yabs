import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class WriteArticleService implements OnDestroy {

  private readonly articlesSubject = new ReplaySubject<Array<Article>>(1);
  private readonly articleSubject = new ReplaySubject<Article>(1);

  constructor() { }

  public collection(state: string): Observable<Array<Article>> {
    setTimeout(() => this.articlesSubject.next(new Array<Article>(<Article>{
      title: 'sakldfjasdf',
      text: 'ghqauwnviuw'
    })));
    return this.articlesSubject.asObservable();
  }

  public article(articleIdentifier: number): Observable<Article> {
    setTimeout(() => this.articleSubject.next(<Article>{
      title: 'vweydshyf',
      text: 'qvpwuvhvd'
    }));
    return this.articleSubject.asObservable();
  }

  public saveArticle(article: Article): void {
  }

  public ngOnDestroy(): void {
    this.articlesSubject.complete();
    this.articleSubject.complete();
  }
}

export interface Article {
  title: string,
  text: string
}
