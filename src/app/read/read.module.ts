import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ReadArticleService } from './read-article.service';

const routes: Routes = [
  { path: ':category', component: ArticlesPageComponent },
  { path: '', component: ArticlesPageComponent }
];

@NgModule({
  declarations: [
    ArticlesPageComponent
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
