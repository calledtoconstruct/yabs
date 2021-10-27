import { Observable, ReplaySubject } from "rxjs";

export class FakeDocumentService {

    public readonly document$ = new ReplaySubject<Document>(1);

    public documentForWasCalled = 0;
    public documentForParameterWas = '';

    public documentFor(documentIdentifier: string): Observable<Document> {
        this.documentForWasCalled++;
        this.documentForParameterWas = documentIdentifier;
        return this.document$.asObservable();
    }

    public tearDown(): void {
        this.document$.complete();
    }

}