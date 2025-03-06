import { TestBed } from '@angular/core/testing';

import { IncomeExpenseService } from './income-expense.service';
import { Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense.model';
import { of } from 'rxjs';

fdescribe('IncomeExpenseService', () => {
  let service: IncomeExpenseService;
  let firestoreMock: jasmine.SpyObj<Firestore>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(() => {

    firestoreMock = jasmine.createSpyObj('Firestore', ['collection', 'doc']);
    storeMock = jasmine.createSpyObj('Store', ['select']);    TestBed.configureTestingModule({
      providers: [
        IncomeExpenseService,
        { provide: Firestore, useValue: firestoreMock },
        { provide: Store, useValue: storeMock }
      ]
    });
    service = TestBed.inject(IncomeExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('Debe crear un documento correctamente si el usuario está autenticado', async () => {
  //   const mockUser = { user: { uid: '12345' } };
  //   const mockIncomeExpense: IncomeExpense = {
  //     amount: 100, description: 'Salary', type: 'income',
  //     uid: ''
  //   };

  //   storeMock.select.and.returnValue(of(mockUser));

  //   const addDocSpy = spyOn(service, 'getIncomesExpenseReference').and.returnValue(jasmine.createSpyObj('CollectionReference', ['addDoc']));

  //   await service.createIncomeExpense(mockIncomeExpense);

  //   expect(addDocSpy).toHaveBeenCalledWith('12345');
  // });

  // it('Debe lanzar un error si el usuario no está autenticado', async () => {
  //   storeMock.select.and.returnValue(of({ user: null }));

  //   try {
  //     await service.createIncomeExpense({
  //       amount: 100, description: 'Test', type: 'income',
  //       uid: ''
  //     });
  //     fail('Se esperaba un error');
  //   } catch (error) {
  //     expect(error.message).toBe('User not authenticated');
  //   }
  // });

  // it('Debe llamar a addDoc() con la referencia correcta de Firestore', async () => {
  //   const mockUser = { user: { uid: '67890' } };
  //   const mockIncomeExpense: IncomeExpense = {
  //     amount: 50, description: 'Gift', type: 'income',
  //     uid: ''
  //   };

  //   storeMock.select.and.returnValue(of(mockUser));

  //   const collectionRefMock = jasmine.createSpyObj('CollectionReference', ['addDoc']);
  //   spyOn(service, 'getIncomesExpenseReference').and.returnValue(collectionRefMock);

  //   await service.createIncomeExpense(mockIncomeExpense);

  //   expect(collectionRefMock.addDoc).toHaveBeenCalledWith(jasmine.objectContaining(mockIncomeExpense));
  // });
});
