import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  public uploadPhoto(file: File): Observable<string> {
    return of('/assets/cat.jpg');
  }

  public uploadPDF(file: File): Observable<string> {
    return of('/assets/vet-records.pdf');
  }
}
