import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from '../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Popover } from 'bootstrap'
   

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [FormsModule,RouterModule,ReactiveFormsModule,AngularFireAuthModule,AngularFireModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private  auth:Auth=inject(Auth);
  
  email:string ="";
  password:string ="";
  show_hide="password";
  icon:string = "bi bi-eye-slash showHidePw"
  container="container"
 error_message: string = "";
 error: string = "";
 isErr=this.User.ckeckError();

  
  
  constructor(private rout:Router,public User:AuthService){}
 
  // 
  ngOnInit() {
    //Select all the html button elements have attribute data-bs-toggle="popover" will apply popver toggle event
    Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
    .forEach(popoverNode => new Popover(popoverNode))
    
  }

  //login
/*
  async login_config(){

  if(this.emailValid && this.passValid){
  //const auth = getAuth();
    await signInWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      this.email="";
      this.password="";
      this.rout.navigate(['/home']);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`something went wrong${errorMessage}`)
     
    });}
    
    }
*/

//second method

login_config(){
  if(this.validate){
  this.User.login( this.email, this.password);
  this.User.ckeckError();
  }else{console.log("error");}
}





     //how and hide password
  showHidePw(){
    if(this.show_hide == "password"){
      this.show_hide = "text";
      this.icon="bi bi-eye showHidePw";
    }
    else{
      this.show_hide = "password";
      this.icon="bi bi-eye-slash showHidePw";
    }
  }
  

  validate=new FormGroup({
   
    userEmail:new FormControl(null, [Validators.required,Validators.maxLength(50),Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    userPassword:new FormControl(null, [ Validators.required,Validators.minLength(8), Validators.maxLength(30)])
  }); 
  

  //check vlidation
  get passValid(){
    return this.validate.controls.userPassword.valid
  }
  get emailValid(){
    return this.validate.controls.userEmail.valid
  }
  
  
  // get values
  get passValue(){
    return this.validate.controls.userPassword.value
  }
  get emailValue(){
    return this.validate.controls.userEmail.value
  }


}
