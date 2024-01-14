import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
//import { initializeApp } from 'firebase/app';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private auth:Auth=inject(Auth);
  constructor( private rout:Router,private auth:Auth) {  }
  
 async login( email:string, password:string){
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.rout.navigate(['/home']);
        localStorage.setItem("user", user.email??"username")
        // console.log(user);
        // console.log(user.email);
        // console.log(this.flags);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`something went wrong${errorMessage}`)
        //this.rout.navigate(['/login']);
        // console.log(errorCode)
        // console.log("*********************")
        // console.log(errorMessage)
    
      });

}
 
getUser(){
  return localStorage.getItem('user');
}

async register( email: string, password: string){
   await createUserWithEmailAndPassword(this.auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      //this.flags={user:email.charAt(0)};
      alert(`${user.email} => registered successfully`);
      this.rout.navigate(['/login']);
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`something went wrong${errorMessage}`)
    
    });
  }

  async signout() {
    await signOut(this.auth).then(() => {
      localStorage.removeItem("user");
      alert(`Sign-out successful.`);
      
    }).catch((error) => {
      alert(`Sign-out failed , ${error.message}`);
     
    });
    
}


}
