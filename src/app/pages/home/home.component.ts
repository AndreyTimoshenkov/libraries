import { AfterViewInit, Component, DestroyRef, effect, inject, signal, ViewChild } from '@angular/core';
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
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";

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
export class HomeComponent implements AfterViewInit {
  home = inject(HomeService);
  destroyRef = inject(DestroyRef);
  value = '';
  dataSource: MatTableDataSource<ILibrary> = new MatTableDataSource<ILibrary>();

  resultsLength$$ = toSignal(this.home.getEntriesCount());
  filteredResultLength$$ = signal<number>(0);
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
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  loadData(skip = 0) {
    this.isLoading$$.set(true);
    const filterValue = this.value.trim();
    this.home.getLibrariesList(skip, filterValue).pipe(
      finalize(() => this.isLoading$$.set(false)),
      takeUntilDestroyed(this.destroyRef)
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
