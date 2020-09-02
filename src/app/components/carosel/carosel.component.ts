import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgxGlideComponent } from 'ngx-glide';

@Component({
  selector: 'app-carosel',
  templateUrl: './carosel.component.html',
  styleUrls: ['./carosel.component.scss'],
})
export class CaroselComponent implements OnInit, AfterViewInit {
  // Get the component instance.
  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;

  play(): void {
    this.ngxGlide.play();
  }
  // tslint:disable-next-line:member-ordering
  ran = { direction: '>', steps: 0 };

  constructor() {}


  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.ngxGlide);
  }
}
