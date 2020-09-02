import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit  {

  constructor(private router: ActivatedRoute, private productService: ProductService) { }

  @Input() product;
  @Input() isActive = true;
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      if (params.id) {
        this.productService.getOneById(params.id)
        .subscribe(dataResponse => console.log(dataResponse));
      }
    });
  }
}
