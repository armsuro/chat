# Chat app

## Setup with docker

```sh
Open docker-compose setup your settings. After run this command.

docker-compose up
```

## Run without docker

### Please run nuts server 
```sh
cd ./nats && ./gnatsd --addr 127.0.0.1 --port 4222

set env
NATS_SERVER_URL || nats://localhost:4222

```
### Setup database

```sh
git clone https://github.com/armsuro/chat-db

set database environment 

process.env.DB_USERNAME || "postgres",
process.env.DB_PASSWORD || "123456",
process.env.DB_DATABASE || "chat",
process.env.DB_HOST || "127.0.0.1",
process.env.DB_CONNECTION || "postgresql"

after run

npm run migrate && npm run seed
```

### Run microservices
```sh
cd ./microservice_api && npm i && npm start
cd ./microservice_chat && npm i && npm start
```

## Documentation
```sh
{'url': 'https://docs.google.com/document/d/1E1UN34rv-_rD5KjQCT10NcmK77-7npCwrbGvUiqQtsM'}

```

### Run api tests
```sh
cd ./microservice_api && npm i && npm run test
```
### Testing Users
```sh
[
	{'username': 'user1', 'password': 'password', 'type': 'Customer'},
 	{'username': 'user2', 'password': 'password', 'type': 'Repairshop'}
]
```
### Postman collection in folder ``` ./api-testing/postman```
### Websocket tests in folder ``` ./api-testing/websocket```