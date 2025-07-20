import { Routes } from '@angular/router';
import { Default } from './layout/default/default';
import { Home } from './pages/home/home';
import { Customers } from './pages/customers/customers';

export const routes: Routes = [
    {
        path: '',
        component: Default,
        children: [
            {path: '', component: Home},
            {path: 'customers', component: Customers},
        ]
    }
];
