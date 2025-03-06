import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense.model';

export const setItems = createAction(
    '[IncomesExpenses] Set Items',
    props<{items:IncomeExpense[]}>()
);
export const unSetItems = createAction('[IncomesExpenses] Unset Items');