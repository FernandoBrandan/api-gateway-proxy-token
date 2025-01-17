# Version con Token

Esta es una API de autenticación desarrollada con Node.js y TypeScript. Implementa un sistema de registro, inicio de sesión y validación de usuarios mediante tokens JWT. Utiliza MongoDB para gestionar usuarios y MySQL para registrar rutas de proxy.


## Tecnologias 

Backend: Node.js con TypeScript
Base de Datos: MongoDB (usuarios) y MySQL (rutas proxy)
Contenedores: Docker

## Dependencias principales

Librerías necesarias para que la aplicación funcione correctamente.

| Tipo            | NPM                   | Descripcion           |
| --------------- | --------------------- | --------------------- |
| Framework	        | express	            | Crear el servidor y definir rutas | 
| Base de Datos	    | mongoose, mysql2	    | Conexión a MongoDB y MySQL | 
| Configuración	    | dotenv	            | Manejo de variables de entorno | 
| Seguridad	        | cors	                | Control de acceso entre dominios | 
| Seguridad	        | helmet	            | Configuración de cabeceras seguras | 
| Seguridad	        | express-rate-limit	| Prevención de ataques de fuerza bruta | 
| Encriptación	    | bcrypt	            | Hashing de contraseñas | 
| Encriptación	    | jsonwebtoken	        | Generación y validación de tokens | 
| Validación	    | joi	                | Validación de datos de entrada | 
| Rendimiento	    | node-cache	        | Caché en memoria para mejorar tiempos de respuesta | 


## Rutas

|Metodo|Ruta|Descripcion|
| --------------- | --------------------- | --------------------- |
| POST: | http://localhost:3000/api/auth/register | Registrar un usuario nuevo  |
| POST: | http://localhost:3000/api/auth/login    |	Iniciar sesión y obtener un token   |
| GET : | http://localhost:3000/api/auth/validate | Validar un token JWT    |

## Ejemplos de uso


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
Authorization: Bearer <token>

#### Pendientes:
- Crear services
- Swagger

