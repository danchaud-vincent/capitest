import { Component, Input } from '@angular/core';
import { Data } from '../../models/data.model';

@Component({
  selector: 'app-data-detail',
  imports: [],
  templateUrl: './data-detail.html',
  styleUrl: './data-detail.css',
})
export class DataDetail {
  @Input({ required: true }) data!: Data;
}
