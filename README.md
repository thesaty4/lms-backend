# lms-backend

📂 Project Structure
lms-backend/
│── src/
│ ├── modules/
│ │ ├── users/
│ │ │ ├── controllers/
│ │ │ │ ├── user.controller.ts
│ │ │ ├── models/
│ │ │ │ ├── user.model.ts
│ │ │ ├── services/
│ │ │ │ ├── user.service.ts
│ │ │ ├── routes/
│ │ │ │ ├── user.routes.ts
│ │ ├── blogs/
│ │ │ ├── controllers/
│ │ │ │ ├── blog.controller.ts
│ │ │ ├── models/
│ │ │ │ ├── blog.model.ts
│ │ │ ├── services/
│ │ │ │ ├── blog.service.ts
│ │ │ ├── routes/
│ │ │ │ ├── blog.routes.ts
│ ├── config/
│ │ ├── database.ts
│ │ ├── env.ts
│ ├── middlewares/
│ │ ├── error.middleware.ts
│ │ ├── auth.middleware.ts
│ ├── utils/
│ │ ├── responseHandler.ts
│ ├── app.ts
│ ├── server.ts
│── .env
│── .gitignore
│── package.json
│── tsconfig.json
│── README.md

## MODULES

modules
│── blogs
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── services
│ ├── types
│ └── blogs.route.ts
│── courses
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── services
│ ├── types
│ └── courses.route.ts
│── categories
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── services
│ ├── types
│ └── categories.route.ts
│── subcategories
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── services
│ ├── types
│ └── subcategories.route.ts
│── enrollments
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── services
│ ├── types
│ └── enrollments.route.ts
│── payments
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── services
│ ├── types
│ └── payments.route.ts

# Commit Message Guidelines

To maintain a clean and structured commit history, follow the **Conventional Commits** format.

## **Commit Message Format**

- **`<type>`**: The category of the commit (see list below).
- **`<scope>`**: A short descriptor of the area affected (optional but recommended).
- **`<subject>`**: A concise description of the change (sentence-case, no period).

## **Allowed Commit Types**

| Type       | Description                                      |
| ---------- | ------------------------------------------------ |
| `feat`     | New feature                                      |
| `fix`      | Bug fix                                          |
| `docs`     | Documentation update                             |
| `style`    | Code style changes (formatting, no logic change) |
| `refactor` | Refactoring code (no new feature, no bug fix)    |
| `perf`     | Performance improvements                         |
| `test`     | Adding or updating tests                         |
| `chore`    | Maintenance tasks                                |
| `ci`       | Continuous Integration changes                   |
| `build`    | Build-related changes                            |
| `revert`   | Reverting a previous commit                      |
| `init`     | Initial commit                                   |

## **Examples**

> "feat: this is good commit"
> "this is bad commit"
