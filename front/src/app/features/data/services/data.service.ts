import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Data } from '../models/data.model';
import { DataUpdateRequest } from '../models/dataUpdate.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getData(): Observable<Data[]> {
    return this.data$;
  }

  loadData(): void {
    this.http
      .get<Record<string, Data>>('http://localhost/capitest/back/items')
      .pipe(
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
      )
      .subscribe((data) => this.dataSubject.next(data));
  }

  updateData(dataId: string, dataUpdate: DataUpdateRequest): Observable<Data> {
    return this.http.put<Data>(`http://localhost/capitest/back/items/${dataId}`, dataUpdate).pipe(
      tap((updatedItem) => {
        const currentData = this.dataSubject.getValue();
        const updatedData = currentData.map((dataItem) =>
          dataItem.id === dataId ? updatedItem : dataItem,
        );
        this.dataSubject.next(updatedData);
      }),
    );
  }
}
