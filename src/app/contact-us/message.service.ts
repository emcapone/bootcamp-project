import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  apiUrl = environment.apiUrl;
  contactUrl = environment.apiUrl + '/api/v1/Message';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  postMessage(message: Message): Observable<Message | Number> {
    return this.http.post<Message | Number>(this.contactUrl, message, this.httpOptions);
  }

}
