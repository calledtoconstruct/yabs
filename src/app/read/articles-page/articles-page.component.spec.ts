import { Article, ReadArticleService } from '../read-article.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ArticlesPageComponent } from './articles-page.component';
import { CountContainer } from 'src/app/test/count-container.type';
import { DebugElement } from '@angular/core';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeReadArticleService } from '../fake/read-article-service.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { User } from '@firebase/auth';
import { UserService } from 'src/app/user.service';

const howToFindArticleElement = (element: DebugElement) =>
  element.name === 'article';

const howToFindTitleElement = (element: DebugElement) =>
  element.name === 'span'
  && !!element.classes['title'];

const howToFindTextElement = (element: DebugElement) =>
  element.name === 'span'
  && !!element.classes['text'];

const howToFindBrandElement = (element: DebugElement) =>
  element.name === 'span'
  && !!element.classes['brand'];

const howToFindCommentSectionElement = (element: DebugElement) =>
  element.name === 'section'
  && !!element.classes['comment-section'];

const howToFindLogInReminderElement = (element: DebugElement) =>
  element.name === 'span'
  && !!element.classes['log-in-reminder'];

const howToFindCommentInputElement = (element: DebugElement) =>
  element.name === 'textarea'
  && !!element.attributes['name']
  && element.attributes['name'] === 'comment'
  && !!element.attributes['id']
  && element.attributes['id'] === 'comment';

const howToFindCommentInputLabelElement = (element: DebugElement) =>
  element.name === 'label'
  && !!element.attributes['for']
  && element.attributes['for'] === 'comment';

describe('Read -> Articles Page', () => {

  const user = <User>{
    displayName: 'byeudifunf'
  };

  let userService: FakeUserService;
  let activatedRoute: FakeActivatedRoute;
  let articleService: FakeReadArticleService;

  beforeEach(() => {
    userService = new FakeUserService();
    activatedRoute = new FakeActivatedRoute();
    articleService = new FakeReadArticleService();
  });

  afterEach(() => {
    articleService.tearDown();
    activatedRoute.tearDown();
    userService.tearDown();
  });

  let component: ArticlesPageComponent;
  let fixture: ComponentFixture<ArticlesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesPageComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ReadArticleService, useValue: articleService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    { route: { articleIdentifier: '523' } }
  ].forEach(scenario => {

    const route = scenario.route;
    const routeString = JSON.stringify(route);
    const articleIdentifier = route.articleIdentifier;

    describe(`when route '${routeString}' is activated`, () => {

      let emittedArticleIdentifier = '';
      let hasWasCalledFor: CountContainer;
      let getWasCalledFor: CountContainer;

      beforeEach(() => {
        const subscription = component.articleIdentifier$.subscribe(data => emittedArticleIdentifier = data);
        [hasWasCalledFor, getWasCalledFor] = activatedRoute.nextParamMap(route);
        subscription.unsubscribe();
        fixture.detectChanges();
      });

      it('should call has for article identifier route parameter', () => {
        expect(hasWasCalledFor['articleIdentifier']).toBe(1);
      });

      it('should call get for article identifier route parameter', () => {
        expect(getWasCalledFor['articleIdentifier']).toBe(1);
      });

      it(`should provide article identifier '${articleIdentifier}'`, () => {
        expect(emittedArticleIdentifier).toBe(articleIdentifier);
      });

      it(`should call read article service once to get article for '${articleIdentifier}'`, () => {
        expect(articleService.articleForWasCalled).toBe(1);
      });

      it(`should pass '${articleIdentifier}' for article identifier parameter when getting article`, () => {
        expect(articleService.articleForParameterWas).toBe(articleIdentifier);
      });

      describe('when an article is loaded', () => {

        const article = <Article>{
          articleIdentifier: scenario.route.articleIdentifier,
          title: 'uaiwogiewn',
          text: 'qpinvoia',
          brand: 'fjdksla'
        };

        beforeEach(() => {
          articleService.nextArticle(article);
          fixture.detectChanges();
        });

        describe('user interface', () => {

          let mainElement: DebugElement;

          beforeEach(() => {
            mainElement = fixture.debugElement;
          });

          describe('article', () => {

            let articleElement: DebugElement;

            beforeEach(() => {
              articleElement = mainElement.query(howToFindArticleElement);
            });

            it('should exist', () => {
              expect(articleElement).toBeTruthy();
            });

            describe('title', () => {

              let titleElement: DebugElement;

              beforeEach(() => {
                titleElement = articleElement.query(howToFindTitleElement);
              });

              it('should exist', () => {
                expect(titleElement).toBeTruthy();
              });

              it(`should contain ${article.title}`, () => {
                expect(titleElement.nativeElement.innerText).toBe(article.title);
              });

            });

            describe('text', () => {

              let textElement: DebugElement;

              beforeEach(() => {
                textElement = articleElement.query(howToFindTextElement);
              });

              it('should exist', () => {
                expect(textElement).toBeTruthy();
              });

              it(`should contain ${article.text}`, () => {
                expect(textElement.nativeElement.innerText).toBe(article.text);
              });

            });

            describe('brand', () => {

              let brandElement: DebugElement;

              beforeEach(() => {
                brandElement = articleElement.query(howToFindBrandElement);
              });

              it('should exist', () => {
                expect(brandElement).toBeTruthy();
              });

              it(`should contain ${article.brand}`, () => {
                expect(brandElement.nativeElement.innerText).toBe(article.brand);
              });

            });

          });

          const inCommentSection = (then: () => void): () => DebugElement => {

            let commentSectionElement: DebugElement;

            describe('comment section', () => {

              beforeEach(() => {
                commentSectionElement = mainElement.query(howToFindCommentSectionElement);
              });

              it('should exist', () => {
                expect(commentSectionElement).toBeTruthy();
              });

              then();

            });

            return () => commentSectionElement;

          };

          FakeUserService.whenUserIsLoggedIn(() => [userService, fixture], user, () => {

            const getCommentSectionElement = inCommentSection(() => {

              describe('comment input', () => {

                let commentInputElement: DebugElement;
                let commentInputLabelElement: DebugElement;

                beforeEach(() => {
                  const commentSectionElement = getCommentSectionElement();
                  commentInputElement = commentSectionElement.query(howToFindCommentInputElement);
                  commentInputLabelElement = commentSectionElement.query(howToFindCommentInputLabelElement);
                });

                it('should exist', () => {
                  expect(commentInputElement).toBeTruthy();
                });

                it('should have label', () => {
                  expect(commentInputLabelElement).toBeTruthy();
                });

              });

            });

          });

          FakeUserService.whenUserIsNotLoggedIn(() => [userService, fixture], () => {

            const getCommentSectionElement = inCommentSection(() => {

              describe('login reminder', () => {

                let logInReminderElement: DebugElement;

                beforeEach(() => {
                  const commentSectionElement = getCommentSectionElement();
                  logInReminderElement = commentSectionElement.query(howToFindLogInReminderElement);
                });

                it('should exist', () => {
                  expect(logInReminderElement).toBeTruthy();
                });

              });

            });

          });

        });

      });

    });

  });

});
