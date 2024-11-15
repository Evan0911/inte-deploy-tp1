import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function is18PlusValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const age = new Date(Date.now() - birthDate.getTime()).getUTCFullYear() - 1970;
    return age >= 18 ? null : { is18Plus: false };
  }
}

@Directive({
  selector: '[appIs18Plus]',
  providers: [{ provide: NG_VALIDATORS, useExisting: Is18PlusDirective, multi: true }]
})
export class Is18PlusDirective implements Validator {
  @Input('appIs18Plus') age: number = 0;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.age ? is18PlusValidator() ? null : { is18Plus: false } : null;
  }

}
