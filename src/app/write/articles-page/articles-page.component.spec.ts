import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '@firebase/auth';
import { ReplaySubject, Subject } from 'rxjs';
import { FakeUserService } from 'src/app/FakeUserService';
import { UserService } from 'src/app/user.service';
import { ArticlesPageComponent } from './articles-page.component';

class FakeActivatedRoute {
  public readonly paramMap = this.paramMapSubject.asObservable();
  constructor(
    private readonly paramMapSubject: Subject<ParamMap>
  ) {
  }
}

let timesHasWasCalledCount: number;

const paramMap = <ParamMap>{
  get: (name: string): string | null => {
    return name === 'articleIdentifier'
      ? 'new'
      : null
  },
  has: (name: string): boolean => {
    timesHasWasCalledCount++;
    return name === 'articleIdentifier';
  }
};

describe('ArticlesPageComponent', () => {

  let userService: FakeUserService;
  let paramMapSubject: Subject<ParamMap>;
  let fakeActivatedRoute: FakeActivatedRoute;
  let component: ArticlesPageComponent;
  let fixture: ComponentFixture<ArticlesPageComponent>;

  beforeEach(() => {
    userService = new FakeUserService();
    paramMapSubject = new ReplaySubject<ParamMap>(1);
    fakeActivatedRoute = new FakeActivatedRoute(paramMapSubject);
  });

  afterEach(() => {
    paramMapSubject.complete();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesPageComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
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

    const displayName = 'abvsunvj';
    const user = <User>{
      displayName: displayName
    };

    beforeEach(() => {
      userService.setUpLoggedInAs(user);
    });

    afterEach(() => {
      userService.tearDown();
    });

    describe('when passed article identifier "new"', () => {

      beforeEach(() => {
        timesHasWasCalledCount = 0;
        paramMapSubject.next(paramMap);
        fixture.detectChanges();
      });

      it('should call has', () => {
        expect(timesHasWasCalledCount).toBe(1);
      });

      it('should display title edit field', () => {
        const element = fixture.debugElement.nativeElement;
        const titleInput = element.querySelector('input[name="title"]');
        expect(titleInput).toBeTruthy();
      });

    });

  });

  describe('when user is not logged in', () => {

    beforeEach(() => {
      userService.setUpNotLoggedIn();
    });

    afterEach(() => {
      userService.tearDown();
    });

    describe('when passed article identifier "new"', () => {

      beforeEach(() => {
        timesHasWasCalledCount = 0;
        paramMapSubject.next(paramMap);
        fixture.detectChanges();
      });

      it('should not call has', () => {
        expect(timesHasWasCalledCount).toBe(0);
      });

      it('should not display title edit field', () => {
        const element = fixture.debugElement.nativeElement;
        const titleInput = element.querySelector('input[name="title"]');
        expect(titleInput).toBeFalsy();
      });

    });

  });

});
