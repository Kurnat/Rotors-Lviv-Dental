import { ICategory, ICategoryResponse, ICategorySingleRes } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = '/api/v1/categories/';

  constructor(
            private http: HttpClient,
  ) { }

  // Get All Categories
  public getAllCategories(): Observable<ICategoryResponse> {
    return this.http.get<ICategoryResponse>(this.url);
  }

  // Create New Category
  public createCategory(category: ICategory): Observable<ICategorySingleRes> {
    return this.http.post<ICategorySingleRes>(this.url, category);
  }

  // Update Category
  public updeteCategory(category: ICategory): Observable<ICategorySingleRes> {
    const id = category._id;
    delete category._id;
    return this.http.put<ICategorySingleRes>(this.url + id, category);
  }

  // Delete Category
  public deleteCategory(category: ICategory): Observable<ICategorySingleRes> {
    return this.http.delete<ICategorySingleRes>(this.url + category._id);
  }
}
