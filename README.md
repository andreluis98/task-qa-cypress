# User Management Application

Este é um projeto de gerenciamento de usuários utilizando `React Admin` para a interface de administração e `Express.js` com `MongoDB` para o backend.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB
- Docker (opcional, mas recomendado para configurar o MongoDB)

## Instalação

1. Clone o repositório:
    ```bash
    git clone <URL do repositório>
    cd <nome do repositório>
    ```

2. Instale as dependências do backend:
    ```bash
    cd backend
    npm install
    ```

3. Instale as dependências do frontend:
    ```bash
    cd frontend
    npm install
    ```

## Configuração do MongoDB

### Usando Docker (Recomendado)

1. Certifique-se de ter o Docker instalado e em execução.
2. No diretório raiz do projeto, crie um arquivo `docker-compose.yml` com o seguinte conteúdo:
    ```yaml
    version: '3.9'
    services:
      user_database:
        image: mongo
        environment:
          MONGO_INITDB_ROOT_USERNAME: root
          MONGO_INITDB_ROOT_PASSWORD: root
        ports:
         - "27017:27017"
    ```

3. Inicie o contêiner MongoDB:
    ```bash
    docker-compose up -d
    ```

### Sem Docker

1. Instale e inicie o MongoDB manualmente. Siga as instruções de instalação no [site oficial do MongoDB](https://docs.mongodb.com/manual/installation/).

## Executando o Backend

1. No diretório `backend`, crie um arquivo `.env` com as seguintes variáveis:
    ```env
    MONGO_URI=mongodb://root:root@localhost:27017/users_db
    ```

2. Inicie o servidor:
    ```bash
    npm start
    ```

O backend estará rodando em [http://localhost:3000](http://localhost:3000).

## Executando o Frontend

1. No diretório `frontend`, inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```

O frontend estará rodando em [http://localhost:5173](http://localhost:5173).

## Testes

### Backend

1. Para executar os testes do backend, utilize o comando:
    ```bash
    npm test
    ```

### Frontend

1. Para executar os testes do frontend, utilize o comando:
    ```bash
    npm run cypress:open
    ```

## Estrutura do Projeto

- **backend**: Contém o código do servidor Express e as rotas de API.
- **frontend**: Contém o código da interface administrativa feita com React Admin.
- **docker-compose.yml**: Arquivo de configuração do Docker para o MongoDB.

## API Endpoints

- `GET /users`: Lista todos os usuários.
- `GET /users/:id`: Detalha um usuário específico.
- `POST /users`: Cria um novo usuário.
- `PUT /users/:id`: Atualiza um usuário existente.
- `DELETE /users/:id`: Remove um usuário específico.
- `DELETE /users`: Remove todos os usuários.

## Cypress Tests

- `Deve exibir botão de criação quando listagem for vazia`
- `Deve listar todos os usuários`
- `Deve criar um novo usuário`
- `Deve criar um novo usuário pressionando Enter`
- `Deve atualizar um usuário existente`
- `Deve remover um usuário`

## Licença

Este projeto é licenciado sob a MIT License.
