import { TestBed } from '@angular/core/testing';

import { LancamentoHoraService } from './lancamento-hora.service';

describe('LancamentoHorasService', () => {
  let service: LancamentoHoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LancamentoHoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
