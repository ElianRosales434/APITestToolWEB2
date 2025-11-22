# API Test Tool (Angular)

Aplicación web ligera y minimalista para realizar pruebas de APIs REST mediante solicitudes HTTP reales. Desarrollada con Angular 19+ y basada exclusivamente en HttpClient, sin backend adicional.

## Descripción General

API Test Tool permite enviar solicitudes HTTP de tipo GET, POST, PUT, PATCH y DELETE.
La aplicación muestra en tiempo real:

Código de estado HTTP

Tiempo de respuesta

Headers devueltos por el servidor

Cuerpo de respuesta formateado en JSON

El proyecto fue diseñado siguiendo buenas prácticas en arquitectura, separación por componentes y uso de servicios especializados.

## Tecnologías Utilizadas

Angular 19+ (standalone components)

TypeScript

HttpClient

RxJS

Formularios reactivos (FormGroup, FormArray)

SCSS

Arquitectura modular

## Estructura del Proyecto
src/
 ├── app/
 │   ├── components/
 │   │   ├── request-panel/      # Panel de solicitud (URL, método, body, headers)
 │   │   └── response-view/      # Vista de respuesta HTTP
 │   ├── core/
 │   │   └── api.service.ts      # Servicio encargado de enviar solicitudes HTTP
 │   ├── app.component.ts
 │   ├── app.component.html
 │   └── app.component.scss
 └── styles.scss                 # Estilos globales

## Instalación y Ejecución
### 1. Clonar el repositorio
git clone https://github.com/tu-usuario/api-test-tool.git
cd api-test-tool

### 2. Instalar dependencias
npm install

### 3. Ejecutar en modo desarrollo
ng serve -o


La aplicación se cargará en:

http://localhost:4200

## Uso de la Aplicación

Seleccionar el método HTTP.

Ingresar una URL válida.

Agregar headers personalizados (tantos como sean necesarios).

Si el método lo requiere, ingresar un body en formato JSON.

Presionar el botón “Enviar”.

La vista derecha mostrará:

Código de estado

Tiempo en milisegundos

Headers devueltos

Cuerpo de la respuesta formateado

## Endpoints Recomendados para Pruebas
Método	URL	Descripción

GET	https://jsonplaceholder.typicode.com/posts/1
	Obtiene un recurso
  
GET	https://jsonplaceholder.typicode.com/users
	Lista de usuarios
  
POST	https://jsonplaceholder.typicode.com/posts
	Crea un recurso falso
  
PUT	https://jsonplaceholder.typicode.com/posts/1
	Reemplaza un recurso
  
PATCH	https://jsonplaceholder.typicode.com/posts/1
	Actualización parcial
  
DELETE	https://jsonplaceholder.typicode.com/posts/1
	Elimina un recurso

## Arquitectura de la Solución
### RequestPanelComponent

Administra el formulario reactivo.

Permite añadir headers mediante un FormArray dinámico.

Convierte el body desde texto a JSON.

Emite un objeto ApiResult al componente padre.

### ApiService

Envía solicitudes HTTP usando HttpClient.

Maneja headers, métodos y cuerpos según corresponda.

Devuelve la respuesta completa del servidor (status, body, headers).

### ResponseViewComponent

Recibe un ApiResult mediante @Input.

Presenta la información formateada y ordenada.

### ApiResult (interfaz)

Abstrae la respuesta en una estructura clara: status, headers, tiempo y body.
