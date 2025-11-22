export interface Header {
  key: string;
  value: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequest {
  url: string;
  method: HttpMethod;
  headers: Header[];
  body?: string;
}

export interface ApiResponse {
  status: number;
  timeMs: number;
  body: any;
  headers: Record<string, string>;
}
