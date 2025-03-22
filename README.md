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

# 🚀 Commit Message Guidelines with Husky & Commitlint

This project follows a structured commit message convention using **Husky** and **Commitlint** to ensure better commit history and collaboration.

## 📌 Setup Instructions

### 1️⃣ Install Dependencies

Run the following command to install **Husky** and **Commitlint**:

```sh
npm install --save-dev husky @commitlint/{config-conventional,cli}
```
