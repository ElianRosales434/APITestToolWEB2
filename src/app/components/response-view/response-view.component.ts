import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ApiResponse } from '../../models/api.models';

@Component({
  selector: 'app-response-view',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="response" *ngIf="response">
    <div class="meta">
      <div class="status">Estado: <strong>{{response.status}}</strong></div>
      <div class="time">Tiempo: <strong>{{response.timeMs}} ms</strong></div>
    </div>

    <div class="headers">
      <label>Encabezados de Respuesta</label>
      <pre *ngIf="hasHeaders()">{{ formattedHeaders() }}</pre>
      <div *ngIf="!hasHeaders()">—</div>
    </div>

    <div class="body">
      <label>Body</label>
      <pre class="body-pre">{{ formattedBody() }}</pre>
    </div>
  </div>

  <div *ngIf="!response" class="empty">No hay respuesta aún. Envía una solicitud para ver los resultados.</div>
  `,
 
})
export class ResponseViewComponent {
  @Input() response?: ApiResponse;

  formattedBody() {
    if (!this.response) return '';
    try {
      return JSON.stringify(this.response.body, null, 2);
    } catch {
      return String(this.response.body);
    }
  }

  hasHeaders() {
    return this.response && Object.keys(this.response.headers || {}).length > 0;
  }

  formattedHeaders() {
    return JSON.stringify(this.response?.headers ?? {}, null, 2);
  }
}
