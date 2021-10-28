import { RouterModule, Routes } from '@angular/router';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RequestsPageComponent } from './requests-page/requests-page.component';

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
export class CheckModule { }
