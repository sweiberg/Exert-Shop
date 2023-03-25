import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public set(key: string, value: string) {
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key, value);
  }

  public get(key: string) {
      return localStorage.getItem(key);
  }
}
