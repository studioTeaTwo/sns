import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AccountService } from 'app/core/services/api';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(): Promise<boolean> {
    return this.accountService
      .isLoggedIn()
      .then((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
      .catch(error => {
        return false;
      });
  }
}
