import { Component, signal } from '@angular/core';
import { AddButton } from '../../components/buttons/add-button/add-button';
import { GenericForm } from '../../components/generic-form/generic-form';
import { GenericTable } from '../../components/generic-table/generic-table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDTO } from '../../core/DTOs/order.dto';
import { OrderService } from '../../core/services/api/order.service';
import { DishService } from '../../core/services/api/dish.service';
import { CustomerService } from '../../core/services/api/customer.service';

interface InputOption {
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
  dishOptions = signal<InputOption[]>([]);
  customerOptions = signal<InputOption[]>([]);

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private dishService: DishService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.loadOrders();
    this.loadDishes();
    this.loadCustomers();
  }

  loadDishes() {
    this.dishService.getDishes().subscribe((dishes: any) => {
      const options = dishes.map((dish: any) => ({
        label: dish.name,
        value: dish.id
      })) 
      this.dishOptions.set(options);
    });
  }

  loadCustomers() {
    this.customerService.getAll().subscribe((customers: any) => {
      const options = customers.map((customer: any) => ({
        label: customer.name,
        value: customer.id
      }));
      this.customerOptions.set(options);
    });
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((data: any) => {
      const withTotal = data.map((order: any) => {
        const price = order.dish?.price ? parseFloat(order.dish.price) : 0;
        const total = price * order.quantity;
        
        return {
          ...order,
          total: parseFloat(total.toFixed(2))
        };
      });
      this.orders.set(withTotal);
    });
  }


  buildForm(order?: OrderDTO) {
    const isEdit = !!order;

    this.form = this.fb.group({
      quantity: [order?.quantity || 1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      ...(isEdit
        ? {}
        : {
          customerId: ['', [Validators.required]],
          dishId: ['', [Validators.required]],
        }
      )
    });

    this.selectedOrder.set(order ?? null);
    this.editing.set(true);
  }

  onDelete(order: OrderDTO) {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      this.loadOrders();
    });
  }

  cancelEdit() {
    this.form.reset();
    this.editing.set(false);
    this.selectedOrder.set(null);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const dto = {
      ...this.form.value,
      quantity: Number(this.form.value.quantity)
    };

    if (!this.selectedOrder()?.id) {
      this.orderService.createOrder(dto).subscribe(() => {
        this.loadOrders();
        this.cancelEdit();
      });
    } else {
      this.orderService.updateOrder(this.selectedOrder()!.id, dto).subscribe(() => {
        this.loadOrders();
        this.cancelEdit();
      });
    }
  }
}
