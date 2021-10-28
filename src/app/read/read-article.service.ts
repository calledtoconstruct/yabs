import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class ReadArticleService implements OnDestroy {

    private readonly excerptSubject = new ReplaySubject<Array<Excerpt>>(1);
    private readonly articleSubject = new ReplaySubject<Article>(1);

    public excerptsFor(_category: string): Observable<Array<Excerpt>> {
      setTimeout(() => {
        this.excerptSubject.next(new Array<Excerpt>(<Excerpt>{
          articleIdentifier: 'uvasusiuds',
          title: 'wvbdsfasd',
          text: 'iqwenv'
        }));
      });
      return this.excerptSubject.asObservable();
    }

    public articleFor(_articleIdentifier: string): Observable<Article> {
      setTimeout(() => {
        this.articleSubject.next(<Article>{
          articleIdentifier: 'uvasusiuds',
          title: 'wvbdsfasd',
          text: 'iqwenv'
        });
      });
      return this.articleSubject.asObservable();
    }

    public ngOnDestroy(): void {
      this.excerptSubject.complete();
      this.articleSubject.complete();
    }

}

export interface Excerpt {
    articleIdentifier: string;
    title: string;
    text: string;
}

export interface Article {
    articleIdentifier: string;
    title: string;
    text: string;
}