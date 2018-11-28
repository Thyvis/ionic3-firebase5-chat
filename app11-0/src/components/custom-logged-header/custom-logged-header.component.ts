import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth.provider';

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input() title: string;

  constructor(
    public alertController: AlertController,
    public app: App,
    public authProvider: AuthProvider,
    public menuController: MenuController
  ) {
    super(alertController, app, authProvider, menuController);
  }

}
