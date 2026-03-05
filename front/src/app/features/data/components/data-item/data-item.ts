import { Component, Input } from '@angular/core';
import { Data } from '../../models/data.model';

@Component({
  selector: 'app-data-item',
  imports: [],
  templateUrl: './data-item.html',
  styleUrl: './data-item.css',
})
export class DataItem {
  @Input({ required: true }) dataValue!: Data;
}
