import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent:()=> import('./home/home.component').then(c=> c.HomeComponent)
            },{
                path: 'about',
                loadComponent:()=> import('./about/about.component').then(c => c.AboutComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
