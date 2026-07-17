# Demo Open Code

API REST construida con Spring Boot 4.1.0, con autenticacion JWT, gestion de usuarios y persistencia en MySQL a traves de Docker Compose.

## Stack Tecnologico

- **Java 17** / **Spring Boot 4.1.0**
- **Spring Security** + JWT (JJWT 0.12.6)
- **Spring Data JPA** + Hibernate
- **MySQL 8.0** (Docker Compose)
- **H2 Database** (solo tests)
- **Lombok**
- **JUnit 5** + Mockito + MockMvc

## Estructura del Proyecto

```
src/main/java/com/pblgllgs/demoopencode/
├── DemoOpenCodeApplication.java
├── controller/
│   ├── AuthController.java
│   └── UserController.java
├── dto/
│   ├── AuthRequest.java
│   ├── AuthResponse.java
│   └── RegisterRequest.java
├── model/
│   └── User.java
├── repository/
│   └── UserRepository.java
├── security/
│   ├── CustomUserDetailsService.java
│   ├── JwtAuthenticationFilter.java
│   ├── JwtUtil.java
│   └── SecurityConfig.java
└── service/
    ├── AuthService.java
    └── UserService.java
```

## Inicio Rapido

### Requisitos

- Java 17+
- Docker y Docker Compose
- Maven

### Ejecutar la aplicacion

```bash
docker compose up -d
./mvnw spring-boot:run
```

MySQL se inicia automaticamente en el puerto `3306`. La base de datos `demo_open_code` se crea al arrancar.

## Rutas de la API

### Autenticacion (publicas)

| Metodo | Ruta                 | Cuerpo             | Descripcion           |
|--------|----------------------|--------------------|-----------------------|
| POST   | `/api/auth/register` | `RegisterRequest`  | Registrar nuevo usuario |
| POST   | `/api/auth/login`    | `AuthRequest`      | Iniciar sesion, obtener JWT |

### Gestion de Usuarios (requiere JWT)

| Metodo | Ruta             | Cuerpo  | Descripcion           |
|--------|------------------|---------|-----------------------|
| GET    | `/api/users`     | -       | Listar todos los usuarios |
| GET    | `/api/users/{id}`| -       | Obtener usuario por ID |
| POST   | `/api/users`     | `User`  | Crear usuario         |
| PUT    | `/api/users/{id}`| `User`  | Actualizar usuario    |
| DELETE | `/api/users/{id}`| -       | Eliminar usuario      |

### Actuator (publico)

| Metodo | Ruta            | Descripcion           |
|--------|-----------------|-----------------------|
| GET    | `/actuator/**`  | Salud y metricas      |

### Ejemplos de peticiones

**Registro**
```json
POST /api/auth/register
{
  "name": "Juan",
  "email": "juan@ejemplo.com",
  "password": "secreto123"
}

Respuesta 200:
{
  "token": "eyJhbGciOiJIUz..."
}
```

**Inicio de sesion**
```json
POST /api/auth/login
{
  "email": "juan@ejemplo.com",
  "password": "secreto123"
}

Respuesta 200:
{
  "token": "eyJhbGciOiJIUz..."
}
```

**Peticion autenticada**
```
GET /api/users
Authorization: Bearer eyJhbGciOiJIUz...
```

## Seguridad

- `/api/auth/**` y `/actuator/**` son accesibles publicamente.
- Todos los demas endpoints requieren un JWT valido en el header `Authorization: Bearer <token>`.
- Las sesiones son stateless (basadas en JWT).
- Las contrasenas se cifran con BCrypt.
- El secreto JWT y su tiempo de expiracion se configuran en `application.properties`.

## Tests

43 pruebas que cubren todas las capas. Ejecutar con:

```bash
./mvnw test
```

### Desglose de pruebas

| Clase                                | Pruebas | Descripcion                                             |
|--------------------------------------|---------|---------------------------------------------------------|
| `JwtUtilTest`                        | 6       | Generacion, extraccion y validacion de tokens, expiracion |
| `CustomUserDetailsServiceTest`       | 3       | Busqueda de usuario por email, no encontrado, autoridades |
| `JwtAuthenticationFilterTest`        | 6       | Logica del filtro: sin header, token invalido/valido    |
| `UserServiceTest`                    | 9       | Operaciones CRUD, excepciones de no encontrado          |
| `AuthServiceTest`                    | 6       | Registro (cifrado, rol), login, generacion de token     |
| `AuthControllerTest`                 | 4       | Endpoints de registro/login, JSON invalido              |
| `UserControllerTest`                 | 8       | Todos los endpoints CRUD, excepciones de no encontrado  |
| `DemoOpenCodeApplicationTests`       | 1       | Carga del contexto Spring con H2                        |

### Arquitectura de tests

- **Tests unitarios** usan Mockito directamente (sin contexto Spring) para ejecucion rapida.
- **Tests de controllers** usan MockMvc standalone con servicios mockeados.
- **Test de integracion** (`contextLoads`) levanta el contexto completo de Spring contra una base H2 en memoria.
- Los tests son independientes de Docker/MySQL, no se necesitan servicios externos.

## Configuracion

| Propiedad | Valor | Descripcion |
|---|---|---|
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/demo_open_code` | Conexion a MySQL |
| `jwt.secret` | `404E6352...` | Clave HMAC-SHA para firmar JWT |
| `jwt.expiration` | `86400000` | Tiempo de vida del token (24h en ms) |
| `spring.jpa.hibernate.ddl-auto` | `update` | Crear/actualizar esquema automaticamente |
