import { IProduct, IOrderRes } from 'src/app/shared/interfaces';

// Chek if object has IProduct interface
export const isIProductChecker = (object: any): object is IProduct => 'seriusNumber' in object;

export const isIOrderReschecker = (object: any): object is IOrderRes => 'count' in object && 'product' in object;
