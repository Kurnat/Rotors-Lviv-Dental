import { IProduct, IDialogOtion, IProductResponse } from '../../../shared/interfaces';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateNewProductService } from '../../services/create-new-product.service';
import { EditExistedProductService } from '../../services/edit-existed-product.service';

@Component({
  selector: 'app-dialog-confirm-data',
  templateUrl: './dialog-confirm-data.component.html',
  styleUrls: ['./dialog-confirm-data.component.scss']
})
export class DialogConfirmDataComponent implements OnInit {
  public defaultImage = '../../../../assets/images/icon-no-image.svg';
  public product: IProduct;

  constructor(
            private dialog: MatDialog,
            private createNewProductService: CreateNewProductService,
            private editExistedProductService: EditExistedProductService,
            @Inject(MAT_DIALOG_DATA) public data: IDialogOtion,
            ) { }

  ngOnInit(): void {
    this.data.data.product.date = new Date(this.data.data.product.date);

    if (!this.data.data.product.img) {
      this.data.data.product.img = this.defaultImage;
    }
    this.product = this.data.data.product;
  }

  public confirmProduct(): void {
    if (this.data.data.isNewProduct === 'isNewProduct') {
      this.data.data.product.categoryUA = this.data.data.product.categoryUA.toLowerCase();
      console.log(this.data.data.product);
      this.createNewProductService.postDataChanges(this.data); // push changes to admin-table-component


    } else if (this.data.data.isNewProduct === 'isEdit') {
      this.editExistedProductService.changeProduct(this.product);
    }

    this.dialog.closeAll(); // And close all dialogs
  }
}


