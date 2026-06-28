# keycloak_setup# 🔐 Keycloak Authentication API

Uma API REST desenvolvida em **Node.js**, **TypeScript** e **Express**, integrada com **Keycloak** para autenticação de utilizadores através do protocolo **OpenID Connect (OIDC)**.

O objetivo deste projeto é demonstrar uma implementação organizada e escalável de autenticação utilizando o Keycloak como Identity Provider (IdP), seguindo uma arquitetura baseada em Controllers, Services e Middlewares.

---

# Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* Docker
* Docker Compose
* PostgreSQL
* Keycloak
* OpenID Connect (OIDC)
* Axios

---

# Funcionalidades

* Login de utilizadores
* Integração com Keycloak
* Obtenção de Access Token
* Obtenção de Refresh Token
* Estrutura preparada para autenticação JWT
* Organização em camadas (Controller, Service, Routes)
* Configuração através de variáveis de ambiente
* Execução com Docker

---



# Estrutura do Projeto

```
.
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── src
│
├── controllers
│     Responsáveis pelas requisições HTTP
│
├── routes
│     Definição das rotas da aplicação
│
├── services
│     Regras de negócio e comunicação com o Keycloak
│
├── interfaces
│     Interfaces TypeScript
│
├── middlewares
│     Middlewares de autenticação
│
├── utils
│     Classes auxiliares
│
├── app.ts
│
└── server.ts
```

---

# Pré-requisitos

Antes de iniciar o projeto é necessário possuir instalado:

* Node.js 20+
* Docker
* Docker Compose
* Git

---

# Instalação

Clone o projeto

```bash
git clone <URL_DO_REPOSITORIO>

cd keycloak_setup
```

Instale as dependências

```bash
npm install
```

---

# Configuração

Crie um ficheiro `.env` na raiz do projeto.

Exemplo:

```env
PORT=3000

KEYCLOAK_URL=http://keycloak:8080

KEYCLOAK_REALM=master

KEYCLOAK_CLIENT_ID=node-api

KEYCLOAK_CLIENT_SECRET=SEU_CLIENT_SECRET
```

> Nunca versionar o ficheiro `.env`. Utilize um `.env.example` para disponibilizar o modelo de configuração.

---

# Executar o Projeto

Subir os containers

```bash
docker compose up -d
```

Verificar os containers

```bash
docker ps
```


A API ficará disponível em:

```
http://localhost:3000
```

O Keycloak ficará disponível em:

```
http://localhost:8080
```

---

# Configuração do Keycloak

## 1. Aceder ao painel

```
http://localhost:8080
```

---

## 2. Criar um Realm

Exemplo

```
empresa
```

---

## 3. Criar um Client

Nome sugerido

```
node-api
```

Configurações

```
Client Authentication: ON
```

```
Direct Access Grants: ON
```

---

## 4. Obter o Client Secret

Clients

↓

Credentials

↓

Copiar o Client Secret

↓

Adicionar ao `.env`

```
KEYCLOAK_CLIENT_SECRET=xxxxxxxxxxxxxxxx
```

---

## 5. Criar um Utilizador

Users

↓

Create User

Exemplo

```
Username

admin
```

---

## 6. Definir Password

Credentials

↓

Set Password

```
123456
```

Desativar

```
Temporary Password
```

---

# Fluxo de Autenticação

```
Cliente

↓

POST /login

↓

API Express

↓

Keycloak

↓

Validação

↓

JWT

↓

Resposta
```

---

# Endpoint de Login

```
POST /login
```

Body

```json
{
    "username":"admin",
    "password":"123456"
}
```

Resposta esperada

```json
{
    "access_token":"...",
    "refresh_token":"...",
    "expires_in":300,
    "token_type":"Bearer"
}
```

---

# Utilização do Access Token

Após o login, enviar o token nas rotas protegidas.

```
Authorization

Bearer <ACCESS_TOKEN>
```

---

# Variáveis de Ambiente

| Variável               | Descrição                |
| ---------------------- | ------------------------ |
| PORT                   | Porta da API             |
| KEYCLOAK_URL           | URL do servidor Keycloak |
| KEYCLOAK_REALM         | Realm utilizado          |
| KEYCLOAK_CLIENT_ID     | Identificador do Client  |
| KEYCLOAK_CLIENT_SECRET | Client Secret            |

---

# Scripts Disponíveis

Instalar dependências

```bash
npm install
```

Executar em desenvolvimento

```bash
npm run dev
```

Compilar

```bash
npm run build
```

Executar produção

```bash
npm start
```

---

# Como adicionar um novo endpoint

1. Criar o Controller.

2. Criar o Service.

3. Adicionar a rota.

4. Testar utilizando Postman ou Insomnia.

---

# Boas Práticas

* Nunca guardar passwords na aplicação.
* Nunca versionar o ficheiro `.env`.
* Utilizar variáveis de ambiente para todas as configurações.
* Separar lógica de negócio dos Controllers.
* Centralizar chamadas HTTP em Services.
* Utilizar Interfaces para tipagem.
* Tratar exceções de forma consistente.
* Validar todos os dados recebidos pela API.

---

# Resolução de Problemas

## ECONNREFUSED

O Keycloak não está em execução.

Verifique:

```bash
docker ps
```

---

## invalid_client

O Client ID ou Client Secret estão incorretos.

Verifique as configurações do Client no Keycloak.

---

## only valid absolute URLs can be requested

A variável `KEYCLOAK_URL` não está definida ou contém uma URL inválida.

---

## esbuild platform mismatch

O diretório `node_modules` foi copiado do macOS para o container Linux.

Apague o diretório e execute novamente:

```bash
rm -rf node_modules

npm install
```

ou instale as dependências diretamente dentro do container.

---

# Melhorias Futuras

* Refresh Token
* Logout
* Middleware JWT
* Proteção de rotas
* Swagger/OpenAPI
* Prisma ORM
* Gestão de Roles
* Gestão de Permissões
* Testes Unitários
* Testes de Integração
* CI/CD
* Observabilidade
* Logs estruturados
* Rate Limiting

---

# Licença

Este projeto destina-se a fins educativos e pode ser utilizado como base para projetos que necessitem de autenticação através do Keycloak.

---


Desenvolvido utilizando **TypeScript**, **Express** e **Keycloak**, com foco em boas práticas de arquitetura, organização do código e integração com OpenID Connect.
