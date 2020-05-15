# Go Barber

Sistema de agendamento para cortes de cabelo. Módulo 2 do Curso Bootcamp da Rocketseat.

## Rodando a aplicação

Para rodar o projeto será necessário instalar as seguintes aplicações:

- Docker
- Node
- Yarn (Opcional)

### Pré-requisitos

Subindo a base de dados:

```sh
docker run --name database -p 5432:5432 -d -e POSTGRES_DBNAME=gonodemodulo2 -t kartoza/postgis
```

Obs: Vocé pode escolher qualquer nome para a base de dados, devendo somente alterar no arquivo `database.js` dentro da pasta `config`, assim como valores referente ao ambiente (usuario, host, etc).

É necessário rodar as migrations para que o _Sequelize_ crie as tabelas necessárias no banco de dados, através do comando:

```
npx sequelize db:migrate
```

Redis é usado para armazenar os valores de sessão.

```
docker run -p 6379:6379 --name redis -d redis
```

Instalando as dependências.

```
yarn install
```

Para iniciar o projeto:

```
yarn start
```

[Acesse aqui](http://localhost:3000)

## Construido com

- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [connect-flash](https://github.com/jaredhanson/connect-flash)
- [express](https://github.com/expressjs/express)
- [express-session](https://github.com/expressjs/session)
- [moment](https://github.com/moment/moment)
- [multer](https://github.com/expressjs/multer)
- [nunjucks](https://github.com/mozilla/nunjucks)
- [pg](https://github.com/brianc/node-postgres)
- [sequelize](https://github.com/sequelize/sequelize)
- [connect-redis](https://github.com/tj/connect-redis)
- [ioredis](https://github.com/luin/ioredis)

## Autor

- **Neftales Antunes** - [Github](https://github.com/neftales)
