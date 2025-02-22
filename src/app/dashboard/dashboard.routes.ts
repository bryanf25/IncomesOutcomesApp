import { Routes } from "@angular/router";
import { StaticsComponent } from "../incomes-expenses/statics/statics.component";
import { IncomesExpensesComponent } from "../incomes-expenses/incomes-expenses.component";
import { DetailsComponent } from "../incomes-expenses/details/details.component";

export const dashboardRoutes: Routes = [
    { path: '', component: StaticsComponent },
    { path: 'incomes-expenses', component: IncomesExpensesComponent },
    { path: 'details', component: DetailsComponent }
];