import { ChatPage } from './../chat/chat';
import { UserProvider } from '../../providers/user/user.provider';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { first } from 'rxjs/operators/first';

import { SignupPage } from './../signup/signup';
import { User } from '../../models/user.model';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { ChatProvider } from '../../providers/chat/chat.provider';
import { Chat } from '../../models/chat.model';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  view: string = 'chats';

  users;

  constructor(
    public authProvider: AuthProvider,
    public chatProvider: ChatProvider,
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

  }

  onSignUp(): void {
    this.navCtrl.push(SignupPage);

  }

  onChatCreate(recipientUser: User) {
    console.log('recipientUser:', recipientUser);

    this.userProvider
      .mapObjectKey<User>(this.userProvider.currentUser)
      .pipe(first())
      .subscribe((currentUser: User) => {
        console.log('currentUser', currentUser);

        //console.log('currentUser.key', currentUser.key);
        //console.log('recipientUser.key', recipientUser.key);

        this.chatProvider
          .mapObjectKey<Chat>(this.chatProvider.getDeepChat(currentUser.key, recipientUser.key))
          .pipe(first())
          .subscribe((chat: Chat) => {

            console.log('chat', chat);

            if(!chat.title) {
              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, recipientUser.name, (recipientUser.photo || ''));
              this.chatProvider.create(chat1, currentUser.key, recipientUser.key);

              let chat2 = new Chat('', timestamp, currentUser.name, (currentUser.photo || ''));
              this.chatProvider.create(chat2, recipientUser.key, currentUser.key);

            }

          });


      });

    this.navCtrl.push(ChatPage, {
      //Usuário destinatário
      recipientUser: recipientUser
    });

  }

}
