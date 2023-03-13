import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAdService } from '../azure-ad.service';
import { FileLink } from './file-upload-response';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  apiUrl: string = environment.apiUrl;
  isLoading: boolean = false;
  formData: FormData | undefined;
  user_id$ = this.azureAdService.userId$;

  private _petId: number | undefined;
  get petId(): number | undefined {
    return this._petId;
  }
  @Input() set petId(id: number | undefined){
    this._petId = id;
  }
  @Input() label: string = "";
  @Input() currentFile: string | undefined;
  @Output() upload = new EventEmitter<Observable<FileLink>>();

  constructor(private http: HttpClient, private azureAdService: AzureAdService) { }

  removePath(str: string): string {
    return str.substring(str.lastIndexOf("/") + 1, str.length);
  }

  uploadFile(event: Event) {
    let input = event.target as HTMLInputElement;
    let files = input.files;
    if (!files || files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    this.currentFile = files[0].name;
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);

    this.upload.emit(this.createObservable() as Observable<FileLink>);
  }

  createObservable(): Observable<FileLink | undefined> {
    if (this.formData)
    {
      return this.user_id$.pipe(
        mergeMap(user_id => {
          return this.http.post<FileLink>(`${this.apiUrl}/api/v1/FileUpload/${user_id}/${this.petId}/${this.label}`, this.formData)
          .pipe(
            catchError(err => {
              console.log(err);
              return of(undefined);
            })
          );
        })
      )
    }
    return of(undefined);
  }

}
