import { TestBed } from '@angular/core/testing';

import { SaveSearchService } from './save-search.service';

describe('SaveSearchService', () => {
  let service: SaveSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
