# 📝 BlogSphere – Fullstack MEVN Blog Application

![Vue.js](https://img.shields.io/badge/Vue.js-42b883?logo=vue.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 Project Overview

**BlogSphere** is a **full-stack blog application** built with the **MEVN stack** (MongoDB, Express.js, Vue.js, Node.js).  
Users can register, create posts, comment on posts, and manage their content. Admins have special privileges to manage all content.  

The application is **fully functional** with:

- Secure authentication and authorization  
- Real-time frontend interactions with Vue.js  
- Responsive design and user-friendly interface  
- Role-based access: Users vs Admins  

This project demonstrates full CRUD functionality and a complete **end-to-end MEVN stack application**.

---

## 🌟 Features

- 🔐 **User Authentication:** Register, login, logout, and JWT-based secure sessions  
- ✏️ **Blog Post Management:** Create, read, update, delete posts  
- 💬 **Comments System:** Add and view comments on posts  
- 🛡 **Role-Based Access:** Admin can delete any post or comment  
- 🖥 **Responsive Frontend:** Built with Vue.js and Bootstrap for an intuitive interface  
- 🗂 **Admin Dashboard:** Manage users, posts, and comments  
- 🛠 **Full MEVN Integration:** Frontend communicates with backend API seamlessly  

---

## 🏗 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | Vue.js 3, Vue Router, Composition API |
| Backend    | Node.js, Express.js |
| Database   | MongoDB with Mongoose |
| Auth       | JWT, bcrypt |
| Styling    | Bootstrap 5 |
| Environment | dotenv, CORS |

---

### User Credentials:
* Admin User
    - email: **admin@mail.com**
    - password: **admin123**
* Dummy Customer
    - email: **jamesDoe@mail.com**
    - password: **sample123**

## API Endpoints

### User Authentication

- `POST /users/register` – Register new user
  - Body: `{ username, email, password }`
  - Returns: Success message

- `POST /users/login` – Login user
  - Body: `{ email, password }`
  - Returns: `{ access: "JWT_TOKEN" }`

- `GET /users/details` – Get user profile (authenticated)
  - Headers: `Authorization: Bearer <token>`
  - Returns: User details

### Blog Posts

- `GET /posts/getPosts` – View all posts (public)
  - Returns: Array of all posts

- `GET /posts/getPost/:id` – View single post (public)
  - Returns: Single post with comments

- `POST /posts/addPost` – Create new post (authenticated)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, content }`
  - Returns: Created post

- `PATCH /posts/updatePost/:id` – Update post (author or admin)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, content }`
  - Returns: Updated post

- `DELETE /posts/deletePost/:id` – Delete post (author or admin)
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

### Comments

- `GET /posts/getComments/:id` – View comments for a post (public)
  - Returns: Array of comments

- `PATCH /posts/addComment/:id` – Add comment to post (authenticated)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ comment }`
  - Returns: Updated post with new comment

- `DELETE /posts/deleteComment/:postId/:commentId` – Delete comment (admin only)
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

## Authorization

All authenticated routes require:

```http
Authorization: Bearer <token-from-login>
```

## Models

### User
- username (required)
- email (required)
- password (hashed, required)
- isAdmin (boolean, default: false)

### Post
- title (required)
- content (required)
- author (User reference, required)
- comments (embedded array)
- createdAt (timestamp)
- updatedAt (timestamp)

### Comment (embedded in Post)
- userId (User reference, required)
- comment (string)


