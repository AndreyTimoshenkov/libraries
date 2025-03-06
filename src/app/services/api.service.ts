import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const API_URL = 'https://apidata.mos.ru/v1/?api_key=9344fd2f-ae1e-4038-a19f-4553493133db';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  getLibrariesList() {
    // this.http.get(API_URL)
    console.log(API_URL + '123');
  }
}
