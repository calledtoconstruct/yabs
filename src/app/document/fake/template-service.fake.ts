import { Observable, ReplaySubject } from "rxjs";
import { Template } from "../template.service";

export class FakeTemplateService {

    public readonly template$ = new ReplaySubject<Template>(1);

    public templateForWasCalled = 0;
    public templateForParameterWas = '';

    public templateFor(templateIdentifier: string): Observable<Template> {
        this.templateForWasCalled++;
        this.templateForParameterWas = templateIdentifier;
        return this.template$.asObservable();
    }

    public tearDown(): void {
        this.template$.complete();
    }
}