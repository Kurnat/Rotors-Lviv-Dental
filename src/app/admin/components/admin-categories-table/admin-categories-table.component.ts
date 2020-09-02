import { DialogConfirmSolutionComponent } from './../../../components/popups/dialog-confirm-solution/dialog-confirm-solution.component';
import { switchMap } from 'rxjs/operators';
import {
  ICategory,
  IIsNewCategory,
  ICategoryResponse,
  ICategorySingleRes,
  ICategoryResult,
} from '../../../shared/interfaces';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/shared/services/category.service';
import { of, Observable, Subscription } from 'rxjs';
import { CreateNewCategoryService } from '../../services/create-new-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-categories-table',
  templateUrl: './admin-categories-table.component.html',
  styleUrls: ['./admin-categories-table.component.scss'],
})
export class AdminCategoriesTableComponent implements OnInit, OnDestroy {
  private diologDel$: Subscription;
  private diologCreate$: Subscription;
  private diologEdit$: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<ICategory>;
  public displayedColumns = ['position', 'ua', 'en', 'action'];
  public categories: ICategory[];
  public progressBar = false;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private createNewCategoryService: CreateNewCategoryService
  ) {}

  ngOnInit(): void {
    this.initTable();
    this.newCategoryListener();
  }

  ngOnDestroy(): void {
    if (this.diologDel$) {
      this.diologDel$.unsubscribe();
    }

    if ( this.diologCreate$) {
      this.diologCreate$.unsubscribe();
    }

    if (this.diologEdit$) {
      this.diologEdit$.unsubscribe();
    }
  }

  private initTable(): void {
    this.progressBar = true;
    this.categoryService.getAllCategories().subscribe(
      (response) => {
        if (response.data instanceof Array) {
          this.categories = response.data;
          this.dataSource = new MatTableDataSource(this.categories); // Add products array to Material Table
          this.dataSource.sort = this.sort; // Add sorting to Material Table
          this.progressBar = false;
        }
      },
      this.errorHandler
    );
  }

  // Open Delete Dialog
  public openDeledeDialog(category: ICategory): void {
    const dialogOptions = {
      width: '360px',
      data: { name: category.ua, type: 'категорію' },
    };
    this.diologDel$ = this.dialog
      .open(DialogConfirmSolutionComponent, dialogOptions)
      .afterClosed()
      .pipe(
        switchMap((result: boolean) => {
          if (result) {
            this.progressBar = true;
            return this.categoryService.deleteCategory(category); // Delete on server
          } else {
            return of(null);
          }
        })
      )
      .subscribe(async (result) => {
         try {
          if (result) {
            await this.initTable();
            this.progressBar = false;
            this.showSnackMessage(`Категорія ${category.ua} була успішо видалена.`, 4000);
          }
         } catch (err) {
          console.log(err);
         }
        },
        this.errorHandler
      );
  }

  openEditDialog(element): void {}

  public applyFilter(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openCategoriesDialog(category: ICategory): void {
    this.diologEdit$ = this.dialog
      .open(DialogCategoryComponent, {
        data: { isNewCategory: false, category },
      })
      .afterClosed()
      .pipe(
        switchMap((result: IIsNewCategory) => {
          console.log(result);
          if (result && !result.isNew) { // Dialog was closed with button "Edit"
              result.category.ua = result.category.ua.toLowerCase();
              result.category.en = result.category.en.toLowerCase();
              console.log(result.category);

              return this.categoryService.updeteCategory(result.category);

          } else {
            return of(null);
          }
        }))
      .subscribe(async (response: ICategoryResponse | undefined) => {
          try {
            if (response) {
              await this.initTable();
              this.progressBar = false;
              this.showSnackMessage(`Категорія ${category.ua} була успішо відредагована.`, 4000);
            }
          } catch (err) {
            console.log(err);
          }
        },
        this.errorHandler
      );
  }



  newCategoryListener(): void {
    this.diologCreate$ = this.createNewCategoryService
      .listen()
      .pipe(
        switchMap((category: ICategoryResult): Observable<ICategorySingleRes> => {
            console.log(category.category);
            this.progressBar = true; // Off progressbar
            return this.categoryService.createCategory(category.category);
          }
        ))
      .subscribe(async (resalt: ICategorySingleRes) => {
        try {
          if (resalt.data) {
            await this.initTable();
            this.progressBar = false;
            this.showSnackMessage(`Категорія ${resalt.data.ua} була успішно створена`, 4000);
          }
        } catch (err) {
          console.log(err);
        }
      },
      this.errorHandler
      );
  }

  // MatSnackBar
  private showSnackMessage(message: string, millisec: number): void {
    this.snackBar.open(message, null, {
      duration: millisec,
    });
  }

  // Error Handler
  private errorHandler(err): void {
    this.progressBar = false; // Off progressbar
    console.log(err);

    this.showSnackMessage('Помилка: \n ' + err?.error.error, 8000); // Show snack message with some error
  }
}
