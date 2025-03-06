import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as incomeExpense from './incomes-expenses/incomer-expenses.reducer';


export interface AppState {
   ui: ui.State,
   user: auth.State,
   incomesExpenses: incomeExpense.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui._uiReducer,
   user: auth._authReducer,
   incomesExpenses: incomeExpense._IncomeExpenseReducer
}