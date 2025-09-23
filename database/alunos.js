import { db } from "./config.js";

// FUNÇÃO INSERIR ALUNO
function inserirAlunoDB(nome, email) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO alunos (nome, email) VALUES (?, ?)`;
        db.run(sql, [nome, email], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, nome, email });
        });
    });
}

//FUNÇÃO BUSCAR TODOS OS ALUNOS
function buscarAlunosDB() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM alunos`;
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// FUNÇÃO PARA BUSCAR ALUNO POR ID
function buscarAlunoPorIdDB(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM alunos WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row || null);
        });
    });
}

// FUNÇÃO PARA EDITAR ALUNO
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

// FUNÇÃO PARA DELETAR ALUNO
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

// Inicializar o banco
inicializarBanco().catch(console.error);

export {
    inserirAlunoDB,
    buscarAlunosDB,
    buscarAlunoPorIdDB,
    editarAlunoDB,
    deletarAlunoDB
}