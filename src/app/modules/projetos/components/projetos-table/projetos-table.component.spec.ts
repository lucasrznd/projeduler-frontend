import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosTableComponent } from './projetos-table.component';

describe('ProjetosTableComponent', () => {
  let component: ProjetosTableComponent;
  let fixture: ComponentFixture<ProjetosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
