import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgbModule, CommonModule],
  providers: [NgbCarouselConfig],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  images = [
    'https://firebasestorage.googleapis.com/v0/b/petshop-c2ff5.appspot.com/o/Slider%2F1.png?alt=media&token=a493bc01-7e00-481d-9962-0752af9e665f',
    'https://firebasestorage.googleapis.com/v0/b/petshop-c2ff5.appspot.com/o/Slider%2F2.png?alt=media&token=13936332-4693-45ff-a0ce-d0b3a7322caf',
    'https://firebasestorage.googleapis.com/v0/b/petshop-c2ff5.appspot.com/o/Slider%2F3.png?alt=media&token=7f6b6cee-a73d-4d4e-89a3-5e4e6b872302',
    'https://firebasestorage.googleapis.com/v0/b/petshop-c2ff5.appspot.com/o/Slider%2F4.png?alt=media&token=d3f44e6c-8f46-40ae-b944-a7446b91d325',
    'https://firebasestorage.googleapis.com/v0/b/petshop-c2ff5.appspot.com/o/Slider%2F5.png?alt=media&token=0d6feb09-4526-4162-b982-aa0f91ad8671',
  ];
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }
}
