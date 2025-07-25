import { Component, signal } from '@angular/core';
import { AddButton } from '../../components/buttons/add-button/add-button';
import { GenericForm } from '../../components/generic-form/generic-form';
import { GenericTable } from '../../components/generic-table/generic-table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDTO } from '../../core/DTOs/order.dto';

interface dishOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-order',
  imports: [AddButton, GenericForm, GenericTable],
  templateUrl: './order.html',
})
export class Order {
  orders = signal<OrderDTO[]>([]);
  editing = signal(false);
  selectedOrder = signal<OrderDTO | null>(null);
  dishOptions = signal<dishOption[]>([]);

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadDishes();
  }

  loadDishes() {
    this.dishOptions.set([
      { label: 'Sushi Variado', value: 'bc89b0f6-e4b9-462a-ae7e-758ffe68fd67' },
      { label: 'Filé Mignon', value: '152be70c-9988-4293-ac2d-5deb2759eca5' },
    ])
  }

  loadOrders() {
    const mock: OrderDTO[] = [
      {
        id: 'be074765-c67d-4eab-9a98-515291cb18a0',
        quantity: 1,
        createdAt: '2025-07-02T01:23:52.993Z',
        customer: {
          name: 'João Silva',
        },
        dish: {
          name: 'Sushi Variado',
          price: '65.00',
        },
      },
    ];

    const withTotal = mock.map((order) => ({
      ...order,
      total: parseFloat(order.dish.price) * order.quantity,
    }));

    this.orders.set(withTotal);
  }

  buildForm(order?: OrderDTO) {
    const isEdit = !!order;

    this.form = this.fb.group({
      quantity: [order?.quantity || 1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      ...(isEdit
        ? {}
        : {
          customerId: ['', Validators.required, Validators.minLength(3)],
          dishId: ['', Validators.required, Validators.minLength(3)],
        }
      )
    });

    this.selectedOrder.set(order ?? null);
    this.editing.set(true);
  }

  onDelete(order: OrderDTO) {
    console.log('Remover pedido:', order.id);
  }

  cancelEdit() {
    this.form.reset();
    this.editing.set(false);
    this.selectedOrder.set(null);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const dto = this.form.value;
    console.log(this.selectedOrder() ? 'Atualizar pedido' : 'Criar pedido', dto);

    this.cancelEdit();
    this.loadOrders();
  }
}
