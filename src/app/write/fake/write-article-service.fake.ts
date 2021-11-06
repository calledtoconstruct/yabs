import { Observable, ReplaySubject } from 'rxjs';
import { Article } from '../write-article.service';
import { CountContainer } from '../../test/count-container.type';

export class FakeWriteArticleService {
  private readonly articlesSubject = new ReplaySubject<Array<Article>>(1);
  private readonly articleSubject = new ReplaySubject<Article>(1);

  public readonly collectionCalledFor: CountContainer = {
    'Draft': 0,
    'Request Pending': 0,
    'Out For Edit': 0,
    'Out For Fact Check': 0,
    'Ready': 0,
    'Published': 0
  };

  public readonly articleCalledFor: CountContainer = {
    '100': 0,
    '200': 0,
    '300': 0
  };

  public saveArticleCalled = 0;
  public articleToSave: Article | null = null;

  public saveArticle(article: Article): void {
    this.saveArticleCalled++;
    this.articleToSave = article;
  }

  public articlesFor(category: string): Observable<Array<Article>> {
    this.collectionCalledFor[category]++;
    return this.articlesSubject.asObservable();
  }

  public articleFor(articleIdentifier: string | null): Observable<Article> {
    this.articleCalledFor[articleIdentifier || 'invalid']++;
    return this.articleSubject.asObservable();
  }

  public nextArticlesFor(articles: Array<Article>): void {
    this.articlesSubject.next(articles);
  }

  public nextArticleFor(article: Article): void {
    this.articleSubject.next(article);
  }

  public tearDown(): void {
    this.articlesSubject.complete();
    this.articleSubject.complete();
  }
}
