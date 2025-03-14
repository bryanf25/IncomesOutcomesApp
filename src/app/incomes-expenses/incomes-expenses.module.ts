import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeExpenseTransformPipe } from '../pipes/income-expense-transform.pipe';
import { OrderIncomePipe } from '../pipes/order-income.pipe';
import { DetailsComponent } from './details/details.component';
import { IncomesExpensesComponent } from './incomes-expenses.component';
import { StaticsComponent } from './statics/statics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { _IncomeExpenseReducer } from './incomes-expenses.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomesExpensesComponent,
    StaticsComponent,
    DetailsComponent,
    IncomeExpenseTransformPipe,
    OrderIncomePipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomesExpenses',_IncomeExpenseReducer),
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    BaseChartDirective,
    DashboardRoutesModule
  ],
  providers:[
    provideCharts(withDefaultRegisterables()),
  ]
})
export class IncomesExpensesModule { }
