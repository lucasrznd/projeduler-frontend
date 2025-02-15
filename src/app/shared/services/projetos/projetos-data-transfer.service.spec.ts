import { TestBed } from '@angular/core/testing';

import { ProjetosDataTransferService } from './projetos-data-transfer.service';

describe('ProjetosDataTransferService', () => {
  let service: ProjetosDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetosDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
