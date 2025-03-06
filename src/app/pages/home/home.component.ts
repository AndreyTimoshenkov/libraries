import { Component, inject } from '@angular/core';
import { HomeService } from "./home.service";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInput, MatInputModule } from "@angular/material/input";
import { debounceTime } from "rxjs";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-home',
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconButton, MatIcon, MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  home = inject(HomeService);
  filter = new FormControl<string>("");
  value = 'clear';

  constructor() {
    this.home.getLibrariesList();

    this.filter.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(console.log);
  }
}
