import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  static isNumeric(c: FormControl): ValidationErrors {
    const numeric = /^[0-9]*$/.test(c.value);
    const message = {'numeric': {'message': 'Please enter numbers only'}};
    return numeric ? null : message;
  }

  static isDollar(c: FormControl): ValidationErrors {
    const dollar = /^[0-9]+(\.[0-9][0-9])?$/.test(c.value)
    const message = {'dollar': {'message': 'Please format the currency amount correctly'}};
    return dollar ? null : message;
  }

 static select(c: FormControl): ValidationErrors {
    const selectValid = (c.value == 'default' || c.value == "" || c.value == -1 || c.value == null) ? false : true
    const message = {'select': {'message': 'Please make a selection'}};
    return selectValid ? null : message;
  }

}
