import { Auth, authState, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/current-environment';
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
    provideAuth(() => getAuth()),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule
  ],
  providers: [{
    provide: UserService,
    useFactory: (auth: Auth) => new UserService(auth, authState(auth)),
    deps: [Auth]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
