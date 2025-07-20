import { Component, Input } from '@angular/core';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-add-button',
  imports: [LucideAngularModule],
  templateUrl: './add-button.html'
})
export class AddButton {
  readonly Plus = Plus;
  @Input({ required: true }) textButton!: string;

}
