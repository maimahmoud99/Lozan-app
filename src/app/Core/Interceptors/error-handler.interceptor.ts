import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {}
  ignoredUrl = '/api/Auth/Login';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
      return next.handle(request).pipe(
        catchError(error => {
          if (this.ignoredUrl.match(new URL(error.url).pathname)) {
            return next.handle(request);
          }
          if (error.status != 200) {
            const { message } = this.getErrorMessage(error);
            this.showErrorMessage(message);
  
            console.error('HTTP Error:', error);
          }
  
          return throwError(error);
        })
      );
    
   }



  private getErrorMessage(error: HttpErrorResponse): {message: string} {
    let message: string = 'An error occurred!';

    switch (error.status) {
      case 401:
        message = `يرجي تسجيل الدخول مرة اخري`;
        break;
      case 400:
        message = JSON.stringify(error.error) || `Please check your input and try again`;
        break;
      case 404:
        message = `The resource you requested does not exist or has been moved`;
        break;
      case 500:
        message = `We encountered an unexpected error while processing your request. Please try again later`;
        break;
      default:
        message = error.error?.message || error.message || error.statusText;
    }

    return { message };
  }

  private showErrorMessage(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      toast: true,
    });
  }
}

