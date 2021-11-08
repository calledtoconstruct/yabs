import { RouterModule, Routes } from '@angular/router';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { CommentComponent } from './comment/comment.component';
import { CommonModule } from '@angular/common';
import { ExcerptsPageComponent } from './excerpts-page/excerpts-page.component';
import { NgModule } from '@angular/core';
import { ReadArticleService } from './read-article.service';

const routes: Routes = [
  { path: 'articles/:articleIdentifier', component: ArticlesPageComponent },
  { path: ':category', component: ExcerptsPageComponent },
  { path: '', component: ExcerptsPageComponent }
];

@NgModule({
  declarations: [
    ArticlesPageComponent,
    CommentComponent,
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
