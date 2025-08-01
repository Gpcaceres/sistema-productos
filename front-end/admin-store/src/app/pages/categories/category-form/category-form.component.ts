// src/app/pages/categories/category-form/category-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private svc = inject(CategoriesService);

  // usado por el template: {{ id ? 'Editar' : 'Crear' }}
  id = Number(this.route.snapshot.paramMap.get('id') ?? 0);

  // usado por el template: [formGroup]="form", form.controls.*
  form = this.fb.group({
    name: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
  });

  ngOnInit(): void {
    if (this.id) {
      this.svc.get(this.id).subscribe(cat => {
        if (cat) {
          this.form.patchValue({
            name: cat.name ?? '',
            description: cat.description ?? '',
          });
        }
      });
    }
  }

  // usado por el template: (ngSubmit)="save()"
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue(); // { name: string; description: string }

    const req = this.id
      ? this.svc.update(this.id, v as any)
      : this.svc.create(v as any);

    req.subscribe(() => this.router.navigate(['/categories']));
  }
}
