import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { DocumentPageComponent } from './document-page.component';
import { DocumentService } from '../document.service';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeDocumentService } from '../fake/document-service.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { findElement } from 'src/app/find-elements-helper';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '@firebase/auth';
import { UserService } from 'src/app/user.service';

const howToFindPageHeader = findElement('header')
  .withClass('page')
  .please();

const howToFindArticle = findElement('article')
  .withClass('document')
  .please();

const howToFindArticleHeader = findElement('header')
  .withClass('article')
  .please();

const howToFindArticleFooter = findElement('footer')
  .withClass('article')
  .please();

const howToFindPageFooter = findElement('footer')
  .withClass('page')
  .please();

describe('Document -> Document Page', () => {

  let userService: FakeUserService;
  let documentService: FakeDocumentService;
  let activatedRoute: FakeActivatedRoute;

  beforeEach(() => {
    userService = new FakeUserService();
    documentService = new FakeDocumentService();
    activatedRoute = new FakeActivatedRoute();
  });

  afterEach(() => {
    userService.tearDown();
    documentService.tearDown();
    activatedRoute.tearDown();
  });

  let component: DocumentPageComponent;
  let fixture: ComponentFixture<DocumentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentPageComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: DocumentService, useValue: documentService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should provide form group', () => {
    expect(component.formGroup).toBeTruthy();
  });

  const user = <User>{
    displayName: 'avbhuiashedf'
  };

  FakeUserService.whenUserIsLoggedIn(() => [userService, fixture], user, () => {

    describe('page header', () => {

      let pageHeader: DebugElement;

      beforeEach(() => {
        pageHeader = fixture.debugElement.query(howToFindPageHeader);
      });

      it('should exist', () => {
        expect(pageHeader).toBeTruthy();
      });

      it('should contain text', () => {
        expect(pageHeader.nativeElement.innerText).toBeTruthy();
      });

    });

    describe('article', () => {

      let article: DebugElement;

      beforeEach(() => {
        article = fixture.debugElement.query(howToFindArticle);
      });

      it('should exist', () => {
        expect(article).toBeTruthy();
      });

      describe('header', () => {

        let header: DebugElement;

        beforeEach(() => {
          header = article.query(howToFindArticleHeader);
        });

        it('should exist', () => {
          expect(header).toBeTruthy();
        });

        it('should contain text', () => {
          expect(header.nativeElement.innerText).toBeTruthy();
        });

      });

      describe('footer', () => {
        
        let footer: DebugElement;

        beforeEach(() => {
          footer = article.query(howToFindArticleFooter);
        });

        it('should exist', () => {
          expect(footer).toBeTruthy();
        });

        it('should contain text', () => {
          expect(footer.nativeElement.innerText).toBeTruthy();
        });

      });

    });

    describe('page footer', () => {

      let pageFooter: DebugElement;

      beforeEach(() => {
        pageFooter = fixture.debugElement.query(howToFindPageFooter);
      });

      it('should exist', () => {
        expect(pageFooter).toBeTruthy();
      });

      it('should contain text', () => {
        expect(pageFooter.nativeElement.innerText).toBeTruthy();
      });

    });

  });

});
