import { IProduct } from '../interfaces';

export class Product implements IProduct {
  producer: string;
  model: string;
  img: string;
  material: string;
  price: number;
  size: string;
  date: Date;
  categories: string;
  ourSeriusNumber: string;
  seriusNumber: string;
  count: number;
  categoryUA: string;
  // tslint:disable-next-line:variable-name
  _id: string;

  constructor({
    producer,
    model,
    img,
    material,
    price,
    size,
    date,
    categories,
    ourSeriusNumber,
    seriusNumber,
    categoryUA,
    _id,
  }: IProduct) {
      this.producer = producer;
      this.model = model;
      this.img = img || '../../../../assets/images/icon-no-image.svg';
      this.material = material;
      this.price = price;
      this.size = size || '';
      this.date = date || new Date(Date.now());
      this.categories = categories || '';
      this.ourSeriusNumber = ourSeriusNumber || '';
      this.seriusNumber = seriusNumber || '';
      this.count = 1;
      this.categoryUA = categoryUA;
      this._id = _id;
  }
}
