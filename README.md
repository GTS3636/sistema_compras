# Sistema de Gerenciamento de Compras #

Este projeto é um sistema full‑stack para gerenciamento de produtos, compras e usuários, com geração de relatórios e gráficos adicionalmente.

---

## Tecnologias e Ferramentas

* **Backend**: Node.js, Express, Sequelize, CORS
* **Banco de Dados**: MySQL
* **Frontend**: HTML, CSS, JavaScript
* **Gráficos**: Chart.js
* **Consumo de APIs**: fetch
* **Variáveis de ambiente**: dotenv

---

## Requisitos

* **Node.js** v14 ou superior
* **npm** (Node Package Manager)
* **MySQL** instalado e em execução (versão 5.7+)
* Navegador moderno (Chrome, Firefox, Edge etc.)

---

## Instalação

1. **Clonar o repositório**

   ```bash
   git clone <URL do repositório>
   cd <nome-do-projeto>
   ```

2. **Instalar dependências do backend**

   ```bash
   cd backend
   npm install
   ```

---

## Configuração do Banco de Dados

1. **Criar o banco de dados por nome de sua escolha** (substitua `nome_do_banco`):

   ```sql
   CREATE DATABASE nome_do_banco;
   ```

2. **Criar arquivo `.env`** na raiz da pasta `backend`:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=sua_porta_mysql
   DB_USER=seu_usuario_mysql
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   ```

> O sistema utiliza **Sequelize** para sincronizar modelos e criar tabelas automaticamente com a biblioteca MySQL2 integrada no ORM.

---

## Execução

1. **Iniciar o backend**

   ```bash
   cd backend
   npm run start     # ou: node <nome_da_pasta(caso tenha definido para organização)/nome_do_arquivo_principal.js>
   ```

   O servidor ficará disponível em `http://localhost:3000` (porta padrão).

2. **Iniciar o frontend**

   * **Opção 1**: Abrir diretamente `index.html` no navegador (pelos arquivos do computador). `Não recomendado`
   * **Opção 2**: Usar um servidor estático `recomendado`:

     ```bash
     npx serve ./frontend    # ou: npx http-server ./frontend
     ```

     Caso esteja utilizando o Visual Studio Code como IDE, é mais recomendado a utilização da extensão Live Server e/ou Live Preview, já que possuem a funcionalidade de servidor estático já integrada e configurada.
   * **Opção 3**: Se o backend estiver configurado para servir arquivos estáticos, acesse `http://localhost:3000`.

---

## Estrutura de Diretórios

```text
<root>/
├── backend/
│   ├── controller/                       # Pasta com endpoints REST para os modelos
│   │   ├── compra.controller.js          # Controller para conexçao do Front-End para o modelo Compra
│   │   ├── produto.controller.js         # Controller para conexçao do Front-End para o modelo Produto
│   │   └── usuario.controller.js         # Controller para conexçao do Front-End para o modelo Usuario
|   |
│   ├── db/                               # Pasta para conexão com servidor 
│   │   └── conn.js                       # Configuração de conexão com servidor
|   |
│   ├── model/                            # Pasta para definições de modelos Sequelize (produtos, compras, usuários)
│   │   ├── Compra.js                     # Modelo Compra
│   │   ├── Produto.js                    # Modelo Produto
│   │   └── Usuario.js                    # Modelo Usuario
|   |
│   ├── sync.js                           # Arquivo de entrada para o banco de dados (executar antes do principal)
│   ├── index.js                          # Configuração do servidor principal (executar após o sync.js)
│   ├── .env                              # Variáveis de ambiente
│   ├── .gitignore                        # Arquivo para definir arquvios a serem ignorados em próximos commits
│   ├── package.json                      # Dependências e scripts para o software
│   └── package-lock.json                 # Dependências e scripts para os módulos instalados pelo npm (não mexer)
|
├── docs/                                 # Documentação adicional             
|   ├── dumps/                            # Dumps sql
|   |   ├── compras_db_compra.sql
|   |   ├── compras_db_compras.sql
|   |   ├── compras_db_routines.sql
|   |   └── compras_db_usuario.sql
|   |
|   ├── Diagrama de Sequência Listagem    # Diagrama de Sequência em função da listagem de usuários
|   ├── Diagrama de Sequência Produto     # Diagrama de Sequência em função do cadastro de produtos
|   ├── caso de uso.png                   # Diagrama UML de caso de uso
|   ├── diagramaClasse.png                # Diagrama UML de classe dos modelos
|   └──diagramaDER.png                    # Diagrama lógico criado pelo banco de dados
|
├── frontend/
│   ├── css/
│   │   └── style.css                     # Estilos principais
|   |
│   ├── js/                               # Pasta para organização de lógica
│   │   ├── compra/                       # Pasta para organização de funções no Front-End para o modelo compra
│   │   │   ├── atualizarCompra.js        # Arquivo lógico para atualizar a Compra
│   │   │   ├── cadastrarCompra.js        # Arquivo lógico para cadastrar a Compra
│   │   │   ├── excluirCompra.js          # Arquivo lógico para excluir a Compra
│   │   │   ├── listarCompra.js           # Arquivo lógico para listar a Compra
│   │   │   └── relatorioCompra.js        # Arquivo lógico para gerar relatório do Compra   
|   |   |
│   │   ├── produto/                      # Pasta para organização de funções no Front-End para o modelo produto
│   │   │   ├── atualizarProduto.js       # Arquivo lógico para atualizar o Produto
│   │   │   ├── cadastrarProduto.js       # Arquivo lógico para cadastrar o Produto
│   │   │   ├── consultarProduto.js       # Arquivo lógico para consultar o Produto
│   │   │   ├── excluirProduto.js         # Arquivo lógico para excluir o Produto
│   │   │   ├── listarProduto.js          # Arquivo lógico para listar o Produto
│   │   │   ├── loteProduto.js            # Arquivo lógico para cadastro de lote do Produto
│   │   │   └── relatorioProduto.js       # Arquivo lógico para gerar relatório do Produto
|   |   |
│   │   ├── usuario/                      # Pasta para organização de funções no Front-End para o modelo usuario
│   │   │   ├── atualizarUsuario.js       # Arquivo lógico para atualizar o Usuário
│   │   │   ├── cadastrarUsuario.js       # Arquivo lógico para cadastrar o Usuário
│   │   │   ├── consultarUsuario.js       # Arquivo lógico para consultar o Usuário
│   │   │   ├── excluirUsuario.js         # Arquivo lógico para excluir o Usuário
│   │   │   ├── listarUsuario.js          # Arquivo lógico para listar o Usuário
│   │   │   ├── loteUsuario.js            # Arquivo lógico para cadastro de lote do Usuário
│   │   │   └── relatorioUsuario.js       # Arquivo lógico para gerar relatório do Usuário
|   |   |
│   │   ├── graficos.js                   # Criação e manejo dos gráficos
│   │   └── index.js                      # Lógica de UI e consumo de APIs por import
|   |
│   └── index.html                        # Estrutura HTML e inclusão de Chart.js para utilização dos gráficos
|
└── README.md                             # Documentação (este arquivo)
```

---

## Uso

1. Na interface web, use os seletores no topo para escolher a página **Produtos**, **Compras** ou **Usuários**.
2. Selecione a serviço: **Cadastrar**, **Listar**, **Atualizar**, **Deletar**, **Lote** ou **Relatório**.
3. Para gráficos, defina os filtros dentro do serviço **Relatório** (limite, mínimo etc.) e clique em `Exibir gráfico`.

---

## Variáveis de Ambiente (.env)

| Nome          | Descrição                      |
| ------------- | ------------------------------ |
| `DB_HOST`     | Host do MySQL (ex.: localhost) |
| `DB_PORT`     | Porta do MySQL (ex.: 3306)     |
| `DB_USER`     | Usuário do banco               |
| `DB_PASSWORD` | Senha do usuário               |
| `DB_NAME`     | Nome do banco de dados         |

---

## Autor

Desenvolvido por **Guilherme Tomaz Silva**

---
