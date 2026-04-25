import { test } from '@playwright/test';
import { CarritoPagina } from '../pages/CarritoPagina';
import { HomePagina } from '../pages/HomePagina';
import { ProductoPagina } from '../pages/ProductoPagina';

test.describe('Flujo de compra en Demoblaze', () => {
  test('agrega un producto al carrito y confirma la compra', async ({ page }) => {
    const nombreProducto = 'Samsung galaxy s6';
    const precioProducto = '360';
    const buyerData = {
      name: 'Ana Toledo',
      country: 'Argentina',
      city: 'Buenos Aires',
      card: '4111111111111111',
      month: '04',
      year: '2026',
    };

    const homePagina = new HomePagina(page);
    const productoPagina = new ProductoPagina(page);
    const carritoPagina = new CarritoPagina(page);

    await homePagina.ingresar();
    await homePagina.seleccionarProducto(nombreProducto);

    await productoPagina.validarTituloProducto(nombreProducto);
    await productoPagina.agregarAlCarrito();

    await carritoPagina.ingresar();
    await carritoPagina.validarProductoListado(nombreProducto);
    await carritoPagina.validarPrecioProducto(precioProducto);
    await carritoPagina.iniciarOrden();
    await carritoPagina.completarCompra(buyerData);
    await carritoPagina.validarConfirmacionCompra(precioProducto);
  });
});
