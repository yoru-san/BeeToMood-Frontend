import { TestBed, async, inject } from '@angular/core/testing';

import { IsAllowedGuard } from './is-allowed.guard';

describe('IsAllowedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAllowedGuard]
    });
  });

  it('should ...', inject([IsAllowedGuard], (guard: IsAllowedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
