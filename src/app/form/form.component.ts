import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  form: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    firstName: new FormControl(''),
    email: new FormControl(''),
    birthDate: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
  })

  isConfirmClickable(): boolean {
    return this.form.valid;
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
