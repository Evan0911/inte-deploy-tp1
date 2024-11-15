import { FormControl } from '@angular/forms';
import { is18PlusValidator, Is18PlusDirective } from './is18-plus.directive';

describe('Is18PlusDirective', () => {
  it('should create an instance', () => {
    const directive = new Is18PlusDirective();
    expect(directive).toBeTruthy();
  });

  it('should return true when age is 18', () => {
    const control = new FormControl('2003-01-01');
    expect(is18PlusValidator()(control)).toBeNull();
  });

  it('should return false when age is below 18', () => {
    const control = new FormControl('2010-01-01');
    expect(is18PlusValidator()(control)).toEqual({ is18Plus: false });
  });
});
