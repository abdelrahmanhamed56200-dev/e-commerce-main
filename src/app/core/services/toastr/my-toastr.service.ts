import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MyToastrService {
  private readonly toastr = inject(ToastrService);

  success(massage: string, title: string = '', timeOut: number = 3000) {
    this.toastr.success(massage, title, {
      timeOut: timeOut,
      progressAnimation: 'increasing',
      progressBar: true,
      closeButton: true,
    });
  }
  error(massage: string, title: string = '', timeOut: number = 3000) {
    this.toastr.error(massage, title, {
      timeOut: timeOut,
      progressAnimation: 'increasing',
      progressBar: true,
      closeButton: true,
    });
  }
}
