import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) {}

  cards = [
    {
      title: 'Clientes',
      description: 'Gerencie informações de clientes.',
      icon: Users,
      link: '/customers'
    },
    {
      title: 'Pratos',
      description: 'Gerencie o cardápio do restaurante.',
      icon: Utensils,
      link: '/dishes'
    },
    {
      title: 'Pedidos',
      description: 'Acompanhe e gerencie os pedidos.',
      icon: ClipboardList,
      link: '/order'
    },
    {
      title: 'Relatórios',
      description: 'Visualize insights e estatísticas.',
      icon: ChartNoAxesColumnIncreasing,
      link: '/reports'
    },
  ]

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
