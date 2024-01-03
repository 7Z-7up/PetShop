// translation.service.ts
import { transition } from '@angular/animations';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private isTranslatedSubject = new BehaviorSubject<boolean>(false);
  isTranslated$ = this.isTranslatedSubject.asObservable();

  toggleTranslation() {
    this.isTranslatedSubject.next(!this.isTranslatedSubject.value);
  }
}

