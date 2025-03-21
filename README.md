# API Flask - Rotas e Funcionalidades

## Introdução
Esta API utiliza Flask e MySQL para gerenciar cadastro de usuários, login, pedidos e produtos. As rotas foram organizadas por categorias para facilitar a compreensão.

---

## 1. Autenticação de Usuário

### **Cadastro de Usuário** 
- **Rota:** `/cadastro`
- **Método:** `POST`
- **Descrição:** Registra um novo usuário no sistema.
- **Parâmetros:**
  - `nome` (string)
  - `cpf` (string)
  - `cep` (string)
  - `email` (string)
  - `senha` (string)
- **Resposta:** JSON com mensagem de sucesso ou erro.

### **Login de Usuário**
- **Rota:** `/login`
- **Método:** `POST`
- **Descrição:** Autentica um usuário com email e senha.
- **Parâmetros:**
  - `email` (string)
  - `senha` (string)
- **Resposta:** JSON com mensagem de sucesso e `idcliente` ou erro.

### **Logout de Usuário**
- **Rota:** `/logout`
- **Método:** `GET`
- **Descrição:** Encerra a sessão do usuário logado.
- **Resposta:** JSON com mensagem de logout bem-sucedido.

---

## 2. Gerenciamento de Pedidos

### **Fazer Pedido**
- **Rota:** `/pedido`
- **Método:** `POST`
- **Descrição:** Registra um novo pedido no sistema.
- **Parâmetros:**
  - `idcliente` (int)
  - `valortotalpedido` (float)
  - `valorfrete` (float)
  - `listapedido` (array de objetos contendo `idproduto`, `quantidadeproduto`, `subtotal`)
- **Resposta:** JSON com mensagem de sucesso ou erro.

### **Listar Pedidos**
- **Rota:** `/pedidos`
- **Método:** `GET`
- **Descrição:** Retorna todos os pedidos registrados.
- **Resposta:** JSON com lista de pedidos.

---

## 3. Gerenciamento de Produtos

### **Adicionar Produto**
- **Rota:** `/admin/adicionar/produto`
- **Método:** `POST`
- **Descrição:** Adiciona um novo produto ao banco de dados.
- **Parâmetros:**
  - `nome` (string)
  - `valor` (float)
  - `peso` (float)
  - `descricao` (string)
  - `tamanho` (string)
  - `quantidade` (int)
  - `urlimg` (string)
  - `categoria` (string)
- **Resposta:** JSON com mensagem de sucesso ou erro.

### **Atualizar Produto**
- **Rota:** `/admin/atualizar/produto`
- **Método:** `POST`
- **Descrição:** Atualiza informações de um produto existente.
- **Parâmetros:**
  - `idproduto` (int)
  - `nome` (string)
  - `valor` (float)
  - `peso` (float)
  - `descricao` (string)
  - `tamanho` (string)
  - `quantidade` (int)
  - `urlimg` (string)
  - `categoria` (string)
- **Resposta:** JSON com mensagem de sucesso ou erro.

### **Listar Produtos**
- **Rota:** `/produtos`
- **Método:** `GET`
- **Descrição:** Retorna todos os produtos cadastrados.
- **Resposta:** JSON com lista de produtos.

---

## 4. Controle de Estoque e Movimentação

### **Consultar Estoque**
- **Rota:** `/admin/estoque`
- **Método:** `GET`
- **Descrição:** Retorna a quantidade de cada produto em estoque.
- **Resposta:** JSON com lista de produtos e suas quantidades.

### **Consultar Movimentação de Saída**
- **Rota:** `/admin/movimentacao/saida`
- **Método:** `GET`
- **Descrição:** Retorna o histórico de movimentação de saída dos produtos.
- **Resposta:** JSON com lista de saídas de produtos.

---

## Considerações Finais
- A API está configurada para aceitar requisições CORS de `http://localhost:4200`.
- A conexão com o banco de dados MySQL é feita através das credenciais definidas em `db_config`.
- A variável `SECRET_KEY` é carregada do ambiente para segurança da sessão.

**Executando a API:**
```bash
FLASK_APP=app.py FLASK_ENV=development flask run
```

Ou especifique a porta e o host:
```bash
python app.py
```

