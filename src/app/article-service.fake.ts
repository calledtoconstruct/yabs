import { Observable, ReplaySubject } from "rxjs";
import { CountContainer } from "./count-container.type";
import { Article } from "./write/article.service";

export class FakeArticleService {
  private readonly articleSubject = new ReplaySubject<Array<Article>>(1);

  public readonly collectionCalledFor: CountContainer = {
    'Draft': 0
  };

  public saveArticleCalled = 0;

  public saveArticle(): void {
    this.saveArticleCalled++;
  }

  public collection(name: string): Observable<Array<Article>> {
    this.collectionCalledFor[name] = 1;
    return this.articleSubject.asObservable();
  }

  public nextCollection(articles: Array<Article>): void {
    this.articleSubject.next(articles);
  }

  public tearDown(): void {
    this.articleSubject.complete();
  }
}
