import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentPageComponent } from './document-page/document-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplatePageComponent } from './template-page/template-page.component';

const routes: Routes = [
  { path: 'template/create', component: TemplatePageComponent },
  { path: 'template/:templateIdentifier/complete', component: FormPageComponent },
  { path: 'template/:templateIdentifier', component: TemplatePageComponent },
  { path: 'create', component: DocumentPageComponent },
  { path: ':documentIdentifier', component: DocumentPageComponent },
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
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DocumentModule { }
