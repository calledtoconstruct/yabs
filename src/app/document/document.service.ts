import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public documentFor(_documentIdentifier: string): Observable<Document> {
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
