import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { HomeService } from "./home.service";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import { ILibrary } from "../../model/libraries.helpers";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { finalize } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialog } from "@angular/material/dialog";
import { LibraryCardComponent } from "../../components/library-card/library-card.component";
import { MarkPipe } from "../../pipes/mark.pipe";
import { CustomPaginatorComponent } from "../../components/custom-paginator/custom-paginator.component";

@Component({
  selector: 'app-home',
  imports: [
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconButton,
    MatIcon,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatProgressSpinner,
    MarkPipe,
    CustomPaginatorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {
  home = inject(HomeService);
  destroyRef = inject(DestroyRef);
  dialog = inject(MatDialog);

  value = '';
  dataSource: MatTableDataSource<ILibrary> = new MatTableDataSource<ILibrary>();

  isFiltered$$ = signal(false);
  isLoading$$ = signal(false);
  isDataLoadTriggered$$ = signal(false);

  pageIndex$$ = signal(0);
  pageSize$$ = signal(30);

  skip$$ = computed(() => this.pageIndex$$() * this.pageSize$$());
  isFirstPage$$ = computed(() => this.pageIndex$$() === 0);
  isLastPage$$ = signal(true);

  constructor() {
    effect(() => {
      if (!this.isDataLoadTriggered$$()) return;

      this.loadData(this.skip$$());
    });
  }

  columns: { columnDef: string; header: string; cell: (library: ILibrary, index: number) => string }[] = [
    {
      columnDef: 'number',
      header: '#',
      cell: (library: ILibrary) => `${library.Number + this.skip$$()}`,
    },
    {
      columnDef: 'name',
      header: 'Название',
      cell: (library: ILibrary) => `${library.FullName}`,
    },
    {
      columnDef: 'address',
      header: 'Адрес',
      cell: (library: ILibrary) => `${library.ObjectAddress}`,
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  filterData() {
    this.pageIndex$$.set(0);
    this.isDataLoadTriggered$$.set(true);
    this.loadData();
  }

  loadData(skip = 0) {
    this.isLoading$$.set(true);
    this.isFiltered$$.set(!!this.value);
    const filterValue = this.value.trim();

    this.home.getLibrariesList(skip, filterValue).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading$$.set(false)),
    ).subscribe(
      (data: ILibrary[]) => {
        this.dataSource = new MatTableDataSource<ILibrary>(data);
        this.isLastPage$$.set(data.length !== this.pageSize$$());
      }
    );
  }

  onRowClick(row: ILibrary) {
    this.dialog.open(LibraryCardComponent, {
      width: '400px',
      data: row,
    });
  }

  onPreviousClick(): void {
    this.pageIndex$$.update(prev => prev - 1);
  }
  onNextClick(): void {
    this.pageIndex$$.update(prev => prev + 1);
  }
}
