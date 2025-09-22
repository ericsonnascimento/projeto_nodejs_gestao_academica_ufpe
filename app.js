import database from './database.js';
import prompt from 'prompt-sync';

const promptSync = prompt({ sigint: true });

//para que o while funcione a variável tem que estar fora do loop
let menu;

//função que chama o menu principal, reduz a repetição de código 
//menuInicial();
/*
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


let nome = promptSync('Digite o nome do aluno: ');
let email = promptSync('Digite o email do aluno: ');

class Aluno {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    
    inserirAluno() {
        try {
            database.inicializarBanco();
            
            console.log('Cadastrando usuários...');
            database.inserirUsuario(this.nome, this.email);
            
        } catch (error) {
            console.error('Erro no processo:', error.message);
        }
    }

}

let aluno1 = new Aluno(nome, email);
aluno1.inserirAluno()



/*
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
*/