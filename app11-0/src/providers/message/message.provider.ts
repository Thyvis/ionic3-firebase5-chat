import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Message } from '../../models/message.model';
import { BaseService } from '../../services/base.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageProvider extends BaseService{

  //Aqui estamos fazendo um infinte scroll começando por exibir 5 mensagens
  private limit: BehaviorSubject<number> = new BehaviorSubject<number>(5);

  constructor(
    public db: AngularFireDatabase
    ) {

      super();

      //this.limit.next(20);
      //São adicionadas mais 5
      this.limit.next(this.limit.getValue() + 5);
      //console.log('this.limit', this.limit);
      //console.log('this.limit.getValue()', this.limit.getValue());

  }

  createMessage(message: Message, listMessages: AngularFireList<Message>): Promise<void> {

    return Promise.resolve(listMessages.push(message));

  }

  getMessages(userId1: string, userId2: string): AngularFireList<Message> {

    //console.log(userId1, userId2);

    return this.db.list(
      `/ionic/udemy/app11-0/messages/${userId1}-${userId2}`,
      ref => ref.orderByChild('timestamp').limitToLast(30)
      //Aqui mostrariámos as msgs de acordo com o limite
      //ref => ref.orderByChild('timestamp').limitToLast(this.limit.getValue())
    );

  }

}
