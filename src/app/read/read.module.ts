import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ReadArticleService } from './read-article.service';
import { ExcerptsPageComponent } from './excerpts-page/excerpts-page.component';

const routes: Routes = [
  { path: 'articles/:articleIdentifier', component: ArticlesPageComponent },
  { path: ':category', component: ExcerptsPageComponent },
  { path: '', component: ExcerptsPageComponent }
];

@NgModule({
  declarations: [
    ArticlesPageComponent,
    ExcerptsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ReadArticleService
  ]
})
export class ReadModule { }
