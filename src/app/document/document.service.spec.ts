import { Document, DocumentService } from './document.service';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('DocumentService', () => {

  let service: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('document for', () => {

    const documentIdentifier = 'mcunwinugfnb';

    let result: Observable<Document>;

    beforeEach(() => {
      result = service.documentFor(documentIdentifier);
    });
    
    it('should provide an observable', () => {
      expect(result).toBeTruthy();
    });
  });

});
