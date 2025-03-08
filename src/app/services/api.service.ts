import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiResponseItem } from "../model/libraries.helpers";
import { Observable } from "rxjs";

const API_URL = 'https://apidata.mos.ru/v1/datasets/526';
const API_KEY = '9344fd2f-ae1e-4038-a19f-4553493133db';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  getLibrariesList(skip: number, value: string = ''): Observable<ApiResponseItem[]> {
    let url = `${API_URL}/rows?api_key=${API_KEY}&$skip=${skip}&$top=30&$inlinecount=allpages`;

    if (value) {
      const encodedValue = '%27' + encodeURIComponent(value) + '%27';
      url += `&$filter=FullName%20eq%20${encodedValue}`;
    }

    return this.http.post<ApiResponseItem[]>(url, [
      "FullName",
      "ObjectAddress"
    ]);
  }

  getEntriesCount(): Observable<number> {
    return this.http.get<number>(API_URL + `/count?api_key=${API_KEY}`);
  }
}
