import { AfterContentInit, Component, forwardRef, input, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  imports: [],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthInputComponent),
      multi: true,
    },
  ],
})
export class AuthInputComponent implements ControlValueAccessor, AfterContentInit {
  inputId = input.required<string>();
  inputType = input.required<string>();
  label = input.required<string>();
  control = input<AbstractControl | null>();
  formType = input<'login' | 'signup'>();

  placeholder = input<string>('');
  errors = input<{ error: string; message: string }[]>();
  autocomplete = input<boolean>(false);
  suggested = input<string>('');
  maxLength = input<number>(1000000000);

  inputClass = input<string>('');

  type = signal<string>('');

  value = signal('');
  isDisabled = signal(true);
  onInput = (value: string) => {};
  onBluer = () => {};

  ngAfterContentInit(): void {
    this.type.set(this.inputType());
  }
  writeValue(obj: any): void {
    this.value.set(obj ?? '');
  }
  registerOnChange(fn: any): void {
    this.onInput = (value: string) => {
      this.value.set(value);
      fn(value);
    };
  }
  registerOnTouched(fn: any): void {
    this.onBluer = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
