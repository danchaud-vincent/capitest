import { Component, OnInit } from '@angular/core';
import { DataItem } from '../data-item/data-item';
import { Observable } from 'rxjs';
import { Data } from '../../models/data.model';
import { AsyncPipe } from '@angular/common';
import { DataService } from '../../services/data.service';
import { DataDetail } from '../data-detail/data-detail';
import { Card } from '../../../../shared/card/card';

@Component({
  selector: 'app-data-list',
  imports: [AsyncPipe, DataItem, DataDetail, Card],
  templateUrl: './data-list.html',
  styleUrl: './data-list.css',
})
export class DataList implements OnInit {
  data$!: Observable<Data[]>;
  private dataService!: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.data$ = this.dataService.getData();
  }
}
