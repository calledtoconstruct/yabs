import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: 'check', loadChildren: () => import('./check/check.module').then(module => module.CheckModule) },
  { path: 'edit', loadChildren: () => import('./edit/edit.module').then(module => module.EditModule) },
  { path: 'read', loadChildren: () => import('./read/read.module').then(module => module.ReadModule) },
  { path: 'write', loadChildren: () => import('./write/write.module').then(module => module.WriteModule) },
  { path: '', component: WelcomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
