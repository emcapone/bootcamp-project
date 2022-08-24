import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PetfinderService } from './petfinder.service'

describe('PetfinderService', () => {
  let service: PetfinderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [
        PetfinderService
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PetfinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
