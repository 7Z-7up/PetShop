import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-ahmedalaa',
  standalone: true,
  imports: [],
  templateUrl: './ahmedalaa.component.html',
  styleUrl: './ahmedalaa.component.css'
})
export class AhmedalaaComponent {
  originalText = {
    paragraph: 'ahmedalaa ',
    kareem:'kareem'
  };

  translatedText = {
    kareem:'كريم',
    paragraph: 'أحمد علاء'
  };

  isTranslated = false;

  constructor(private translationService: TranslationService) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
    });
  }
}
