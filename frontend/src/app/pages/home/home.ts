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
  imports: [LucideAngularModule],
  templateUrl: './home.html',
})
export class Home {
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
