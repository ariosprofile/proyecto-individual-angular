import { TestBed } from '@angular/core/testing';

import { LibraryUserService } from './library-user.service';

describe('LibraryUserService', () => {
  let service: LibraryUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
