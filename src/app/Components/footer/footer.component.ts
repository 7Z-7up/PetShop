import { Component } from '@angular/core';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  originalText = {
    paragraph: 'ahmedalaa ',
    kareem: 'kareem',
    contactus: 'Contact Us',
  };

  translatedText = {
    contactus: 'تواصل معنا',
    kareem: 'كريم',
    paragraph: 'أحمد علاء',
  };

  isTranslated = false;

  constructor(private translationService: TranslationService) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
    });
  }
}
