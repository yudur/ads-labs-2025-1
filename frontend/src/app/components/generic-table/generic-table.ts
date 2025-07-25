
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, FilePenLine, Trash } from 'lucide-angular';


@Component({
  selector: 'app-generic-table',
  imports: [LucideAngularModule],
  templateUrl: './generic-table.html',
})
export class GenericTable {
  @Input() data: any[] = [];
  @Input() columns: { key: keyof any; label: string }[] = [];
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  readonly FilePenLine = FilePenLine;
  readonly Trash = Trash;
}
