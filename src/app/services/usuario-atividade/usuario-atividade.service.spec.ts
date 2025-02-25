import { TestBed } from '@angular/core/testing';

import { UsuarioAtividadeService } from './usuario-atividade.service';

describe('UsuarioAtividadeService', () => {
  let service: UsuarioAtividadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioAtividadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
