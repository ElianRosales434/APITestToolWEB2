import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { ApiRequest, Header, HttpMethod } from '../../models/api.models';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <form (ngSubmit)="sendRequest()" class="form">
    <div class="row">
      <input [(ngModel)]="request.url" name="url" required placeholder="https://api.example.com/endpoint" class="input url" />
      <select [(ngModel)]="request.method" name="method" class="select">
        <option *ngFor="let m of methods">{{m}}</option>
      </select>
    </div>

    <div class="headers">
      <label>Headers</label>
      <br>
      <div *ngFor="let h of request.headers; let i = index" class="header-row">
        <input [(ngModel)]="h.key" name="key{{i}}" placeholder="Key" class="input small" />
        <input [(ngModel)]="h.value" name="val{{i}}" placeholder="Value" class="input small" />
        <button type="button" (click)="removeHeader(i)" class="btn small">✕</button>
      </div>
      <button type="button" (click)="addHeader()" class="btn">Añadir Header</button>
    </div>

    <div *ngIf="showBody()" class="body">
      <label>Cuerpo JSON</label>
      <textarea [(ngModel)]="request.body" name="body" rows="8" placeholder='{"name": "value"}' class="textarea"></textarea>
    </div>

    <div class="actions">
      <button type="submit" class="btn primary">Enviar</button>
      <button type="button" (click)="reset()" class="btn">Reiniciar</button>
    </div>
  </form>
  `,
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent {
  @Output() send = new EventEmitter<ApiRequest>();

  methods: HttpMethod[] = ['GET','POST','PUT','DELETE','PATCH'];

  request: ApiRequest = {
    url: '',
    method: 'GET',
    headers: [],
    body: ''
  };

  addHeader() {
    this.request.headers.push({ key: '', value: '' });
  }

  removeHeader(index: number) {
    this.request.headers.splice(index, 1);
  }

  showBody() {
    return ['POST','PUT','PATCH','DELETE'].includes(this.request.method);
  }

  sendRequest() {
    if (!this.request.url) return;
    this.send.emit({ ...this.request });
  }

  reset() {
    this.request = { url: '', method: 'GET', headers: [], body: '' };
  }
}
