import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public documentFor(documentIdentifier: string): Observable<Document> {
    return of(<Document>{
      name: 'vwuybweyrbuwbv',
      text: 'bbqiuwybfeisdj'
    });
  }
}

export interface Document {
  name: string;
  text: string;
}
