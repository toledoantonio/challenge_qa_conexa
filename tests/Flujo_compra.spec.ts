import { test } from '@playwright/test';
import { CarritoPagina } from '../pages/CarritoPagina';
import { HomePagina } from '../pages/HomePagina';
import { ProductoPagina } from '../pages/ProductoPagina';

test.describe('Flujo de compra - Demoblaze', () => {
  test('agregar un producto al carrito y confirmar compra', async ({ page }) => {
    const nombreProducto = 'Samsung galaxy s6';
    const precioProducto = '360';
    const buyerData = {
      name: 'Antonio Toledo',
      country: 'Argentina',
      city: 'Cordoba',
      card: '2111111111111111',
      month: '07',
      year: '2026',
    };

    const homePagina = new HomePagina(page);
    const productoPagina = new ProductoPagina(page);
    const carritoPagina = new CarritoPagina(page);

    await test.step('Ingresar a Demoblaze y seleccionar producto', async () => {
      await homePagina.ingresar();
      await homePagina.seleccionarProducto(nombreProducto);
    });

    await test.step('Validar producto y agregarlo al carrito', async () => {
      await productoPagina.validarTituloProducto(nombreProducto);
      await productoPagina.agregarAlCarrito();
    });

    await test.step('Validar carrito y precio del producto', async () => {
      await carritoPagina.ingresar();
      await carritoPagina.validarProductoListado(nombreProducto);
      await carritoPagina.validarPrecioProducto(precioProducto);
    });

    await test.step('Completar compra y validar confirmacion final', async () => {
      await carritoPagina.iniciarOrden();
      await carritoPagina.completarCompra(buyerData);
      await carritoPagina.validarConfirmacionCompra(precioProducto);
    });
  });
});
