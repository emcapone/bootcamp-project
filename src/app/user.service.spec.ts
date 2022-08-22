import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';

describe('AccountService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  let exampleUser: User;

  beforeEach(() => {
    exampleUser = {
      id: 1, firstName: 'Beth', lastName: 'Harmon', birthday: new Date(2000, 12, 16, 7, 30, 10, 10), email: 'bharmon@gmail.com', password: 'Chess123'
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [
        UserService
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call get with the correct URL', () => {
    service.getUser(1).subscribe();

    const req = httpTestingController.expectOne('api/users/1');

    req.flush(exampleUser);

    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });

  it('should call put with the correct User', fakeAsync(() => {
    service.updateUser(exampleUser).subscribe(res => {
      expect(res).toEqual(exampleUser);
    });

    const req = httpTestingController.expectOne('api/users');

    req.flush(exampleUser);

    httpTestingController.verify();
  }));

  it('should enter private handleError function on error', fakeAsync(() => {
    spyOn(console, 'error');
    service.getUser(2).subscribe();

    const req = httpTestingController.expectOne('api/users/2');
    req.flush('404 error', { status: 404, statusText: 'Not Found' });

    httpTestingController.verify();
    expect(console.error).toHaveBeenCalled();
  }));

});
