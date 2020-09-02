import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRippleModule} from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IntereptorService } from './intereptor.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    CdkScrollableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatProgressBarModule,
    MatRippleModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'uk' }],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    CdkScrollableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatProgressBarModule,
    MatRippleModule
  ],
})
export class MaterialModule {}
