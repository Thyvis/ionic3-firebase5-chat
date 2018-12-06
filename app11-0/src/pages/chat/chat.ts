import { ChatProvider } from './../../providers/chat/chat.provider';
import { MessageProvider } from './../../providers/message/message.provider';
import { first } from 'rxjs/operators/first';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user.provider';
import { AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Message } from '../../models/message.model';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { Chat } from '../../models/chat.model';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  /*
  Aqui pegamos o ion-content do template, podemos passar o tipo ou nome de uma variável do template
  No caso pegamos o tipo Content para manipular o ion-content
  */
  @ViewChild(Content) content: Content;

  messages: AngularFireList<Message>;
  viewMessages: Observable<Message[]>;

  /* mySubscriptionMessages: Subscription; */

  newMessage: string = '';

  pageTitle: string;
  sender: User;
  recipient: User;
  private chat1: AngularFireObject<Chat>;
  private chat2: AngularFireObject<Chat>;

  constructor(
    public authProvider: AuthProvider,
    public chatProvider: ChatProvider,
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

      this.chat1 = this.chatProvider.getDeepChat(this.sender.key, this.recipient.key);
      this.chat2 = this.chatProvider.getDeepChat(this.recipient.key , this.sender.key);
      //console.log('this.chat1', this.chat1);
      //console.log('this.chat2', this.chat2);

      if(this.recipient.photo) {
        this.chatProvider
        .mapObjectKey(this.chat1)
        .pipe(first())
        .subscribe((chat: Chat) => {
          this.chatProvider.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
        });

      }

      let doSubscription = () => {

        this.viewMessages = this.messageProvider.mapListKeys<Message>(this.messages);

        this.viewMessages
        .pipe(first())
        .subscribe((messages: Message[]) => {

          this.scrollToBottom();

        });

      };

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

        }

        doSubscription();

        /* this.mySubscriptionMessages = this.viewMessages.subscribe((messages: Message[]) => console.log('messages', messages)); */

      });

    });

  }

  /* ionViewWillLeave() {
    this.mySubscriptionMessages.unsubscribe();
  } */

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
      )
      .then(() => {

        this.chat1.update({
          lastMessage: newMessage,
          timestamp: currentTimestamp
        });

        this.chat2.update({
          lastMessage: newMessage,
          timestamp: currentTimestamp
        });

      });

    }


  }


  //duraition com ? quer dizer que é opcional
  private scrollToBottom(duration?: number): void {

    // atraso de 50 milisengundos e logo depois é chamadado o scrollToBottom
    setTimeout(() => {

      if (this.content._scroll) {

        //o elemento content vai rolar para baixo em 300 milisegundos ou a duração passada
        this.content.scrollToBottom(duration || 300);

      }

    }, 50);

  }

}
