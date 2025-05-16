Inventario de Repuestos

Aplicación Full-Stack de gestión de inventario de repuestos, construida con:

Backend: Laravel + Sanctum (API REST)

Frontend: Vue 3 + Vuetify 3 + Pinia

Base de datos: MySQL (local o Docker)

Contenedores: Docker y Docker Compose

Tests: PHPUnit (backend) + Vitest (frontend)

📝 Prerrequisitos

Docker y Docker Compose (si vas a usar contenedores)

PHP 8.2+ instalado localmente o en contenedor (extensiones: pdo_mysql, pdo_sqlite para tests)

Composer

Node.js 18+ y npm (para el frontend)

🚀 Setup con Docker

Clona el repositorio:

git clone <tu-repo-url>
cd inventario-repuestos

Copia y ajusta variables de entorno:

cp backend/.env.example backend/.env
cp front/.env.example front/.env

Configura (en backend/.env):

APP_KEY=base64:... (genera con `php artisan key:generate`)
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=inventario
DB_USERNAME=root
DB_PASSWORD=secret

En front/.env:

VITE_API_URL=http://localhost:8001/api/v1

Levanta contenedores:

docker-compose up -d --build

Ejecuta migraciones y seeders:

docker-compose exec api php artisan migrate --seed

¡Listo! Backend en http://localhost:8001, Frontend en http://localhost:3001.

🛠️ Setup local (sin Docker)

Backend

cd backend
composer install
php artisan key:generate
# Configura .env con tu conexión MySQL local
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8001

Frontend

cd front
npm install
# Asegúrate de que VITE_API_URL apunte a tu API
npm run dev

📚 Uso de la API

La API expone rutas bajo /api/v1:

Método

Ruta

Descripción

Middleware

POST

/auth/register

Registro de usuario

-

POST

/auth/login

Login y token

-

POST

/auth/logout

Logout del token

auth:sanctum

GET

/categorias

Listar categorías

auth:sanctum

POST

/categorias

Crear categoría

auth:sanctum

PUT

/categorias/{id}

Actualizar

auth:sanctum

DELETE

/categorias/{id}

Eliminar

auth:sanctum

GET

/productos

Listar productos

auth:sanctum

POST

/productos

Crear producto

auth:sanctum

PUT

/productos/{id}

Actualizar

auth:sanctum

DELETE

/productos/{id}

Eliminar

auth:sanctum

GET

/proveedores

Listar proveedores

auth:sanctum

POST

/proveedores

Crear proveedor

auth:sanctum

PUT

/proveedores/{id}

Actualizar

auth:sanctum

DELETE

/proveedores/{id}

Eliminar

auth:sanctum

Nota: Para probar endpoints protegidos, envía el header Authorization: Bearer <token>.

🧪 Tests Backend (PHPUnit)

Instala PHPUnit (si no está):

composer require --dev phpunit/phpunit

Habilita pdo_sqlite en tu PHP (php.ini o Dockerfile).

Ejecuta:

php artisan test
# o directamente:
vendor/bin/phpunit

🧪 Tests Frontend (Vitest)

Dentro de front/ instala dependencias de test:

npm install --save-dev vitest @vue/test-utils jsdom

Asegúrate de tener un archivo vitest.config.ts configurado.

Ejecuta:

npm run test:unit

👷‍♀️ Estructura del Proyecto

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