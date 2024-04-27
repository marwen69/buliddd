import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {Subject, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private confirmationSubject = new Subject<boolean>();
  onConfirmation = this.confirmationSubject.asObservable();

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title) {
    this.toastr.success(message, title);
  }

  showError(message, title) {
    this.toastr.error(message, title);
  }

  showInfo(message, title) {
    this.toastr.info(message, title);
  }

  showWarning(message, title) {
    this.toastr.warning(message, title);

  }
}
