import { Component, signal } from '@angular/core';
import { AddButton } from '../../components/buttons/add-button/add-button';
import { GenericForm } from '../../components/generic-form/generic-form';
import { GenericTable } from '../../components/generic-table/generic-table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishDTO } from '../../core/DTOs/dish.dto';

@Component({
  selector: 'app-dishes',
  imports: [AddButton, GenericForm, GenericTable],
  templateUrl: './dishes.html',
})
export class Dishes {
  dishes = signal<DishDTO[]>([]);
  editing = signal(false);
  selectedDish = signal<DishDTO | null>(null);

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes() {
    this.dishes.set([
      {
        id: "7b7cb5cb-93a0-4837-967b-58b6ad0bbf26",
        name: "Pizza Margherita",
        price: "45.90",
      },
      {
        id: "a98fc8b8-0a06-4d72-b942-0971b30f426a",
        name: "Spaghetti Carbonara",
        price: "32.50",
	    },
    ])
  }

  buildForm(dish?: DishDTO) {
    this.form = this.fb.group({
      name: [dish?.name || '', [Validators.required, Validators.minLength(2)]],
      price: [dish?.price || '', [Validators.required, Validators.min(0.1), Validators.max(4000)]]
    });

    this.selectedDish.set(dish ?? null);
    this.editing.set(true);
  }

  onDelete(dish: DishDTO) {
    console.log('apagar')
  }

  cancelEdit() {
    this.editing.set(false);
    this.form.reset();
    this.selectedDish.set(null);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const dto = this.form.value;

    if (!this.selectedDish()?.id) {
      console.log('criado')
      this.cancelEdit();
      this.loadDishes();
    } else {
      console.log('atualizado')
    }
  }
}
