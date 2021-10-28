import { RouterModule, Routes } from '@angular/router';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WriteArticleService } from './write-article.service';

const routes: Routes = [
  { path: 'articles/:articleIdentifier', component: ArticlesPageComponent },
  { path: 'articles', component: DashboardComponent },
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ArticlesPageComponent,
    DashboardComponent
  ],
  providers: [
    WriteArticleService
  ]
})
export class WriteModule { }
