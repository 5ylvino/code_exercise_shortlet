# Backend Exercise - Sylvester

## Project Description

This project is a backend application using NestJS framework. It includes various functionalities and is well-documented using Swagger for API documentation. The application also integrates Sentry for error monitoring and uses several other packages to ensure robust and efficient performance.

## Author

Sylvester Ekweozor

## Project Setup

### Prerequisites

- Node.js (v16.x or later)
- Yarn (v1.x or later)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repository/backend_exercise_sylvester.git
   cd backend_exercise_sylvester
   ```

2. **Install dependencies:**

   Using Yarn:

   ```bash
   yarn install
   ```

### Environment Configuration

Create a `.env` file at the root of the project and configure the following environment variables `.env.local`,
then filling the values of the env as specifie


### Scripts

The `package.json` includes several scripts for common tasks:

- **Build the project:**

  Using Yarn:

  ```bash
  yarn build
  ```

- **Start the project:**

  Using Yarn:

  ```bash
  yarn start
  ```

- **Start the project in development mode:**

  Using Yarn:

  ```bash
  yarn start:dev
  ```

### Running the Application

1. **Build the project:**

   Using Yarn:

   ```bash
   yarn build
   ```

2. **Start the project:**

   Using Yarn:

   ```bash
   yarn start
   ```

### API Documentation

The project uses Swagger for API documentation. Once the project is running, you can access the Swagger UI at `http://localhost:3000/doc`.

### Setting Up Swagger

### Error Monitoring 

**with Sentry**
Sentry is integrated for error monitoring. Make sure to configure your Sentry DSN in the `.env` file. The project includes scripts to manage Sentry sourcemaps:

- **Inject and upload sourcemaps:**

  Using Yarn:

  ```bash
  yarn sentry:sourcemaps
  ```

**with server log**
We also extend the nextjs server logging to custom log file. To make it easy for tracking and tracing errors easily.
The `nestjs.log` is located at the root of the project and it is an automatic generated file.

### License

This project is licensed under the UNLICENSED License.