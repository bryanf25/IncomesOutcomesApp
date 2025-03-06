import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, Subscription } from 'rxjs';
import { IncomeExpenseService } from '../services/income-expense.service';
import * as ieActions from '../incomes-expenses/incomes-expenses.actions'
import { IncomeExpense } from '../models/income-expense.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs$!: Subscription;
  IESubs$!: Subscription;

  constructor(private store: Store<AppState>, private incomeExpenseService: IncomeExpenseService) { }

  ngOnInit(): void {
    this.userSubs$ = this.store.select('user').pipe(
      filter(auth => auth.user !== null)
    ).subscribe(({ user }) => {
      
      this.IESubs$ = this.incomeExpenseService.InitIncomesExpensesListener(user!.uid)
        .subscribe((response) => {
          const itemsIE = response as IncomeExpense[]
          this.store.dispatch(ieActions.setItems({ items: itemsIE }))
        }
        )
    })
  }


  ngOnDestroy(): void {
    this.userSubs$.unsubscribe()
    this.IESubs$.unsubscribe()
  }

}
