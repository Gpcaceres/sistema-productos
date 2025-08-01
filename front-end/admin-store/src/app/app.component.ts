import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly year = new Date().getFullYear();
  theme: 'light' | 'dark' | 'system' = 'system';

  constructor() {
    const saved = localStorage.getItem('theme') as ('light'|'dark'|'system'|null);
    this.theme = saved ?? 'system';
    this.applyTheme();
  }

  toggleTheme() {
    // ciclo: system -> light -> dark -> system ...
    this.theme = this.theme === 'system' ? 'light' : this.theme === 'light' ? 'dark' : 'system';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  private applyTheme() {
    const root = document.documentElement; // <html>
    if (this.theme === 'system') {
      root.removeAttribute('data-theme');  // usa prefers-color-scheme
    } else {
      root.setAttribute('data-theme', this.theme); // fuerza light/dark
    }
  }

  // opcional: icono según tema actual
  get themeLabel() {
    return this.theme === 'system' ? 'Sistema' : this.theme === 'light' ? 'Claro' : 'Oscuro';
  }
  get themeIcon() {
    return this.theme === 'system' ? '🖥️' : this.theme === 'light' ? '🌞' : '🌙';
  }
}
