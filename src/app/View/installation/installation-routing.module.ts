import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallationInstructionsComponent } from './installation-instructions/installation-instructions.component';

const routes: Routes = [
  {path :'',component: InstallationInstructionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallationRoutingModule { }
