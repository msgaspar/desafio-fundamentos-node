## Desafio 05: Primeiro projeto Node.js

Desafio aplicado no bootcamp GoStack para fixação dos conceitos de models, repositories e services, usando o Node.js com Typescript.

São aplicados também os conceitos de arquitetura de software Single Responsibility Principe e Dependency Inversion.

Nesse desafio usamos o Node.js na criação do back-end para uma aplicação que armazena transações financeiras de entrada e saída, permitindo o cadastro
e a listagem dessas transações.

### Rotas da aplicação

- **`POST /transactions`**: A rota deve receber `title`, `value` e `type` dentro do corpo da requisição, sendo `type` o tipo da transação, que deve ser `income` para entradas (depósitos) e `outcome` para saídas (retiradas). Ao cadastrar uma nova transação, ela deve ser armazenada dentro de um objeto com o seguinte formato :

```json
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income"
}
```

- **`GET /transactions`**: Essa rota deve retornar uma listagem com todas as transações que você cadastrou até agora, junto com o valor de soma de entradas, retiradas e total de crédito. Essa rota deve retornar um objeto com o formato a seguir:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "value": 4000,
      "type": "income"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income"
    },
    {
      "id": "uuid",
      "title": "Pagamento da fatura",
      "value": 4000,
      "type": "outcome"
    },
    {
      "id": "uuid",
      "title": "Cadeira Gamer",
      "value": 1200,
      "type": "outcome"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```
- Dentro de balance, o income é a soma de todos os valores das transações com `type` income. 
O outcome é a soma de todos os valores das transações com `type` outcome, e o total é o valor de `income - outcome`.

- Para fazer a soma dos valores, é usada a função [reduce](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 
para agrupar as transações pela propriedade `type`, assim a soma de todos os valores é feita com facilidade para obter o retorno do `balance`.
