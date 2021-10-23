import { User } from '@angular/fire/auth';
import { ReplaySubject } from 'rxjs';

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
}
