import { UserProvider } from './../providers/user/user.provider';
import { SigninPage } from './../pages/signin/signin';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../models/user.model';
import { AuthProvider } from '../providers/auth/auth.provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = SigninPage;
  currentUser: User;

  constructor(
    authProvider: AuthProvider,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    userProvider: UserProvider) {

      authProvider.afAuth.authState
      .subscribe((authUser: firebase.User) => {

        //console.log('authUser', authUser);

        if(authUser) {
          userProvider.currentUser
          .valueChanges()
          .subscribe((user: User) => {
            //console.log('user', user);

            this.currentUser = user;
            //console.log('this.currentUser', this.currentUser);

          })

        } else {
          this.rootPage = SigninPage;

        }

      });

      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}

