import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: DashboardComponent },
  { path: 'formbuilder', component: FormBuilderComponent },
  { path: 'formrenderer', component: FormRendererComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
