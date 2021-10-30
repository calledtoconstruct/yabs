import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/current-environment';
import { NgModule } from '@angular/core';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [];

if (environment.modules.filter(module => module === 'check').length > 0) routes.push({
  path: 'check',
  loadChildren: () => import('./check/check.module').then(module => module.CheckModule)
});

if (environment.modules.filter(module => module === 'edit').length > 0) routes.push({
  path: 'edit',
  loadChildren: () => import('./edit/edit.module').then(module => module.EditModule)
});

if (environment.modules.filter(module => module === 'read').length > 0) routes.push({
  path: 'read',
  loadChildren: () => import('./read/read.module').then(module => module.ReadModule)
});

if (environment.modules.filter(module => module === 'write').length > 0) routes.push({
  path: 'write',
  loadChildren: () => import('./write/write.module').then(module => module.WriteModule)
});

if (environment.modules.filter(module => module === 'document').length > 0) routes.push({
  path: 'document',
  loadChildren: () => import('./document/document.module').then(module => module.DocumentModule)
});

routes.push({
  path: '', component: WelcomePageComponent
});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
