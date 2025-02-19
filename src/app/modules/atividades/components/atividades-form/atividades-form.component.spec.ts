import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadesFormComponent } from './atividades-form.component';

describe('AtividadesFormComponent', () => {
  let component: AtividadesFormComponent;
  let fixture: ComponentFixture<AtividadesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
