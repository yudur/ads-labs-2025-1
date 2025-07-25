import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './generic-form.html',
})
export class GenericForm {
  @Input() form!: FormGroup;
  @Input() title!: string;
  @Input() fields!: {
    name: string;
    label: string;
    type?: string; 
    options?: { label: string; value: any }[];
  }[];
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
}
