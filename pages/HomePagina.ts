import { type Page } from '@playwright/test';

export class HomePagina {
  constructor(private readonly page: Page) {}

  async ingresar() {
    await this.page.goto('/index.html');
  }

  async seleccionarProducto(nombreProducto: string) {
    await this.page.getByRole('link', { name: nombreProducto, exact: true }).click();
  }
}
