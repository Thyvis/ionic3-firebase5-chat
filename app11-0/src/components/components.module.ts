import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
//
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';
@NgModule({
	declarations: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent
  ],
	imports: [
    CommonModule,
    //Tive que adicionar esse módulo pra chamar o app.module
    IonicModule.forRoot(MyApp)
  ],
  exports: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    //NO_ERRORS_SCHEMA
  ]
})
export class ComponentsModule {}
