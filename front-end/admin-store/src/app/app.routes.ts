import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  { path: 'products', component: ProductsListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id', component: ProductFormComponent },

  { path: 'categories', component: CategoriesListComponent },
  { path: 'categories/new', component: CategoryFormComponent },
  { path: 'categories/:id', component: CategoryFormComponent },

  { path: '**', redirectTo: 'products' },
];
