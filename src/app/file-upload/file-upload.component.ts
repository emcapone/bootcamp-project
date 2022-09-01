import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { FileLink } from './file-upload-response';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  message!: string;
  progress!: number;
  determinate: boolean = true;
  isLoading: boolean = false;
  @Input() label: string = "";
  @Input() currentFile: string | undefined;
  @Output() onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  removePath(str: string): string {
    return str.substring(str.lastIndexOf("\\") + 1, str.length);
  }

  uploadFile(event: Event) {
    let input = event.target as HTMLInputElement;
    let files = input.files;
    if (!files || files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0]
    this.currentFile = fileToUpload.name;
    console.log(fileToUpload.name);
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    let user_id = 1;
    let folder_name = this.label;
    this.http.post<FileLink>(`https://localhost:7007/FileUpload/${user_id}/${folder_name}`, formData,
    {
      reportProgress: true,
      observe: 'events'
    })
    .pipe(
      take(1)
    ).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.isLoading = true;
        if(event.total){
          this.progress = Math.round(100 * event.loaded / event.total);
        } else {
          this.determinate = false;
        }
      } else if (event.type === HttpEventType.Response){
        this.message = 'Upload Success';
        this.isLoading = false;
        this.onUploadFinished.emit(event.body);
      }
    });
  }

}
