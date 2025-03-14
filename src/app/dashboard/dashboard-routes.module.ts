import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from '../incomes-expenses/details/details.component';
import { IncomesExpensesComponent } from '../incomes-expenses/incomes-expenses.component';
import { StaticsComponent } from '../incomes-expenses/statics/statics.component';


const childRoutes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: StaticsComponent },
      { path: 'incomes-expenses', component: IncomesExpensesComponent },
      { path: 'details', component: DetailsComponent }
    ]
    // canActivate: [authGuard],
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
