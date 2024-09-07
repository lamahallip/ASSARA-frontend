import { Injectable } from '@angular/core';
import { ToastInfo } from './model/toast-info.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: ToastInfo[] = [];

  show(body: string, type: "DANGER" | "SUCCESS"): void {

    let classname;

    if(type === "SUCCESS") {
      classname = 'bg-success text-light';
    } else {
      classname = 'bg-danger text-light';
    }

    const toastInfo : ToastInfo = {body, classname};
    this.toasts.push(toastInfo);
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(toastToCompare => toastToCompare != toast )
  }

  constructor() { }
}
