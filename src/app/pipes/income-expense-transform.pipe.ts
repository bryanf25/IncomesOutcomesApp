import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incomeExpenseTransform',
  standalone: false
})
export class IncomeExpenseTransformPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'I':
        return 'Income'
      case 'E':
        return 'Expense'
      default:
        return '';
    }
  }

}
