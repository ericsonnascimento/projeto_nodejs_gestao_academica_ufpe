import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Para simular __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { verbose } = sqlite3;
const { Database } = verbose();

const dbPath = path.join(__dirname, 'meubanco.db');
const db = new Database(dbPath);

// Função para inicializar o banco
async function inicializarBanco() {
    return new Promise((resolve, reject) => {
        const sql = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        db.run(sql, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Tabela usuarios verificada/criada com sucesso');
                resolve();
            }
        });
    });
}

// Funções do banco de dados
function inserirUsuario(nome, email) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO usuarios (nome, email) VALUES (?, ?)`;
        db.run(sql, [nome, email], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, nome, email });
        });
    });
}

function buscarUsuarios() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM usuarios`;
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Inicializar o banco
inicializarBanco().catch(console.error);

// Exportar como padrão
export default {
    db,
    inicializarBanco,
    inserirUsuario,
    buscarUsuarios
};