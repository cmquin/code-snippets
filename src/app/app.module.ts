import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthGuard } from './guard/auth.guard';

import { LoadingGraphicComponent } from './component/loading-graphic/loading-graphic.component';
import { MessageComponent } from './component/message/message.component';
import { ModalComponent } from './component/modal/modal.component';
import { ShowErrorsComponent } from './component/show-errors/show-errors.component';
import { TabsComponent } from './component/tabs/tabs.component';
import { TabComponent } from './component/tabs/tab/tab.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingGraphicComponent,
    MessageComponent,
    ModalComponent,
    ShowErrorsComponent,
    TabsComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
