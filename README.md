# Backend Exercise - Sylvester

## Project Description

This project is a backend application using NestJS framework. It includes various functionalities and is well-documented using Swagger for API documentation. The application also integrates Sentry for error monitoring and uses several other packages to ensure robust and efficient performance.

## Overview

This project implements a REST API using TypeScript and the NestJS framework, integrating data from the REST Countries API. The main goal is to provide meaningful information through various endpoints, focusing on data handling, API design, security, performance optimization, and documentation. Key security and optimization features are highlighted in the `package.json` file.

### `package.json` Highlights

#### Security Features
- **Helmet**: Helps secure the app by setting various HTTP headers 
- **Passport**: Middleware for authentication
- **JWT**: JSON Web Token support for secure authentication. Set to expire every `10 minutes`
- **Rate Limiting**
- **Class-validator and TypeORM for serialisation**
- **Use env to keep sensitive data secured**
- **Data Protection**

#### Optimization Features
- **Cache Manager**: Implements caching strategies to enhance performance.
- **Sentry**: For error tracking and performance monitoring.
- **Throttler**: Limits the number of requests to prevent abuse.
- **Logger**: For error tracking.

## Highlights of Interesting Challenges or Features

### Cache
Implementing caching was crucial for optimizing performance and reducing the load on the external REST Countries API. By caching responses, the API can serve data quickly and efficiently, especially for frequently requested endpoints.

### Well-Written Codebase
The codebase is structured to ensure maintainability and readability. Using NestJS, the project adheres to a modular architecture, making it easy to manage and scale. The implementation of services, controllers, and modules follows best practices, ensuring clean and organized code.

### Security
Security is a top priority in this project. Implementing JWT authentication and using Helmet for setting secure HTTP headers are some of the measures taken to protect the API from common vulnerabilities. Additionally, using Passport for authentication ensures that the API endpoints are secure. And many other profound measures are also used.

## Aspects I'm Particularly Proud Of

### Well-Written Codebase Maintainability
The project features a clean and maintainable codebase, adhering to best practices and design patterns. The modular structure of NestJS ensures that each part of the application is organized and easy to manage. This makes the codebase not only easy to understand but also scalable for future enhancements.

## Potential Improvements or Additional Features

### Other Important Features
If given more time, the following features could be implemented to further enhance the API:
- **Rate Limiting**: Implementing more advanced rate limiting strategies to prevent abuse and ensure fair usage.
- **User Management**: Implementing a user management system with roles and permissions to control access to different parts of the API.


## Folder structure 
```bash
project-name/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── auth/
│   ├   ├── auth.***.ts
│   ├   ├── entities/
│   ├   ├── dto/
│   ├   ├── plugins/
│   ├── countries/
│   ├   ├── countries.***.ts
│   ├   ├── entities/
│   ├   ├── dto/
│   ├   ├── plugins/
│   ├   ├   ├── rest-countries-vendor/
│   ├── logger/
│   ├   ├── logger.***.ts
│   ├   ├── plugins/
│   ├── utils/
│   ├── decryption/
│   ├── encryption/
├── test/
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
├── node_modules/
├── package.json
├── tsconfig.json
└── ...


```

## Author

Sylvester Ekweozor

## Project Setup

### Prerequisites

- Node.js (v16.x or later)
- Yarn (v1.x or later)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/5ylvino/code_exercise_shortlet.git
   cd code_exercise_shortlet
   ```

2. **Install dependencies:**

   Using Yarn:

   ```bash
   yarn install
   ```

### Environment Configuration

Create a `.env` file at the root of the project and configure the following environment variables after copying the template from `local.env`  as specified

 Simply use this command on your project terminal:

   ```bash
   cp -rf local.env .env
   ```

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

- **Run unit test:**

  Using Yarn:

  ```bash
  yarn test
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

BASE_URL: `https://smartop.aievens.com.ng`

The project uses Swagger for API documentation. Once the project is running, you can access the Swagger UI at `http://localhost:<use_your_PORT_number>/doc` locally, and for production at `https://smartop.aievens.com.ng/doc`

The project live API - `https://smartop.aievens.com.ng/api/v1/<endpoint>`. All endpoints are prefix with `/api/v1` except for swagger endpoint.

NOTE: Due to the data encryption setup on `production` environment in the application and we don't have client side to receive and decrypt. The live environment is set to `development` which do not use data encryption

### Error Monitoring 

**with Sentry** \
Sentry is integrated for error monitoring. Make sure to configure your Sentry DSN in the `.env` file. The project includes scripts to manage Sentry sourcemaps:

- **Inject and upload sourcemaps:**

  Using Yarn:

  ```bash
  yarn sentry:sourcemaps
  ```

**with server log** \
The app also extended the nextjs server logging to custom log file. To make it easy for download, tracking and tracing errors easily.
The `nestjs.log` is located at the root of the project and it is an automatic generated file.

### Conclusion
This project demonstrates the implementation of a robust and efficient REST API using TypeScript and NestJS. It highlights my ability to handle data integration, API design, security, performance optimization, and maintainability. The modular structure and clean codebase ensure that the API is scalable and easy to manage.

### License

This project is licensed under the UNLICENSED License.