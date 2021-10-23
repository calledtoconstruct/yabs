import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { User } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { FakeUserService } from './user-service.fake';
import { UserService } from './user.service';

interface clickable { click: () => void };

function buttonWithText(buttons: NodeList, text: string) {
  return Array
    .from(buttons)
    .map(node => <HTMLButtonElement>node)
    .filter(button => button.innerText === text)
    .pop() || {
    click: () => { }
  };
};

export let userService: FakeUserService;

describe('AppComponent', () => {

  beforeEach(async () => {
    userService = new FakeUserService();
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: UserService, useValue: userService }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    userService.tearDown();
  });

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'yabs'`, () => {
    expect(app.title).toEqual('yabs');
  });

  describe(`when user is not logged in`, () => {

    beforeEach(() => {
      userService.setUpNotLoggedIn();
    });

    afterEach(() => {
      userService.tearDown();
    });

    let buttons: NodeList;
    let signInWithGoogleButton: HTMLButtonElement | clickable;
    let signInWithGitHubButton: HTMLButtonElement | clickable;

    beforeEach(() => {
      fixture.detectChanges();
      buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
      signInWithGoogleButton = buttonWithText(buttons, 'Sign In w/ Google');
      signInWithGitHubButton = buttonWithText(buttons, 'Sign In w/ GitHub');
    });

    it(`should display sign-in options`, () => {
      expect(buttons.length).toBe(2);
    });

    it(`the sign in with google button should exist`, () => {
      expect(signInWithGoogleButton).toBeTruthy();
    });

    it(`the sign in with github button should exist`, () => {
      expect(signInWithGitHubButton).toBeTruthy();
    });

    describe(`when clicking sign-in with google`, () => {

      beforeEach(() => {
        signInWithGoogleButton.click();
      });

      it(`should call sign in with google service`, () => {
        expect(userService.signInWithGoogleCalled).toBe(1);
      });

    });

    describe(`when clicking sign-in with github`, () => {

      beforeEach(() => {
        signInWithGitHubButton.click();
      });

      it(`should call sign in with github service`, () => {
        expect(userService.signInWithGitHubCalled).toBe(1);
      });

    });

  });

  describe(`when user is logged in`, () => {

    const displayName = 'wiefusdjksvn';
    const user = <User>{
      displayName: displayName
    };

    beforeEach(() => {
      userService.setUpLoggedInAs(user);
    });

    afterEach(() => {
      userService.tearDown();
    });

    let button: HTMLButtonElement;
    let paragraph: HTMLParagraphElement;

    beforeEach(() => {
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement;
      button = element.querySelector('button');
      paragraph = element.querySelector('p');
    });

    describe(`name paragraph`, () => {

      it(`should be displayed`, () => {
        expect(paragraph).toBeTruthy();
      });

      it(`should contain display name`, () => {
        expect(paragraph.innerText).toContain(displayName);
      });

    });

    describe(`sign out button`, () => {

      it(`should be displayed`, () => {
        expect(button).toBeTruthy();
      });

      it(`should say sign out`, () => {
        expect(button.innerText).toBe('Sign Out');
      });

    });

  });

});
