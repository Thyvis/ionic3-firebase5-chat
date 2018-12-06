//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Chat } from '../../models/chat.model';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class ChatProvider extends BaseService {

  chats: AngularFireList<Chat>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    //public http: HttpClient
    ) {
      super();
      this.setChats();
  }

  private setChats(): void {

    this.afAuth.authState
    .subscribe((authUser: firebase.User) => {
      if(authUser) {
        //console.log('authUser', authUser);
        //console.log('authUser', authUser.uid);

        this.chats = this.db.list<Chat>(`/ionic/udemy/app11-0/chats/${authUser.uid}`, ref => ref.orderByChild('timestamp'));

      }
    });

  }

  create(chat: Chat, userId1: string, userId2: string): Promise<void> {
    return this.db.object(`/ionic/udemy/app11-0/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string): AngularFireObject<Chat> {
    return this.db.object<Chat>(`/ionic/udemy/app11-0/chats/${userId1}/${userId2}`)

  }

  updatePhoto(chat: AngularFireObject<Chat>, chatPhoto: string, recipientUserPhoto: string): Promise<boolean> {
    if(chatPhoto != recipientUserPhoto) {
      return chat.update({
        photo: recipientUserPhoto
      })
      .then(() => {
        return true;
      })
      .catch(this.handlePromiseError);
    }

    return Promise.resolve(false);

  }

}
