import { ComponentFixture } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { User } from '@angular/fire/auth';

export class FakeUserService {

  public readonly user$ = new ReplaySubject<User | null>(1);
  public readonly loggedIn$ = new ReplaySubject<boolean>(1);
  public readonly notLoggedIn$ = new ReplaySubject<boolean>(1);

  public signInWithGoogleCalled = 0;
  public signInWithGitHubCalled = 0;
  public signOutCalled = 0;

  public signInWithGoogle(): void {
    this.signInWithGoogleCalled++;
  }
  
  public signInWithGitHub(): void {
    this.signInWithGitHubCalled++;
  }

  public signOut(): void {
    this.signOutCalled++;
  }

  public setUpLoggedInAs(user: User): void {
    this.user$.next(user);
    this.loggedIn$.next(true);
    this.notLoggedIn$.next(false);
  }

  public setUpNotLoggedIn(): void {
    this.user$.next(null);
    this.loggedIn$.next(false);
    this.notLoggedIn$.next(true);
  }

  public tearDown(): void {
    this.user$.complete();
    this.loggedIn$.complete();
    this.notLoggedIn$.complete();
  }

  public static readonly whenUserIsLoggedIn = <TComponent>(context: () => [FakeUserService, ComponentFixture<TComponent>], user: User, then: () => void) => {
  
    describe('when user is logged in', () => {
  
      beforeEach(() => {
        const [userService, fixture] = context();
        userService.setUpLoggedInAs(user);
        fixture.detectChanges();
      });
  
      then();
  
    });
  
  };
  
  public static readonly whenUserIsNotLoggedIn = <TComponent>(context: () => [FakeUserService, ComponentFixture<TComponent>], then: () => void) => {
  
    describe('when user is not logged in', () => {
  
      beforeEach(() => {
        const [userService, fixture] = context();
        userService.setUpNotLoggedIn();
        fixture.detectChanges();
      });
  
      then();
  
    });
  
  };
}
