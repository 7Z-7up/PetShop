import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
//import { Auth, getAuth, signOut } from 'firebase/auth';
//import {firebaseConfig} from '../app.config'
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth:Auth=inject(Auth);
  constructor( private fireauth:AngularFireAuth,private rout:Router) {  }


// async register(){
//   const response = await createUserWithEmailAndPassword(
//     this.auth,'ahmed@gmail.com','ahmed123456789'
//   );
//   console.log(response);
// }
// async login(){
//   const response = await signInWithEmailAndPassword(
//     this.auth,'ahmed@gmail.com','ahmed123456789'
//   );
//   console.log(response);
// }


}
// const app = initializeApp(firebaseConfig); 
//   const auth = getAuth(app);
