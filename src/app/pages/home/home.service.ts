import { inject, Injectable } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { extractData, ILibrary } from "../../model/libraries.helpers";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  api = inject(ApiService);

  getLibrariesList(skip: number): Observable<ILibrary[]> {
    const res = this.api.getLibrariesList(skip);
    return extractData(res, ['FullName', 'ObjectAddress'],
      {
      key: 'ObjectAddress',
      subKey: 'Address'
    }
    );
  }

  getEntriesCount(): Observable<number> {
    return this.api.getEntriesCount();
  }
}
