import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ArticleService } from './article.service';

const routes: Routes = [
  { path: 'articles/:articleIdentifier', component: ArticlesPageComponent },
  { path: 'articles', component: DashboardComponent },
  { path: '', component: DashboardComponent }
]

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
    ArticleService
  ]
})
export class WriteModule { }
