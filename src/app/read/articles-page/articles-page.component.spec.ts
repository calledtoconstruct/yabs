import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { User } from '@firebase/auth';
import { FakeActivatedRoute } from 'src/app/fake/activated-route.fake';
import { FakeUserService } from 'src/app/fake/user-service.fake';
import { UserService } from 'src/app/user.service';
import { ArticlesPageComponent } from './articles-page.component';

describe('ArticlesPageComponent', () => {

  const user = <User>{
    displayName: 'byeudifunf'
  };

  let userService: FakeUserService;
  let activatedRoute: FakeActivatedRoute;

  beforeEach(() => {
    userService = new FakeUserService();
    activatedRoute = new FakeActivatedRoute();
  });

  afterEach(() => {
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
        { provide: ActivatedRoute, useValue: activatedRoute }
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

        it(`should provide category '${category}'`, () => {
          let emittedCategory = '';
          const subscription = component.category$.subscribe(data => emittedCategory = data);
          activatedRoute.nextParamMap({ category: category });
          subscription.unsubscribe();
          expect(emittedCategory).toBe(category === '' ? 'local' : category);
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
