## App demo

https://youtu.be/xefcDV_Srqg

## Requirements

- Yarn (v1.22.10)
- NodeJS (v14)
- MongoDB or Docker (latest version)

## Stack

```yml
Language: Typescript
Backend:
  - TypeGraphQL
  - Apollo
  - JWT
  - Argon2
  - Typegoose
  - MongoDB
Frontend:
  - NextJS
  - React
  - Tailwind
  - Recharts
  - Urql
  - GraphQL-Codegen
  - Formik & Yup
```

## Getting Started

### Download Repo

```bash
git clone https://github.com/dino10bit/coolbike
cd coolbike
yarn
```

### Install Dependencies for Packages

```bash
yarn lerna bootstrap
```

### Run Development Server

```bash
docker-compose up -d # only if you don't have mongodb
npm install -g migrate-mongo 
migrate-mongo up # run mongodb migration
yarn dev
```

### Application login credentials
```
username: xxx@gmail.com
password: Zasada
```

### Run End-to-end tests
```bash
yarn run test:e2e
```
