import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { Auth, authState, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { getAuth } from '@firebase/auth';
import { getApp } from '@firebase/app';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
    BrowserModule,
    CommonModule
  ],
  providers: [
    { provide: Auth, useFactory: (firebaseApp: FirebaseApp) => getAuth(firebaseApp), deps: [FirebaseApp] },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function of(arg0: null): Observable<User | null> {
  throw new Error('Function not implemented.');
}

