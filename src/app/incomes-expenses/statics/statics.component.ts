import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription, tap } from 'rxjs';
import { IncomeExpense } from '../../models/income-expense.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { AppStateWithIncomes } from '../incomes-expenses.reducer';

@Component({
  selector: 'app-statics',
  standalone: false,
  templateUrl: './statics.component.html',
  styleUrl: './statics.component.css'
})
export class StaticsComponent implements OnInit, OnDestroy {

  incomesItems: IncomeExpense[] = [];
  expensesItems: IncomeExpense[] = [];
  incomesAmount: number = 0;
  expensesAmount: number = 0;
  statics$!: Subscription;
  doughnutChartLabels: string[] = ['Incomes', 'Expenses'];
  doughnutChartData!: ChartData<'doughnut'>
  doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  constructor(private store: Store<AppStateWithIncomes>) { }


  ngOnInit() {
    this.statics$ = this.store.select('incomesExpenses').subscribe(({ items }) => {
      this.generateStatics(items)
      this.generatechart();
    })
  }

  generateStatics(items: IncomeExpense[]) {
    // items.forEach(item => {
    //   if (item.type === 'I') {
    //     this.incomesItems.push(item);
    //     this.incomesAmount += item.amount;
    //   } else if (item.type === 'E') {
    //     this.expensesItems.push(item);
    //     this.expensesAmount += item.amount;
    //   }
    // });
    this.incomesItems = items.filter((item) => item.type === 'I')
    this.incomesAmount = this.incomesItems.reduce((acc, current) => acc + current.amount, 0)
    this.expensesItems = items.filter((item) => item.type === 'E')
    this.expensesAmount = this.expensesItems.reduce((acc, current) => acc + current.amount, 0)
  }

  generatechart(){
  //  const iAmounts: number[]= this.incomesItems.map(item => item.amount)
  //  const eAmounts: number[]= this.expensesItems.map(item => item.amount)

   this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [this.incomesAmount,this.expensesAmount] }      ],
    };
  
  }

  ngOnDestroy(): void {
    this.statics$.unsubscribe()
  }

}
