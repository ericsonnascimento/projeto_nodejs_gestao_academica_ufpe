import database from './database.js';
import prompt from 'prompt-sync';

const promptSync = prompt({ sigint: true });

// função que inicializa o banco de dados
async function inicializarSistema() {
    try {
        await database.inicializarBanco();
        console.log('Sistema inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar sistema:', error.message);
        process.exit(1);
    }
}

//classe para criação do objeto "aluno"
class Aluno {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    
    async inserirAluno() {
        try {
            const resultado = await database.inserirAlunoDB(this.nome, this.email);
            console.log(`Aluno ${this.nome} cadastrado com ID: ${resultado.id}`);
            return resultado;
        } catch (error) {
            console.error('Erro no processo:', error.message);
        }
    }

}

//classe para criação do objeto "professor"
class Professor {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    
    async inserirProfessor() {
        try {
            const resultado = await database.inserirProfessorDB(this.nome, this.email);
            console.log(`Professor ${this.nome} cadastrado com ID: ${resultado.id}`);
            return resultado;
        } catch (error) {
            console.error('Erro no processo:', error.message);
        }
    }

}

//classe para criação do objeto "administrativo"
class Administrativo {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    
    async inserirAdministrativo() {
        try {
            const resultado = await database.inserirAdministrativoDB(this.nome, this.email);
            console.log(`Administrativo ${this.nome} cadastrado com ID: ${resultado.id}`);
            return resultado;
        } catch (error) {
            console.error('Erro no processo:', error.message);
        }
    }

}

// ------------------------------------------ INICIO CRUD Aluno ------------------------------------------
//variável global 
let novoAluno;

// função de cadastro de aluno
async function cadastrarAluno(nome, email) {
    nome = promptSync('Digite o nome do aluno: ');
    email = promptSync('Digite o email do aluno: ');
    
    novoAluno = new Aluno(nome, email);
    await novoAluno.inserirAluno();
    console.log('aluno cadastrado com sucesso!');    
}

// função de listar alunos
async function listarAlunos() {
    try {
        const listandoAlunos = await database.buscarAlunosDB();
        
        if (Array.isArray(listandoAlunos)) {
            console.log('\n=-=-=-=-==-=-=-=-=-=-=-=-= Alunos Encontrados -=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            
            if (listandoAlunos.length === 0) {
                console.log('Nenhum aluno cadastrado.');
            } else {
                listandoAlunos.forEach((aluno, index) => {
                    console.log(`ID: ${aluno.id} | Nome: ${aluno.nome} | Email: ${aluno.email}`);
                });
            }
        } else {
            console.log('Erro: Retorno não é um array após await:', listandoAlunos);
        }
        
    } catch (error) {
        console.error('Erro ao buscar alunos:', error.message);
    }
}

// função de editar aluno
async function editarAluno(id, novoNome, novoEmail) {
    id = promptSync('Digite o ID: ');
    novoNome = promptSync('Digite o NOVO nome: ');
    novoEmail = promptSync('Digite o NOVO email: ')

    try {
        // primeiro, verifica se o aluno existe
        const alunoExistente = await database.buscarAlunoPorIdDB(id);
        
        if (!alunoExistente) {
            console.log('Aluno não encontrado!');
            return;
        }

        console.log(`Aluno atual: ${alunoExistente.nome} (${alunoExistente.email})`);
        
        // executa a edição
        const resultado = await database.editarAlunoDB(id, novoNome, novoEmail);
        
        if (resultado.success) {
            console.log('Aluno editado com sucesso!');
            console.log(`Novos dados: ${novoNome} (${novoEmail})`);
        } else {
            console.log('Erro ao editar aluno:', resultado.message);
        }
        
    } catch (error) {
        console.error('Erro ao editar aluno:', error.message);
    }
}

// função de deletar aluno
async function deletarAluno(id) {
    // REMOVA esta linha - o ID deve vir como parâmetro
    id = promptSync('Digite o ID a ser EXCLUÍDO: ')
    
    try {
        const aluno = await database.buscarAlunoPorIdDB(id);
        
        if (!aluno) {
            console.log('Aluno não encontrado!');
            return;
        }

        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-');
        console.log(`-=-=-=-=-=-= ATENÇÃO: Você está prestes a EXCLUIR o aluno: =-=-=-=-=-=-=-`);
        console.log(`ID: ${aluno.id} | Nome: ${aluno.nome} | Email: ${aluno.email}`);
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-');
        
        let confirmar = promptSync('Digite "SIM" para confirmar ou "NÃO" para sair: ');
               
        if (confirmar.toLowerCase() === 'sim') {
            
            await database.deletarAlunoDB(id);
            console.log('Aluno deletado com sucesso!');

        } else {
            console.log('Operação cancelada.');
        }
        
    } catch (error) {
        console.error('Erro ao deletar aluno:', error.message);
    }
}
// ------------------------------------------- FIM CRUD Aluno -------------------------------------------

// -------------------------------------- INICIO CRUD Professor ------------------------------------------
//variável global 
let novoProfessor;

// função de cadastro de Professor
async function cadastrarProfessor(nome, email) {
    nome = promptSync('Digite o nome do professor: ');
    email = promptSync('Digite o email do professor: ');
    
    novoProfessor = new Professor(nome, email);
    await novoProfessor.inserirProfessor();
    console.log('Professor cadastrado com sucesso!');    
}

// função de listar Professor
async function listarProfessor() {
    try {
        const listandoProfessor = await database.buscarProfessorDB();
        
        if (Array.isArray(listandoProfessor)) {
            console.log('\n=-=-=-=-==-=-=-=-=-=-=-=-= Professor Encontrados -=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            
            if (listandoProfessor.length === 0) {
                console.log('Nenhum professor cadastrado.');
            } else {
                listandoProfessor.forEach((aluno, index) => {
                    console.log(`ID: ${aluno.id} | Nome: ${aluno.nome} | Email: ${aluno.email}`);
                });
            }
        } else {
            console.log('Erro: Retorno não é um array após await:', listandoProfessor);
        }
        
    } catch (error) {
        console.error('Erro ao buscar professores:', error.message);
    }
}

// função de editar Professor
async function editarProfessor(id, novoNome, novoEmail) {
    id = promptSync('Digite o ID: ');
    novoNome = promptSync('Digite o NOVO nome: ');
    novoEmail = promptSync('Digite o NOVO email: ')

    try {
        // primeiro, verifica se o aluno existe
        const ProfessorExistente = await database.buscarProfessorPorIdDB(id);
        
        if (!ProfessorExistente) {
            console.log('Professor não encontrado!');
            return;
        }

        console.log(`Professor atual: ${ProfessorExistente.nome} (${ProfessorExistente.email})`);
        
        // executa a edição
        const resultado = await database.editarProfessorDB(id, novoNome, novoEmail);
        
        if (resultado.success) {
            console.log('Professor editado com sucesso!');
            console.log(`Novos dados: ${novoNome} (${novoEmail})`);
        } else {
            console.log('Erro ao editar Professor:', resultado.message);
        }
        
    } catch (error) {
        console.error('Erro ao editar professor:', error.message);
    }
}

// função de deletar Professor
async function deletarProfessor(id) {
    id = promptSync('Digite o ID a ser EXCLUÍDO: ')
    
    try {
        // confirmação (opcional - para segurança)
        const professor = await database.buscarProfessorPorIdDB(id);
        
        if (!professor) {
            console.log('Professor não encontrado!');
            return;
        }

        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-');
        console.log(`-=-=-=-=-= ATENÇÃO: Você está prestes a EXCLUIR o Professor: =-=-=-=-=-=-`);
        console.log(`ID: ${professor.id} | Nome: ${professor.nome} | Email: ${professor.email}`);
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-');
        
        let confirmar = promptSync('Digite "SIM" para confirmar ou "NÃO" para sair: ');
        
          if (confirmar.toLowerCase() === 'sim') {
            
            await database.deletarProfessorDB(id);
            console.log('Professor deletado com sucesso!');

        } else {
            console.log('Operação cancelada.');
        }
        
    } catch (error) {
        console.error('Erro ao deletar professor:', error.message);
    }
}
// ---------------------------------------- FIM CRUD Professor -------------------------------------------

// -------------------------------------- INICIO CRUD Administrativo -------------------------------------
//variável global 
let novoAdministrativo;

// função de cadastro de administrativo
async function cadastrarAdministrativo(nome, email) {
    nome = promptSync('Digite o nome do Administrativo: ');
    email = promptSync('Digite o email do Administrativo: ');
    
    novoAdministrativo = new Administrativo(nome, email);
    await novoAdministrativo.inserirAdministrativo();
    console.log('Administrativo cadastrado com sucesso!');    
}

// função de listar administrativos
async function listarAdministrativo() {
    try {
        const listandoAdministrativo = await database.buscarAdministrativoDB();
        
        if (Array.isArray(listandoAdministrativo)) {
            console.log('\n=-=-=-=-==-=-=-=-=-=-=-=-= Colaboradores Encontrados -=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            
            if (listandoAdministrativo.length === 0) {
                console.log('Nenhum Colaborador cadastrado.');
            } else {
                listandoAdministrativo.forEach((administrativo, index) => {
                    console.log(`ID: ${administrativo.id} | Nome: ${administrativo.nome} | Email: ${administrativo.email}`);
                });
            }
        } else {
            console.log('Erro: Retorno não é um array após await:', listandoAdministrativo);
        }
        
    } catch (error) {
        console.error('Erro ao buscar Colaboradores:', error.message);
    }
}

// função de editar administrativo
async function editarAdministrativo(id, novoNome, novoEmail) {
    id = promptSync('Digite o ID: ');
    novoNome = promptSync('Digite o NOVO nome: ');
    novoEmail = promptSync('Digite o NOVO email: ')

    try {
        // primeiro, verifica se o administrativo existe
        const AdministrativoExistente = await database.buscarAdministrativoPorIdDB(id);
        
        if (!AdministrativoExistente) {
            console.log('Colaborador não encontrado!');
            return;
        }

        console.log(`Colaborador atual: ${AdministrativoExistente.nome} (${AdministrativoExistente.email})`);
        
        // executa a edição
        const resultado = await database.editarAdministrativoDB(id, novoNome, novoEmail);
        
        if (resultado.success) {
            console.log('Colaborador editado com sucesso!');
            console.log(`Novos dados: ${novoNome} (${novoEmail})`);
        } else {
            console.log('Erro ao editar Colaborador:', resultado.message);
        }
        
    } catch (error) {
        console.error('Erro ao editar Colaborador:', error.message);
    }
}

// função de deletar Administrativo
async function deletarAdministrativo(id) {
    id = promptSync('Digite o ID a ser EXCLUÍDO: ')
    
    try {
        // confirmação (opcional - para segurança)
        const administrativo = await database.buscarAdministrativoPorIdDB(id);
        
        if (!administrativo) {
            console.log('Colaborador não encontrado!');
            return;
        }

        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-');
        console.log(`-=-=-=-=- ATENÇÃO: Você está prestes a EXCLUIR o Colaborador: -=-=-=-=-=-`);
        console.log(`ID: ${administrativo.id} | Nome: ${administrativo.nome} | Email: ${administrativo.email}`);
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-');
        
        let confirmar = promptSync('Digite "SIM" para confirmar ou "NÃO" para sair: ');
        
          if (confirmar.toLowerCase() === 'sim') {
            
            await database.deletarAdministrativoDB(id);
            console.log('Colaborador deletado com sucesso!');

        } else {
            console.log('Operação cancelada.');
        }
        
    } catch (error) {
        console.error('Erro ao deletar Colaborador:', error.message);
    }
}
// ---------------------------------------- FIM CRUD Administrativo --------------------------------------

// ------------------------------------ INICIO de funções auxiliares -------------------------------------
//função menu colaborador administrativo
async function menuAdministrativo() {
    
    console.log('=-=-=-=-= ADMINISTRATIVO =-=-=-=-');
    console.log('| Código | Cargo                |');
    console.log('|--------|----------------------|');
    console.log('|   1    | Gestão Administrativo|');
    console.log('|   2    | Gestão de Professor  |');
    console.log('|   3    | Gestão de Aluno      |');
    console.log('|   0    | Voltar               |');
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');

    let subMenu = parseInt(promptSync('Escolha uma opção: '));
    
    switch(subMenu) {
        case 1:
            await menuGestaoAdministrativo();
            break;
        case 2:
            await menuGestaoProfessor();
            break;
        case 3:
            await menuGestaoAluno();
            break;
        case 0:
            console.log("Voltando ao menu principal...");
            break;
        default:
            console.log("Opção inválida! Tente novamente.");
    }
}

//função menu professor (apenas lista alunos)
async function menuProfessor() {
    
    console.log('=-=-=-=-=-= PROFESSOR -=-=-=-=-=-');
    console.log('| Código | Cargo                |');
    console.log('|--------|----------------------|');
    console.log('|   1    | Listar Alunos        |');
    console.log('|   0    | Voltar               |');
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');

    let subMenu = parseInt(promptSync('Escolha uma opção: '));
    
    switch(subMenu) {
        case 1:
            await listarAlunos();
            break;
        case 0:
            console.log("Voltando ao menu principal...");
            break;
        default:
            console.log("Opção inválida! Tente novamente.");
    }
}

//função menu aluno (apenas lista professores)
async function menuAluno() {
    
    console.log('=-=-=-=-=-=-= ALUNO -=-=-=-=-=-=-');
    console.log('| Código | Cargo                |');
    console.log('|--------|----------------------|');
    console.log('|   1    | Listar Professores   |');
    console.log('|   0    | Voltar               |');
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');

    let subMenu = parseInt(promptSync('Escolha uma opção: '));
    
    switch(subMenu) {
        case 1:
            await listarProfessor();
            break;
        case 0:
            console.log("Voltando ao menu principal...");
            break;
        default:
            console.log("Opção inválida! Tente novamente.");
    }
}

//função menu gestão de alunos
async function menuGestaoAluno() {
    console.log('=-=-=-=- GESTÃO DE ALUNO -=-=--=-');
    console.log('| Código | Cargo                |');
    console.log('|--------|----------------------|');
    console.log('|   1    | Cadastrar            |');
    console.log('|   2    | Editar               |');
    console.log('|   3    | Consultar            |');
    console.log('|   4    | Deletar              |');
    console.log('|   0    | Voltar               |');
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
    
    let opcao = parseInt(promptSync('Escolha uma opção: '));
    
    switch(opcao) {
        case 1:
            await cadastrarAluno();
            break;
        case 2:
            await editarAluno();
            break;
        case 3:
            await listarAlunos();
            break;
        case 4:
            await deletarAluno();
            break;
        case 0:
            return;
        default:
            console.log("Opção inválida!");
    }
}

//função menu gestão de professores
async function menuGestaoProfessor() {
    console.log('=-=-=- GESTÃO DE PROFESSOR -=--=-');
    console.log('| Código | Cargo                |');
    console.log('|--------|----------------------|');
    console.log('|   1    | Cadastrar            |');
    console.log('|   2    | Editar               |');
    console.log('|   3    | Consultar            |');
    console.log('|   4    | Deletar              |');
    console.log('|   0    | Voltar               |');
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
    
    let opcao = parseInt(promptSync('Escolha uma opção: '));
    
    switch(opcao) {
        case 1:
            await cadastrarProfessor();
            break;
        case 2:
            await editarProfessor();
            break;
        case 3:
            await listarProfessor();
            break;
        case 4:
            await deletarProfessor();
            break;
        case 0:
            return;
        default:
            console.log("Opção inválida!");
    }
}

//função menu gestão de administrativo
async function menuGestaoAdministrativo() {
    console.log('=-= GESTÃO DE ADMINISTRATIVO =-=-');
    console.log('| Código | Cargo                |');
    console.log('|--------|----------------------|');
    console.log('|   1    | Cadastrar            |');
    console.log('|   2    | Editar               |');
    console.log('|   3    | Consultar            |');
    console.log('|   4    | Deletar              |');
    console.log('|   0    | Voltar               |');
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
    
    let opcao = parseInt(promptSync('Escolha uma opção: '));
    
    switch(opcao) {
        case 1:
            await cadastrarAdministrativo();
            break;
        case 2:
            await editarAdministrativo();
            break;
        case 3:
            await listarAdministrativo();
            break;
        case 4:
            await deletarAdministrativo();
            break;
        case 0:
            return;
        default:
            console.log("Opção inválida!");
    }
}

//função para o menu principal
function menuInicial() {
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    console.log('|                                                                        |');
    console.log('=-=-=-=-=-=-=-=-=--=- SISTEMA DE GESTÃO ACADÊMICA =-=-=-=-=-=-=-=-=-=-=-=-');
    console.log('| Código | Função                    | Explicação                        |');
    console.log('|--------|---------------------------|-----------------------------------|');
    console.log('|    1   | Administrativo            | Gestão de Aluno, Professor e ADM  |');
    console.log('|    2   | Professor                 | Consulta Aluno                    |');
    console.log('|    3   | Aluno                     | Consulta Professor                |');
    console.log('|    4   | Sair                      | Sair do sistema                   |');
    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
}
// -------------------------------------- FIM de funções auxiliares --------------------------------------

// ---------------------------------- INICIO da função do menu princial ----------------------------------
//criando o loop infinito através do "while"
async function main() {
    await inicializarSistema();
    
    let sair = false;
    
    while (!sair) {
        menuInicial();
        const menu = parseInt(promptSync('Escolha uma opção do MENU: '));
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-');

        switch (menu) {
            case 1:
                await menuAdministrativo();
                break;
            case 2:
                await menuProfessor();
                break;
            case 3:
                await menuAluno();
                break;
            case 4:
                console.log('=-==-=-=-=-Obrigado por utilizar nosso sistema. Volte Sempre!=-=-=-=-=-=-');
                console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
                sair = true;
                break;
            default:
                console.log('Error - Digite um código válido');
                break;
        }
        
        // Dá tempo para as operações assíncronas serem processadas
        if (!sair) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}
// executando o main()
main().catch(console.error);
// ------------------------------------ FIM da função do menu princial -----------------------------------