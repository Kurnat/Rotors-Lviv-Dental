import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-solution',
  templateUrl: './dialog-confirm-solution.component.html',
  styleUrls: ['./dialog-confirm-solution.component.scss']
})
export class DialogConfirmSolutionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
