import { IDialogOtion } from 'src/app/shared/interfaces';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogServiceService {

  constructor(private dialog: MatDialog) { }


  openDialog( component: ComponentType<any>, data?: IDialogOtion): MatDialogRef<any> {
    const dialogRef = this.dialog.open(component, {
      // width: data?.width,
      data
    });

    return dialogRef;
  }



}
