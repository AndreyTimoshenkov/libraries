import { inject, Injectable } from '@angular/core';
import { ApiService } from "../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  api = inject(ApiService);

  getLibrariesList() {
    this.api.getLibrariesList();
  }

  constructor() { }
}
