import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Data } from '../models/data.model';
import { DataUpdateRequest } from '../models/dataUpdate.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Data[]> {
    return this.http.get<Record<string, Data>>('http://localhost/capitest/back/items').pipe(
      map((res) =>
        Object.entries(res).map(([id, value]) => {
          return {
            id: id,
            title: value.title,
            description: value.description,
            date: value.date,
            titleHistory: value.titleHistory,
          };
        }),
      ),
    );
  }

  updateData(dataId: string, dataUpdate: DataUpdateRequest): Observable<Data> {
    return this.http.put<Data>(`http://localhost/capitest/back/items/${dataId}`, dataUpdate);
  }
}
