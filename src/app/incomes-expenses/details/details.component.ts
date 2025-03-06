import { Component, OnDestroy, OnInit } from '@angular/core';
import { IncomeExpense } from '../../models/income-expense.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, Subscription } from 'rxjs';
import { IncomeExpenseService } from '../../services/income-expense.service';
import { AuthService } from '../../services/auth.service';
import * as uiActions from '../../shared/ui.actions'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {
  

  incomesExpenses!: IncomeExpense[]
  ieSubscription$!: Subscription
  loading: boolean = false;

  constructor(private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService,
    private authService: AuthService) { }


  ngOnInit() {

    this.ieSubscription$ = this.store
    .pipe(
      filter(({incomesExpenses})=> incomesExpenses.items.length != 0)
    )
    .subscribe((state) => {
      this.incomesExpenses = [...state.incomesExpenses.items]
      this.loading = state.ui.isLoading
    })
  }

  ngOnDestroy() {
    this.ieSubscription$.unsubscribe()
  }

  delete(itemId: string) {
    this.store.dispatch(uiActions.isLoading())
    const user = this.authService.user
    this.incomeExpenseService.deleteIncomeExpense(user!.uid, itemId)
      .then(() => {
        this.store.dispatch(uiActions.stopLoading())
        Swal.fire({
          icon: 'success',
          title: 'Income/Expense succesfully removed!',
          confirmButtonText: 'OK'
        });

      }).catch((err) => {
        this.store.dispatch(uiActions.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'It has a error removing the data.',
          text: err,
          confirmButtonText: 'Try again'
        });
      })
  }



}
