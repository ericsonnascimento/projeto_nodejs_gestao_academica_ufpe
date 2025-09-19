import database from './database.js';

async function main() {
    try {
        // Garantir que o banco está inicializado
        await database.inicializarBanco();
        
        console.log('Cadastrando usuários...');
        await database.inserirUsuario('João Silva', 'joao@email.com');
        await database.inserirUsuario('Maria Santos', 'maria@email.com');
        
        console.log('Buscando usuários...');
        const usuarios = await database.buscarUsuarios();
        console.log('Usuários encontrados:', usuarios);
        
    } catch (error) {
        console.error('Erro no processo:', error.message);
    }
}

// Executar
main();