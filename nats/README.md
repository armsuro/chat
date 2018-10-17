# NATS Microservice Broker Service

This repo created for fast broker service setup using docker.

# New Features!
  `- Added support for windows.`

## Setup steps
  `1. Build Docker image`
  `2. Run Docker container`
  
## How to build?
`For Linux`
```sh
docker build amd64/ --tag nats:latest
```

`For Windows`
```sh
docker build windows/ --tag nats:latest
```

## How to run?
```sh
docker run -d --name nats -p 4222:4222 -p 6222:6222 -p 8222:8222 nats:latest
```
