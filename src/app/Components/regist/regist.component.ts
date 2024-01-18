import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from '../../Services/auth.service';
import { Auth } from '@angular/fire/auth';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-regist',
  standalone: true,
  providers: [AuthService],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AngularFireAuthModule,
    AngularFireModule,
  ],
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.css',
})
export class RegistComponent {
  private auth: Auth = inject(Auth);

  email: string = '';
  password: string = '';
  name = '';
  conPass = '';
  show_hide = 'password';
  icon: string = 'bi bi-eye-slash showHidePw';
  //container="container";

  // private userAuth:AuthService
  originalText = {
    Registration: 'Registration',
    Incorrect: 'Incorrect Email or Password check your input and try again !',
    Enteryourname: 'Enter your name',
    Validinput: 'Valid input',
    NotValid: '*Not Valid input-length must > 2',
    required: '*required',
    youremail: 'Enter your email',
    password: 'Create a password',
    passwordcharacter: ' password character length must be > 7 ',
    Notmatch: ' *Not match to password yet!',
    Iaccepted: 'I accepted all terms and conditions',
    Signup: ' Signup',
    Already: 'Already a member?',
    LoginNow: 'Login Now',
    Confirm: 'Confirm a password',
  };

  translatedText = {
    Registration: 'تسجيل',
    Incorrect:
      'البريد الإلكتروني أو كلمة المرور غير صحيحة، تحقق من إدخالك وحاول مرة أخرى!',
    Enteryourname: 'أدخل أسمك',
    Validinput: 'إدخال صالح',
    NotValid: 'ادخال الأسم يجب ان يكون اطول من حرفين',
    required: 'مطلوب*',
    youremail: 'أدخل بريدك الإلكتروني',
    password: 'انشئ كلمة سر',
    passwordcharacter: 'عدد حروف كلمة السر ينبغي ان تكون اطول من سبعه حروف',
    Notmatch: 'لا يتطابق مع كلمة المرور',
    Iaccepted: 'انا أوافق علي كل الشروط',
    Signup: 'إنشاء حساب',
    Already: 'عضو بالفعل',
    LoginNow: 'سجل دخول الان',
    Confirm: 'تأكيد كلمة المرور',
  };

  isTranslated = false;
  constructor(
    private rout: Router,
    public User: AuthService,
    private translationService: TranslationService
  ) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
    });
  }

  // registeration
  /*
  async register_config(){

    if(this.validate.valid && this.passwordconfirm){

      //const auth = getAuth();
     await createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          this.name='';
          this.email = '';
          this.password = '';
          this.conPass='';
          alert(user.email + ' successfully registered ');
          this.rout.navigate(['/login']);
          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(`something went wrong${error.message}`)
          this.rout.navigate(['/register'])
          // console.log("*********************")
          // console.log(errorMessage)
          // ..
        });

      }
      else{console.log("error");}
}
*/
  //second method

  register_config() {
    if (this.validate.valid && this.passwordconfirm) {
      this.User.register(this.email, this.password);
    } else {
      console.log('error');
    }
  }

  //how and hide password
  showHidePw() {
    if (this.show_hide == 'password') {
      this.show_hide = 'text';
      this.icon = 'bi bi-eye showHidePw';
    } else {
      this.show_hide = 'password';
      this.icon = 'bi bi-eye-slash showHidePw';
    }
  }

  //groupformsValdation

  validate = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    userEmail: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    userPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    passconfirm: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    checkbox: new FormControl(null, [Validators.required]),
  });

  //check vlidation
  get nameValid() {
    return this.validate.controls.userName.valid;
  }
  get passValid() {
    return this.validate.controls.userPassword.valid;
  }
  get emailValid() {
    return this.validate.controls.userEmail.valid;
  }
  get passwordconfirm() {
    // return this.validate.controls.passconfirm.valid && this.R_userPass==this.RC_userPass
    return (
      this.validate.controls.passconfirm.valid &&
      this.validate.controls.userPassword.value ==
        this.validate.controls.passconfirm.value
    );
  }

  get nameValue() {
    return this.validate.controls.userName.value;
  }

  get emailValue() {
    return this.validate.controls.userEmail.value;
  }
  get passValue() {
    return this.validate.controls.userPassword.value;
  }

  get passConfigValue() {
    return this.validate.controls.passconfirm.value;
  }
}
