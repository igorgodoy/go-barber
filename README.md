# Go Barber

Sistema básico para agendamento de serviços em barbearias.

## Iniciando a aplicação

Para inciar o projeto será necessário:

- Docker
- Node
- React
- React Native
- Yarn

### Pré-requisitos

Dentro do diretório do projeto, execute os comando do passo a passo abaixo.

Subindo as bases de dados:

```sh
cd backend && docker-compose up -d
```

Obs: Lembre-se de editar o arquivo `ormconfig.json` dentro da pasta `backend` inserindo seu IP nos campos `host` de ambos os bancos (Postgres e Mongo).

É necessário rodar as migrations para que o TypeORM crie as tabelas necessárias no banco de dados, através do comando:

```sh
yarn typeorm migration:run
```

Com os passos acima, você poderá acessar as rotas do API do projeto através de: http://localhost:3333.

Em seguida, deve-se instalar as dependências da aplicação web:

```sh
cd ../frontend && yarn
```

Para finalizar os pré-requisitos, instale as dependências da aplicação mobile:

```sh
cd ../mobile && yarn
```

Para iniciar o projeto Web:

```sh
yarn start
```

Para iniciar o projeto Mobile:

- Necessário dispositivo físico ou emulador configurado

```sh
yarn start
yarn android || yarn ios
```
