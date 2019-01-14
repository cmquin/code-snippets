import { Component, OnInit, Input, Output, OnChanges, EventEmitter, ViewEncapsulation,
    trigger, state, style, animate, transition, SimpleChanges } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
      trigger('modal', [
        transition('void => *', [
          style({ transform: 'scale3d(.3, .3, .3)' }),
          animate(100)
        ]),
        transition('* => void', [
          animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
        ])
      ])
    ]
})
export class ModalComponent {

  @Input() closable: boolean = true;
  @Input() visible: boolean = false;
  @Input() customCancelCallback: any;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  close(){
    if (this.closable){
      this.visible = false;
      this.visibleChange.emit(this.visible);
    }
  }

}
