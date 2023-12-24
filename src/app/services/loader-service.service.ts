import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {

  private loaderVisible = new BehaviorSubject<boolean>(true);

  constructor() {}

  getLoaderVisibility() {
    return this.loaderVisible.asObservable();
  }

  showLoader() {
    this.loaderVisible.next(true);
  }

  hideLoader() {
    this.loaderVisible.next(false);
  }
}