# Projeto Node.js Softex (UFPE) - Gestão Acadêmica 

<h2>Configuração preliminares</h2>

1. npm install sqlite3 (Instalação da biblioteca do BD)
2. npm install prompt-sync (Instalação da biblioteca do prompt)
3. node .\database.js (Criação do DB db.sqlite3 caso não exista)
4. node .\app.js (Execução da aplicação)

## Aruiteturta do Projeto

projeto/
├── database/
│   ├── index.js          # Ponto de entrada principal
│   ├── alunos.js         # Funções de alunos
│   ├── professores.js    # Funções de professores
│   └── administrativo.js # Funções de administrativo
├── app.js
└── package.json