import { Component } from '@angular/core';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MyCustomPaginatorIntl } from "../../services/paginator.service";

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class PaginatorComponent {

}
