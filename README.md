# 🎉 Welcome to Quizium! 🎓

Quizium is an advanced platform designed to help you create, play, and host quizzes seamlessly. Whether you're an educator, trivia enthusiast, or just someone who enjoys challenging friends, Quizium provides all the tools you need.

## Table of Contents

-   [⚙️ Core Features](#️-core-features)
-   [🔥 Scoring Methods](#-scoring-methods)
-   [💻 Technologies Used](#-technologies-used)
-   [Installation](#installation)
    -   [Prerequisites](#prerequisites)
    -   [Steps](#steps)
-   [Usage](#usage)
-   [API Documentation](#api-documentation)
    -   [Base URL](#base-url)
    -   [Authentication](#authentication)
    -   [User Management](#user-management)
    -   [Quiz](#quiz)
    -   [Quiz Questions](#quiz-questions)
    -   [Quiz Result](#quiz-result)
    -   [Quiz Hosting](#quiz-hosting)
-   [Link](#link)

## ⚙️ Core Features

More features might be added in the future.

-   🛠️ Easy quiz creation using the user-friendly quiz editor.
-   🖼️ Add cover images to personalize your quizzes.
-   🔒 Set your quizzes to private or public.
-   ⏲️ Set time limits for quizzes and provide descriptions to clarify rules or themes.
-   📷 Add images to quiz questions for a richer experience.
-   🤔 Choose from various question types: multiple-answer, true/false, or type-answer.
-   🎮 Host and play quizzes seamlessly, whether it's your own or others'.
-   📝 Profile management: Update your profile image, username, or password with ease.
-   📚 Access your library to view drafted, published, and favorite quizzes.
-   📊 Review detailed reports for every quiz you have played or hosted.
-   🏆 Real-time score tracking for participants during live-hosted quizzes.
-   🔐 Google Sign-In is integrated for secure and convenient login.
-   📱 Enjoy a seamless user experience on any device, as Quizium is responsive 😍.

## 🔥 Scoring Methods

-   **Speed-Based Scoring**: Prioritizes both accuracy and the speed of answering questions.
-   **Exam-Style Scoring**: Focuses solely on accuracy within a set time limit.

## 💻 Technologies Used

-   🗄️ MongoDB
-   🌿 Node.js
-   ⚙️ Express
-   ⚛️ React
-   🎨 Tailwind CSS

## Installation

### Prerequisites

-   [Node.js](https://nodejs.org)
-   [MongoDB](https://www.mongodb.com) instance (cloud or local)

### Steps

1. Clone the repo: `git clone https://github.com/Adamson123/Quizium.git`
2. Install dependencies in both the frontend and backend folders by running this in both folders: `npm install`
3. Set environment variables:
    - **Frontend**:
        ```bash
        VITE_CLIENT_ID=google-client-id
        ```
    - **Backend**:
        ```bash
        MONGO_URI=mongodb-uri
        CLIENT_ID=google-client-id
        EMAIL_PASSWORD=your-email-password
        JWT_KEY=jwt-secret-key
        PORT=3002
        ```
4. Run the app: In the root folder, you can run `npm run dev:be` to start the backend server, `npm run dev:fe` to start the frontend server, and `npm run dev:tw` to start Tailwind CSS compilation.

### Usage

1. Visit `http://localhost:5173` in your browser.
2. Sign up using Google or with a username, email, and password.
3. Create a quiz and start adding questions.
4. Host live quizzes and invite participants.

## API Documentation

### Base URL

`http://localhost:3002/api`

### Authentication

#### Sub-URL: `/auth`

1. **POST `/signup`** - Register a new user.
2. **POST `/login`** - Log in a user and send a cookie response.
3. **POST `/google-login`** - Log in a user with Google.
4. **POST `/logout`** - Log out a user by sending an empty cookie response.
5. **POST `/reset-password-link`** - Send a password reset link to the user’s email.
6. **PATCH `/reset-password`** - Reset the user's password.

### User Management

#### Sub-URL: `/user`

1. **GET `/`** - Get user info with the token provided in the cookie.
2. **PATCH `/personal`** - Modify personal user information.
3. **PATCH `/password`** - Reset the password for an already logged-in user.
4. **PATCH `/favorite`** - Add or remove quizzes from the user's favorites.

### Quiz

#### Sub-URL: `/quiz`

1. **POST `/`** - Create a quiz.
2. **GET `/`** - Get multiple quizzes based on provided queries.
3. **GET `/single-quiz/:id`** - Get a single quiz.
4. **GET `/user-quizzes`** - Get all quizzes created by the user.
5. **GET `/search-quizzes`** - Search quizzes based on provided queries in an advanced way.
6. **PATCH `/:id`** - Modify a quiz.
7. **DELETE `/:id`** - Delete a quiz.

### Quiz Questions

#### Sub-URL: `/question`

1. **POST `/:id`** - Create a question.
2. **PATCH `/:id`** - Modify a question.
3. **DELETE `/:id`** - Delete a question.

### Quiz Result

#### Sub-URL: `/result`

1. **POST `/`** - Create a quiz result (add the result to the host report if it's a hosted quiz).
2. **DELETE `/:id`** - Delete a quiz result.
3. **GET `/single-result/:id`** - Get a single quiz result.
4. **GET `/user-results`** - Get all quiz results of a user.

### Quiz Hosting

#### Sub-URL: `/host`

1. **POST `/`** - Host a quiz.
2. **GET `/`** - Find a hosted quiz room based on the provided join code in the queries or find a host report based on the provided host ID in the queries.
3. **GET `/user-hosts`** - Get all host reports of a user.
4. **DELETE `/:id`** - Delete a host report.

## Link

**Quizium**: [https://quizium.onrender.com](https://quizium.onrender.com)

Quizium offers a dynamic platform for creating and engaging with quizzes. Challenge yourself and others by exploring the world of quizzes today. 🚀
