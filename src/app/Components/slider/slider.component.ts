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
    'assets/SliderImage/1.png',
    'assets/SliderImage/2.png',
    'assets/SliderImage/3.png',
    'assets/SliderImage/4.png',
    'assets/SliderImage/5.png',
  ];
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }
}
