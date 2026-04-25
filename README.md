# Challenge QA Automation - Conexa

Automatizacion E2E realizada como parte del challenge tecnico para el puesto de QA Engineer.

## Herramienta utilizada

- Playwright
- TypeScript
- Node.js

## Sitio automatizado

https://www.demoblaze.com/

## Flujo automatizado

Se automatiza un flujo de compra en Demoblaze:

1. Ingresar al sitio.
2. Seleccionar un producto.
3. Agregar el producto al carrito.
4. Validar que el producto se encuentre en el carrito.
5. Completar el formulario de compra.
6. Confirmar la compra.
7. Validar que se muestre el mensaje de compra exitosa.

## Instalacion

```bash
npm install
```

Si los navegadores de Playwright no estan instalados:

```bash
npx playwright install
```

## Ejecucion

```bash
npm test
```

Para ver el navegador durante la ejecucion:

```bash
npm run test:headed
```

Para abrir el reporte HTML luego de una ejecucion:

```bash
npm run test:report
```
