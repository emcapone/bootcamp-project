import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [FileUploadComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removePath', () => {
    it('should remove directories from a file path', () => {
      let path = "\\SomePath\\1231234\\piece%20two\\cat.jpg";
      expect(component.removePath(path)).toEqual("cat.jpg");
    });
  });

  describe('createObservable', () => {
    it('should return an observable of undefined if no file is present', fakeAsync(() => {
      component.formData = undefined;
      var obs = component.createObservable();
      obs.subscribe(res => {
        expect(res).toBeUndefined();
      });
    }));

  });
});
