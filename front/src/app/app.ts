import { Component } from '@angular/core';
import { DataList } from './features/data/components/data-list/data-list';

@Component({
  selector: 'app-root',
  imports: [DataList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
