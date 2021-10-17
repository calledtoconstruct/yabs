import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat/firebase.app.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/firestore.module';

const routes: Routes = [
  {
    path: 'author',
    loadChildren: () =>
      import('../author/author.module').then((m) => m.AuthorModule),
  },
  {
    path: 'check',
    loadChildren: () =>
      import('../check/check.module').then((m) => m.CheckModule),
  },
  {
    path: 'edit',
    loadChildren: () => import('../edit/edit.module').then((m) => m.EditModule),
  },
  {
    path: 'read',
    loadChildren: () => import('../read/read.module').then((m) => m.ReadModule),
  },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [AppComponent, HomePageComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
