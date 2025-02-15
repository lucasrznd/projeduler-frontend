import { TestBed } from '@angular/core/testing';

import { UsuariosDataTransferService } from './usuarios-data-transfer.service';

describe('UsuariosDataTransferService', () => {
  let service: UsuariosDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
