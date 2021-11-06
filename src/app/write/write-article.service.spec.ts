import { Article, WriteArticleService } from './write-article.service';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('Write Article Service', () => {

  let service: WriteArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WriteArticleService, useClass: WriteArticleService }
      ]
    });
    service = TestBed.inject(WriteArticleService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('articles for', () => {

    const userIdentifier = 'auoibvaiogafasdf';

    let result: Observable<Array<Article>>;

    beforeEach(() => {
      result = service.articlesFor(userIdentifier);
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
