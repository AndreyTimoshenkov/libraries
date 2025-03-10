import { inject, Injectable } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { extractData, ILibrary } from "../../model/libraries.helpers";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  api = inject(ApiService);

  getLibrariesList(skip: number, value: string): Observable<ILibrary[]> {
    const res = this.api.getLibrariesList(skip, value);
    return extractData(res, ['FullName', 'ObjectAddress', 'Number'],
      {
        key: 'ObjectAddress',
        subKey: 'Address'
      }
    );
  }
}
