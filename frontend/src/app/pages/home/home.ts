import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { 
  LucideAngularModule,
  Users,
  Utensils,
  ClipboardList,
  ChartNoAxesColumnIncreasing 
} from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './home.html',
})
export class Home {
  readonly Users = Users;
  readonly Utensils = Utensils;
  readonly ClipboardList = ClipboardList;
  readonly ChartNoAxesColumnIncreasing = ChartNoAxesColumnIncreasing;

  cards = [
    {
      title: 'Clientes',
      description: 'Gerencie informações de clientes.',
      icon: Users
    },
    {
      title: 'Pratos',
      description: 'Gerencie o cardápio do restaurante.',
      icon: Utensils
    },
    {
      title: 'Pedidos',
      description: 'Acompanhe e gerencie os pedidos.',
      icon: ClipboardList
    },
    {
      title: 'Relatórios',
      description: 'Visualize insights e estatísticas.',
      icon: ChartNoAxesColumnIncreasing
    },
  ]
}
