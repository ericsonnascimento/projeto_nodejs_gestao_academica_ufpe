import database from './database.js';
import prompt from 'prompt-sync';

const promptSync = prompt({ sigint: true });

/*
//para que o while funcione a variável tem que estar fora do loop
let menu;

//função que chama o menu principal, reduz a repetição de código 
//menuInicial();

//criando o loop infinito através do "do while"
do {
    //prompt principal relacionado ao menu    
    menu = parseInt(promptSync('Para reimprimir o MENU(6) ou SAIR(7) | Escolha um código do MENU: '));
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');

    //utilizando o "switch" para gerenciar o MENU, objetivo é que cada CASE chame uma função entre as oções de 1 à 7
    switch (menu) {
        case 1:
            classificarNadador();
            break;
    
        case 2:
            calcularMedia();
            break;
        
        case 3:
            calcularCredito();
            break;
        
        case 4:
            calcularDebido();
            break;
    
        case 5:
            calcularAumento();
            break;
        
        case 6:
            menuInicial();
            break;

        case 7:
            console.log('=-=-=-=-Obrigado por utilizar nosso sistema. Volte Sempre!=-=-=-=-=');
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            break;
        
        default:
            console.log('Error - Digita um código válido');
            break;
    }

//condicional do "do while" para sair do loop infinito
} while (menu != 7);
*/

let novoAluno;

//CLASSE ALUNO (CRIAÇÃO DE OBJETOS)
class Aluno {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    
    inserirAluno() {
        try {
            database.inicializarBanco();
            database.inserirAlunoDB(this.nome, this.email);
            
        } catch (error) {
            console.error('Erro no processo:', error.message);
        }
    }

}

// FUNÇÃO PARA CADASTRAR ALUNO
function cadastrarAluno(nome, email) {
    nome = promptSync('Digite o nome do aluno: ');
    email = promptSync('Digite o email do aluno: ');
    
    novoAluno = new Aluno(nome, email);
    novoAluno.inserirAluno()
}

// FUNÇÃO PARA LISTAR ALUNOS
async function listarAlunos() {
    try {
        const listandoAlunos = await database.buscarAlunosDB(); // Adicione o AWAY
        
        if (Array.isArray(listandoAlunos)) {
            console.log('\n=== ALUNOS ENCONTRADOS ===');
            
            if (listandoAlunos.length === 0) {
                console.log('Nenhum aluno cadastrado.');
            } else {
                listandoAlunos.forEach((aluno, index) => {
                    console.log(`${index + 1}. ID: ${aluno.id} | Nome: ${aluno.nome} | Email: ${aluno.email}`);
                });
            }
        } else {
            console.log('Erro: Retorno não é um array após await:', listandoAlunos);
        }
        
    } catch (error) {
        console.error('Erro ao buscar alunos:', error.message);
    }
}

// FUNÇÃO PARA EDITAR ALUNO
async function editarAluno(id, novoNome, novoEmail) {
    try {
        // Primeiro, verifica se o aluno existe
        const alunoExistente = await database.buscarAlunoPorIdDB(id);
        
        if (!alunoExistente) {
            console.log('❌ Aluno não encontrado!');
            return;
        }

        console.log(`Aluno atual: ${alunoExistente.nome} (${alunoExistente.email})`);
        
        // Executa a edição
        const resultado = await database.editarAlunoDB(id, novoNome, novoEmail);
        
        if (resultado.success) {
            console.log('✅ Aluno editado com sucesso!');
            console.log(`Novos dados: ${novoNome} (${novoEmail})`);
        } else {
            console.log('❌ Erro ao editar aluno:', resultado.message);
        }
        
    } catch (error) {
        console.error('❌ Erro ao editar aluno:', error.message);
    }
}

// FUNÇÃO PARA DELETAR ALUNO
async function deletarAluno(id) {
    try {
        // Confirmação (opcional - para segurança)
        const aluno = await database.buscarAlunoPorIdDB(id);
        
        if (!aluno) {
            console.log('Aluno não encontrado!');
            return;
        }

        console.log(`ATENÇÃO: Você está prestes a deletar o aluno:`);
        console.log(`Nome: ${aluno.nome}`);
        console.log(`Email: ${aluno.email}`);
        console.log(`ID: ${aluno.id}`);
        
        let confirmar = promptSync('Digite "sim" para confirmar ou "não" para sair: ')
        
        if (confirmar === 'sim') {
            confirmar = true
        } else {
            console.log("Operação cancelada!")
            return
        }
        
        // Simula uma confirmação (em app real, seria um input do usuário)
        if (confirmar) {
            const resultado = await database.deletarAlunoDB(id);
            
            if (resultado.success) {
                console.log('Aluno deletado com sucesso!');
            } else {
                console.log('Erro ao deletar aluno:', resultado.message);
            }
        } else {
            console.log('Operação cancelada.');
        }
        
    } catch (error) {
        console.error('Erro ao deletar aluno:', error.message);
    }
}

// EXEMPLOS DE USO:
async function main() {
    // Listar alunos antes
    //await listarAlunos();
    
    // Editar aluno com ID 1
    //await editarAluno(1, 'Maria Silva Updated', 'maria.updated@email.com');
    
    // Deletar aluno com ID 2
    await deletarAluno(1);
    
    // Listar alunos depois
    await listarAlunos();
}

// Executar
main();