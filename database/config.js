import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Para simular __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { verbose } = sqlite3;
const { Database } = verbose();

const dbPath = path.join(__dirname, 'db.sqlite3');
const db = new Database(dbPath);

// Função para inicializar o banco
async function inicializarBanco() {
    const tabelas = [
        {
            nome: 'alunos',
            sql: `
                CREATE TABLE IF NOT EXISTS alunos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            nome: 'professores', 
            sql: `
                CREATE TABLE IF NOT EXISTS professores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            nome: 'administrativo', 
            sql: `
                CREATE TABLE IF NOT EXISTS administrativo (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `
        }
    ];
    
    for (const tabela of tabelas) {
        await new Promise((resolve, reject) => {
            db.run(tabela.sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Tabela ${tabela.nome} verificada/criada com sucesso`);
                    resolve();
                }
            });
        });
    }
}

export {db, inicializarBanco};