import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoHorasTableComponent } from './lancamento-horas-table.component';

describe('LancamentoHorasTableComponent', () => {
  let component: LancamentoHorasTableComponent;
  let fixture: ComponentFixture<LancamentoHorasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentoHorasTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoHorasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
