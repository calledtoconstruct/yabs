import { Article, Excerpt } from '../read-article.service';
import { Observable, ReplaySubject } from 'rxjs';

export class FakeReadArticleService {

    private readonly excerpts$ = new ReplaySubject<Array<Excerpt>>(1);
    private readonly article$ = new ReplaySubject<Article>(1);

    public excerptsForWasCalled = 0;
    public excerptsForParameterWas = '';
    public articleForWasCalled = 0;
    public articleForParameterWas = '';

    public excerptsFor(category: string): Observable<Array<Excerpt>> {
      this.excerptsForWasCalled++;
      this.excerptsForParameterWas = category;
      return this.excerpts$.asObservable();
    }

    public nextExcerpts(excerpts: Array<Excerpt>): void {
      this.excerpts$.next(excerpts);
    }

    public articleFor(articleIdentifier: string): Observable<Article> {
      this.articleForWasCalled++;
      this.articleForParameterWas = articleIdentifier;
      return this.article$.asObservable();
    }

    public nextArticle(article: Article): void {
      this.article$.next(article);
    }

    public tearDown(): void {
      this.excerpts$.complete();
      this.article$.complete();
    }
    
}