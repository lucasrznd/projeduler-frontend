import { TestBed } from '@angular/core/testing';

import { UsuarioProjetoService } from './usuario-projeto.service';

describe('UsuarioProjetoService', () => {
  let service: UsuarioProjetoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioProjetoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
