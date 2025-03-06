import { inject, Injectable } from '@angular/core';
import {
  Auth, authState, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential
} from '@angular/fire/auth';
import { docData, Firestore } from '@angular/fire/firestore';

import { map } from 'rxjs'
import { User } from '../models/user.model';
import {  doc, setDoc, } from 'firebase/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions'
import * as ieActions from '../incomes-expenses/incomes-expenses.actions'
import { AppState } from '../app.reducer';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  private firestore = inject(Firestore)
  // users$!: Observable<UserProfile[]>;
  private _user!: User | null;

  constructor(private auth: Auth, private store: Store<AppState>) { }

  get user(){
    return this._user;
  }

  initAuthListener() {
    authState(this.auth).subscribe( (fireUser) => {
      if (fireUser) {
        const userRef = doc(this.firestore, "user", fireUser.uid);
        docData(userRef).subscribe((user)=>{
          const userTemp = user as User;
          this._user = userTemp
          this.store.dispatch(authActions.setUser({ user: userTemp }));

        });


      } else {
        this._user = null
        this.store.dispatch(authActions.unSetUser())
        this.store.dispatch(ieActions.unSetItems())
      }
    })
  }

  createUser(name: string, email: string, password: string): Promise<UserCredential | any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async ({ user }) => {
        const newUser: User = {
          uid: user.uid,
          email: email,
          name: name
        }
        const refUser = doc(this.firestore, 'user', user.uid)
        await setDoc(refUser, newUser)
        return newUser
      }).catch(err => err)
  }

  loginUser(email: string, password: string): Promise<UserCredential | any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(credentials => credentials).catch(err => err)
  }

  logout(): Promise<void> {
    return this.auth.signOut()
  }

  isAuth() {
    return authState(this.auth).pipe(
      map(fireUser => fireUser != null ? true : false)
    )
  }



}

export interface UserProfile {
  username: string;
}