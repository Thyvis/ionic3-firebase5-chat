import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.model';

/*
  O metadado host abaixo é o mesmo que:
<message-box [style.justify-content]"((!isFromSender) ? "flex-start" : "flex-end")"></message-box>
*/

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.component.html',
  host: {
    '[style.justify-content]': '((!isFromSender) ? "flex-start" : "flex-end")',
    '[style.text-align]': '((!isFromSender) ? "flex" : "right")',
  }
})
export class MessageBoxComponent {

  @Input() message: Message
  @Input() isFromSender: boolean;

  constructor() {

  }

}
