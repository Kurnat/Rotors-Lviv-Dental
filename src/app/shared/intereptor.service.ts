import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class IntereptorService implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      Authorization: 'token',
    });

    const clone = req.clone({
      headers,
    });

    return next.handle(clone).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.error) {
          this.snackBar.open(error.error.error, null, {
            duration: 10000,
          });
        } else {
          this.router.navigateByUrl('');

          this.snackBar.open(`Сталася помилка: ${error.message}`, null, {
            duration: 10000,
          });
        }
        console.log(error);

        return throwError(error);
      })
    );
  }
}
