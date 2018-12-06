import { ChatPage } from './../chat/chat';
import { UserProvider } from '../../providers/user/user.provider';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { first } from 'rxjs/operators/first';

import { SignupPage } from './../signup/signup';
import { User } from '../../models/user.model';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { ChatProvider } from '../../providers/chat/chat.provider';
import { Chat } from '../../models/chat.model';
import firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  view: string = 'chats';

  chats: Observable<Chat[]>;
  users: Observable<User[]>;

  constructor(
    public authProvider: AuthProvider,
    public chatProvider: ChatProvider,
    public menuController: MenuController,
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

    this.chats = this.chatProvider
    .mapListKeys<Chat>(this.chatProvider.chats)
    .pipe(
      map((chats: Chat[]) => chats.reverse())
    )

    this.menuController.enable(true, 'user-menu');

  }

  filterItems(event: any): void {

    let searchTerm: string = event.target.value;

    //console.log('Busca', searchTerm);
    this.users = this.userProvider.users;

    this.chats = this.chatProvider
    .mapListKeys<Chat>(this.chatProvider.chats)
    .pipe(
      map((chats: Chat[]) => chats.reverse())
    )

    if(searchTerm) {

      switch(this.view) {

        case 'chats':
          this.chats = this.chats
          .pipe(
            map(
              (chats: Chat[]) =>
              chats.filter((chat: Chat) =>
              (chat.title && chat.title.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1))
            )
          );
          break;

        case 'users':
          this.users = this.users
          .pipe(
            map(
              (users: User[]) =>
              users.filter((user: User) =>
              (user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ))
            )
          );
          break;
      }

    }

  }

  onSignUp(): void {
    this.navCtrl.push(SignupPage);

  }

  onChatCreate(recipientUser: User) {
    //console.log('recipientUser:', recipientUser);

    this.userProvider
      .mapObjectKey<User>(this.userProvider.currentUser)
      .pipe(first())
      .subscribe((currentUser: User) => {
        //console.log('currentUser', currentUser);

        //console.log('currentUser.key', currentUser.key);
        //console.log('recipientUser.key', recipientUser.key);

        this.chatProvider
          .mapObjectKey<Chat>(this.chatProvider.getDeepChat(currentUser.key, recipientUser.key))
          .pipe(first())
          .subscribe((chat: Chat) => {

            //console.log('chat', chat);

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

  onChatOpen(chat: Chat): void {

    let recipientUserId: string = chat.key

    this.userProvider.mapObjectKey<User>(this.userProvider.get(recipientUserId))
    .pipe(first())
    .subscribe((user: User) => {

      this.navCtrl.push(ChatPage, {
        recipientUser: user
      });

    });

  }

}
