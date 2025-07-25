import { Component, signal } from '@angular/core';
import { AddButton } from '../../components/buttons/add-button/add-button';
import { GenericForm } from '../../components/generic-form/generic-form';
import { GenericTable } from '../../components/generic-table/generic-table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishDTO } from '../../core/DTOs/dish.dto';
import { DishService } from '../../core/services/api/dish.service';

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

  constructor(
    private fb: FormBuilder,
    private dishService: DishService
  ) {}

  ngOnInit() {
    this.loadDishes();
  }

  loadDishes() {
    this.dishService.getDishes().subscribe((data: any) => {
      this.dishes.set(data as DishDTO[]);
    });
  }

  buildForm(dish?: DishDTO) {
    this.form = this.fb.group({
      name: [dish?.name || '', [Validators.required, Validators.minLength(2)]],
      price: [
        dish?.price || '',
        [
          Validators.required,
          Validators.min(0.1),
          Validators.max(4000),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ]
    });

    this.selectedDish.set(dish ?? null);
    this.editing.set(true);
  }

  onDelete(dish: DishDTO) {
    this.dishService.deleteDish(dish.id).subscribe(() => {
      this.loadDishes();
    });
  }

  cancelEdit() {
    this.editing.set(false);
    this.form.reset();
    this.selectedDish.set(null);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const dto = {
      ...this.form.value,
      price: Number(this.form.value.price)
    };

    if (!this.selectedDish()?.id) {
      this.dishService.createDish(dto).subscribe(() => {
        this.cancelEdit();
        this.loadDishes();
      });
    } else {
      this.dishService.updateDish(this.selectedDish()!.id, dto).subscribe(() => {
        this.cancelEdit();
        this.loadDishes();
      });
    }
  }
}
