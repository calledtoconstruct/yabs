import { Article, ReadArticleService } from '../read-article.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ArticlesPageComponent } from './articles-page.component';
import { DebugElement } from '@angular/core';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeReadArticleService } from '../fake/read-article-service.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { findElement } from 'src/app/find-elements-helper';
import { User } from '@firebase/auth';
import { UserService } from 'src/app/user.service';

const howToFindArticleElement = findElement('article')
  .please();

const howToFindArticleHeader = findElement('header')
  .withClass('article')
  .please();

const howToFindTitleElement = findElement('span')
  .withClass('title')
  .please();

const howToFindTextElement = findElement('span')
  .withClass('text')
  .please();

const howToFindBrandElement = findElement('span')
  .withClass('brand')
  .please();

const howToFindCommentSectionElement = findElement('section')
  .withClass('comment-section')
  .please();

const howToFindLogInReminderElement = findElement('span')
  .withClass('log-in-reminder')
  .please();

const howToFindCommentInputElement = findElement('textarea')
  .withAttributeValue('name', 'comment')
  .withAttributeValue('id', 'comment')
  .please();

const howToFindCommentInputLabelElement = findElement('label')
  .withAttributeValue('for', 'comment')
  .please();

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

    const articleIdentifier = scenario.route.articleIdentifier;

    FakeActivatedRoute.whenRouteIsActivatedVerifyEmittedValue(
      { paramMap: scenario.route },
      { paramMap: { articleIdentifier: 1 } },
      () => [fixture, activatedRoute, component.articleIdentifier$],
      articleIdentifier,
      () => {

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

          const regardlessOfWhetherUserIsLoggedIn = () => {

            describe('article', () => {

              let articleElement: DebugElement;

              beforeEach(() => {
                articleElement = fixture.debugElement.query(howToFindArticleElement);
              });

              it('should exist', () => {
                expect(articleElement).toBeTruthy();
              });

              describe('header', () => {

                let header: DebugElement;

                beforeEach(() => {
                  header = articleElement.query(howToFindArticleHeader);
                });

                it('should exist', () => {
                  expect(header).toBeTruthy();
                });

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

          };

          const inCommentSection = (then: () => void): () => DebugElement => {

            let commentSectionElement: DebugElement;

            describe('comment section', () => {

              beforeEach(() => {
                commentSectionElement = fixture.debugElement.query(howToFindCommentSectionElement);
              });

              it('should exist', () => {
                expect(commentSectionElement).toBeTruthy();
              });

              then();

            });

            return () => commentSectionElement;

          };

          FakeUserService.whenUserIsLoggedIn(() => [userService, fixture], user, () => {

            regardlessOfWhetherUserIsLoggedIn();

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

            regardlessOfWhetherUserIsLoggedIn();

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

      }
    );

  });

});
