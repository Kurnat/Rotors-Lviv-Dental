import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // urlUpload = '/api/v1/uploads/';
  // /api/v1/products/:id/photo
  urlFiles = '/api/v1/photos/';

  constructor(private http: HttpClient) {}

  createImage(file: File): Observable<any> {
    console.log(file);
    const fd = new FormData();
    fd.append('img', file, file.name);

    return this.http.post(this.urlFiles, fd);
  }
// 5f2c82e797a562bb48f2e197
  getImages(): Observable<any> {
    return this.http.get(this.urlFiles);
  }

  getOneImage(filename): Observable<any> {
    return this.http.get(this.urlFiles + filename);
  }

  deleteImage(fileName: string): Observable<any> {
    return this.http.delete(this.urlFiles + fileName);
  }
}
