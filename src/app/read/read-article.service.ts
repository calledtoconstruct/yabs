import { Injectable, OnDestroy } from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";

@Injectable()
export class ReadArticleService implements OnDestroy {

    private readonly excerptSubject = new ReplaySubject<Array<Excerpt>>(1);

    public excerptsFor(category: string): Observable<Array<Excerpt>> {
        setTimeout(() => {
            this.excerptSubject.next(new Array<Excerpt>(<Excerpt>{
                articleIdentifier: 'uvasusiuds',
                title: 'wvbdsfasd',
                text: 'iqwenv'
            }))
        });
        return this.excerptSubject.asObservable();
    }

    public ngOnDestroy(): void {
        this.excerptSubject.complete();
    }

}

export interface Excerpt {
    articleIdentifier: string;
    title: string;
    text: string;
}