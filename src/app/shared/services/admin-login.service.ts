import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthLoginService {
  private isAdmin = true;

  login() {
    this.isAdmin = true;
  }

  logout() {
    this.isAdmin = false;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout( () => {
        resolve(this.isAdmin);
      }, 2000);
    });
  }
}
