import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './incomes-expenses.actions';
import { IncomeExpense } from '../models/income-expense.model';

export interface State {
    items: IncomeExpense[];
}

export const initialState: State = {
    items: [],
}

export const _IncomeExpenseReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, (state) => ({ ...state, items: [] })),


);