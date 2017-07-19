/**
 * Created by nour on 7/19/17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'budgetpipe' })
export class BudgetPipe implements PipeTransform {
  transform(budgets: any, searchText: any): any {
    if(searchText == null) return budgets;

    return budgets.filter(function(budget){
      return budget.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
