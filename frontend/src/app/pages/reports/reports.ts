import { Component } from '@angular/core';
import { GenericTable } from '../../components/generic-table/generic-table';

@Component({
  selector: 'app-reports',
  imports: [GenericTable],
  templateUrl: './reports.html'
})
export class Reports {
  topDishes = [
    { name: 'Pizza Margherita', orders: 120 },
    { name: 'Lasanha', orders: 110 },
    { name: 'Hambúrguer Artesanal', orders: 95 },
    { name: 'Sushi Combo', orders: 90 },
    { name: 'Salada Caesar', orders: 85 },
  ];

  dishColumns = [
    { key: 'name', label: 'Prato' },
    { key: 'orders', label: 'Quantidade de Pedidos' },
  ];

  topClientsByOrders = [
    { name: 'João Silva', orders: 35 },
    { name: 'Maria Souza', orders: 32 },
    { name: 'Carlos Oliveira', orders: 29 },
    { name: 'Ana Costa', orders: 27 },
    { name: 'Pedro Santos', orders: 25 },
  ];

  clientOrderColumns = [
    { key: 'name', label: 'Cliente' },
    { key: 'orders', label: 'Pedidos' },
  ];

  topClientsBySpending = [
    { name: 'Maria Souza', total: 2800 },
    { name: 'João Silva', total: 2600 },
    { name: 'Ana Costa', total: 2400 },
    { name: 'Carlos Oliveira', total: 2300 },
    { name: 'Pedro Santos', total: 2200 },
  ];

  clientSpendingColumns = [
    { key: 'name', label: 'Cliente' },
    { key: 'total', label: 'Total Gasto (R$)' },
  ];
}
