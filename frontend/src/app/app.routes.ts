import { Routes } from '@angular/router';
import { Default } from './layout/default/default';
import { Home } from './pages/home/home';
import { Customers } from './pages/customers/customers';
import { Dishes } from './pages/dishes/dishes';
import { Order } from './pages/order/order';
import { Reports } from './pages/reports/reports';

export const routes: Routes = [
    {
        path: '',
        component: Default,
        children: [
            {path: '', component: Home},
            {path: 'customers', component: Customers},
            {path: 'dishes', component: Dishes},
            {path: 'order', component: Order},
            {path: 'reports', component: Reports},
        ]
    }
];
