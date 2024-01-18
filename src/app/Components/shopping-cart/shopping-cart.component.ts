import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartElementComponent } from '../cart-element/cart-element.component';
import { Product } from '../../Helpers/products';
import { ProductService } from '../../Services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../Helpers/users';
import { RouterLink } from '@angular/router';
import { CartServiceService } from '../../Services/cart.service';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CartElementComponent,
    HttpClientModule,
    RouterLink,
  ],
  providers: [ProductService],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  subTotalArr: { id: number; subTotal: string }[] = [];
  subTotal = 0;
  User!: any;
  product: Product = {};
  products: Product[] = [];
  // cartProduct: Product[]= []

  originalText = {
    ShoppingCart: 'Shopping Cart',
    Image: 'Image',
    ProductName: 'Product Name',
    Quantity: 'Quantity',
    UnitPrice: 'Unit Price',
    Total: 'Total',
    Terms: 'Terms & Conditions of Use:',
    policies:
      '  The privacy policies of PetShop explain how we treat your personal data and protect your privacy when using PetShop. You may need toprovide service providers with some of your personal information, such as your name and email address, for purposes of processing your transactions or providing you with content, as service providers agree to use this information in accordance with their privacy policies.',
    EGP: 'EGP',
    Sub: 'Sub-Total:',
    Vat: 'Vat (15%):',
    Checkout: 'Checkout',
  };

  translatedText = {
    ShoppingCart: 'عربة التسوق',
    Image: 'صورة',
    ProductName: 'أسم المنتج',
    Quantity: 'الكمية',
    UnitPrice: 'سعر الوحدة',
    Total: 'المجموع',
    Terms: 'شروط',
    policies:
      'توضح سياسات الخصوصية الخاصة بـ بيت شوب كيفية تعاملنا مع بياناتك الشخصية وحماية خصوصيتك عند استخدام بيت شوب. قد تحتاج إلى تزويد مقدمي الخدمة ببعض معلوماتك الشخصية، مثل اسمك وعنوان بريدك الإلكتروني، لأغراض معالجة معاملاتك أو تزويدك بالمحتوى، حيث يوافق مقدمو الخدمة على استخدام هذه المعلومات وفقًا لسياسات الخصوصية الخاصة بهم.',
    EGP: 'ج.م',
    Sub: 'المجموع الفرعي:',
    Vat: 'ضريبة القيمة المضافة (15%):',
    Checkout: 'الدفع',
  };

  isTranslated = false;
  constructor(
    private myProducts: ProductService,
    private cartService: CartServiceService,
    private translationService: TranslationService
  ) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
    });
    this.refreshTotal();
    // cartService.cartItems$.subscribe()
  }

  ngOnInit(): void {
    this.myProducts.getUser(1).subscribe({
      next: (userData) => {
        this.User = userData;
        for (const key in this.User) {
          this.User = this.User[key];
        }
        if (this.User.cart) {
          for (let i = 0; i < this.User.cart.length; i++) {
            this.myProducts.getSupplements(this.User.cart[i].id).subscribe({
              next: (productData: any) => {
                for (const key in productData) {
                  this.products.push(productData[key]);
                }
                if (!this.products) this.products = [];
              },
              error: () => console.log('Error!'),
            });
          }
        }
      },
      error: () => console.log('Error!'),
    });
  }
  getSubtotal(data: any) {
    this.subTotalArr[data.id] = data;
    this.refreshTotal();
  }

  refreshTotal() {
    this.subTotal = 0;
    this.subTotalArr.forEach((element) => {
      this.subTotal += +element.subTotal;
    });
  }
}
