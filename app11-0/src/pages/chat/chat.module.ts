import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { ComponentsModule } from '../../components/components.module';
//import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@NgModule({
  declarations: [
    //CapitalizePipe,
    ChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
    ComponentsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    ChatPage
  ]
})
export class ChatPageModule {}
