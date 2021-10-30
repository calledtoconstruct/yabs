import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class ReadArticleService implements OnDestroy {

  private readonly excerptSubject = new ReplaySubject<Array<Excerpt>>(1);
  private readonly articleSubject = new ReplaySubject<Article>(1);
  private readonly excerpts = new Array<Excerpt>(<Excerpt>{
    articleIdentifier: 'uvasusiuds',
    title: 'wvbdsfasd',
    text: 'iqwenv',
    editors: 0,
    brand: 'lwc',
    brandPhoto: '/fake/image/bbuiaurasdf'
  }, {
    articleIdentifier: 'fjkdsljf',
    title: 'awiusbdrgviuawisdf',
    text: 'lorem ipsum',
    editors: 89342,
    brand: 'vnbauosidfasdf',
    brandPhoto: '/fake/image/anvaiouwsedg'
  }, {
    articleIdentifier: 'jfkdsla',
    title: 'another title',
    text: 'more lorem ipsum',
    editors: 128993,
    brand: 'ahbnvhsdfkasdf',
    brandPhoto: '/fake/image/dsflkjhashdgkasdf'
  });

  public excerptsFor(_userIdentifier: string, _category: string): Observable<Array<Excerpt>> {
    setTimeout(() => {
      this.excerptSubject.next(this.excerpts);
    });
    return this.excerptSubject.asObservable();
  }

  public articleFor(articleIdentifier: string): Observable<Article> {
    setTimeout(() => {
      const excerpt = this.excerpts
        .filter(excerpt => excerpt.articleIdentifier === articleIdentifier)
        .shift();
      this.articleSubject.next(<Article>{ ...excerpt });
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
  editors: number;
  brand: string;
  brandPhoto: string;
}

export interface Article {
  articleIdentifier: string;
  title: string;
  text: string;
  brand: string;
}