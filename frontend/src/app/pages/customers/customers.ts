import { Component, signal } from '@angular/core';
import { CustomerDTO } from '../../core/DTOs/customer.dto';
import { AddButton } from '../../components/buttons/add-button/add-button';
import { GenericForm } from '../../components/generic-form/generic-form';
import { GenericTable } from '../../components/generic-table/generic-table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../core/services/api/customer.service';

@Component({
  selector: 'app-customers',
  imports: [
    AddButton,
    GenericForm,
    GenericTable
  ],
  templateUrl: './customers.html'
})
export class Customers {
  customers = signal<CustomerDTO[]>([]);
  editing = signal(false);
  selectedCustomer = signal<CustomerDTO | null>(null);

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe((data: CustomerDTO[]) => {
      this.customers.set(data);
    });
  }

  buildForm(customer?: CustomerDTO) {
    this.form = this.fb.group({
      name: [customer?.name || '', [Validators.required, Validators.minLength(2)]],
      cpf: [customer?.cpf || '', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });

    this.selectedCustomer.set(customer ?? null);
    this.editing.set(true);
  }

  onDelete(customer: CustomerDTO) {
    this.customerService.delete(customer.id).subscribe(() => {
      this.loadCustomers();
    });
  }

  cancelEdit() {
    this.editing.set(false);
    this.form.reset();
    this.selectedCustomer.set(null);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const dto = this.form.value;

    if (!this.selectedCustomer()?.id) {
      this.customerService.create(dto).subscribe(() => {
        this.cancelEdit();
        this.loadCustomers();
      });
    } else {
      this.customerService.update(this.selectedCustomer()!.id, dto).subscribe(() => {
        this.cancelEdit();
        this.loadCustomers();
      });
    }
  }
}
