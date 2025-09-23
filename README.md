# Projeto Node.js Softex (UFPE) - Gestão Acadêmica 

<h2>Configuração preliminares</h2>

1. npm install sqlite3 (Instalação da biblioteca do BD)
2. npm install prompt-sync (Instalação da biblioteca do prompt)
3. node .\database.js (Criação do DB db.sqlite3 caso não exista)
4. node .\app.js (Execução da aplicação)

## Aruiteturta do Projeto

projeto/<br/>
├── database/<br/>
│   ├── index.js          # Ponto de entrada principal<br/>
│   ├── alunos.js         # Funções de alunos<br/>
│   ├── professores.js    # Funções de professores<br/>
│   └── administrativo.js # Funções de administrativo<br/>
├── app.js<br/>
└── package.json<br/>