import { Component, OnInit } from '@angular/core';
import { DataItem } from '../data-item/data-item';
import { Observable } from 'rxjs';
import { Data } from '../../models/data.model';
import { AsyncPipe } from '@angular/common';
import { DataService } from '../../services/data.service';
import { DataDetail } from '../data-detail/data-detail';
import { Card } from '../../../../shared/card/card';
import { DataUpdate } from '../data-update/data-update';

@Component({
  selector: 'app-data-list',
  imports: [AsyncPipe, DataItem, DataDetail, Card, DataUpdate],
  templateUrl: './data-list.html',
  styleUrl: './data-list.css',
})
export class DataList implements OnInit {
  data$!: Observable<Data[]>;
  dataSelected?: Data;
  private dataService!: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.data$ = this.dataService.data$;
    this.dataService.loadData();
  }

  onSelect(dataSelected: Data) {
    this.dataSelected = dataSelected;
  }

  get selectedData() {
    return this.dataSelected;
  }
}
