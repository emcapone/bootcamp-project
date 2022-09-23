import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createDb', () => {
    it('should return an object of two arrays', () => {
      const database = service.createDb();

      expect(Object.keys(database).length).toEqual(2);
    });
  });
  describe('genId', () => {
    it('should return 11 if array is empty', () => {
      const ary: any[] = [];

      const id = service.genId(ary);

      expect(id).toEqual(11);
    });
    it('should return one greater than the max ID', () => {
      const ary: any[] = [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 30 }];

      const id = service.genId(ary);

      expect(id).toEqual(31);
    });
  });
});
