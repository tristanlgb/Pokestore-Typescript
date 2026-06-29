# PokeStore — E-commerce en TypeScript

Tienda online temática de Pokémon desarrollada con React y TypeScript. Permite explorar un catálogo, filtrar productos, consultar detalles, administrar un carrito y registrar órdenes en Firebase Firestore.

## Funcionalidades

- Catálogo de productos desde Firestore.
- Filtrado por categorías.
- Vista de detalle y selección de cantidad.
- Carrito global mediante React Context.
- Cálculo de unidades y precio total.
- Formulario de checkout.
- Registro de órdenes y presentación del ID de compra.
- Ruta de página no encontrada.

## Stack

- React 19 y TypeScript
- Vite
- React Router DOM
- Firebase y Firestore
- React Context
- React Bootstrap, Bootstrap y React Icons
- ESLint

## Organización

- `src/components/`: catálogo, detalle, carrito y checkout.
- `src/context/CartContext.tsx`: estado y operaciones del carrito.
- `src/firebase/firebaseConfig.tsx`: inicialización de Firebase.
- `src/types/`: tipos de productos y elementos del carrito.

## Ejecución

```bash
npm install
npm run dev
```

Para usar una instancia propia, configurar Firebase en `src/firebase/firebaseConfig.tsx` y crear las colecciones esperadas por la aplicación.

## Calidad

```bash
npm run build
npm run lint
npm run preview
```

> Proyecto educativo de e-commerce enfocado en React, tipado y persistencia cloud.