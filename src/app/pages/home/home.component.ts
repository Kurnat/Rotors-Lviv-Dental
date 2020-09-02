import { smoothScroll } from './../../shared/utils/scrolling.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  boxState = 'start';

  @ViewChild('products') products: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  scrollDown(event) {
    // this.products.nativeElement.scrollIntoView({behavior: 'smooth'});
    smoothScroll(event, this.products );
  }
}
