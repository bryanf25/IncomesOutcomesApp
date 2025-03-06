import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeExpenseService } from '../services/income-expense.service';
import { IncomeExpense } from '../models/income-expense.model';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as uiActions from '../shared/ui.actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-incomes-expenses',
  standalone: false,
  templateUrl: './incomes-expenses.component.html',
  styleUrl: './incomes-expenses.component.css'
})
export class IncomesExpensesComponent implements OnInit, OnDestroy {

  incomeForm!: FormGroup;
  type: string = 'I';
  loading: boolean = false;
  loadingSubscription$!: Subscription

  constructor(private fb: FormBuilder,
    private incomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>) { }


  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    })

    this.loadingSubscription$ = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription$.unsubscribe();
  }

  save() {

    if (this.incomeForm.invalid) { return }
    this.store.dispatch(uiActions.isLoading())
    // Swal.fire({
    //   title: "Saving Information..",
    //   text: 'Please, waiting while the all information is saved.',
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // })

    const incomeData = {
      ...this.incomeForm.value,
      type: this.type
    } as IncomeExpense

    this.incomeExpenseService.createIncomeExpense(incomeData)
      .then(() => {
        this.store.dispatch(uiActions.stopLoading())
        this.incomeForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Income/Expense succesfully saved!',
          confirmButtonText: 'OK'
        });
      }).catch((err) => {
        this.store.dispatch(uiActions.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'It has a error saving the data.',
          text: err,
          confirmButtonText: 'Try again'
        });
      })
  }

}
