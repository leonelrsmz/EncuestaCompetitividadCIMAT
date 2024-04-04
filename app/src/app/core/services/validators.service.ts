import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  passwordConfirm(password: string, confirm: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const confirmControl = formGroup.get(confirm);
      if (passwordControl.value === confirmControl.value) {
        confirmControl.setErrors(null);
      } else {
        confirmControl.setErrors({notMatch: true});
      }
    }
  }
}
