import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from '../models/income-expense.model';

@Pipe({
  name: 'orderIncome',
  standalone: false
})
export class OrderIncomePipe implements PipeTransform {

  transform(items: IncomeExpense[]): IncomeExpense[] {
   return items.sort((a,b) => {
      if(a.type === 'I'){
        return -1
      } else{
        return 1
      }
    })
  }

}
