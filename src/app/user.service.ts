import {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User
} from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public readonly loggedIn$ = this.user$.pipe(
    map((user: User | null): boolean => user !== null)
  );
  public readonly notLoggedIn$ = this.loggedIn$.pipe(
    map((loggedIn: boolean): boolean => !loggedIn)
  );

  constructor(
    private readonly auth: Auth,
    public readonly user$: Observable<User | null>
  ) { }

  public signInWithGoogle(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  public signInWithGitHub(): void {
    signInWithPopup(this.auth, new GithubAuthProvider());
  }

  public signOut(): void {
    signOut(this.auth);
  }

}
