<h2 align="center"> 🧔 BARBARIAN API</h1>

<h1 align="center">

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=barbarian%20api&uri=https%3A%2F%2Fgithub.com%2Fdefauth98%2Fbarbarian-api%2Fblob%2Fmaster%2FInsomnia_2020-09-18.json)

</h1>
Projeto construído durante a matéria Hora Aula Hora Relógio da faculdade de Analise e Desenvolvimento de Sistemas. E consiste uma API Rest para agendamento de horários para uma barbearia.

### :station: Rotas

Rotas de autenticação:

- **/login** - Login
- **/signup** - Cadastro
- **/validade-email** - Valida o email para recuperação de senha
- **/recovery-password** - Recuperação de senha
- **/users** - Lista todos os usuários (Necessita estar autenticado)

Serviços (Necessita estar autenticado):

- POST **/services** - Registra um novo serviço
- PUT **/services/:id** - Edita um serviço
- DELETE **/services/:id** - Deleta um serviço
- GET **/services** - Lista todos os serviços

Agenda (Necessita estar autenticado):

- POST **/schedule** - Registra um novo horário
- PUT **/schedule/:id** - Edita um horário
- DELETE **/schedule/:id** - Deleta um horário
- GET **/schedule** - Lista todos os horários
- GET **/schedule/:id** - Lista um único horário

### :computer: Tecnologias

Esse projeto foi desenvolvido com as seguintes técnologias:

- [Node.js][nodejs]
- [TypeScript][typescript]
- [Json Web Token][jwt]
- [Knex][knex]
- [Postgres][postgres]

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[jwt]: https://jwt.io/
[knex]: https://knexjs.org/
[postgres]: https://www.postgresql.org/

### :rocket: Como rodar o projeto

```sh
# Clone o projeto via http
git clone https://github.com/defauth98/barbarian-api.git

# Entrar na pasta do projeto backend
cd barbarian-api

### Instalar as depedencias usando yarn
yarn

### Rodar as migrations
yarn migrate

#Rodar o projeto
yarn start
```

### :bust_in_silhouette: Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/defauth98">
        <img src="https://avatars.githubusercontent.com/u/52966246?v=4" width="100px;" alt=""/>
        <br />
          <sub>
            <b>Daniel Ribeiro</b>
          </sub>
      </a>
    </td>
  </tr>
</table>
