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

Subindo as bases de dados:

```sh
docker run --name postgre -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

Você poderá criar uma base de dados dentro de seu container.

Obs: Vocé pode escolher qualquer nome para a base de dados, devendo somente alterar no arquivo `ormconfig.json` dentro da pasta `backend`, assim como valores referente ao ambiente (usuario, host, etc).

É necessário rodar as migrations para que o TypeORM crie as tabelas necessárias no banco de dados, através do comando:

```
yarn typeorm migration:run
```

```sh
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

```sh
docker run --name mongodb -p 27017:27017 -d -t mongo
```

Instalando as dependências.

```
yarn
```

Em todos os diretórios, basta utilizar o comando acima (com o yarn previamente instalado) para instalar todas as dependências necessárias para cada projeto.

Para iniciar o back-end do projeto:

```
yarn dev:server
```

Para iniciar o projeto Web:

```
yarn start
```

Para iniciar o projeto Mobile:

- Necessário dispositivo físico ou emulador configurado

```
yarn start
yarn android || yarn ios
```
