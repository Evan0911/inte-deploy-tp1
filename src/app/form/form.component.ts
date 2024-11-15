import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { is18PlusValidator } from '../validators/is18-plus.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private toastr: ToastrService) { }

  form: FormGroup = new FormGroup({
    lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("^[-'a-zA-ZÀ-ÖØ-öø-ÿ]+$")]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("^[-'a-zA-ZÀ-ÖØ-öø-ÿ]+$")]),
    email: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    birthDate: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'), is18PlusValidator()]),
    city: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("^[-'a-zA-ZÀ-ÖØ-öø-ÿ]+$")]),
    postalCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]{5}$')]),
  })

  isConfirmClickable(): boolean {
    return this.form.valid;
  }

  onSubmit(): void {
    this.form.reset();
    if (this.form.valid) {
      this.toastr.success('The user have been added', 'Success');
    }
    else {
      this.toastr.error('The form is invalid', 'Error');
    }
  }

  calculateAge(): number {
    const birthDate = new Date(this.form.value.birthDate);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
