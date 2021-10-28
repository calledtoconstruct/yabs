import { FirebaseApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore} from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Auth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { getAuth } from '@firebase/auth';
import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
    BrowserAnimationsModule,
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
