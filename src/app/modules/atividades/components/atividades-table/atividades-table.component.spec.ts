import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadesTableComponent } from './atividades-table.component';

describe('AtividadesTableComponent', () => {
  let component: AtividadesTableComponent;
  let fixture: ComponentFixture<AtividadesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
