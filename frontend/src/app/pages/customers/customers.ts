import { Component, signal } from '@angular/core';
import { CustomerDTO } from '../../core/DTOs/customer.dto';
import { CustomerService } from '../../core/services/api/customer.service';
import { CommonModule } from '@angular/common';
import { AddButton } from '../../components/buttons/add-button/add-button';
import { CustomerForm } from './components/customer-form/customer-form';

import { LucideAngularModule, FilePenLine, Trash } from 'lucide-angular';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, AddButton, CustomerForm, LucideAngularModule],
  templateUrl: './customers.html'
})
export class Customers {
  readonly FilePenLine = FilePenLine;
  readonly Trash = Trash;

  customers = signal<CustomerDTO[]>([]);
  editingCustomer = signal<CustomerDTO | null>(null);

  constructor (private service: CustomerService) {
    this.loadCustomers();
  }

  loadCustomers() {
    // this.service.getAll().subscribe(data => {
    //   this.customers.set(data);
    //   this.cancelEdit();
    // });
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

  edit(customer: CustomerDTO) {
    this.editingCustomer.set({ ...customer });
  }

  remove(customer: CustomerDTO) {
    if (confirm(`Deseja remover ${customer.name}?`)) {
      // this.service.delete(customer.id).subscribe(() => this.loadCustomers());
    }
  }

  cancelEdit() {
    this.editingCustomer.set(null);
  }
}
