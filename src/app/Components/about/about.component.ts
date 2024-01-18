import { Component } from '@angular/core';
import { TranslationService } from '../../Services/translation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  originalText = {
    a1: 'About Us',
    a2: 'We provide a wide range of high-quality pet supplies, services, solutions and expertise to enhance pet care by providing the best of the world is leading brands available.',
    a3: 'Our vision: Leadership and excellence in providing products and supplies that serve the animal world from all over the world.',
    a4: 'Our message: Providing all necessary services and care to home owners.',
    a5: 'Contact Us',
    a6: 'Our Future Goal',
    a7: 'We want to lead in innovation & Pets Supplements',
    a8: ' We works on UI/UX and functionality as well so that a plugins comes with proper stucture & stunning looks which suits to your web app & website.',
    a9: ' We take a small toolkit here and ride it well so that it is fit for your use. One who performs well and looks even better.',
    a10: 'Here we are trying to give you all kinds of technical content, whether it is related to designing or functionality. We are creating content on a lot of languages and will continue to make it free of cost even if you use it without any problem. Which is a very important thing.',
    a11: ' Here you can also share the content you create, if our technical team likes it, then we will also share it on our blog.',
    a12: 'In the end, I would say keep visiting our website and enjoy the quality content.',
  };

  translatedText = {
    a1: 'معلومات عنا',
    a2: 'نحن نقدم مجموعة واسعة من مستلزمات الحيوانات الأليفة والخدمات والحلول والخبرات عالية الجودة لتعزيز رعاية الحيوانات الأليفة من خلال توفير أفضل ما في العالم من العلامات التجارية الرائدة المتاحة',
    a3: 'رؤيتنا: الريادة والتميز في تقديم المنتجات والمستلزمات التي تخدم عالم الحيوان من جميع أنحاء العالم',
    a4: 'رسالتنا: تقديم كافة الخدمات والرعاية اللازمة لأصحاب المنازل',
    a5: 'تواصل معنا ',
    a6: 'هدفنا المستقبلي',
    a7: 'نريد الريادة في مجال الابتكار & مكملات الحيوانات الأليفة',
    a8: 'نحن نعمل على واجهة المستخدم/تجربة المستخدم والوظائف أيضًا بحيث تأتي المكونات الإضافية بهيكل مناسب ومظهر مذهل يناسب تطبيق الويب وموقع الويب الخاص بك',
    a9: 'نحن نأخذ مجموعة أدوات صغيرة هنا ونركبها جيدًا حتى تكون مناسبة لاستخدامك الشخصي الذي يؤدي بشكل جيد ويبدو أفضل  ',
    a10: 'نحاول هنا أن نقدم لك جميع أنواع المحتوى التقني، سواء كان متعلقًا بالتصميم أو الوظيفة, نحن نقوم بإنشاء محتوى بالعديد من اللغات وسنستمر في جعله مجانيًا حتى لو كنت تستخدمه دون أي مشكلة وهو أمر مهم للغاية  ',
    a11: 'هنا يمكنك أيضًا مشاركة المحتوى الذي تقوم بإنشائه، وإذا أعجب فريقنا الفني، فسنشاركه أيضًا على مدونتنا  ',
    a12: 'في النهاية، أود أن أقول استمر في زيارة موقعنا واستمتع بالمحتوى عالي الجودة  ',
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
