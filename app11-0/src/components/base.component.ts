import { AuthProvider } from '../providers/auth/auth.provider';
import { NavController, AlertController, App, MenuController } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { SigninPage } from '../pages/signin/signin';

export abstract class BaseComponent implements OnInit {

  protected navController: NavController;

  constructor(
    public alertController: AlertController,
    public app: App,
    public authProvider: AuthProvider,
    public menuController: MenuController
  ) {}

  ngOnInit(): void {
    this.navController = this.app.getActiveNav();

  }

  onLogOut(): void {
    this.alertController.create({
      message: 'Do you want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.authProvider.logOut()
              .then(() => {
                this.navController.setRoot(SigninPage);
              });
          }
        },
        {
          text: 'No',
        }
      ]
    }).present();

  }

}
