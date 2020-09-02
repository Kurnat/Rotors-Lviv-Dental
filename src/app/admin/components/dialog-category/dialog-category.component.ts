import { ICategory, ICategoryResult } from '../../../shared/interfaces';
import { CategoryService } from './../../../shared/services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { IDiologCategoryData } from 'src/app/shared/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateNewProductService } from '../../services/create-new-product.service';
import { CreateNewCategoryService } from '../../services/create-new-category.service';


@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {
  public form: FormGroup;

  constructor(
            private fb: FormBuilder,
            @Inject(MAT_DIALOG_DATA) public data: IDiologCategoryData,
            private categoryService: CategoryService,
            private createNewCategoryService: CreateNewCategoryService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // Form inicialization
  private initForm(): void {
    console.log(this.data.category);
    this.form = this.fb.group({
      ['ua']: this.data.category.ua || '',
      ['en']: this.data.category.en || '',
      ['_id']: this.data.category._id
    });
  }

  public createCategory(): void {
    console.log('HELLO');

    this.createNewCategoryService.change({isNew: true, category: this.form.value});
  }
}
