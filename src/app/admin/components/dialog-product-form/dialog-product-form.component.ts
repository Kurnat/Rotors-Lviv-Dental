import { ICategoryResponse } from '../../../shared/interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FileUploadService } from '../../../shared/services/file-upload.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { IDialogData, ICategory} from '../../../shared/interfaces';
import { CommonDialogServiceService } from '../../services/open-dialog.service';
import { DialogConfirmDataComponent } from '../dialog-confirm-data/dialog-confirm-data.component';
import { DialogImagesComponent } from '../dialog-images/dialog-images.component';
import { Product } from 'src/app/shared/classes/Product';

@Component({
  selector: 'app-dialog-product-form',
  templateUrl: './dialog-product-form.component.html',
  styleUrls: ['./dialog-product-form.component.scss'],
})
export class DialogProductFormComponent implements OnInit, OnDestroy {
  private madal$: Subscription;
  private dialogImgSub$: Subscription;
  private imgServie$: Subscription;
  private categorySub$: Subscription;

  private img: File;

  public categories: ICategory[];
  public imgUrl: string | ArrayBuffer = '../../../../assets/images/icon-no-image.svg'; // default url for modal window to add new product
  public result: any = false; // if confirm modal was confirmed close this modal too
  public form: FormGroup;
  public maxDate = Date.now();
  @ViewChild('file') file: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogService: CommonDialogServiceService,
    private fileUploadService: FileUploadService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.initalFormBuilder();
    this.getCategories();
  }

  ngOnDestroy(): void {
    if (this.madal$) {
      this.madal$.unsubscribe();
    }
    if (this.dialogImgSub$) {
      this.dialogImgSub$.unsubscribe();
    }
    if (this.imgServie$) {
      this.imgServie$.unsubscribe();
    }
    if (this.categorySub$) {
      this.categorySub$.unsubscribe();
    }
  }

  // Forms data for edit or add new product
  private initalFormBuilder(): void {
    this.form = this.fb.group({
      ['producer']: [this.data?.product?.producer],
      ['model']: [this.data?.product?.model],
      ['material']: [this.data?.product?.material],
      ['price']: [this.data?.product?.price],
      ['size']: [this.data?.product?.size],
      ['date']: [this.data?.product?.date || new Date(Date.now())],
      ['categories']: [this.data?.product?.categories],
      ['ourSeriusNumber']: [this.data?.product?.ourSeriusNumber],
      ['seriusNumber']: [this.data?.product?.seriusNumber],
      ['img']: [this.data?.product?.img],
      ['_id']: [this.data?.product?._id]
    });

    if (this.data.product.img) {
      this.imgUrl = this.data.product.img;
    } else {
      // default url for modal window to add new product
      this.imgUrl = '../../../../assets/images/icon-no-image.svg';
    }
  }

  private getCategories(): void {
    this.categorySub$ = this.categoryService.getAllCategories()
      .subscribe((res: ICategoryResponse) => {
        console.log(res);
        this.categories = res.data;
    });
  }

  public addImage() {
    this.file.nativeElement.click();
  }

  // Input file for Image was changed
  public fileChange(event) {
    const reader = new FileReader();

    reader.onload = () => {
      this.imgUrl = reader.result; // Show image on client side before upload on server
    };
    reader.readAsDataURL(event.target.files[0]);

    const file = event.target.files[0];
    this.img = file;

    this.imgServie$ = this.fileUploadService
      .createImage(this.img)
      .subscribe(
        () => {},
        err => console.log(err)
      );
  }

  public openConfirmModal(): void {

    const categoryUA = this.categories.find(item => item.en === this.form.get('categories').value).ua;

    const product = new Product({
      ...this.form.value,
      count: 1,
      categoryUA
    });

    this.dialogService
      .openDialog(DialogConfirmDataComponent, {
        data: {product, isNewProduct: this.data.isNewProduct}});
  }

  public openImagesDialog(): void {
    this.dialogImgSub$ = this.dialogService
      .openDialog(DialogImagesComponent)
      .afterClosed()
      .subscribe((imgUrl: string) => {
        // chech image for product
        if (imgUrl) {
        this.form.patchValue({img: imgUrl});
        this.imgUrl = imgUrl;
      }
      });
  }
}
