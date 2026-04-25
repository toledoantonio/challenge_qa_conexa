import { expect, type Page } from '@playwright/test';

type BuyerData = {
  name: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;
};

export class CarritoPagina {
  constructor(private readonly page: Page) {}

  async ingresar() {
    await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
  }

  async validarProductoListado(nombreProducto: string) {
    await expect(this.page.locator('#tbodyid')).toContainText(nombreProducto);
  }

  async validarPrecioProducto(precioProducto: string) {
    await expect(this.page.locator('#tbodyid')).toContainText(precioProducto);
  }

  async iniciarOrden() {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
    await expect(this.page.locator('#orderModal')).toBeVisible();
  }

  async completarCompra(buyerData: BuyerData) {
    await this.page.locator('#name').fill(buyerData.name);
    await this.page.locator('#country').fill(buyerData.country);
    await this.page.locator('#city').fill(buyerData.city);
    await this.page.locator('#card').fill(buyerData.card);
    await this.page.locator('#month').fill(buyerData.month);
    await this.page.locator('#year').fill(buyerData.year);
    await this.page.getByRole('button', { name: 'Purchase' }).click();
  }

  async validarConfirmacionCompra(montoEsperado: string) {
    const confirmation = this.page.locator('.sweet-alert');

    await expect(confirmation.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
    await expect(confirmation.locator('p')).toContainText(`Amount: ${montoEsperado} USD`);
    await confirmation.getByRole('button', { name: 'OK' }).click();
  }
}
