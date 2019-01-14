import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
    @Input('tabTitle') title: string;
    @Input() active: boolean = false;
    @Input() setOverflow: boolean = true;
    @HostBinding('class.hideTab') hideTab: boolean = true;
}
