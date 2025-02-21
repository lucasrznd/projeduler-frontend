import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoHorasHomeComponent } from './lancamento-horas-home.component';

describe('LancamentoHorasHomeComponent', () => {
  let component: LancamentoHorasHomeComponent;
  let fixture: ComponentFixture<LancamentoHorasHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentoHorasHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoHorasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
