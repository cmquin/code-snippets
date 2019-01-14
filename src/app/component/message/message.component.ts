import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

import { MessageService } from '../../service/message.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements AfterViewInit {

  message: string = "";
  @ViewChild('messageMarker') marker: ElementRef;

  constructor(private messageService: MessageService) { }

  ngAfterViewInit(){
    this.messageService.getMessage$().subscribe(message => {
      setTimeout(() => {
        this.message = message ? message : "";
        setTimeout(() => {
          this.marker.nativeElement.scrollIntoView();
        }, 250);
      }, 0);
    });
  }

  clearMessage() {
      this.messageService.clearMessage();
  }

}
