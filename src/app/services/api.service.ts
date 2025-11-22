import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import type { ApiRequest, ApiResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  request(req: ApiRequest): Observable<ApiResponse> {
    const headers = new HttpHeaders(
      req.headers.reduce((acc, h) => {
        if (h.key) acc[h.key] = h.value;
        return acc;
      }, {} as Record<string, string>)
    );

    const start = performance.now();

    const options: any = {
      headers,
      observe: 'response' as const,
      responseType: 'json' as const
    };

    const hasBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
    if (hasBody && req.body) {
      try {
        options.body = JSON.parse(req.body);
      } catch {
        options.body = req.body;
      }
    }

    return this.http.request(req.method, req.url, options).pipe(
      map((resp: any) => {
        const timeMs = Math.round(performance.now() - start);
        const headersObj: Record<string, string> = {};
        try {
          resp.headers?.keys?.()?.forEach((k: string) => (headersObj[k] = resp.headers.get(k) || ''));
        } catch {}

        return {
          status: resp.status ?? 200,
          timeMs,
          body: resp.body,
          headers: headersObj
        } as ApiResponse;
      }),
      catchError((err) => {
        const timeMs = Math.round(performance.now() - start);
        const body = err?.error ?? err?.message ?? err;
        return of({
          status: err?.status ?? 0,
          timeMs,
          body,
          headers: {}
        } as ApiResponse);
      })
    );
  }
}
