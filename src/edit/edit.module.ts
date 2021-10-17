import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { RequestsPageComponent } from './requests-page/requests-page.component';

const routes: Routes = [
  { path: 'requests/:articleIdentifier', component: RequestsPageComponent },
  { path: '', component: DashboardPageComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [DashboardPageComponent, RequestsPageComponent],
})
export class EditModule {}
