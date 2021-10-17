import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: 'articles/:articleIdentifier', component: ArticlesPageComponent },
  { path: '', component: DashboardPageComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ArticlesPageComponent, DashboardPageComponent],
})
export class AuthorModule {}
