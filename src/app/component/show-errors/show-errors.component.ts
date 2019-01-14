import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
    <div *ngIf="shouldShowErrors()" class="error-spacer"></div>
    <div *ngIf="shouldShowErrors()" class="error-holder">
      <ul class="errors-UL">
        <li class="invalid-err-msg" *ngFor="let error of listOfErrors()">{{error}}</li>
      </ul>
    </div>
  `
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'email': () => 'Please format email correctly (example@domain.com)',
    'numeric': (params) => params.message,
    'select': (params) => params.message,
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'dollar': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

}
