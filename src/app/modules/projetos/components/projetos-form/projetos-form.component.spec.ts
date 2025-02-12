import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosFormComponent } from './projetos-form.component';

describe('ProjetosFormComponent', () => {
  let component: ProjetosFormComponent;
  let fixture: ComponentFixture<ProjetosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
