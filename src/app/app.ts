import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { ResponseViewComponent } from './components/response-view/response-view.component';
import { ApiService } from './services/api.service';
import type { ApiRequest, ApiResponse } from './models/api.models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RequestFormComponent, ResponseViewComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('ProyectoFinal');

  lastResponse?: ApiResponse;

  constructor(private api: ApiService) {}

  handleSend(req: ApiRequest) {
    this.api.request(req).subscribe((res) => (this.lastResponse = res));
  }
}
