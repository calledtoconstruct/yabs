import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'articles/:articleIdentifier', component: ArticlesPageComponent },
  { path: '', component: DashboardComponent }
]

@NgModule({
  declarations: [
    ArticlesPageComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WriteModule { }
