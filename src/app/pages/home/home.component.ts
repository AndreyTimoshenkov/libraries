import { AfterViewInit, Component, DestroyRef, inject, signal, ViewChild } from '@angular/core';
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
import { finalize, tap } from "rxjs";
import { MatPaginator, MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { MyCustomPaginatorIntl } from "../../services/paginator.service";
import { MatDialog } from "@angular/material/dialog";
import { LibraryCardComponent } from "../../components/library-card/library-card.component";
import { MarkPipe } from "../../pipes/mark.pipe";

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
    MatPaginator,
    MarkPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    { provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }
  ],

})
export class HomeComponent implements AfterViewInit {
  home = inject(HomeService);
  destroyRef = inject(DestroyRef);
  dialog = inject(MatDialog);
  value = '';
  dataSource: MatTableDataSource<ILibrary> = new MatTableDataSource<ILibrary>();
  isFiltered$$ = signal(false);

  resultsLength$$ = toSignal(this.home.getEntriesCount());
  isLoading$$ = signal(false);

  // columns = [
  //   {
  //     columnDef: 'index',
  //     header: 'Номер',
  //     cell: (_: ILibrary, index: number) => `${index + 1}`,
  //   },
  //   {
  //     columnDef: 'name',
  //     header: 'Название',
  //     cell: (library: ILibrary) => `${library.FullName}`,
  //   },
  //   {
  //     columnDef: 'address',
  //     header: 'Адрес',
  //     cell: (library: ILibrary) => `${library.ObjectAddress}`,
  //   },
  // ];

  columns: { columnDef: string; header: string; cell: (library: ILibrary, index: number) => string }[] = [
    {
      columnDef: 'index',
      header: '#',
      cell: (_: ILibrary, index: number) => `${index + 1}`
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
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData(skip = 0) {
    this.isLoading$$.set(true);
    this.isFiltered$$.set(!!this.value);
    const filterValue = this.value.trim();
    this.home.getLibrariesList(skip, filterValue).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => this.paginator.pageIndex = 0),
      finalize(() => this.isLoading$$.set(false)),
    ).subscribe(
      (data: ILibrary[]) => {
        this.dataSource = new MatTableDataSource<ILibrary>(data);
      }
    );
  }

  onPageChange(event: PageEvent) {
    const { pageIndex, pageSize } = event;
    const skip = pageIndex * pageSize;
    this.loadData(skip);
  }

  onRowClick(row: ILibrary) {
    const dialogRef = this.dialog.open(LibraryCardComponent, {
      width: '400px', // Adjust as needed
      data: row,
    });
  }
}
