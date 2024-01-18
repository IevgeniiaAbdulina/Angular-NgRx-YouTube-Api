import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { YOUTUBE_BASE_URL } from '../services/settings';

@Injectable()
export class YoutubeUrlInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestYoutubeUrl = request.clone({
      url: `${YOUTUBE_BASE_URL}/${request.url}`
    });

    return next.handle(requestYoutubeUrl);
  }
}
