import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Первая страница`;
  itemsPerPageLabel = `Записей на странице:`;
  lastPageLabel = `Последняя страница`;
  nextPageLabel = 'Следующая страница';
  previousPageLabel = 'Предыдущая страница';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Страница 1 из 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    const start = page * pageSize + 1;
    const end = start + pageSize - 1;
    return `${start} - ${end} из ${length} записей; страница ${page + 1} из ${amountPages}`;
  }
}

