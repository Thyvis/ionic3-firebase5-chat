import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfilePage } from './user-profile';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfilePage),
    ComponentsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    UserProfilePage
  ]

})
export class UserProfilePageModule {}
