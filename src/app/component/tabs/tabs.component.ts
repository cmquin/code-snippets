import {Component,ContentChildren,QueryList,AfterContentInit,EventEmitter,Output} from '@angular/core';
import {TabComponent} from './tab/tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() tabClicked = new EventEmitter();

  tabTitle:string;

  ngAfterContentInit(){
    //get active tab
    let activeTab = this.tabs.filter((tab) => tab.active);
    //set first tab as active
    if (activeTab.length === 0){
        this.selectTab(this.tabs.first, null);
    }
  }

  selectTab(tab: TabComponent, event){
    //console.log("selectTab()");
    this.tabs.toArray().forEach(tablist => {
      tablist.active = false;
      tablist.hideTab = true;
    });
    tab.active = true;
    tab.hideTab = false;
    setTimeout(()=>{window.dispatchEvent(new Event('resize'))},0);
    // get tab title
    this.tabTitle = tab.title;
    // emit event
    this.tabClicked.emit(this.tabTitle);
  }
}
