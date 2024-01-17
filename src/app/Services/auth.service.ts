import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private auth:Auth=inject(Auth);
  //errMessage:string="disappers"
  
  constructor( private rout:Router,private auth:Auth) {  }
  
 async login( email:string, password:string){
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.rout.navigate(['/home']);
        localStorage.setItem("user", user.email??"username")
        localStorage.removeItem("error");
        // console.log(user);
        // console.log(user.email);
        // console.log(this.flags);
        
      })
      .catch((error) => {
        this.ckeckError();
        localStorage.setItem("error", error.code)
        //alert(`something went wrong${errorMessage}`)
        //this.rout.navigate(['/login']);
        // console.log(errorCode)
        // console.log("*********************")
        // console.log(errorMessage)
    
      });

}


//registeration
async register( email: string, password: string){
   await createUserWithEmailAndPassword(this.auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`${user.email} => registered successfully`);
      localStorage.removeItem("error_regis");
      this.rout.navigate(['/login']);
      
    })
    .catch((error) => {
      localStorage.setItem("error_regis", error.code);
    
    });
  }


//login
  async signout() {
    await signOut(this.auth).then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("error");
      localStorage.removeItem("error_regis");
      alert(`Sign-out successful.`);
      
    }).catch((error) => {
      alert(`Sign-out failed , ${error.message}`);
     
    });
    
}





// check error at login
ckeckError(){
   return localStorage.getItem('error');
}
// check error at regist
register_error(){
  return localStorage.getItem('error_regis');
}
//check if user is logged in from local storage
getUser(){
  return localStorage.getItem('user');
}


}
