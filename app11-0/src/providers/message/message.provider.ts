import { first } from 'rxjs/operators/first';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Message } from '../../models/message.model';
import { BaseService } from '../../services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MessageProvider extends BaseService{

  constructor(
    public db: AngularFireDatabase
    ) {
      super();
  }

  createMessage(message: Message, listMessages: AngularFireList<Message>): Promise<void> {

    return Promise.resolve(listMessages.push(message));

  }

  getMessages1(userId1: string, userId2: string): AngularFireList<Message[]> {

    //console.log(userId1, userId2);

    return this.db.list(`/ionic/udemy/app11-0/messages/${userId1}-${userId2}`, ref => ref.orderByChild('timestamp'));

  }

  getMessages2(userId1: string, userId2: string): Observable<Message[]> {

    //console.log(userId1, userId2);

    return this.db.list(`/ionic/udemy/app11-0/messages/${userId1}-${userId2}`, ref => ref.orderByChild('timestamp'))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(action => ({ key: action.key, ...Object.assign(action.payload.val()) }) )),
      first()
    )

  }

  getMessages3(userId1: string, userId2: string): AngularFireList<Message[]> {

    //console.log(userId1, userId2);

    return this.db.list(`/ionic/udemy/app11-0/messages/${userId1}-${userId2}`, ref => ref.orderByChild('timestamp'));

  }

}
