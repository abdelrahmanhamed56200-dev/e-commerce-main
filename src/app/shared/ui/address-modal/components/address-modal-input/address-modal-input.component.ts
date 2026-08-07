import { AfterContentInit, Component, forwardRef, input, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-address-modal-input',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressModalInputComponent),
      multi: true,
    },
  ],

  templateUrl: './address-modal-input.component.html',
  styleUrl: './address-modal-input.component.css',
})
export class AddressModalInputComponent implements ControlValueAccessor, AfterContentInit {
  // input required
  inputId = input.required<string>();
  inputType = input.required<string>();
  label = input.required<string>();

  // input
  control = input<AbstractControl | null>();
  placeholder = input<string>('');
  errors = input<{ error: string; message: string }[]>();
  autocomplete = input<boolean>(false);
  suggested = input<string>('');
  maxLength = input<number>(1000000000);
  inputClass = input<string>('');

  // properties
  type = signal<string>('');
  value = signal('');
  isDisabled = signal(false);
  onBluer = () => {};
  onInput = (value: string) => {};

  ngAfterContentInit(): void {
    this.type.set(this.inputType());
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
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
  writeValue(obj: any): void {
    this.value.set(obj);
  }
}
