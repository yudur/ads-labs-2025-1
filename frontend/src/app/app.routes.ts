import { Routes } from '@angular/router';
import { Default } from './layout/default/default';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Default,
        children: [
            {path: '', component: Home}
        ]
    }
];
