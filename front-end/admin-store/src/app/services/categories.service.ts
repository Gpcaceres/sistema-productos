import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  name: string;
  description?: string | null;
}

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http = inject(HttpClient);
  private base = '/api/categories';

  list(): Observable<Category[]> { return this.http.get<Category[]>(this.base); }
  get(id: number): Observable<Category> { return this.http.get<Category>(`${this.base}/${id}`); }
  create(dto: Partial<Category>): Observable<Category> { return this.http.post<Category>(this.base, dto); }
  update(id: number, dto: Partial<Category>): Observable<Category> { return this.http.put<Category>(`${this.base}/${id}`, dto); }

  // ✅ agrega este método
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // (opcional) alias por si en algún lado llamas remove()
  remove(id: number): Observable<void> {
    return this.delete(id);
  }
}
