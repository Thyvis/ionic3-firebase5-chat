import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ChatPageModule {}
