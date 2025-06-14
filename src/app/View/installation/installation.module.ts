import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallationRoutingModule } from './installation-routing.module';
import { InstallationInstructionsComponent } from './installation-instructions/installation-instructions.component';


@NgModule({
  declarations: [
    InstallationInstructionsComponent
  ],
  imports: [
    CommonModule,
    InstallationRoutingModule
  ]
})
export class InstallationModule { }
