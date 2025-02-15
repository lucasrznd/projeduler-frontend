import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioProjetosFormComponent } from './usuario-projetos-form.component';

describe('UsuarioProjetosFormComponent', () => {
  let component: UsuarioProjetosFormComponent;
  let fixture: ComponentFixture<UsuarioProjetosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioProjetosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioProjetosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
