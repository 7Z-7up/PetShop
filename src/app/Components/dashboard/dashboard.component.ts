import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Helpers/products';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageService } from '../../Services/image.service';
import { TranslationService } from '../../Services/translation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ],
  providers: [ProductService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  files: File[] = [];
  onSelect(e: any) {
    this.files.push(...e.addedFiles);
  }
  onRemove(r: any) {
    this.files.splice(this.files.indexOf(r, 1));
  }

  openModal() {
    const myModal = document.getElementById('statusSuccessModal');
    if (myModal) myModal.style.display = 'block';
  }

  closeModal() {
    const myModal = document.getElementById('statusSuccessModal');
    if (myModal) myModal.style.display = 'none';
  }

  uploadfiles() {
    if (!this.files[0]) {
      alert('No file selected');
    } else {
      let file_data = this.files[0];
      let data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'cmbpis3g');
      data.append('cloud_name', 'dmdg4vamg');
      this.images.uploadimage(data).subscribe({
        next: (data: any) => (this.addedProduct.image = data.secure_url),
        complete: () => {
          this.Products.push(this.addedProduct);
          this.Products.sort(
            (product1: any, product2: any) => product1.id - product2.id
          );
          this.myService.updateSupplements(this.Products).subscribe({
            next: () => console.log('product added!'),
            error: () => console.log('Error Adding the product'),
            complete: () => {
              this.openModal();
              this.product.reset();
              this.files = [];
              this.closebutton.nativeElement.click();
            },
          });
        },
      });
    }
  }

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebuttonupdate') closebuttonupdate: any;

  product = new FormGroup({
    name: new FormControl(null, Validators.required),
    id: new FormControl(null, [Validators.required, Validators.min(1)]),
    quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    seller: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    // image: new FormControl(null, Validators.required),
    description: new FormControl(null),
    price: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  updatedProduct = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    id: new FormControl({ value: 0, disabled: true }),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    seller: new FormControl('', [Validators.required, Validators.minLength(4)]),
    categories: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  editedProduct: Product = {};
  Products: Product[] = [];
  productIndex: number = 0;
  addedProduct: Product = {};

  originalText = {
    a1: 'Dashboard ',
    a2: '+ Add',
    a3: 'Show:',
    a4: 'Add Product',
    a5: 'Product Name',
    a6: 'Product ID',
    a7: 'ID Already existed!',
    a8: 'Quantity',
    a9: 'Price',
    a10: 'Product Description',
    a11: 'Seller Name',
    a12: 'Category',
    a13: 'cat',
    a14: 'dog',
    a15: 'rodents',
    a16: 'bird',
    a17: 'fish',
    a18: 'Product Image',
    a19: 'Drag And Drop!',
    a20: 'Add Product',
    a21: 'Update Product',
    a22: 'Product Name',
    a23: 'Product ID ',
    a24: 'Quantity',
    a25: 'Price',
    a26: 'Product Description',
    a27: 'Seller Name',
    a28: 'Category',
    a29: 'cat',
    a30: 'dog',
    a31: 'rodents',
    a32: 'bird',
    a33: 'fish',
    a34: 'Product Image',
    a35: 'Close',
    a36: 'Apply Changes',
    a37: 'ID',
    a38: 'Image',
    a39: 'Name',
    a40: 'Price',
    a41: 'Quantity',
    a42: 'Reviews',
    a43: 'Category',
    a44: 'Seller',
    a45: 'Remove',
    a46: 'Edit',
    a47: 'EGP',
    a48: 'Product Name',
    a49: 'Product ID',
    a50: 'Quantity',
    a51: 'Price',
    a52: 'Product Description',
    a53: 'Seller Name',
  };

  translatedText = {
    a1: 'لوحة التحكم',
    a2: '+ إضافة',
    a3: 'عرض',
    a4: 'أضف منتح ',
    a5: 'أسم المنتج',
    a6: 'معرف المنتج',
    a7: 'معرف المنتج موجود بالفعل !',
    a8: 'الكمية',
    a9: 'السعر',
    a10: 'وصف المنتج',
    a11: 'إسم التاجر',
    a12: 'فئة',
    a13: 'قطة',
    a14: 'كلب',
    a15: 'قوارض',
    a16: 'طائر',
    a17: 'سمكة',
    a18: 'صورة المنتج',
    a19: 'سحب وإسقاط!',
    a20: 'أضف منتج',
    a21: 'تحديث المنتج',
    a22: 'أسم المنتج',
    a23: 'معرف المنتج',
    a24: 'الكمية',
    a25: 'السعر',
    a26: 'وصف المنتج',
    a27: 'إسم التاجر',
    a28: 'فئة',
    a29: 'قطة',
    a30: 'كلب',
    a31: 'قوارض',
    a32: 'طائر',
    a33: 'سمكة',
    a34: 'صورة المنتج',
    a35: 'غلق',
    a36: 'تطبيق التغيير',
    a37: 'معرف',
    a38: 'صورة',
    a39: 'إسم',
    a40: 'سعر',
    a41: 'كمية',
    a42: 'التعليقات',
    a43: 'فئة',
    a44: 'بائع ',
    a45: 'مسح',
    a46: 'تعديل',
    a47: 'ج.م',
    a48: 'اسم المنتج',
    a49: 'معرف المنتج',
    a50: 'الكمية',
    a51: 'السعر',
    a52: 'وصف المنتج',
    a53: 'إسم التاجر',
  };
  isTranslated = false;

  constructor(
    private myService: ProductService,
    private images: ImageService,
    private translationService: TranslationService
  ) {
    this.translationService.isTranslated$.subscribe((isTranslated) => {
      this.isTranslated = isTranslated;
    });
  }

  ngOnInit(): void {
    this.myService.getAllSupplements().subscribe({
      next: (data) => {
        this.Products = this.Products.concat(data);
      },
      error: () => console.log('Error getting the data!'),
    });
  }

  deleteProduct(id: any) {
    if (confirm('Are you sure you wanna delete this product?')) {
      this.Products = this.Products.filter((element) => element.id != id);

      this.myService.deleteSupplement(this.Products).subscribe({
        next: () => console.log('Deleted'),
        error: () => console.log('Could not delete'),
      });
    }
  }

  page = 1;
  total: number = this.Products.length;
  itemsInPage: any = 12;
  changeValue(val: number) {
    this.itemsInPage = val;
    this.page = 1;
    this.total = this.Products.length;
  }

  changePage(event: any) {
    this.page = event;
    this.total = this.Products.length;
  }
  save() {
    if (this.Products.find((product) => product.id == this.product.value.id)) {
      document.getElementById('idExisted')!.style.display = 'inline';
      console.log('existed');
    } else {
      document.getElementById('idExisted')!.style.display = 'none';
      this.addedProduct = {
        id: this.product.value.id ?? 0,
        name: this.product.value.name ?? '',
        quantity: this.product.value.quantity ?? 0,
        price: this.product.value.price ?? 0,
        image: '',
        description: this.product.value.description ?? '',
        rating: 0,
        reviews: 0,
        categories: this.product.value.category ?? '',
        seller: this.product.value.seller ?? '',
      };
      this.uploadfiles();
    }
  }

  updateProduct(id?: number) {
    this.productIndex = this.Products.findIndex((product) => product.id == id);
    this.editedProduct = this.Products[this.productIndex];

    this.updatedProduct.patchValue(this.editedProduct);
  }
  update() {
    this.editedProduct.name = this.updatedProduct.value.name ?? '';
    this.editedProduct.price = this.updatedProduct.value.price ?? 0;
    this.editedProduct.quantity = this.updatedProduct.value.quantity ?? 0;
    this.editedProduct.categories = this.updatedProduct.value.categories ?? '';
    this.editedProduct.seller = this.updatedProduct.value.seller ?? '';
    this.editedProduct.description =
      this.updatedProduct.value.description ?? '';
    this.editedProduct.image = this.updatedProduct.value.image ?? '';

    this.Products[this.productIndex] = this.editedProduct;

    this.myService.updateSupplements(this.Products).subscribe({
      next: () => console.log('product updated!'),
      error: () => console.log('Error Adding the product'),
      complete: () => {
        this.updatedProduct.reset();
        this.closebuttonupdate.nativeElement.click();
      },
    });
  }
}
