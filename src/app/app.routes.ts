import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent:()=> import('./products/pages/home/home.component').then(c=> c.HomeComponent)
            },{
                path: 'about',
                loadComponent:()=> import('./about/about.component').then(c => c.AboutComponent)
            },
            {
               path: 'product/:id',
               loadComponent: () => import('./products/pages/product-detail/product-detail.component').then(c => c.ProductDetailComponent)
            },
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
