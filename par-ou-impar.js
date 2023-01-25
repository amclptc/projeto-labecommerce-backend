//Labenu: crie um joguinho simples utilizando os conceitos vistos em aula. A funcionalidade é: 
//jogador é você, dev.
//suas escolhas devem ser enviadas via argumentos no comando do terminal (process.argv), par ou ímpar e um número.
//o adversário é o computador (que faz uma escolha aleatória).


//amclptc: variável que vai guardar o argumento de escolha do dev, par ou ímpar:
const devChoice = process.argv[2];

//amclptc: variável que vai guardar o número de escolha do dev, de zero a 10:
const devNumber = Number(process.argv[3]);

//amclptc: se o dev escolher par, o computador escolher ímpar e vice-versa:
const npcChoice = () => {
    if(devChoice === "par"){
        const choice = "impar";
        console.log(`O NPC escolheu ${choice}`);
    }
    if(devChoice === "impar"){
        choice = "par"
        console.log(`O NPC escolheu: ${choice}`);
    }
}

npcChoice();

//amclptc: gerar um número aleatório entre 0 e 10:
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random()*(max-min+1))+min;
}

const npcNumber = getRandomNumber(0, 10);
console.log(`O NPC escolheu o número: ${npcNumber}`);

//amclptc: resultado:
//amclptc: esse if verifica os resultados caso seja um jogo que dê par.
if((devNumber + npcNumber) % 2 === 0){
    const result = "par";
    if(result === devChoice){
        console.log(`Você escolheu ${devChoice} e o resultado foi ${devNumber + npcNumber}. Você ganhou!`);
    }else{
        console.log(`Você escolheu ${devChoice} e o resultado foi ${devNumber + npcNumber}. Você perdeu!`);
}
//amclptc: esse if verifica os resultados caso seja um jogo que dê impar.
}else{
    const result = 'impar';
    if(result === devChoice){
        console.log(`Você escolheu ${devChoice} e o resultado foi ${devNumber + npcNumber}. Você ganhou!`);
    }else{
        console.log(`Você escolheu ${devChoice} e o resultado foi ${devNumber + npcNumber}. Você perdeu!`);
        }
}
