import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: number; // igual al backend
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private base = '/api/products';

  list(): Observable<Product[]> { return this.http.get<Product[]>(this.base); }
  get(id: number): Observable<Product> { return this.http.get<Product>(`${this.base}/${id}`); }
  create(dto: Product): Observable<Product> { return this.http.post<Product>(this.base, dto); }
  update(id: number, dto: Product): Observable<Product> { return this.http.put<Product>(`${this.base}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }

  // alias opcional
  remove(id: number): Observable<void> { return this.delete(id); }
}
