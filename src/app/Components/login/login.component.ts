import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from '../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Popover } from 'bootstrap';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private auth: Auth = inject(Auth);

  email: string = '';
  password: string = '';
  show_hide = 'password';
  icon: string = 'bi bi-eye-slash showHidePw';
  container = 'container';
  error_message: string = '';
  error: string = '';
  isErr = this.User.ckeckError();

  originalText = {
    a1: ' Login',
    a2: ' The Email or Password that you have entered does not match any account....may you need to register first or check your input and try again',
    a3: 'Enter your email',
    a4: 'Enter your password',
    a5: 'Remember me',
    a6: 'Forgot password ?',
    a7: '  LogIn',
    a8: 'required*',
    a9: 'Not a member?',
    a10: 'Signup Now',
  };

  translatedText = {
    a1: 'تسجيل الدخول',
    a2: 'البريد الإلكتروني أو كلمة المرور التي أدخلتها لا تتطابق مع أي حساب.... قد تحتاج إلى التسجيل أولاً أو التحقق من إدخالاتك والمحاولة مرة أخرى',
    a3: 'أدخل إيميلك',
    a4: 'أدخل كلمة المرور',
    a5: 'تذكرني',
    a6: 'نسيت كلمة المرور ؟',
    a7: 'تسجيل الدخول',
    a8: 'مطلوب*',
    a9: 'لست عضو ؟',
    a10: 'أفتح حساب الأن',
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

  ngOnInit() {
    //Select all the html button elements have attribute data-bs-toggle="popover" will apply popver toggle event
    Array.from(
      document.querySelectorAll('button[data-bs-toggle="popover"]')
    ).forEach((popoverNode) => new Popover(popoverNode));
  }

  //login

  login_config() {
    if (this.validate) {
      this.User.login(this.email, this.password);
      this.User.ckeckError();
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

  validate = new FormGroup({
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
  });

  //check vlidation
  get passValid() {
    return this.validate.controls.userPassword.valid;
  }
  get emailValid() {
    return this.validate.controls.userEmail.valid;
  }

  // get values
  get passValue() {
    return this.validate.controls.userPassword.value;
  }
  get emailValue() {
    return this.validate.controls.userEmail.value;
  }
}
