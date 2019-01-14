import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';

import { LoadingGraphicService } from '../../service/loading-graphic.service';

@Component({
  selector: 'app-loading-graphic',
  templateUrl: './loading-graphic.component.html',
  styleUrls: ['./loading-graphic.component.css']
})

export class LoadingGraphicComponent implements AfterViewInit, OnInit, OnDestroy {
  download:boolean=false;
  visible:boolean=false;

  private graphicObserv$

  constructor(private graphic: LoadingGraphicService){}

  ngOnInit(){
    let pageLoad = this.graphic.pageLoad()
    this.download = pageLoad.direction;
    this.visible = pageLoad.visible;
  }

  ngAfterViewInit(){
    this.graphicObserv$ = this.graphic.isVisible$().subscribe(resp => {
      setTimeout(() => {
        this.visible = resp.visible;
        this.download = resp.direction;
      }, 0);
    });
  }

  ngOnDestroy(){
    this.graphicObserv$.complete();
  }

}
