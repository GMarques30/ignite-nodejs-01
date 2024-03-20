# APP

API CRUD de tarefas

## Requisitos funcionais

[x] Deve ser possível criar uma task

[x] Deve ser possível listar todas as tasks

[x] Deve ser possível atualizar uma task pelo id

[x] Deve ser possível remover uma task pelo id

[x] Deve ser possível marcar pelo id uma task como completa

[] Deve ser possível importar tasks em massa por um arquivo CSV

## Regras de negócio

### Estrutura de uma task

- id - Identificador único de cada task
- title - Título da task
- description - Descrição detalhada da task
- completed_at - Data de quando a task foi concluída. O valor inicial deve ser `null`
- created_at - Data de quando a task foi criada
- updated_at - Deve ser sempre alterado para a data de quando a task foi atualizada

### Rotas

- POST - `/tasks`

  [x] Deve ser possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.

  [x] Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.

- GET - `/tasks`

  [x] Deve ser possível listar todas as tasks salvas no banco de dados.

  [x] Também deve ser possível realizar uma busca, filtrando as tasks pelo `title` e `description`

- PUT - `/tasks/:id`

  [x] Deve ser possível atualizar uma task pelo `id`.

  [x] No `body` da requisição, deve receber somente o `title` e/ou `description` para serem atualizados.

  [x] Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.

  [x] Antes de realizar a atualização, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

- DELETE - `/tasks/:id`

  [x] Deve ser possível remover uma task pelo `id`.

  [x] Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

- PATCH - `/tasks/:id/complete`

  [x] Deve ser possível marcar a task como completa ou não. Isso significa que se a task estiver concluída, deve voltar ao seu estado “normal”.

  [x] Antes da alteração, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

### Regras de negócio

[x] Validar se as propriedades `title` e `description` das rotas `POST` e `PUT` estão presentes no `body` da requisição.

[x] Nas rotas que recebem o `/:id`, além de validar se o `id` existe no banco de dados, retornar a requisição com uma mensagem informando que o registro não existe.
