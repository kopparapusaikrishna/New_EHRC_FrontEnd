import { TestBed } from '@angular/core/testing';

import { DoctorauthguardGuard } from './doctorauthguard.guard';

describe('DoctorauthguardGuard', () => {
  let guard: DoctorauthguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoctorauthguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
