import { Article, Excerpt, ReadArticleService } from './read-article.service';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('Read Article Service', () => {

  let service: ReadArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ReadArticleService, useClass: ReadArticleService }
      ]
    });
    service = TestBed.inject(ReadArticleService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('excerpts for', () => {

    const userIdentifier = 'auoibvaiogafasdf';
    const category = 'zyggyfgqawef';

    let result: Observable<Array<Excerpt>>;

    beforeEach(() => {
      result = service.excerptsFor(userIdentifier, category);
    });

    it('should return an observable', () => {
      expect(result).toBeTruthy();
    });
    
  });

  describe('article for', () => {

    const userIdentifier = 'auoibvaiogafasdf';

    let result: Observable<Article>;

    beforeEach(() => {
      result = service.articleFor(userIdentifier);
    });

    it('should return an observable', () => {
      expect(result).toBeTruthy();
    });
    
  });

});
