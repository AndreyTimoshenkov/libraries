import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
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
    let params = new HttpParams()
      .set('api_key', API_KEY)
      .set('$skip', skip.toString())
      .set('$top', '30')
      .set('$inlinecount', 'allpages');

    if (value) {
      params = params.set('$filter', `FullName eq '${value}'`);
    }

    const url = `${API_URL}/rows?` + params.toString();

    return this.http.post<ApiResponseItem[]>(url, [
      "FullName",
      "ObjectAddress",
      "Number",
    ]);
  }

  getEntriesCount(value: string): Observable<number> {
    let params = new HttpParams().set('api_key', API_KEY);

    if (value) {
      params = params.set('$filter', `FullName eq '${ value }'`);
    }

    const url = `${ API_URL }/count?` + params.toString();

    return this.http.get<number>(url);
  }
}
