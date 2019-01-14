import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { MessageService } from '../service/message.service';
import { LoadingGraphicService } from '../service/loading-graphic.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  messageMap = {
    "MISSING_CREDIT_CARD_INFO": "Missing credit card information. (card type, expiration date)",
    "MISSING_CREDIT_CARD_ADDRESS_INFO": "Billing address information missing for credit card.",
    "INVALID_CREDIT_CARD_NUMBER": "Invalid credit card number.",
    "MISSING_CREDIT_CARD_NUMBER": "Credit card number is missing.",
    "INVALID_CREDIT_CARD_TYPE": "Credit card number is missing.",
    "INVALID_CREDIT_CARD_SECURITY_CODE": "Invalid security code. (CVV)",
    "INVALID_CREDIT_CARD_EXP_MONTH": "Invalid expiration month.",
    "INVALID_CREDIT_CARD_ISSUE_NUMBER": "Invalid issue number",
    "INVALID_CREDIT_CARD_START_MONTH": "Invalid start month",
    "PREAUTH_DECLINED": "Credit card pre-authorization declined."
  }

  constructor(
    private inj: Injector
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const route = this.inj.get(Router);
    const login = this.inj.get(LoginService);
    const message = this.inj.get(MessageService);
    const graphic = this.inj.get(LoadingGraphicService);

    req = req.clone({
      headers: this.addHeader(req)
    });

    return next.handle(req).catch(err => {
      if (err instanceof HttpErrorResponse){
        switch(err.status){
          case 401:
            if (localStorage.getItem('token')){
              login.logout();
              message.setMessage(-1, "Session Expired");
            }else {
              login.logout();
              message.setMessage(-1, "Login Authentication Failed");
            }
            break;
          case 403:
            login.logout();
            message.setMessage(-1, "User not Authorized.");
            break;
          case 404:
            route.navigate(['/page-not-found'])
            break;
          case 412:
            let errorMsg = this.setErrorMessage(err.error)
            message.setMessage(-1, errorMsg);
            graphic.hideGraphic();
            break;
          case 500:
            route.navigate(['/general-system-error'])
            break;
          case 0:
            login.logout();
            message.setMessage(-1, "System Error");
            break;
        }
        return Observable.throw(err);
      }
    });
  }

  private addHeader(request: HttpRequest<any>){
    let token: string = 'Bearer ' + localStorage.getItem('token');
    let headers = request.headers

    if ((request.method == "POST" || request.method == "PUT")
      && request.url.indexOf('/users/import/upload') < 0){
      headers = headers.append("Content-Type", "application/json");
    }
    if (request.url.indexOf('/api/login') < 0){
      headers = headers.append('Authorization', token);
    }

    return headers;
  }

  private setErrorMessage(error){
    if (error.errors){
      let messages:string[] = [];
      let message:string
      error = error.errors;
      for (let i = 0; i < error.length; i++){
        messages.push(this.customMessages(error[i].error_code, error[i].user_message));
      }
      message = messages.length > 1 ? this.buildList(messages) : messages[0];
      return message;
    }else if (error.error){
      return this.customMessages(error.error, error.description);
    }

    return "There was a server error";
  }

  private customMessages(msgId:string, msg:string){
    if (this.messageMap.hasOwnProperty(msgId))
      return this.messageMap[msgId];
    else
      return msg;
  }

  private buildList(messages): string{
    let list:string =  `<ul>`;
    for (let i = 0; i < messages.length; i++)
      list += `<li>${messages[i]}</li>`;
    list +=  `</ul>`;
    return list;
  }
}
