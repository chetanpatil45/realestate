# Real Estate Management Backend API

A Spring Boot backend application for managing real estate properties, users, bookmarks, authentication, and property images. The application provides RESTful APIs for customers and dealers with JWT-based authentication and MySQL database integration.

---

## Technologies Used

- Java 17+
- Spring Boot 3.x
- Spring Security
- JWT Authentication
- Spring Data JPA (Hibernate)
- MySQL Database
- Maven
- Lombok
- Swagger/OpenAPI
- Multipart File Upload

---

## Project Structure

```

src/main/java
├── controller
│ ├── AuthController
│ ├── CustomerController
│ ├── DealerController
│ └── AdminController
├── service
├── repository
├── entity
├── dto
├── security
├── config
└── exception

````

---

## ⚙️ Features

### Authentication & Authorization
- User Registration
- User Login
- JWT Token Generation
- Refresh Token Support
- Get Logged-in User Details

### Customer Features
- View All Properties
- View Property Details
- View Property Images
- Add Property to Bookmarks
- View Bookmarked Properties

### Dealer Features
- Add Property
- Update Property
- Delete Property
- Upload Property Images
- Delete Property Images
- View Own Properties

### Admin Features
- Test/Admin Endpoints

---

## 🛠 Prerequisites

Before running the project, ensure you have:

- Java 21 or higher
- Maven 3.8+
- MySQL 8+

---

## 🗄 Database Configuration

Create a MySQL database:

```sql
CREATE DATABASE real_estate_db;
````

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/real_estate_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

---

##  Security Configuration

The application uses JWT authentication.

### Authentication Flow

1. Register User
2. Login with Email & Password
3. Receive JWT Access Token
4. Use token in Authorization Header

```http
Authorization: Bearer <jwt-token>
```

5. Refresh expired token using Refresh Token API

---

## Running the Application

### Clone Repository

```bash
git clone https://github.com/your-username/real-estate-backend.git
cd real-estate-backend
```

### Build Project

```bash
mvn clean install
```

### Run Application

```bash
mvn spring-boot:run
```

Application will start on:

```text
http://localhost:8080
```

---

## API Documentation

Base URL:

```text
http://localhost:8080/api/v1
```

---

# Authentication APIs

### Register User

**POST** `/auth/register`

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

Response:

```json
{
  "message": "User registered successfully"
}
```

---

### Login

**POST** `/auth/authenticate`

Request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token"
}
```

---

### Refresh Token

**POST** `/auth/refreshToken`

Request:

```json
{
  "refreshToken": "token"
}
```

---

### Get Logged In User

**GET** `/auth/user`

Headers:

```http
Authorization: Bearer <token>
```

---

# Customer APIs

### Get All Properties

**GET** `/customer/properties`

Returns all available properties.

---

### Get Property By Id

**GET** `/customer/property/{propertyId}`

Example:

```http
GET /customer/property/1
```

---

### Get Property Images

**GET** `/customer/property/images/{propertyId}`

Returns all images associated with a property.

---

### Add Property To Bookmark

**POST** `/customer/bookmark/add/{propertyId}`

Headers:

```http
Authorization: Bearer <token>
```

---

### Get Bookmark By Id

**GET** `/customer/bookmark/{bookmarkId}`

Headers:

```http
Authorization: Bearer <token>
```

---

### Get All Bookmarks

**GET** `/customer/bookmarks`

Headers:

```http
Authorization: Bearer <token>
```

---

# Dealer APIs

### Get Dealer Properties

**GET** `/dealer/properties`

Headers:

```http
Authorization: Bearer <token>
```

Returns properties created by logged-in dealer.

---

### Add Property

**POST** `/dealer/property/add`

Headers:

```http
Authorization: Bearer <token>
```

Request Example:

```json
{
  "title": "Luxury Villa",
  "description": "4 BHK Villa",
  "price": 500000,
  "location": "New York"
}
```

---

### Get Property By Id

**GET** `/dealer/property/{propertyId}`

---

### Add Image To Property

**POST** `/dealer/property/{propertyId}`

Content-Type:

```http
multipart/form-data
```

Parameters:

```text
image=file
```

---

### Update Property

**PUT** `/dealer/property/{propertyId}`

Headers:

```http
Authorization: Bearer <token>
```

---

### Delete Property

**DELETE** `/dealer/property/{propertyId}`

Headers:

```http
Authorization: Bearer <token>
```

---

### Delete Property Image

**DELETE** `/dealer/property/image/{imageId}`

Headers:

```http
Authorization: Bearer <token>
```

---

### Get Property Images

**GET** `/dealer/property/images/{propertyId}`

Returns all images for the property.

---

# Admin APIs

### Admin Test Endpoint

**GET** `/admin/test`

Used for testing admin access.

---

## 📦 JPA Entities

### User

```java
@Entity
public class User {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Role role;
}
```

### Property

```java
@Entity
public class Property {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private String location;
}
```

### PropertyImage

```java
@Entity
public class PropertyImage {
    private Long id;
    private String imageUrl;
}
```

### Bookmark

```java
@Entity
public class Bookmark {
    private Long id;
}
```

---

## 🔄 JPA Relationships

```java
User (Dealer)
    |
    | OneToMany
    ↓
Property

Property
    |
    | OneToMany
    ↓
PropertyImage

User (Customer)
    |
    | OneToMany
    ↓
Bookmark

Bookmark
    |
    | ManyToOne
    ↓
Property
```

---

## 🧪 Swagger API Documentation

Add dependency:

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

Swagger URL:

```text
http://localhost:8080/swagger-ui/index.html
```

---

## 📈 Future Enhancements

* Property Search & Filtering
* Property Categories
* Property Reviews & Ratings
* Email Verification
* Password Reset
* Cloud Storage for Images (AWS S3)
* Docker Support
* CI/CD Pipeline

---

## 👨‍💻 Author
Chetan Bachchhav<br>
Developed using Spring Boot, Java, JPA, MySQL, and JWT Authentication.

