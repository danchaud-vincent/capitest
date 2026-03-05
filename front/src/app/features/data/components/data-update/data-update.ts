import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data-update',
  imports: [FormsModule],
  templateUrl: './data-update.html',
  styleUrl: './data-update.css',
})
export class DataUpdate {
  @Input({ required: true }) dataTitle!: string;

  constructor(private dataService: DataService) {}

  onSubmit() {
    console.log('submitted');
  }
}
