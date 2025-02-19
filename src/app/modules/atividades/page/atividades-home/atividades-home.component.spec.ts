import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadesHomeComponent } from './atividades-home.component';

describe('AtividadesHomeComponent', () => {
  let component: AtividadesHomeComponent;
  let fixture: ComponentFixture<AtividadesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
