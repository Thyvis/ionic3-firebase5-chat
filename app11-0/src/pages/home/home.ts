import { ChatPage } from './../chat/chat';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from './../signup/signup';
import { User } from '../../models/user.model';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  view: string = 'chats';

  users;

  constructor(
    public authProvider: AuthProvider,
    public navCtrl: NavController,
    public userProvider: UserProvider
    ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
      //Aqui está a simplificação do código abaixo
      this.users = this.userProvider.users;

      //Essa função foi passada para o serviço users
    /* this.users = this.userProvider.usersRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ); */
      //this.userProvider.setUsers();

  }

  onSignUp(): void {
    this.navCtrl.push(SignupPage);

  }

  onChatCreate(user: User) {
    console.log('user:', user);

    this.navCtrl.push(ChatPage, {
      //Usuário destinatário
      recipientUser: user
    });

  }

}
