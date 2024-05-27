import { TestBed } from '@angular/core/testing';

import { UnityOfWorkServiceService } from './unity-of-work-service.service';

describe('UnityOfWorkServiceService', () => {
  let service: UnityOfWorkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnityOfWorkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
