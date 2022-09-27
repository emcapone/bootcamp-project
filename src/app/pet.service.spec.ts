import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PetService } from './pet.service';
import { environment } from 'src/environments/environment';

describe('PetService', () => {
  let service: PetService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [
        PetService
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PetService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call delete with the correct URL', () => {
    service.deletePet(4).subscribe();

    const req = httpTestingController.expectOne(environment.apiUrl + '/api/v1/Pets/4');

    req.flush({
      id: 4, name: 'Some Name', breed: 'Chinchilla', color: 'Gray', description: 'calm',
      sex: 'Female', fixed: false, weight: 6, petPhoto: '/assets/default.png'
    });
    expect(req.request.method).toBe('DELETE');
    httpTestingController.verify();
  });

});
