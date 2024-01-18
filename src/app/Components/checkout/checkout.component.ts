import { Component } from '@angular/core';
import { CartHoverComponent } from '../cart-hover/cart-hover.component';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CartHoverComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  originalText = {
    a1: ' Billing Address',
    a2: 'Full Name',
    a3: 'Email',
    a4: 'Address',
    a5: 'City',
    a6: 'State',
    a7: 'Zip',
    a8: 'Payment',
    a9: 'Accepted Cards',
    a10: 'Name on Card',
    a11: 'Credit card number',
    a12: 'Exp Month',
    a13: 'Exp Year',
    a14: 'CVV',
    a15: 'Shipping address same as billing',
    a16: 'Continue to checkout',
    a17: 'Cart',
  };

  translatedText = {
    a1: 'عنوان وصول الفواتير',
    a2: 'الأسم بالكامل',
    a3: 'الإيميل',
    a4: 'العنوان',
    a5: 'المدينة',
    a6: 'ولاية',
    a7: '	الرمز البريدي',
    a8: 'الدفع',
    a9: 'البطاقات المقبولة',
    a10: 'الأسم علي البطاقة',
    a11: 'رقم بطاقة الإئتمان',
    a12: 'شهر الإنتهاء',
    a13: 'سنة الإنتهاء',
    a14: 'رمز التحقق',
    a15: 'عنوان الشحن كما موجود في الفاتورة',
    a16: 'تابع إلي الدفع',
    a17: 'السلة',
  };

  isTranslated = false;

  constructor(private translationService: TranslationService) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
    });
  }
}
