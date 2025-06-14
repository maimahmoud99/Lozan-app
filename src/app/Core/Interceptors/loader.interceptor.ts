import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../Services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
