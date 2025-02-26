import { Injectable } from '@angular/core';
import {
  Auth, authState, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { map } from 'rxjs'
import { User } from '../models/user.model';
import { addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) { }


  initAuthListener() {
    authState(this.auth).subscribe((fireUser) => {
      console.log(fireUser)
    })

  }

  createUser(name: string, email: string, password: string): Promise<UserCredential | any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        const newUser: User =  {
          uid: user.uid,
          email: email,
          name : name
        }
        const refUser = collection(this.firestore,'user')
        return addDoc(refUser,newUser)
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
