<h1 align="center">
  <img src="https://rocketseat.com.br/static/images/week/logo.svg" width="400px" />
</h1>

<h3 align="center">
  :rocket: [Semana Omnistack 11.0]
</h3>

# Utlizando Bando de dados SQLite

Para o banco de dados ***SQLite*** temos duas opcoes para escolher:

- ***Driver***:`SELECT * FROM users` - pega tudo da tabela users
- ***Query Builder***: `table('users').select('*')` faz a mesma coisa utilizando codigo ***JavaScript***

Nos vamos utilizar o ***Query Builder*** e para isso vamos utlizar uma ferramenta chamada [Knex.js](http://knexjs.org/)

### Instalando Knex:

1. Rodar `yarn add knex`
2. Adicionar a biblioteca que vamos usar, no caso ***SQLite***:

`yarn add sqlite3`

Temos todas essas disponiveis:

```
❯ yarn add pg
❯ yarn add sqlite3
❯ yarn add mysql
❯ yarn add mysql2
❯ yarn add oracledb
❯ yarn add mssql
```

3. Rodar `npx knex init` (vai ser criado um arquivo `knexfile.js`)
4. dentro de `knexfile.js` vamos n primeira opçāo `development` > `connection` > `filename` e mudamos para `./src/database/db.sqlite`.
5. Dentro da pasta `src` criamos uma pasta `database` e dentro uma pasta `migrations`.
6. Vamos em `knexfile.js` e embaixo de `connections` colocamos assim:
```
development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
  *  migrations: {
  *    directory: './src/database/migrations'
  *  },
  *  useNullAsDefault: true,
  },
```
7. Para adicionar a primeira ***migration***:

`npx knex migrate:make migration_name`
***EXEMPLO:*** `npx knex migrate:make create_ongs`

8. vai ser criado um arquivo mais ou menos assim:

`27839786878_create_ongs.js` dentro dele colocamos assim por exemplo:

```
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("ongs");
};
```

- `npx knex migrate:latest` - ***Mandar ultima migration***
- `npx knex migrate:rollback` - ***Desfazer ultima migration***
- `npx knex migrate:rollback --all` - ***Desfazer todas as migration***

***Todos os comandos:***
```
Commands:
  init [options]                          Create a fresh knexfile.
  migrate:make [options] <name>           Create a named migration file.
  migrate:latest [options]                Run all migrations that have not yet been run.
  migrate:up [<name>]                     Run the next or the specified migration that has not yet been run.
  migrate:rollback [options]              Rollback the last batch of migrations performed.
  migrate:down [<name>]                   Undo the last or the specified migration that was already run.
  migrate:currentVersion                  View the current version for the migration.
  migrate:list|migrate:status             List all migrations files with status.
  seed:make [options] <name>              Create a named seed file.
  seed:run [options]                      Run seed files.
```

9. Agora dentro de `src > database` criamos um arquivo chamado `connection.js`

`connection.js`:

```
import knex from 'knex';
import configuration from '../../knexfile';

const connection = knex(configuration.development);

export default connection;
```

10. Depois dentro de `routes.js` colocamos assim:

```
import express from 'express';
import crypto from 'crypto';

* import connection from './database/connection';

const routes = express.Router();

routes.post('/ongs', async (req, res) => {
  const { name, email, whatsapp, city, uf } = req.body;

  const id = crypto.randomBytes(4).toString('HEX');

*  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  })

  return res.json({ id });
});

export default routes;
```

## Listando dados do banco

`routes.js`

```
routes.get('/ongs', async (req,res) => {
  const ongs = await connection('ongs').select('*')

  return res.json(ongs);
})
```