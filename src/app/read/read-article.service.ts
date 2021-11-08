import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class ReadArticleService implements OnDestroy {

  private readonly excerptSubject = new ReplaySubject<Array<Excerpt>>(1);
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
  private readonly articleSubject = new ReplaySubject<Article>(1);
  private readonly firstComment = <ArticleComment>{
    brandPhoto: '/fake/image/f28huhedg',
    brand: 'hfaua',
    text: 'vauu hauhsas dufh asudfbu asidf',
    when: new Date()
  };
  private readonly secondComment = <ArticleComment>{
    brandPhoto: '/fake/image/f28huhedg',
    brand: 'hfaua',
    text: 'vauu hauhsas dufh asudfbu asidf',
    when: new Date()
  };
  private readonly articles = new Array<Article>(<Article>{
    articleIdentifier: 'uvasusiuds',
    title: 'wvbdsfasd',
    text: 'iqwenv',
    brand: 'lwc',
    brandPhoto: '/fake/image/bbuiaurasdf',
    comments: new Array<ArticleComment>(
      this.firstComment
    )
  }, {
    articleIdentifier: 'fjkdsljf',
    title: 'awiusbdrgviuawisdf',
    text: 'lorem ipsum',
    brand: 'vnbauosidfasdf',
    brandPhoto: '/fake/image/anvaiouwsedg',
    comments: new Array<ArticleComment>(
      this.firstComment,
      this.secondComment
    )
  }, {
    articleIdentifier: 'jfkdsla',
    title: 'another title',
    text: 'more lorem ipsum',
    brand: 'ahbnvhsdfkasdf',
    brandPhoto: '/fake/image/dsflkjhashdgkasdf',
    comments: new Array<ArticleComment>(
      this.firstComment,
      this.secondComment
    )
  });

  public excerptsFor(_userIdentifier: string, _category: string): Observable<Array<Excerpt>> {
    setTimeout(() => {
      this.excerptSubject.next(this.excerpts);
    });
    return this.excerptSubject.asObservable();
  }

  public articleFor(articleIdentifier: string): Observable<Article> {
    setTimeout(() => {
      const article = this.articles
        .filter(item => item.articleIdentifier === articleIdentifier)
        .shift();
      this.articleSubject.next(article);
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
  brandPhoto: string;
  brand: string;
  title: string;
  text: string;
  editors: number;
}

export interface Article {
  articleIdentifier: string;
  brandPhoto: string;
  brand: string;
  title: string;
  text: string;
  comments: Array<ArticleComment>;
}

export interface ArticleComment {
  brandPhoto: string;
  brand: string;
  text: string;
  when: Date;
}