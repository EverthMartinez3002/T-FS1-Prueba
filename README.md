# 🏭 Inventario de Repuestos

Aplicación **Full-Stack** para la gestión de inventario de repuestos.

---

## 🛠️ Tecnologías

- **Backend:** Laravel + Sanctum (API REST)
- **Frontend:** Vue 3 + Vuetify 3 + Pinia
- **Base de datos:** MySQL (local o Docker)
- **Contenedores:** Docker y Docker Compose
- **Tests:** PHPUnit (backend) + Vitest (frontend)

---

## � Prerrequisitos

- Docker y Docker Compose (opcional)
- PHP 8.2+ (extensiones: `pdo_mysql`, `pdo_sqlite` para tests)
- Composer
- Node.js 18+ y npm

---

## 🚀 Setup con Docker

1. **Clona el repositorio:**
   ```sh
   git clone <tu-repo-url>
   cd inventario-repuestos
   ```

2. **Copia y ajusta variables de entorno:**
   ```sh
   cp backend/.env.example backend/.env
   cp front/.env.example front/.env
   ```

   - En `backend/.env`:
     ```
     APP_KEY=base64:... (genera con `php artisan key:generate`)
     DB_CONNECTION=mysql
     DB_HOST=mysql
     DB_PORT=3306
     DB_DATABASE=inventario
     DB_USERNAME=root
     DB_PASSWORD=secret
     ```
   - En `front/.env`:
     ```
     VITE_API_URL=http://localhost:8001/api/v1
     ```

3. **Levanta los contenedores:**
   ```sh
   docker-compose up -d --build
   ```

4. **Ejecuta migraciones y seeders:**
   ```sh
   docker-compose exec api php artisan migrate --seed
   ```

5. **¡Listo!**
   - Backend: [http://localhost:8001](http://localhost:8001)
   - Frontend: [http://localhost:3001](http://localhost:3001)

---

## 🛠️ Setup local (sin Docker)

### Backend

```sh
cd backend
composer install
php artisan key:generate
# Configura .env con tu conexión MySQL local
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8001
```

### Frontend

```sh
cd front
npm install
# Asegúrate de que VITE_API_URL apunte a tu API
npm run dev
```

---

## 📚 Uso de la API

Las rutas de la API están bajo `/api/v1`:

| Método | Ruta                       | Descripción           | Middleware      |
|--------|----------------------------|-----------------------|-----------------|
| POST   | /auth/register             | Registro de usuario   | -               |
| POST   | /auth/login                | Login y token         | -               |
| POST   | /auth/logout               | Logout del token      | auth:sanctum    |
| GET    | /categorias                | Listar categorías     | auth:sanctum    |
| POST   | /categorias                | Crear categoría       | auth:sanctum    |
| PUT    | /categorias/{id}           | Actualizar categoría  | auth:sanctum    |
| DELETE | /categorias/{id}           | Eliminar categoría    | auth:sanctum    |
| GET    | /productos                 | Listar productos      | auth:sanctum    |
| POST   | /productos                 | Crear producto        | auth:sanctum    |
| PUT    | /productos/{id}            | Actualizar producto   | auth:sanctum    |
| DELETE | /productos/{id}            | Eliminar producto     | auth:sanctum    |
| GET    | /proveedores               | Listar proveedores    | auth:sanctum    |
| POST   | /proveedores               | Crear proveedor       | auth:sanctum    |
| PUT    | /proveedores/{id}          | Actualizar proveedor  | auth:sanctum    |
| DELETE | /proveedores/{id}          | Eliminar proveedor    | auth:sanctum    |

> **Nota:** Para endpoints protegidos, envía el header:  
> `Authorization: Bearer <token>`

---

## 🧪 Tests Backend (PHPUnit)

1. Instala PHPUnit (si no está):
   ```sh
   composer require --dev phpunit/phpunit
   ```
2. Habilita `pdo_sqlite` en tu PHP (`php.ini` o Dockerfile).
3. Ejecuta:
   ```sh
   php artisan test
   # o directamente:
   vendor/bin/phpunit
   ```

---

## 🧪 Tests Frontend (Vitest)

1. Instala dependencias de test:
   ```sh
   npm install --save-dev vitest @vue/test-utils jsdom
   ```
2. Asegúrate de tener un archivo `vitest.config.ts` configurado.
3. Ejecuta:
   ```sh
   npm run test:unit
   ```

---

## � Estructura del Proyecto

```
inventario-repuestos/
├─ backend/            # Laravel API
│  ├─ app/
│  ├─ routes/
│  ├─ database/migrations/
│  ├─ database/seeders/
│  ├─ tests/           # PHPUnit tests
│  └─ Dockerfile, .env
├─ front/              # Vue 3 + Vuetify 3 + Pinia
│  ├─ src/
│  │  ├─ views/
│  │  ├─ services/
│  │  ├─ router/
│  │  └─ store/
│  ├─ tests/           # Vitest tests
│  └─ vite.config.ts, .env
└─ docker-compose.yml
```

---
