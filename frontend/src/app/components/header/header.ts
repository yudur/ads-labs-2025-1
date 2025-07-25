import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { 
  LucideAngularModule,
  Home,
  Users,
  Utensils,
  ClipboardList,
  ChartNoAxesColumnIncreasing 
} from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './header.html'
})
export class Header {
  currentRoute = '';

  constructor(private router: Router) {
    // Escuta mudanças de rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  readonly Home = Home;
  readonly Users = Users;
  readonly Utensils = Utensils;
  readonly ClipboardList = ClipboardList;
  readonly ChartNoAxesColumnIncreasing = ChartNoAxesColumnIncreasing;

  navItems = [
    {text: 'Home', icon: Home, link: '/'},
    {text: 'Clientes', icon: Users, link: '/customers'},
    {text: 'Pratos', icon: Utensils, link: '/dishes'},
    {text: 'Pedidos', icon: ClipboardList, link: '/order'},
    {text: 'Relatórios', icon: ChartNoAxesColumnIncreasing, link: '/reports'},
  ]

  navigate(path: string) {
    this.router.navigate([path])
  }

  isActive(link: string): boolean {
    return this.currentRoute === link || (link !== '/' && this.currentRoute.startsWith(link));
  }
}
