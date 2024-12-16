import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then(m => m.HomeComponent);
        }
    },
    {
        path: 'external',
        loadComponent: () => {
            return import('./external/external.component').then(m => m.ExternalComponent);
        }
    },
    {
        path: ':symbol',
        loadComponent: () => {
            return import('./components/stockdata/stockdata.component').then(m => m.StockdataComponent);
        }
    }
];
