import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Excerpt, ReadArticleService } from '../read-article.service';
import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { ExcerptsPageComponent } from './excerpts-page.component';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeImageDirective } from 'src/app/fake/image.fake';
import { FakeReadArticleService } from '../fake/read-article-service.fake';
import { FakeRouterLinkDirective } from 'src/app/fake/router-link.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { findElement } from 'src/app/find-elements-helper';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@firebase/auth';
import { UserService } from 'src/app/user.service';

const howToFindAnchor = (articleIdentifier: string) => findElement('a')
  .withAttributeValue('href', `/read/articles/${articleIdentifier}`)
  .please();

const howToFindTitleInAnchor = findElement('span')
  .withClass('title')
  .please();

const howToFindTextInAnchor = findElement('span')
  .withClass('text')
  .please();

const howToFindEditorsInAnchor = findElement('span')
  .withClass('editors')
  .please();

const howToFindBrandInAnchor = findElement('span')
  .withClass('brand')
  .please();

const howToFindBrandPhotoInAnchor = findElement('img')
  .withClass('brand-photo')
  .please();

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

      FakeActivatedRoute.whenRouteIsActivatedVerifyEmittedValue(
        { paramMap: { category: scenario.category } },
        { paramMap: { category: 1 } },
        () => [fixture, activatedRoute, component.category$],
        scenario.category === '' ? 'local' : scenario.category,
        () => {

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
                  let fakeImageDirective: FakeImageDirective;
  
                  beforeEach(() => {
                    anchor = fixture.debugElement.query(howToFindAnchor(excerpt.articleIdentifier));
                    titleElement = anchor.query(howToFindTitleInAnchor);
                    textElement = anchor.query(howToFindTextInAnchor);
                    editorsElement = anchor.query(howToFindEditorsInAnchor);
                    brandElement = anchor.query(howToFindBrandInAnchor);
                    brandPhotoElement = anchor.query(howToFindBrandPhotoInAnchor);
                    fakeImageDirective = brandPhotoElement.injector.get(FakeImageDirective) as FakeImageDirective;
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

        }
      );

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
