import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_KEY } from '../services/settings';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestWithApiKey = request.clone({
      params: request.params.set('key', API_KEY)
    });

    return next.handle(requestWithApiKey);
  }
}
