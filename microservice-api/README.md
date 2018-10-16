# Microservice chat

## Documentation
```sh
{'url': 'https://docs.google.com/document/d/1E1UN34rv-_rD5KjQCT10NcmK77-7npCwrbGvUiqQtsM'}

```

## Env
```sh
NATS_SERVER_URL || 	nats://localhost:4222

DB_USERNAME || "postgres"
DB_PASSWORD || "123456"
DB_DATABASE || "chat"
DB_HOST || "127.0.0.1"
DB_CONNECTION || "postgresql"

```
## AJAX routes
```sh
{'path': 'auth/login', 'method': 'post', 'role': 'customer'}
{'path': 'quote', 'method': 'post', 'role': 'customer'}
{'path': 'quote/assign', 'method': 'put', 'role': 'repairshop'}
{'path': 'quote/:id', 'method': 'put', 'role': 'customer'}
{'path': 'quote/:id', 'method': 'delete', 'role': 'customer'}
{'path': 'quote', 'method': 'get', 'role': 'customer'}

```

## Websocket methods
```sh
	Socket listeners
	{'key': 'join'}
	{'key': 'sendMessage'}

	Socket Answers
	{'key': 'messages'}
	{'key': 'sendMessage'}

```
