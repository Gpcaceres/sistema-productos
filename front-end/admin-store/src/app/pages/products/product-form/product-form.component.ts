import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService, Product } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productsSvc = inject(ProductsService);
  categoriesSvc = inject(CategoriesService); // usado en el template

  id = Number(this.route.snapshot.paramMap.get('id') ?? 0);

  form = this.fb.group({
    name: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    price: this.fb.control<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.11)], // backend exige > 0.1
    }),
    // debe llamarse "category" como en tu backend (Long category)
    category: this.fb.control<number | null>(null, { validators: [Validators.required] }),
  });

  // opciones del select
  categories$ = this.categoriesSvc.list();

  ngOnInit() {
    if (this.id) {
      this.productsSvc.get(this.id).subscribe((p: Product) => {
        this.form.patchValue({
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
        });
      });
    }
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const dto: Product = {
      name: v.name,
      description: v.description,
      price: v.price,
      category: v.category!, // validado
    };

    const req = this.id
      ? this.productsSvc.update(this.id, dto)
      : this.productsSvc.create(dto);

    req.subscribe(() => this.router.navigate(['/products']));
  }
}
