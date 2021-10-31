import { Auth, User } from '@angular/fire/auth';
import { ReplaySubject, Subscription } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('User Service', () => {

  const user = <User>{
    displayName: 'bnaueinadsf',
    uid: 'oaisdfoinba'
  };

  let auth: jasmine.SpyObj<jasmine.Func>;
  let userSubject$: ReplaySubject<User | null>;

  beforeEach(() => {
    auth = jasmine.createSpy('Auth');
    userSubject$ = new ReplaySubject<User | null>(1);
  });

  afterEach(() => {
    userSubject$.complete();
  });

  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: auth },
        { provide: UserService, useFactory: (auth: Auth) => new UserService(auth, userSubject$), deps: [Auth] }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when a user is authenticated', () => {

    let subscription: Subscription;
    let value: boolean;

    beforeEach(() => {
      subscription = service.loggedIn$.subscribe(data => value = data);
      userSubject$.next(user);
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('should emit logged in true', () => {
      expect(value).toBe(true);
    });

  });

});
