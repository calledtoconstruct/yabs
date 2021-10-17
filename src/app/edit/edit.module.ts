import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsPageComponent } from './requests-page/requests-page.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'articles/:articleIdentifier', component: ArticlesPageComponent },
  { path: 'requests', component: RequestsPageComponent },
  { path: '', component: DashboardComponent}
];

@NgModule({
  declarations: [
    DashboardComponent,
    RequestsPageComponent,
    ArticlesPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EditModule { }
