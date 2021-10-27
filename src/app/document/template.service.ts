import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  public templateFor(templateIdentifier: string): Observable<Template> {
    return of(<Template>{
      title: 'aslkdjfasd',
      text: 'vuianuiwesdafaaasdf'
    });
  }
}

export interface Template {
  title: string;
  text: string;
}