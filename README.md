# Person Recommendation API

This is a Node.js API for recommending friends of friends based on a given person's CPF (Cadastro de Pessoas Físicas). The API allows creating persons, establishing relationships between them, and retrieving friend recommendations.

# Getting Started

To run the API locally, follow these steps:

## 1. Clone the repository:

```bash
git clone https://github.com/luanlcampos/recomendar-amigos.git
```

## 2. Navigate to the project directory:

```bash
cd recomendar-amigos
```

## 3. Install the dependencies:

```bash
npm install
```

## 4. Start the server on development mode:

```bash
 npm run dev
```

## 5. The API will be available at http://localhost:3000.

## NPM Scripts available

| Name          | Command                                      | Description                                                                                                                                 |
| ------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| test:coverage | jest --runInBand --coverage                  | Runs the test suite using Jest and generates a coverage report                                                                              |
| test:watch    | jest --runInBand --watch                     | Runs Jest in watch mode. It will continuously monitor your files for changes and re-run the tests automatically whenever a file is modified |
| test          | jest --runInBand                             | Runs the test suite using Jest                                                                                                              |
| dev           | nodemon ./src/index.js --watch src           | Starts your application in development mode using Nodemon                                                                                   |
| start         | node src/index.js                            | Starts your application by running the `index.js` file using Node.js                                                                        |
| lint          | eslint --config .eslintrc.js src/** tests/** | Analyzes the code on src and tests folder and report any linting error or warning                                                           |

# Project Structure

The project structure is organized as follows:

```css
src
├── app.js
├── index.js
├── model
│   ├── Person.js
│   └── data
│       ├── globalData.js
│       └── index.js
├── response.js
├── routes
│   ├── api
│   │   ├── cleanData.js
│   │   ├── createPerson.js
│   │   ├── createRelationship.js
│   │   ├── getPersonByCPF.js
│   │   ├── getRecommendations.js
│   │   └── index.js
│   └── index.js
├── server.js
└── utils
    └── validateCPF.js
```

## File/Directory Description

| File/Directory           | Description                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| app.js                   | Express application setup and middleware configuration              |
| index.js                 | Entry point of the application, starts the server                   |
| model/Person.js          | Person model definition                                             |
| model/data/globalData.js | Global data storage file                                            |
| response.js              | Utility functions for creating HTTP responses                       |
| routes/api/              | Directory containing API route handlers                             |
| - cleanData.js           | Endpoint for cleaning/resetting the data                            |
| - createPerson.js        | Endpoint for creating a new person                                  |
| - createRelationship.js  | Endpoint for creating a relationship between two persons            |
| - getPersonByCPF.js      | Endpoint for retrieving a person by CPF                             |
| - getRecommendations.js  | Endpoint for getting friend recommendations based on a person's CPF |
| - index.js               | API route definitions and exports                                   |
| routes/index.js          | Main router that combines all route handlers                        |
| server.js                | Server setup and configuration                                      |
| utils/validateCPF.js     | Utility function for validating CPF format                          |

# API Endpoints

## Person

| Method | Description         | Endpoint   |
| ------ | ------------------- | ---------- |
| POST   | Create a new person | /v1/person |

<details>
<summary> Request </summary>

```bash
curl --location 'localhost:3000/v1/person' \
--header 'Content-Type: application/json' \
--data '{ "cpf": "77777777777", "name": "Giba" }'
```

</details>

<details>
<summary>HTTP 200: Successful Response </summary>

```json
{
  "status": "ok",
  "cpf": "77777777777",
  "name": "Giba"
}
```

</details>

<details>
<summary>Error Responses</summary>

### HTTP 400: User already exists

```json
{
  "status": "error",
  "error": {
    "code": 400,
    "message": "Usuário já cadastrado"
  }
}
```

### HTTP 400: Invalid CPF

```json
{
  "status": "error",
  "error": {
    "code": 400,
    "message": "CPF Inválido"
  }
}
```

</details>

| Method | Description              | Endpoint        |
| ------ | ------------------------ | --------------- |
| GET    | Retrieve a person by CPF | /v1/person/:cpf |

<details>
<summary> Request </summary>

```bash
curl --location 'localhost:3000/v1/person/77777777777'
```

</details>

<details>
<summary> HTTP 200: Successful Response </summary>

```json
{
  "status": "ok",
  "cpf": "77777777777",
  "name": "Giba"
}
```

</details>

<details>
<summary>Error Reponses</summary>

### HTTP 400: User not found

```json
{
  "status": "error",
  "error": {
    "code": 404,
    "message": "Usuário não encontrado"
  }
}
```

</details>

## Relationship

| Method | Description         | Endpoint         |
| ------ | ------------------- | ---------------- |
| POST   | Create a new person | /v1/relationship |

<details>
<summary> Request </summary>

```bash
curl --location 'localhost:3000/v1/relationship' \
--header 'Content-Type: application/json' \
--data '{ "cpf1": "11111111111", "cpf2": "22222222222" }'
```

</details>

<details>
<summary>HTTP 200: Successful Response </summary>

```json
{
  "status": "ok",
  "cpf": "77777777777",
  "name": "Giba"
}
```

</details>

<details>
<summary>Error Responses</summary>

### HTTP 404: User not found

```json
{
  "status": "error",
  "error": {
    "code": 404,
    "message": "Usuário não encontrado"
  }
}
```

### HTTP 400: Invalid CPF

```json
{
  "status": "error",
  "error": {
    "code": 400,
    "message": "CPF Inválido"
  }
}
```

</details>

## Recommendations

| Method | Description                             | Endpoint                 |
| ------ | --------------------------------------- | ------------------------ |
| GET    | Get friend recommendations for a person | /v1/recommendations/:cpf |

<details>
<summary> Request </summary>

```bash
curl --location 'localhost:3000/v1/recommendations/11111111111'
```

</details>

<details>
<summary>HTTP 200: Successful Response </summary>

```json
{
  "status": "ok",
  "data": ["44444444444", "55555555555"]
}
```

</details>

<details>
<summary>Error Responses</summary>

### Code 404: User not found

```json
{
  "status": "error",
  "error": {
    "code": 404,
    "message": "Usuário não encontrado"
  }
}
```

### Code 400: Invalid CPF

```json
{
  "status": "error",
  "error": {
    "code": 400,
    "message": "CPF Inválido"
  }
}
```

</details>

## Clean Data

| Method | Description                       | Endpoint  |
| ------ | --------------------------------- | --------- |
| DELETE | Delete all data from the database | /v1/clean |

<details>
<summary> Request </summary>

```bash
curl --location --request DELETE 'localhost:3000/v1/clean'
```

</details>

<details>
<summary>HTTP 200: Successful Response </summary>

```json
{
  "status": "ok",
  "message": "Dados excluídos com sucesso"
}
```

</details>
