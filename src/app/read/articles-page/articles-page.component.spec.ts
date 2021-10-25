import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { User } from '@firebase/auth';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { CountContainer } from 'src/app/test/count-container.type';
import { UserService } from 'src/app/user.service';
import { FakeReadArticleService } from '../fake/read-article-service.fake';
import { ReadArticleService } from '../read-article.service';
import { ArticlesPageComponent } from './articles-page.component';

describe('ArticlesPageComponent', () => {

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

  describe('when user is logged in', () => {

    beforeEach(() => {
      userService.setUpLoggedInAs(user);
      fixture.detectChanges();
    });

    [
      { category: '' }
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

        it(`should call pass '${category}' for category parameter when getting excerpts`, () => {
          expect(articleService.excerptsForCategoryParameterWas).toBe(category === '' ? 'local' : category);
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
