import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { ContactHelpCenterBannerComponent } from '../contact-help-center-banner/contact-help-center-banner.component';

@Component({
  selector: 'app-contact-form-section',
  imports: [ReactiveFormsModule, FormsModule, ContactHelpCenterBannerComponent],
  templateUrl: './contact-form-section.component.html',
  styleUrl: './contact-form-section.component.css',
})
export class ContactFormSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(MyToastrService);

  contactForm: FormGroup = this.fb.group({
    fullName: ['', [RxwebValidators.required(), RxwebValidators.minLength({ value: 2 })]],
    email: ['', [RxwebValidators.required(), RxwebValidators.email()]],
    subject: ['', [RxwebValidators.required()]],
    message: ['', [RxwebValidators.required()]],
  });

  isLoading = signal(false);
  onSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) return;
    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
      this.toastr.success(
        "We'll get back to you as soon as possible.",
        'Message sent successfully!',
        5000,
      );
      this.contactForm.reset();
    }, 2000);
  }
}
