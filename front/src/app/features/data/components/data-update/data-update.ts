import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DataUpdateRequest } from '../../models/dataUpdate.model';

@Component({
  selector: 'app-data-update',
  imports: [FormsModule],
  templateUrl: './data-update.html',
  styleUrl: './data-update.css',
})
export class DataUpdate {
  @Input({ required: true }) dataId!: string;
  @Input({ required: true }) dataTitle!: string;

  constructor(private dataService: DataService) {}

  onSubmit() {
    const dataUpdate: DataUpdateRequest = { title: this.dataTitle };
    this.dataService.updateData(this.dataId, dataUpdate).subscribe((updated) => {
      console.log('Updated data: ', updated);
    });
  }
}
