# User Application

Este aplicativo possui por objetivo exemplificar a combinação de microservices Rails API com clientes javascript (ReactJS).

Tecnologias aplicadas:

- Ruby on Rails - API server-side
- React JS - Framework front-end
- MySQL - Base de dados relacional
- RSpec - Biblioteca de testes unitários orientado a negócio (BDD)
- JSON Web Token (JWT) - Protocolo para geração dos tokens baseado nas [RFC 7519](https://tools.ietf.org/html/rfc7519)

## Execução do Exemplo

### API Rails
Execute os comandos abaixo para executar a API Rails:

```bash
$ export USERSAPP_DATABASE_PASSWORD=<sua senha do MySQL
$ rails db:migrate
$ rails db:test:prepare
$ rails s -p 3001
```

### Frontend
Execute os comandos abaixo para executar o frontend da aplicação

```bash
$ cd client/
$ npm install
$ npm start # Abre no seguinte endereço: http://localhost:3000
```
