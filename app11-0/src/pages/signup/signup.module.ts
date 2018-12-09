import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    ComponentsModule
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule {}
