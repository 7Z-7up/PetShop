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
    Aboutus :'Aboutus',
    HelpSupport  :'Help and Support',
    Investors:'Investors',
    Terms:'Terms',
    PrivacyandPolicy:'Privacy and Policy',
    CookieSettings:'Cookie Settings',
    PaymentMethod:'Payment Method',    
    Home:'Home',   
    shop:'shop',   
    About:'About',  
    Contact:'Contact',
    contactus: 'Contact Us',
    placeholder:'Type here to search',
    Getthefreshest :'Get the freshest'   ,
    News  :'News',
    Subscribe :'Subscribe',   
    BusinessPartners: 'Business Partners',
    NutramaxLaboratories:  'Nutramax Laboratories',
    NaturVet :'NaturVet',
    ZestyPaws :'Zesty Paws',
    ArkNaturals: 'Ark Naturals',
    WellnessCORE:  'Wellness CORE'        ,
    HillsScienceDiet:   'Hills Science Diet ' ,
    Copyright :'Copyright',
    Allrightsreseved: 'All rights reseved',
    Paragraph:'we are a pet shop online and we aim to offer our customers a variety of the latest Pet Products online. supplying you with high quality yet budget-friendly products. We offer all of this while providing excellent customer service and friendly support.'
  };

  translatedText = {
    Aboutus :        ' معلومات عنا ',
    HelpSupport  :   '   المساعدة والدعم ',
    Investors:       '   المستثمرين  ' ,
    Terms:           '    شروط   ',
    PrivacyandPolicy:' سياسة الخصوصية ',
    CookieSettings:  '    إعدادات ملفات تعريف الارتباط  ',
    PaymentMethod:   '      طريقة الدفع او السداد    ',    
    Home:       'الرئيسية',   
    shop:       'المتجر ',   
    About:      ' حول ',  
    Contact:   ' تواصل معنا ',
    contactus: '  تواصل معنا ' ,
    placeholder:'أضغط هنا للبحث',

    Getthefreshest :'ترقية للأحدث'   ,
    News  :'الأخبار',
    Subscribe :'إشتراك',   
    BusinessPartners: 'شركاء العمل',
    NutramaxLaboratories:  'معامل نيوتراماكس',
    NaturVet :'الطبيعة البيطرية',
    ZestyPaws :'زيستي باو',
    ArkNaturals: 'ارك ناتشورالز',
    WellnessCORE:  'العافية الأساسية'        ,
    HillsScienceDiet:   'حمية هيل العلمية ' ,
    Copyright :'حقوق النشر',
    Allrightsreseved: 'كل الحقوق محفوظة',
    Paragraph:' نحن متجر للحيوانات الأليفة عبر الإنترنت ونهدف إلي أن نقدم لعملائنا مجموعة متنوعة من المنتجات , أحدث منتجات الحيوانات الأليفة علي الإنترنت , تزويدك بجودة عالية حتي الان منتجات صديقية للميزانية , نحن نقدم كل هذا مع تقديم ممتاز خدمة العملاء والدعم الودي ..'
  
  }
  isTranslated = false;

  constructor(private translationService: TranslationService) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
      let footer = document.getElementById('footer');
      if (footer) footer.style.direction = this.isTranslated ? 'rtl' : 'ltr';
    });
  }
}
