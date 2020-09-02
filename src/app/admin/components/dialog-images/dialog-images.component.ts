import { DialogConfirmSolutionComponent } from './../../../components/popups/dialog-confirm-solution/dialog-confirm-solution.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-images',
  templateUrl: './dialog-images.component.html',
  styleUrls: ['./dialog-images.component.scss']
})
export class DialogImagesComponent implements OnInit {

  @ViewChild('file') file: ElementRef;

  images: Array<any>;
  constructor(
              private fileUploadService: FileUploadService,
              private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fileUploadService.getImages().subscribe(response => {
       this.images = response.data;
       console.log(this.images);
      });

  }

  addImage(): void {
    this.file.nativeElement.click();
  }

  fileChange(event): void {
    const file = (event.target.files[0] as File);
    this.fileUploadService.createImage(file).subscribe(response => this.images.push(response.data));
  }

  deletePhoto(url: string): void {
    const regExp = /(?<=\/uploads\/).+/g;
    const photoName = url.match(regExp)[0];

    // open modal confirm
    this.dialog.open(DialogConfirmSolutionComponent, {data: {name: photoName, type: 'зображення'}}).afterClosed()
      .subscribe((data: boolean | undefined) => {

        if (!!data) {
           // delete image from "this.images"
          this.fileUploadService.deleteImage(photoName).subscribe(response => {
          const idx = this.images.map(item => item.url).indexOf(response.data.url);
          this.images.splice(idx, 1);
          });
        }
      });



  }
}
