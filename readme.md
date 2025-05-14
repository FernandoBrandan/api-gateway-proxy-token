---
title: "Api Gateway"
description: "Punto centralizado para gestionar solicitudes hacia diferentes servicios, ofreciendo autenticación, autorización y enrutamiento seguro."
slug: "apigateway"
---

## ApiGateway version Token

Esta API de autenticación desarrollada con Node.js y TypeScript está diseñada como un API Gateway dentro de una arquitectura de microservicios, lo que permite un enfoque escalable y modular.
Su principal objetivo es actuar como un punto centralizado para gestionar solicitudes hacia diferentes servicios, ofreciendo autenticación, autorización y enrutamiento seguro.

La API implementa un sistema de registro, inicio de sesión y validación de usuarios utilizando tokens JWT (JSON Web Tokens) para garantizar la seguridad de las operaciones.
Al estar integrada en una arquitectura de microservicios, facilita la comunicación entre múltiples servicios independientes, asegurando que las solicitudes sean procesadas de manera eficiente y segura.

> [Código fuente](https://github.com/)

> [Versión mtls](https://www.youtube.com/)

### Tecnologias

- Backend: Node.js con TypeScript
- Base de Datos: MongoDB (usuarios) y MySQL (rutas proxy)
- Contenedores: Docker

### Dependencias principales

| Tipo          | NPM                | Descripcion                           |
| ------------- | ------------------ | ------------------------------------- |
| Framework     | express            | Crear el servidor y definir rutas     |
| Base de Datos | mongoose, mysql2   | Conexión a MongoDB y MySQL            |
| Configuración | dotenv             | Manejo de variables de entorno        |
| Seguridad     | cors               | Control de acceso entre dominios      |
| Seguridad     | helmet             | Configuración de cabeceras seguras    |
| Seguridad     | express-rate-limit | Prevención de ataques de fuerza bruta |
| Encriptación  | bcrypt             | Hashing de contraseñas                |
| Encriptación  | jsonwebtoken       | Generación y validación de tokens     |
| Validación    | joi                | Validación de datos de entrada        |
|               |                    |                                       |

### Rutas

| Metodo | Ruta                                    | Descripcion                       |
| ------ | --------------------------------------- | --------------------------------- |
| POST:  | http://localhost:3000/api/auth/register | Registrar un usuario nuevo        |
| POST:  | http://localhost:3000/api/auth/login    | Iniciar sesión y obtener un token |
| GET :  | http://localhost:3000/api/auth/validate | Validar un token JWT              |
|        |                                         |                                   |

### Ejemplos de uso

- POST : http://localhost:3000/api/auth/register

```json
{
  "name": "Fer",
  "surname": "Fer",
  "nick": "Fer",
  "email": "fer@fer.com",
  "password": "fer",
  "role": "user",
  "image": "https://example.com/image.jpg"
}
```

- POST : http://localhost:3000/api/auth/login

```json
{
  "email": "fer@fer.com",
  "password": "fer"
}
```

Response

```json
{
  "success": "Usuario logueado correctamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRmVyIiwic3VybmFtZSI6IkZlciIsImVtYWlsIjoiZmVyQGZlci5jb20iLCJpYXQiOjE3MzcxMzcxMzgsImV4cCI6MTczNzE0MDczOH0.jzbD91qipxWDcknEWpVbNIUZiQ2PVUkvy4-upacY0Po"
}
```

- GET : http://localhost:3000/api/auth/validate

```
Authorization: Bearer <token>
```

## Se implementa discovery server con configuracion centralizada (consul)

[DiscoveryServer](discoveryServer.mdx)

#### Pendientes:

- Crear services
- Swagger

#### Implementación de Redis:

- funcionalidades integradas:
  - Rama Seguridad: Autenticación, Autorización, JWT, OAuth.
  - Rama Redis: Caché, Rate Limiting, gestión de sesiones.
  - Rama Consulta de Productos: Enrutamiento a servicios de catálogo/búsqueda.
  - Rama Flujo de Órdenes: Enrutamiento a servicios de carrito/checkout/pagos. - > Patrón SAGA

## Riesgos

`Futuras implementaciones`

El Gateway se convierte en un cuello de botella -> Usar balanceo de carga Nginx
