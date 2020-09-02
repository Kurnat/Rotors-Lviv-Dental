import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.scss']
})
export class UsersOrdersComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor() { }

  ngOnInit(): void {
  }

}
