import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  originalText = {
    Getintouch: 'Get in touch',
    Name: 'Name',
    Email: 'Email',
    Subject: 'Subject',
    Message: 'Message',
    SendEmail: 'Send Email',
  };

  translatedText = {
    Getintouch: 'كن علي تواصل معنا',
    Name: 'الإسم',
    Email: 'البريد الإلكتروني',
    Subject: 'الموضوع',
    Message: 'الرسالة',
    SendEmail: 'أرسل البريد الإلكتروني',
  };

  isTranslated = false;

  constructor(private translationService: TranslationService) {}
  ngOnInit(): void {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
      let form = document.getElementById('form');
      if (form) form.style.direction = this.isTranslated ? 'rtl' : 'ltr';
    });
  }
}
