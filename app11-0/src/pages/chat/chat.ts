import { MessageProvider } from './../../providers/message/message.provider';
import { first } from 'rxjs/operators/first';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user.provider';
import { AngularFireList } from '@angular/fire/database';
import { Message } from '../../models/message.model';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  //messages: string[] = []
  messages: AngularFireList<Message>;
  //messagesList: AngularFireList<Message[]>;
  //messages;
  //messagesObservable: Observable<Message[]>;
  //messages: Observable<Message[]>;
  viewMessages: Observable<Message[]>;

  newMessage: string = '';

  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(
    public authProvider: AuthProvider,
    public messageProvider: MessageProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
    ) {
  }


  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    //Aqui pegamos recipientUser passado em home.ts
    this.recipient = this.navParams.get('recipientUser');
    //console.log('this.recipient', this.recipient);

    this.pageTitle = this.recipient.name;

    this.userProvider
    .mapObjectKey<User>(this.userProvider.currentUser)
    .pipe(first())
    .subscribe((currentUser: User) => {

      this.sender = currentUser;
      //console.log('this.sender', this.sender);

      this.messages = this.messageProvider.getMessages(this.sender.key, this.recipient.key);
      //console.log('this.messages', this.messages);


      this.viewMessages = this.messageProvider.mapListKeys<Message>(this.messages);
      //console.log('this.viewMessages', this.viewMessages);

      this.viewMessages
      .pipe(first())
      .subscribe((messages: Message[]) => {

        //console.log('messages', messages);

        if(messages.length === 0) {
          this.messages = this.messageProvider.getMessages(this.recipient.key, this.sender.key);

          //Não sei se será preciso fazer isso essa parte para se inscrever novamente no caminho inverso
          this.viewMessages = this.messageProvider.mapListKeys<Message>(this.messages);

          this.viewMessages
          .pipe(first())
          .subscribe((messages: Message[]) => {
            //console.log('messages1', messages);
          });

        }

      });

    });

  }

  sendMessage(newMessage: string) {
    console.log('newMessage', newMessage);

    if(newMessage) {

      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageProvider.createMessage(
        new Message(
          this.sender.key,
          newMessage,
          currentTimestamp
          ),
          this.messages
      );

    }


  }

}
