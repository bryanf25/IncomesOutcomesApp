import { Injectable } from '@angular/core';
import {
  Auth, authState, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential
} from '@angular/fire/auth';
import { collectionData, Firestore, onSnapshot } from '@angular/fire/firestore';

import { map, Observable } from 'rxjs'
import { User } from '../models/user.model';
import { addDoc, doc, getDoc, setDoc, } from 'firebase/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions'
import { AppState } from '../app.reducer';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  users$!: Observable<UserProfile[]>;


  constructor(private auth: Auth, private firestore: Firestore, private store: Store<AppState>) { }


  initAuthListener() {
    authState(this.auth).subscribe(async (fireUser) => {
      if (fireUser) {
        const userRef = doc(this.firestore, "user", fireUser.uid);
        const userSnap = await getDoc(userRef);
        const user = userSnap.data() as User;

        this.store.dispatch(authActions.setUser({ user }));

      } else {
        this.store.dispatch(authActions.unSetUser())
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