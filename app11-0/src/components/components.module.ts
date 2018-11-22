import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomLoggedHeaderComponent } from './custom-logged-header/custom-logged-header';
@NgModule({
	declarations: [CustomLoggedHeaderComponent],
	imports: [],
  exports: [CustomLoggedHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
