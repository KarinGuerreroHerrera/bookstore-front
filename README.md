### 1. Para probar
cd bookstore-front
npm install
### 2. Ejecutar la aplicación
npm run dev
Abrir [http://localhost:3000](http://localhost:3000) en el navegador.
### 3. Ejecutar las pruebas
npm test

## Cambios
Se usó un  `AuthorsContext` con `createContext` y `useReducer` de React para que los datos de los autores no se pierdan al cambiar de página. Este contexto envuelve toda la aplicación desde `layout.js`, así cualquier componente puede acceder y modificar la información de los autores. El filtro de autores se hizo dentro del componente de la lista (`/authors`). Solo se usa un estado llamado `query` para guardar lo que escribe el usuario. Luego, en el renderizado, se aplica `.filter()` a la lista de autores y se compara el texto usando `.toLowerCase()` para que el filtro funcione sin importar si las letras son mayúsculas o minúsculas. Esto evita tener que crear otro estado para la lista filtrada.
