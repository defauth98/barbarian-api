### Rotas da api

#### Rota: /signup

Método HTTP: POST

Descrição: Rota de cadastro de usuários

Corpo da requisição:

```json
{
  "name": "Daniel",
  "email": "neto.dani@gmail.com",
  "password": "123123"
}
```

Resposta da api:

```json
{
  "User": {
    "id": 1,
    "email": "neto.dani@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMTk2NTYyLCJleHAiOjE2MDAyODI5NjJ9.IhIBUjTbJe9qNMLVrav3VTmmfA3Et4Vue6_ha5blQ50"
}
```

---

#### Rota: /login

Método HTTP: POST

Descrição: Rota de login

Corpo da requisição:

```json
{
  "name": "Daniel",
  "email": "neto.dani@gmail.com",
  "password": "123123"
}
```

Resposta da api:

```json
{
  "message": "Login success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMjU3MTM3LCJleHAiOjE2MDAzNDM1Mzd9.745-uSrNVk1ZCHafWC3WQ0-JUnoHt5CF-U7cKO1grew"
}
```

---

#### Rota: /validade-email

Método HTTP: POST

Descrição: Rota para validação se o email existe no banco de dados para assim poder recuperar a senha.

Corpo da requisição:

```json
{
  "email": "neto.dani@gmail.com"
}
```

Resposta da api:

```json
{
  "message": "success"
}
```

---

#### Rota: /recovery-password

Método HTTP: PUT

Descrição: Troca a senha do usuário.

Corpo da requisição:

```json
{
  "email": "neto.dani@gmail.com",
  "password": "543543"
}
```

Resposta da api:

```json
{
  "user": [
    {
      "id": 1,
      "name": "Daniel",
      "email": "neto.dani@gmail.com",
      "whatsapp": ""
    }
  ]
}
```

---

#### Rota: /users

Método HTTP: GET

Descrição: Rota de listagem de todos os usuários.

Regra: Precisa estar autenticado.

Resposta da api:

```json
{
  "user": [
    {
      "id": 1,
      "name": "Daniel",
      "email": "neto.dani@gmail.com",
      "whatsapp": ""
    }
  ]
}
```

---

#### Rota: /services

Método HTTP: GET

Descrição: Rota de listagem de todos os serviços prestados.

Regra: Precisa estar autenticado.

Resposta da api:

```json
{
  "services": [
    {
      "id": 1,
      "service": "Barba",
      "price": "30"
    }
  ]
}
```

---

#### Rota: /services

Método HTTP: POST

Descrição: Rota de criação de um serviço.

Regra: Precisa estar autenticado.

Corpo da requisição:

```json
{
  "service": "Barba",
  "price": "30"
}
```

Resposta da api:

```json
{
  "message": "Success"
}
```

---

#### Rota: /services/:id

Método HTTP: PUT

Descrição: Rota de update de um serviço.

Regra: Precisa estar autenticado.

Corpo da requisição:

```json
{
  "service": "Corte de cabelo",
  "price": "30"
}
```

Resposta da api:

```json
{
  "service": [
    {
      "id": 1,
      "service": "Corte de cabelo",
      "price": "30"
    }
  ]
}
```

---

#### Rota: /services/:id

Método HTTP: DELETE

Descrição: Rota que exclui um serviço.

Regra: Precisa estar autenticado.

Resposta da api:

```json
{
  "message": "success"
}
```

---

#### Rota: /schedule

Método HTTP: GET

Descrição: Rota de listagem de horários.

Regra: Precisa estar autenticado.

Resposta da api:

```json
{
  "scheduleItems": [
    {
      "id": 1,
      "from": 540,
      "to": 570,
      "week_day": 1,
      "user_id": 1,
      "service_id": 1,
      "name": "Daniel",
      "email": "neto.dani@gmail.com",
      "whatsapp": "",
      "service": "Barba",
      "price": "30"
    },
    {
      "id": 2,
      "from": 570,
      "to": 600,
      "week_day": 1,
      "user_id": 1,
      "service_id": 1,
      "name": "Daniel",
      "email": "neto.dani@gmail.com",
      "whatsapp": "",
      "service": "Barba",
      "price": "30"
    }
  ]
}
```

---

#### Rota: /schedule

Método HTTP: GET

Descrição: Rota de listagem de horários.

Regra: Precisa estar autenticado.

Resposta da api:

```json
{
  "scheduleItems": [
    {
      "id": 1,
      "from": 540,
      "to": 570,
      "week_day": 1,
      "user_id": 1,
      "service_id": 1,
      "name": "Daniel",
      "email": "neto.dani@gmail.com",
      "whatsapp": "",
      "service": "Barba",
      "price": "30"
    },
    {
      "id": 2,
      "from": 570,
      "to": 600,
      "week_day": 1,
      "user_id": 1,
      "service_id": 1,
      "name": "Daniel",
      "email": "neto.dani@gmail.com",
      "whatsapp": "",
      "service": "Barba",
      "price": "30"
    }
  ]
}
```

---

#### Rota: /schedule

Método HTTP: GET

Descrição: Rota de filtragem de horários.

Regra: Precisa estar autenticado.

Query params:

```
week_day: 1
from: 11:00
to: 17:00
```

Resposta da api:

```json
{
  "scheduleItems": [
    {
      "id": 1,
      "from": 660,
      "to": 690,
      "week_day": 1,
      "user_id": 1,
      "service_id": 1,
      "name": "Daniel",
      "email": "neto.dani@gmail.com",
      "whatsapp": "",
      "service": "Barba",
      "price": "30"
    }
  ],
  "message": "filter is active"
}
```

---

#### Rota: /schedule

Método HTTP: POST

Descrição: Rota de criação de um horário.

Regra: Precisa estar autenticado.

Corpo da requisição:

```json
{
  "from": "11:00",
  "to": "11:30",
  "week_day": 1,
  "service_id": 1,
  "user_id": 1
}
```

Resposta da api:

```json
{
  "message": "success"
}
```

---

#### Rota: /schedule/:id

Método HTTP: PUT

Descrição: Rota de update de um horário.

Regra: Precisa estar autenticado.

Corpo da requisição:

```json
{
  "from": "9:00",
  "to": "10:00",
  "week_day": 1,
  "service_id": 1,
  "user_id": 1
}
```

Resposta da api:
200 OK

---

#### Rota: /schedule/:id

Método HTTP: DELETE

Descrição: Rota que excluí de um horário.

Regra: Precisa estar autenticado.

Resposta da api:
200 OK
