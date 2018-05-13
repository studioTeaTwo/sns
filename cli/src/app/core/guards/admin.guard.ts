import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from 'app/core/services/api';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(): Observable<boolean> {
    return this.accountService.get().pipe(
      map(user => {
        if (user.admin) {
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      }),
    );
  }
}
