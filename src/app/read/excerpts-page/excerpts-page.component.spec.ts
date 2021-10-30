import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Excerpt, ReadArticleService } from '../read-article.service';
import { ActivatedRoute } from '@angular/router';
import { CountContainer } from 'src/app/test/count-container.type';
import { DebugElement } from '@angular/core';
import { ExcerptsPageComponent } from './excerpts-page.component';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeImageDirective } from 'src/app/fake/image.fake';
import { FakeReadArticleService } from '../fake/read-article-service.fake';
import { FakeRouterLinkDirective } from 'src/app/fake/router-link.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@firebase/auth';
import { UserService } from 'src/app/user.service';

const howToFindAnchor = (articleIdentifier: string): (element: DebugElement) => boolean =>
  (element: DebugElement) =>
    element.name === 'a'
    && !!element.attributes['href']
    && element.attributes['href'] === `/read/articles/${articleIdentifier}`;

const howToFindTitleInAnchor = (element: DebugElement) =>
  element.name === 'span'
  && !!element.classes['title'];

const howToFindTextInAnchor = (element: DebugElement) =>
  element.name === 'span'
  && !!element.classes['text'];

const howToFindEditorsInAnchor = (element: DebugElement) =>
  element.name === 'span'
  && !!element.classes['editors'];

const howToFindBrandInAnchor = (element: DebugElement) =>
  element.name === 'span'
  && !!element.classes['brand'];

const howToFindBrandPhotoInAnchor = (element: DebugElement) =>
  element.name === 'img'
  && !!element.classes['brand-photo'];

describe('Read -> Excerpts Page', () => {

  const userIdentifier = 'uwibneinsidf';
  const user = <User>{
    uid: userIdentifier,
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

  let component: ExcerptsPageComponent;
  let fixture: ComponentFixture<ExcerptsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExcerptsPageComponent, FakeImageDirective, FakeRouterLinkDirective],
      imports: [RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ReadArticleService, useValue: articleService }
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

  const regardlessOfLoggedInState = (then: () => void) => {

    const firstExcerpt = <Excerpt>{
      articleIdentifier: 'nainvdsi',
      title: 'uaiwogiewn',
      text: 'qpinvoia',
      editors: 5,
      brand: 'fjklf',
      brandPhoto: '/fake/image/vbauiwafdasdf'
    };

    const secondExcerpt = <Excerpt>{
      articleIdentifier: 'nainvdsi',
      title: 'hgajbiohgiaasdf',
      text: 'qnsvnlkdffasdfkjasld',
      editors: 32892,
      brand: 'asfngbakljsn',
      brandPhoto: '/fake/image/iwuvnisnbd'
    };

    interface Scenario {
      category: string;
      excerptCount: string;
      excerpts: Array<Excerpt>;
    }

    [
      <Scenario>{ category: '', excerptCount: 'an excerpt', excerpts: [firstExcerpt] },
      <Scenario>{ category: 'local', excerptCount: 'more than one excerpt', excerpts: [firstExcerpt, secondExcerpt] },
      <Scenario>{ category: 'regional', excerptCount: 'more than one excerpt', excerpts: [firstExcerpt, secondExcerpt] },
      <Scenario>{ category: 'national', excerptCount: 'an excerpt', excerpts: [firstExcerpt] }
    ].forEach(scenario => {

      describe(`when route '${scenario.category}' is activated`, () => {

        let emittedCategory = '';
        let hasWasCalledFor: CountContainer;
        let getWasCalledFor: CountContainer;

        beforeEach(() => {
          const subscription = component.category$.subscribe(data => emittedCategory = data);
          [hasWasCalledFor, getWasCalledFor] = activatedRoute.nextParamMap({ category: scenario.category });
          subscription.unsubscribe();
          fixture.detectChanges();
        });

        it('should call has for category route parameter', () => {
          expect(hasWasCalledFor['category']).toBe(1);
        });

        it('should call get for category route parameter', () => {
          expect(getWasCalledFor['category']).toBe(1);
        });

        it(`should provide category '${scenario.category}'`, () => {
          expect(emittedCategory).toBe(scenario.category === '' ? 'local' : scenario.category);
        });

        it(`should call read article service once to get excerpts for '${scenario.category}'`, () => {
          expect(articleService.excerptsForWasCalled).toBe(1);
        });

        it(`should pass '${scenario.category}' for category parameter when getting excerpts`, () => {
          expect(articleService.excerptsForCategoryParameterWas).toBe(scenario.category === '' ? 'local' : scenario.category);
        });

        describe(`when ${scenario.excerptCount} is loaded`, () => {

          beforeEach(() => {
            articleService.nextExcerpts(scenario.excerpts);
            fixture.detectChanges();
          });

          describe('user interface', () => {

            scenario.excerpts.forEach(excerpt => {

              describe('anchor', () => {
  
                let anchor: DebugElement;
                let titleElement: DebugElement;
                let textElement: DebugElement;
                let editorsElement: DebugElement;
                let brandElement: DebugElement;
                let brandPhotoElement: DebugElement;
  
                beforeEach(() => {
                  anchor = fixture.debugElement.query(howToFindAnchor(excerpt.articleIdentifier));
                  titleElement = anchor.query(howToFindTitleInAnchor);
                  textElement = anchor.query(howToFindTextInAnchor);
                  editorsElement = anchor.query(howToFindEditorsInAnchor);
                  brandElement = anchor.query(howToFindBrandInAnchor);
                  brandPhotoElement = anchor.query(howToFindBrandPhotoInAnchor);
                });
  
                it('should exist', () => {
                  expect(anchor).toBeTruthy();
                });
  
                describe('title', () => {
  
                  it('should exist', () => {
                    expect(titleElement).toBeTruthy();
                  });
  
                  it(`should contain ${firstExcerpt.title}`, () => {
                    expect(titleElement.nativeElement.innerText).toBe(firstExcerpt.title);
                  });
  
                });
  
                describe('text', () => {
  
                  it('should exist', () => {
                    expect(textElement).toBeTruthy();
                  });
  
                  it(`should contain ${firstExcerpt.text}`, () => {
                    expect(textElement.nativeElement.innerText).toBe(firstExcerpt.text);
                  });
  
                });
  
                describe('editors', () => {
  
                  it('should exist', () => {
                    expect(editorsElement).toBeTruthy();
                  });
  
                  it(`should contain ${firstExcerpt.editors}`, () => {
                    expect(editorsElement.nativeElement.innerText).toBeCloseTo(firstExcerpt.editors);
                  });
  
                });
  
                describe('brand', () => {
  
                  it('should exist', () => {
                    expect(brandElement).toBeTruthy();
                  });
  
                  it(`should contain ${firstExcerpt.brand}`, () => {
                    expect(brandElement.nativeElement.innerText).toBe(firstExcerpt.brand);
                  });
  
                });
  
                describe('brand photo', () => {
  
                  it('should exist', () => {
                    expect(brandPhotoElement).toBeTruthy();
                  });
  
                  it(`should use ${firstExcerpt.brandPhoto} as brand photo source url`, () => {
                    const fakeImageDirective = brandPhotoElement.injector.get(FakeImageDirective);
                    expect(fakeImageDirective.src).toBe(firstExcerpt.brandPhoto);
                  });
  
                });
  
                describe('when clicked', () => {
  
                  beforeEach(() => {
                    anchor.nativeElement.click();
                  });
  
                  it(`should navigate router to /read/articles/${excerpt.articleIdentifier}`, () => {
                    const fakeRouterLinkDirective = anchor.injector.get(FakeRouterLinkDirective);
                    expect(fakeRouterLinkDirective.navigatedTo).toEqual(['/read/articles/', excerpt.articleIdentifier]);
                  });
  
                });
  
              });

            });

          });

          then();

        });

      });

    });

  };

  FakeUserService.whenUserIsLoggedIn(() => [userService, fixture], user, () => {

    regardlessOfLoggedInState(() => {

      it(`should pass '${userIdentifier}' for user identifier parameter when getting excerpts`, () => {
        expect(articleService.excerptsForUserIdentifierParameterWas).toBe(userIdentifier);
      });

    });

  });

  FakeUserService.whenUserIsNotLoggedIn(() => [userService, fixture], () => {

    regardlessOfLoggedInState(() => {

      it('should pass empty string for user identifier parameter when getting excerpts', () => {
        expect(articleService.excerptsForUserIdentifierParameterWas).toBeFalsy();
      });

    });

  });

});
