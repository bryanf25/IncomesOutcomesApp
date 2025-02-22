import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesExpensesComponent } from './incomes-expenses.component';

describe('IncomesExpensesComponent', () => {
  let component: IncomesExpensesComponent;
  let fixture: ComponentFixture<IncomesExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomesExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomesExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
