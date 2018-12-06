import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { User } from '../../models/user.model';
import { UserProfilePage } from '../../pages/user-profile/user-profile';

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User;

  constructor(
    public alertController: AlertController,
    public app: App,
    public authProvider: AuthProvider,
    public menuController: MenuController
  ) {
    super(alertController, app, authProvider, menuController);

  }

  onProfile(): void {
    this.navController.push(UserProfilePage);

  }

}
