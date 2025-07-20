import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerDTO } from '../../../../core/DTOs/customer.dto';
import { CustomerService } from '../../../../core/services/api/customer.service';

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.html',
})
export class CustomerForm implements OnInit {
  @Input() customer!: CustomerDTO;
  @Output() cancel = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CustomerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.customer?.name || '', [Validators.required, Validators.minLength(2)]],
      cpf: [this.customer?.cpf || '', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    })
  }  

  onSubmit() {
    if (this.form.invalid) return;

    const dto = this.form.value;

    if (!this.customer.id) {
      this.service.create(dto).subscribe(() => this.saved.emit());
    } else {
      this.service.update(this.customer.id, dto).subscribe(() => this.saved.emit());
    }
  }
}
