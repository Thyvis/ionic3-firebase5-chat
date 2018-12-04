import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent],
	imports: [
    CommonModule
  ],
  exports: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
