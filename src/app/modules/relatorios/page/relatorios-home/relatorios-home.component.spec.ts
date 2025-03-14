import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosHomeComponent } from './relatorios-home.component';

describe('RelatoriosHomeComponent', () => {
  let component: RelatoriosHomeComponent;
  let fixture: ComponentFixture<RelatoriosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
