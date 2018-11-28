//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Chat } from '../../models/chat.model';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable()
export class ChatProvider extends BaseService {

  constructor(
    public db: AngularFireDatabase,
    //public http: HttpClient
    ) {
    super();
  }

  create(chat: Chat, userId1: string, userId2: string): Promise<void> {
    return this.db.object(`/ionic/udemy/app11-0/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string): AngularFireObject<Chat> {
    return this.db.object<Chat>(`/ionic/udemy/app11-0/chats/${userId1}/${userId2}`)

  }

}
