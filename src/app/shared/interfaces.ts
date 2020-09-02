import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// Product
export interface IProduct {
  producer?: string;
  model?: string;
  material?: string;
  size?: string;
  price: number;
  date: Date;
  categories?: string;
  categoryUA?: string;
  ourSeriusNumber?: string;
  seriusNumber?: string;
  img?: string;
  _id?: string;
}

export interface IProductsResponse {
  success: boolean;
  isEdist?: boolean;
  data?: IProduct[];
  message?: string;
}

export interface IProductResponse {
  success: boolean;
  data?: IProduct;
  message?: string;
}



export interface IOrderSubjectData {
  product: IProduct;
  action: string;
}

export interface IDialogData {
  isNewProduct: string;
  product: IProduct;
  width?: string;
  option?: object;
}

export interface IDialogOtion {
  data: IDialogData;
}

export interface IOrder {
  _id?: string;
  date?: Date;
  orderNumber: string;
  userName: string;
  email: string;
  products: IProduct[];
  price: number;
  count?: number;
}

export interface IOrderRes {
  _id?: string;
  count: number;
  product: IProduct | string;
}

export interface IUserOrder {
  _id?: string;
  userName: string;
  email: string;
  phone: string;
  products: IOrderRes[];
  orderNumber: number;
  sum?: number;
  date?: Date;
  count?: [];
}



export interface IResOrders {
 orders: IUserOrder[];
 success: boolean;
}

// Category

export interface ICategory {
  _id?: string;
  ua: string;
  en: string;
}

export interface ICategoryResponse {
  success: boolean;
  data?: ICategory[] ;
  message?: string;
}

export interface ICategorySingleRes {
  success: boolean;
  data?: ICategory;
  message?: string;
}

export interface IIsNewCategory{
  isNew: boolean;
  category: ICategory;
}

export interface IDiologCategoryData{
  isNewCategory: boolean;
  category: ICategory;
}

export interface ICategoryResult {
  isNew: boolean;
  category: ICategory;
}

export interface IErrorResponce  {
  error: {success: boolean, error: string} ;
  headers: HttpHeaders;
  message: string;
  name: 'HttpErrorResponse';
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
}
