import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoHorasFormComponent } from './lancamento-horas-form.component';

describe('LancamentoHorasFormComponent', () => {
  let component: LancamentoHorasFormComponent;
  let fixture: ComponentFixture<LancamentoHorasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentoHorasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoHorasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
