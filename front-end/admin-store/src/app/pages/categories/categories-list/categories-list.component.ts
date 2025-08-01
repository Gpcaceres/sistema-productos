import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent {
  private svc = inject(CategoriesService);
  categories$ = this.svc.list(); // ya existente en tu service

  trackById = (_: number, item: any) => item.id;

  remove(id: number) {
    if (!confirm('¿Eliminar esta categoría? Esta acción no se puede deshacer.')) return;
    this.svc.delete(id).subscribe(() => (this.categories$ = this.svc.list()));
  }
}
