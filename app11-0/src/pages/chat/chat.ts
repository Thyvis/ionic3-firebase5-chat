import { first } from 'rxjs/operators/first';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];
  newMessage: string = '';
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(
    public authProvider: AuthProvider,
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
        console.log('this.sender', this.sender);

    })

  }

  sendMessage(newMessage: string) {
    this.messages.push(newMessage);

  }

}
