import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { IncomeExpense } from '../models/income-expense.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  private firestore = inject(Firestore)
  
  constructor(private store: Store<AppState>) {
   }

  async createIncomeExpense(incomeExpense: IncomeExpense):Promise<DocumentReference> {
    // get the first value of that promise to avoid subscribe
    const userState = await firstValueFrom(this.store.select('user'));
    if (!userState.user) { throw new Error('User not authenticated');; }
    const uid = userState.user?.uid
    // create doc with a random id about incomeExpense object fill it in the form
    return addDoc(this.getIncomesExpenseReference(uid), { ...incomeExpense })
    
  }
  
  InitIncomesExpensesListener(uid:string) {
    return collectionData(this.getIncomesExpenseReference(uid),{ idField: 'uid' })
  }

   private getIncomesExpenseReference(uid: string){
    // get doc from userId
    const incomeExpenseDocRef = doc(this.firestore, `user/${uid}`);
    // create collection income And Expense
    const itemsCollectionRef = collection(incomeExpenseDocRef, 'incomes-expenses')
    return itemsCollectionRef
  }

  deleteIncomeExpense(uid:string, docId:string){
    const docRef = doc(this.firestore, `user/${uid}/incomes-expenses/${docId}`)
    return deleteDoc(docRef)
  }
}
