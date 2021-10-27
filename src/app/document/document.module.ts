import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatePageComponent } from './template-page/template-page.component';
import { DocumentPageComponent } from './document-page/document-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from './form-page/form-page.component';

const routes: Routes = [
  { path: 'template/create', component: TemplatePageComponent },
  { path: 'template/:templateIdentifier/complete', component: FormPageComponent },
  { path: 'template/:templateIdentifier', component: TemplatePageComponent },
  { path: 'document/create', component: DocumentPageComponent },
  { path: 'document/:documentIdentifier', component: DocumentPageComponent },
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    DocumentPageComponent,
    FormPageComponent,
    TemplatePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DocumentModule { }
