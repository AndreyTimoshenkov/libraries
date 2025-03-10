import { Component, input, output } from '@angular/core';
import { MatButtonModule, MatFabButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-custom-paginator',
  imports: [
    MatFabButton,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.css'
})
export class CustomPaginatorComponent {
  previous = output<void>();
  next = output<void>();

  isFirstPage = input<boolean>();
  isLastPage = input<boolean>();

  onPreviousClick(): void {
    this.previous.emit();
  }

  onNextClick(): void {
    this.next.emit();
  }
}
