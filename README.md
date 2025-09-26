# Projeto Node.js Softex (UFPE) - Gestão Acadêmica 

<h2>Configuração preliminares</h2>

1. npm install sqlite3 (Instalação da biblioteca do BD)
2. npm install prompt-sync (Instalação da biblioteca do prompt)
3. node .\database.js (Criação do DB db.sqlite3 caso não exista)
4. node .\app.js (Execução da aplicação)

## Aruiteturta do Projeto

projeto/<br/>
├── database/<br/>
│   ├── alunos.js         # Funções DB de alunos<br/>
│   ├── professores.js    # Funções DB de professores<br/>
│   └── administrativo.js # Funções DB de administrativo<br/>
|── services/<br/>
│   ├── alunos.js         # Funções Objeto de alunos<br/>
│   ├── professores.js    # Funções Objeto de professores<br/>
│   └── administrativo.js # Funções Objeto de administrativo<br/>
├── app.js<br/>
└── package.json<br/>

## Excutar projeto por ícone na Área de Trabalho

1. Criar um arquivo TXT na área de trabalho e renomear para programa.bat
2. Incluindo o código abaixo dentro do programa.bat:

    ```
    @echo off
    chcp 65001 > nul
    title Sistema de Gestão Acadêmica
    cd /d "C:\PROJETOS\meu_projeto"
    echo Iniciando o sistema...
    node app.js
    pause
    ```

3. Ajustar o caminho ao qual o projeto foi salvo no seu desktop.
4. Executar pressionando duas vezes