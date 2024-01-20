import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';

const routes: Routes = [
  { path: 'formbuilder', component: FormBuilderComponent },
  { path: '', redirectTo: 'formbuilder', pathMatch: 'full' },]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
