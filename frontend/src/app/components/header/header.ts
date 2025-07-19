import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private router: Router) {}

  readonly Home = Home;
  readonly Users = Users;
  readonly Utensils = Utensils;
  readonly ClipboardList = ClipboardList;
  readonly ChartNoAxesColumnIncreasing = ChartNoAxesColumnIncreasing

  navItems = [
    {text: 'Home', icon: Home, link: '/'},
    {text: 'Clientes', icon: Users, link: '/customers'},
    {text: 'Pratos', icon: Utensils, link: '/dishes'},
    {text: 'Pedidos', icon: ClipboardList, link: '/order'},
    {text: 'Relatórios', icon: ChartNoAxesColumnIncreasing, link: '/report'},
  ]


  navigate(path: string) {
    this.router.navigate([path])
  }
}
