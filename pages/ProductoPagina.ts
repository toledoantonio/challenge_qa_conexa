import { expect, type Page } from '@playwright/test';

export class ProductoPagina {
  constructor(private readonly page: Page) {}

  async validarTituloProducto(nombreProducto: string) {
    await expect(this.page.getByRole('heading', { name: nombreProducto })).toBeVisible();
  }

  async agregarAlCarrito() {
    const dialogPromise = this.page.waitForEvent('dialog');

    await this.page.getByRole('link', { name: 'Add to cart' }).click();

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  }
}
