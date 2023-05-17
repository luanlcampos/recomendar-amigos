# Person Recommendation API

This is a Node.js API for recommending friends of friends based on a given person's CPF (Cadastro de Pessoas Físicas). The API allows creating persons, establishing relationships between them, and retrieving friend recommendations.

## Getting Started

To run the API locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/luanlcampos/recomendar-amigos.git
```

### 2. Navigate to the project directory:

```bash
cd recomendar-amigos
```

### 3. Install the dependencies:

```bash
npm install
```

### 4. Start the server:

```bash
 npm start
```

### 5. The API will be available at http://localhost:3000.

## Project Structure

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

## API Endpoints

- POST /api/person: Create a new person.
- POST /api/relationship: Create a relationship between two persons.
- GET /api/person/:cpf: Retrieve a person by CPF.
- GET /api/recommendations/:cpf: Get friend recommendations for a person.

Refer to the API route handlers for detailed information on the request and response format.
