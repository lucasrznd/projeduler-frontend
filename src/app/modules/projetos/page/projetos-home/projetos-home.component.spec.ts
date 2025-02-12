import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosHomeComponent } from './projetos-home.component';

describe('ProjetosHomeComponent', () => {
  let component: ProjetosHomeComponent;
  let fixture: ComponentFixture<ProjetosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetosHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
