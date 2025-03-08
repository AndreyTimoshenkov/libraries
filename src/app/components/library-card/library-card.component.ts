import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatCard, MatCardContent } from "@angular/material/card";
import { ILibrary } from "../../model/libraries.helpers";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-library-card',
  imports: [
    MatCard,
    MatCardContent,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.css'
})
export class LibraryCardComponent {

  data: ILibrary = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<LibraryCardComponent>);
}
