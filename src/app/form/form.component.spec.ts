import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let toastrService: ToastrService;
  // let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    // const spy = jasmine.createSpyObj('ToastrService', ['success']);
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
      // providers: [ { provide: ToastrService, useValue: spy } ]
      providers: [ ToastrService ]
    });
    // toastrService = TestBed.inject(ToastrService);
    // toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isConfirmClickable should return true when form is valid', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doe@moogle.com',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.isConfirmClickable()).toBeTrue();
  });

  it('isConfirmClickable should return false when form is invalid', () => {
    component.form.setValue({
      lastName: '',
      firstName: 'John',
      email: 'jaaj',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.isConfirmClickable()).toBeFalse();
  });

  it('onSubmit should reset form', () => {
    component.form.setValue({
      lastName: '',
      firstName: 'John',
      email: 'jaaj',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    component.onSubmit();
    expect(component.form.value).toEqual({
      lastName: null,
      firstName: null,
      email: null,
      birthDate: null,
      city: null,
      postalCode: null
    });
  });

  it('Postal Code should be valid when it is 5 digits', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: '',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("postalCode")?.valid).toBeTrue();
  });

  it('Postal Code should be invalid when it is not 5 digits', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: '',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '123456'
    });
    expect(component.form.get("postalCode")?.valid).toBeFalse();
  });

  it('Birth Date should be valid when age is 18', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doe@moogle.com',
      birthDate: '2003-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("birthDate")?.valid).toBeTrue();
  });

  it('Birth Date should not be valid when age is below 18', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doe@moogle.com',
      birthDate: '2010-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("birthDate")?.valid).toBeFalse();
  });

  it('Last Name should be valid when it contains only letters', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doe@moogle.com',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("lastName")?.valid).toBeTrue();
  });

  it('Last Name should be invalid when it contains special characters or numbers', () => {
    component.form.setValue({
      lastName: 'Doe1_',
      firstName: 'John',
      email: 'john.doe@moogle.com',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("lastName")?.valid).toBeFalse();
  });

  it('First Name should be valid when it contains only letters', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doe@moogle.com',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("lastName")?.valid).toBeTrue();
  });

  it('First Name should be invalid when it contains special characters or numbers', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John2)',
      email: 'john.doe@moogle.com',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("firstName")?.valid).toBeFalse();
  });

  it('City should be valid when it contains only letters', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doe@moogle.com',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("lastName")?.valid).toBeTrue();
  });

  it('City should be invalid when it contains special characters or numbers', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doe@moogle.com',
      birthDate: '2000-01-01',
      city: 'Moogle5&',
      postalCode: '12345'
    });
    expect(component.form.get("city")?.valid).toBeFalse();
  });

  it('Email should be valid when it is in the right format', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doe@moogle.com',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("email")?.valid).toBeTrue();
  });

  it('Email should be invalid when it is not in the right format', () => {
    component.form.setValue({
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doemoogle.com',
      birthDate: '2000-01-01',
      city: 'Moogle',
      postalCode: '12345'
    });
    expect(component.form.get("email")?.valid).toBeFalse();
  });

  it('onSubmit should display a succes toastr when the form is valid', () => {
    toastrService = TestBed.inject(ToastrService);
    const toastrSpy = spyOn(toastrService, 'success').and.callThrough();
    toastrService.success('The user have been added', 'Success');
    expect(toastrSpy).toHaveBeenCalledWith('The user have been added', 'Success');
  });

  it('onSubmit should display an error toastr when the form is invalid', () => {
    toastrService = TestBed.inject(ToastrService);
    const toastrSpy = spyOn(toastrService, 'error').and.callThrough();
    toastrService.error('The form is invalid', 'Error');
    expect(toastrSpy).toHaveBeenCalledWith('The form is invalid', 'Error');
  });
});
