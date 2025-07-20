import { Component, signal } from '@angular/core';
import { CustomerDTO } from '../../core/DTOs/customer.dto';
import { CustomerService } from '../../core/services/api/customer.service';
import { AddButton } from '../../components/buttons/add-button/add-button';

import { GenericForm } from '../../components/generic-form/generic-form';
import { GenericTable } from '../../components/generic-table/generic-table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    // private customerService: CustomerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.buildForm();
  }

  buildForm(customer?: CustomerDTO) {
    this.form = this.fb.group({
      name: [customer?.name || '', [Validators.required, Validators.minLength(2)]],
      cpf: [customer?.cpf || '', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });

    this.selectedCustomer.set(customer ?? null);
    this.editing.set(true);
  }

  loadCustomers() {
    // this.customerService.findAll().subscribe(res => this.customers.set(res));
    this.customers.set([
      {
        "id": "8d4bd2bf-df58-4d73-a6cb-b119bfaad336",
        "name": "João Silva",
        "cpf": "33621947027",
      },
      {
        "id": "e33b7906-c55f-4253-8331-f3fa18b401e3",
        "name": "Maria Souza",
        "cpf": "46487252042",
      },
      {
        "id": "2bddd701-2856-49ed-870e-f135caa0ff13",
        "name": "Carlos Oliveira",
        "cpf": "57906840097",
      }
    ])
  }

  onEdit(customer: CustomerDTO) {
    this.buildForm(customer);
  }

  onDelete(customer: CustomerDTO) {
    // this.customerService.delete(customer.id).subscribe(() => this.loadCustomers());
    console.log('apagar')
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
      // this.customerService.create(dto).subscribe(() => {
        // this.cancelEdit();
        // this.loadCustomers();
        
      // })
      console.log('criado')
      this.cancelEdit();
      this.loadCustomers();
    } else {
      // this.customerService.update(this.selectedCustomer()!.id, dto).subscribe(() => {
        // this.cancelEdit();
        // this.loadCustomers();
      // });
      console.log('atualizado')
    }
  }
}
