import { Observable, ReplaySubject } from "rxjs";
import { Excerpt } from "../read-article.service";

export class FakeReadArticleService {

    private readonly excerpts$ = new ReplaySubject<Array<Excerpt>>(1);

    public excerptsForWasCalled = 0;
    public excerptsForCategoryParameterWas = '';

    public excerptsFor(category: string): Observable<Array<Excerpt>> {
        this.excerptsForWasCalled++;
        this.excerptsForCategoryParameterWas = category;
        return this.excerpts$.asObservable();
    }

    public tearDown(): void {
        this.excerpts$.complete();
    }
    
}