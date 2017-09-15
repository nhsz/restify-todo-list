# restify-todo-list

TODO-list **REST API** with **CRUD operations**, built with **NodeJS**, **Restify**, **MongoDB** and **Mongoose** [(live API Endpoint)](https://restify-todo-list.now.sh/v1/todo).

## Usage

1. Clone the repository: `git clone https://github.com/nhsz/restify-todo-list.git`
2. `cd restify-todo-list/`
3. `npm install [yarn install]`
4. Set your own `MONGODB_URI` in `config/db.js`
5. `npm start`

## API Endpoint Reference

You can try it online using [Postman](https://www.getpostman.com) and the [live API Endpoint](https://restify-todo-list.now.sh/v1/todo).

| Method | Endpoint      | Usage                   | Returns   |
| ------ | ------------- | ----------------------- | --------- |
| POST   | /v1/todo/     | Create a new task       | New task  |
| GET    | /v1/todo/     | List all tasks          | TODO-list |
| GET    | /v1/todo/{id} | Get a specific task     | Task      |
| PUT    | /v1/todo/{id} | Update a specific task  | Task      |
| DELETE | /v1/todo/{id} | Destroy a specific task | Task      |
