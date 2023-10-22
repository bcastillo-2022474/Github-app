import { TestBed } from '@angular/core/testing';

import { GetRepositoriesService } from './get-repositories.service';

describe('GetRepositoriesService', () => {
  let service: GetRepositoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRepositoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
