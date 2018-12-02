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
import { map } from 'rxjs/operators';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  //messages: string[] = []
  //messages: AngularFireList<Message>;
  //messagesList: AngularFireList<Message[]>;
  messages;
  messagesObservable: Observable<Message[]>;
  //messages: Observable<Message[]>;

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


      /* ---------Aqui recebi as mensagens como lista e em seguida fiz um observable a partir dela---- */

      //Obtive a lista de mensagens ou referência
      this.messages = this.messageProvider.getMessages1(this.sender.key, this.recipient.key);

      console.log('this.messages sender -> recipient', this.messages);

      this.messages
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => ({ key: action.key, ...Object.assign(action.payload.val()) }) )),
        first()
      )
      .subscribe((messages1: Message[]) => {

        console.log('messages1', messages1);

        if(messages1.length === 0) {

          console.log('messages1.length', messages1.length);

          this.messages = this.messageProvider.getMessages1(this.recipient.key, this.sender.key);

          console.log('this.messages recipient -> sender', this.messages);
        }

      });

      /* this.messagesObservable = this.messageProvider.getMessages2(this.sender.key, this.recipient.key);
      console.log('this.messagesObservable sender -> recipient', this.messagesObservable);

      this.messagesObservable
      .subscribe((messages2: Message[]) => {

        console.log('messages2', messages2);

        if(messages2.length === 0) {

          console.log('messages2.length', messages2.length);

          this.messagesObservable = this.messageProvider.getMessages2(this.recipient.key, this.sender.key);

          console.log('this.messagesObservable recipient -> sender', this.messagesObservable);
        }

      }); */

      /* this.messages = this.messageProvider
      .mapListKeys<Message[]>(this.messageProvider.getMessages3(this.sender.key, this.recipient.key))
      .subscribe((messages3: Message[]) => {

        console.log('messages3', messages3);

        if(messages3.length === 0) {

          console.log('messages3.length', messages3.length);

          this.messagesObservable = this.messageProvider.getMessages3(this.recipient.key, this.sender.key);

          console.log('this.messagesObservable recipient -> sender', this.messagesObservable);
        }

      }); */

    });

  }

  sendMessage(newMessage: string) {
    console.log('newMessage', newMessage);

    //this.messages.push(newMessage);

    if(newMessage) {

      let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageProvider.createMessage(
        new Message(
          this.sender.key,
          newMessage,
          timestamp
        ),
        this.messagesObservable
      );
    }

  }

}
