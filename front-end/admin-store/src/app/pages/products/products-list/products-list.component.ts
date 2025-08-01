import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService, Product } from '../../../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, CurrencyPipe],
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent {
  private svc = inject(ProductsService);
  products$: Observable<Product[]> = this.svc.list();

  remove(id: number) {
    this.svc.delete(id).subscribe(() => {
      this.products$ = this.svc.list(); // refresca
    });
  }
}
