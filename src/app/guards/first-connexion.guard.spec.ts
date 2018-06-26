import { TestBed, async, inject } from '@angular/core/testing';

import { FirstConnexionGuard } from './first-connexion.guard';

describe('FirstConnexionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstConnexionGuard]
    });
  });

  it('should ...', inject([FirstConnexionGuard], (guard: FirstConnexionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
