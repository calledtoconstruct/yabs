import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@firebase/auth';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeRouter } from 'src/app/fake/router.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { CountContainer } from 'src/app/test/count-container.type';
import { UserService } from 'src/app/user.service';
import { FakeReadArticleService } from '../fake/read-article-service.fake';
import { Excerpt, ReadArticleService } from '../read-article.service';
import { ExcerptsPageComponent } from './excerpts-page.component';

const howToFindAnchor = (articleIdentifier: string): (element: DebugElement) => boolean =>
  (element: DebugElement) =>
    element.name === 'a'
    && !!element.attributes['href']
    && element.attributes['href'] === `/read/articles/${articleIdentifier}`;

describe('Read -> Excerpts Page', () => {

  const user = <User>{
    displayName: 'byeudifunf'
  };

  let userService: FakeUserService;
  let activatedRoute: FakeActivatedRoute;
  let articleService: FakeReadArticleService;
  let router: FakeRouter;

  beforeEach(() => {
    userService = new FakeUserService();
    activatedRoute = new FakeActivatedRoute();
    articleService = new FakeReadArticleService();
    router = new FakeRouter(activatedRoute);
  });

  afterEach(() => {
    articleService.tearDown();
    activatedRoute.tearDown();
    userService.tearDown();
    router.tearDown();
  });

  let component: ExcerptsPageComponent;
  let fixture: ComponentFixture<ExcerptsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcerptsPageComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ReadArticleService, useValue: articleService },
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcerptsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when user is logged in', () => {

    beforeEach(() => {
      userService.setUpLoggedInAs(user);
      fixture.detectChanges();
    });

    [
      { category: '', articleIdentifier: 'nainvdsi' },
      { category: 'regional', articleIdentifier: 'ybyasd' },
      { category: 'national', articleIdentifier: 'pboapsdoj' }
    ].forEach(scenario => {

      const category = scenario.category;

      describe(`when route '${category}' is activated`, () => {

        let emittedCategory = '';
        let hasWasCalledFor: CountContainer;
        let getWasCalledFor: CountContainer;

        beforeEach(() => {
          const subscription = component.category$.subscribe(data => emittedCategory = data);
          [hasWasCalledFor, getWasCalledFor] = activatedRoute.nextParamMap({ category: category });
          subscription.unsubscribe();
          fixture.detectChanges();
        });

        it('should call has for category route parameter', () => {
          expect(hasWasCalledFor['category']).toBe(1);
        });

        it('should call get for category route parameter', () => {
          expect(getWasCalledFor['category']).toBe(1);
        });

        it(`should provide category '${category}'`, () => {
          expect(emittedCategory).toBe(category === '' ? 'local' : category);
        });

        it(`should call read article service once to get excerpts for '${category}'`, () => {
          expect(articleService.excerptsForWasCalled).toBe(1);
        });

        it(`should pass '${category}' for category parameter when getting excerpts`, () => {
          expect(articleService.excerptsForParameterWas).toBe(category === '' ? 'local' : category);
        });

        describe('when an excerpt is loaded', () => {

          const excerpt = <Excerpt>{
            articleIdentifier: scenario.articleIdentifier,
            title: 'uaiwogiewn',
            text: 'qpinvoia'
          };

          beforeEach(() => {
            articleService.nextExcerpts([excerpt]);
            fixture.detectChanges();
          });

          describe('user interface', () => {

            describe('anchor', () => {

              let anchor: DebugElement;

              beforeEach(() => {
                anchor = fixture.debugElement.query(howToFindAnchor(scenario.articleIdentifier));
              });

              it('should exist', () => {
                expect(anchor).toBeTruthy();
              });

              describe('when clicked', () => {

                beforeEach(() => {
                  const nativeElement: HTMLAnchorElement = anchor.nativeElement;
                  nativeElement.dispatchEvent(new Event('click'));
                });

                it('should navigate router', () => {
                  expect(router.navigateWasCalled).toBe(1);
                });

                const expectedPath = ['/read', 'articles', scenario.articleIdentifier];
                const expectedPathString = JSON.stringify(expectedPath);

                it(`should navigate router to ${'/read/articles/'}`, () => {
                  const actualPathString = JSON.stringify(router.navigateWasCalledTokens);
                  expect(actualPathString).toBe(expectedPathString);
                });

              });

            });

          });

        });

      });

    });

  });

  describe('when user is not logged in', () => {

    beforeEach(() => {
      userService.setUpNotLoggedIn();
      fixture.detectChanges();
    });

  });

});
