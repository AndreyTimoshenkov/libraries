import { Component, inject, signal, ViewChild } from '@angular/core';
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
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { toSignal } from "@angular/core/rxjs-interop";

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
    MatPaginator
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  home = inject(HomeService);
  value = '';
  dataSource: MatTableDataSource<ILibrary> = new MatTableDataSource<ILibrary>();

  resultsLength$$ = toSignal(this.home.getEntriesCount());
  isLoading$$ = signal(false);

  columns = [
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  loadData(skip = 0) {
    this.isLoading$$.set(true);
    const filterValue = this.value.toLowerCase().trim();
    this.home.getLibrariesList(skip).pipe(
      finalize(() => this.isLoading$$.set(false)),
    ).subscribe(
      (data: ILibrary[]) => {
        // this.resultsLength$$.set(data.length);
        this.dataSource = new MatTableDataSource<ILibrary>(data);
        this.dataSource.filter = filterValue;
      }
    )
  }

  onPageChange(event: PageEvent) {
    const { pageIndex, pageSize } = event;
    const skip = pageIndex * pageSize;
    this.loadData(skip);
  }
}
