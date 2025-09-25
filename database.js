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

// ------------------------------------------ INICIO CRUD Aluno ------------------------------------------
// função DB para inserir aluno
function inserirAlunoDB(nome, email) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO alunos (nome, email) VALUES (?, ?)`;
        db.run(sql, [nome, email], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, nome, email });
        });
    });
}

//função DB para buscar todos os alunos
function buscarAlunosDB() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM alunos`;
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

//função DB para buscar aluno por ID
function buscarAlunoPorIdDB(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM alunos WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row || null);
        });
    });
}

//função DB para editar aluno por ID
function editarAlunoDB(id, nome, email) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE alunos SET nome = ?, email = ? WHERE id = ?`;
        db.run(sql, [nome, email, id], function(err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    resolve({ success: false, message: 'Aluno não encontrado' });
                } else {
                    resolve({ 
                        success: true, 
                        message: 'Aluno atualizado com sucesso',
                        changes: this.changes 
                    });
                }
            }
        });
    });
}

//função DB para deletar aluno por ID
function deletarAlunoDB(id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM alunos WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    resolve({ success: false, message: 'Aluno não encontrado' });
                } else {
                    resolve({ 
                        success: true, 
                        message: 'Aluno deletado com sucesso',
                        changes: this.changes 
                    });
                }
            }
        });
    });
}
// ------------------------------------------- FIM CRUD Aluno -------------------------------------------

// ---------------------------------------- INICIO CRUD Professor ---------------------------------------
// função DB para inserir professor
function inserirProfessorDB(nome, email) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO professores (nome, email) VALUES (?, ?)`;
        db.run(sql, [nome, email], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, nome, email });
        });
    });
}

//função DB para buscar todos os professores
function buscarProfessorDB() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM professores`;
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

//função DB para buscar professor por ID
function buscarProfessorPorIdDB(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM professores WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row || null);
        });
    });
}

//função DB para editar professor por ID
function editarProfessorDB(id, nome, email) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE professores SET nome = ?, email = ? WHERE id = ?`;
        db.run(sql, [nome, email, id], function(err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    resolve({ success: false, message: 'Professor não encontrado' });
                } else {
                    resolve({ 
                        success: true, 
                        message: 'Professor atualizado com sucesso',
                        changes: this.changes 
                    });
                }
            }
        });
    });
}

//função DB para deletar professor por ID
function deletarProfessorDB(id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM professores WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    resolve({ success: false, message: 'Professor não encontrado' });
                } else {
                    resolve({ 
                        success: true, 
                        message: 'Professor deletado com sucesso',
                        changes: this.changes 
                    });
                }
            }
        });
    });
}
// ------------------------------------------- FIM CRUD Professor ----------------------------------------

// ---------------------------------------- INICIO CRUD Administrativo------------------------------------
// função DB para inserir Administrativo
function inserirAdministrativoDB(nome, email) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO administrativo (nome, email) VALUES (?, ?)`;
        db.run(sql, [nome, email], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, nome, email });
        });
    });
}

//função DB para buscar todos os Administrativoes
function buscarAdministrativoDB() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM administrativo`;
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

//função DB para buscar Administrativo por ID
function buscarAdministrativoPorIdDB(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM administrativo WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row || null);
        });
    });
}

//função DB para editar Administrativo por ID
function editarAdministrativoDB(id, nome, email) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE administrativo SET nome = ?, email = ? WHERE id = ?`;
        db.run(sql, [nome, email, id], function(err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    resolve({ success: false, message: 'Colaborador não encontrado' });
                } else {
                    resolve({ 
                        success: true, 
                        message: 'Colaborador atualizado com sucesso',
                        changes: this.changes 
                    });
                }
            }
        });
    });
}

//função DB para deletar Administrativo por ID
function deletarAdministrativoDB(id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM administrativo WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    resolve({ success: false, message: 'Colaborador não encontrado' });
                } else {
                    resolve({ 
                        success: true, 
                        message: 'Colaborador deletado com sucesso',
                        changes: this.changes 
                    });
                }
            }
        });
    });
}
// ------------------------------------------- FIM CRUD Administrativo -----------------------------------

// Exportar todas as funções
export default {
    db,
    inicializarBanco,
    inserirAlunoDB,
    buscarAlunosDB,
    buscarAlunoPorIdDB,
    editarAlunoDB,
    deletarAlunoDB,
    inserirProfessorDB,
    buscarProfessorDB,
    buscarProfessorPorIdDB,
    editarProfessorDB,
    deletarProfessorDB,
    inserirAdministrativoDB,
    buscarAdministrativoDB,
    buscarAdministrativoPorIdDB,
    editarAdministrativoDB,
    deletarAdministrativoDB
};