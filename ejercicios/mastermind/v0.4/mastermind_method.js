const { Console } = require("console-mpds");
const console = new Console();


 mastermind().play();


function mastermind(){
    const askContinue = askQuestionYesNo(`¿Quieres jugar otra partida?`);
    return {
        play(){
            do {
                initGame().play()
                askContinue.ask();
        
            } while ( askContinue.isYes());
        }
    }

}

function initGameView(){
    return{
        show(msg){
            return console.writeln(msg) 
        },
        ask(msg){
            return console.readString(msg)
        }
    }
}
function initGame(){
    const MAX_ATTEMPS = 4;
    let attempts = 0;
    let storageAttempts = ``;
    let winner= ``;
    return {
        play(){
            let secretComb = secretCombination().generate();
            initGameView().show(`\n----- MASTERMIND -----`);
            initGameView().show(`secret: ${secretComb}\n`);

            do {
                initGameView().show(`${attempts} attempt(s):\n****`);
                if ( attempts > 0) {
                    initGameView().show(`${storageAttempts}`)
                }
                let combinationPropoused =  proposeCombination().propouse();
                storageAttempts += `${ combinationPropoused } ---> ${ checkBlackWhites(combinationPropoused, secretComb) }`;
                
                if ( secretComb === combinationPropoused){
                    initGameView().show(`${storageAttempts}`)
                    winner = true;
                } else {
                    attempts++;
                }
    
            } while (!winner && attempts < MAX_ATTEMPS );
            
            if(winner) { 
                initGameView().show(`You've won!!!`) }
            else {
                initGameView().show(`${attempts} attempt(s):`);
                initGameView().show(`****`);
                initGameView().show(`${storageAttempts}`)
                initGameView().show(`You've lost!!!`)
            }

        },
    }
}


function checkBlackWhites( combinationPropoused, secretComb ){
    let exist;
    let blacks = 0;
    let whites = 0;
    for (let i = 0; i < secretCombination().getLength(); i++) {
        for (let j = 0;  j < secretCombination().getLength(); j++) {
            if (  exist = combinationPropoused[i]  === secretComb[j] ) {
                ( i === j )? blacks++ : whites++;
            }
        }
    }
    return `${blacks} blacks and ${whites} whites\n`

}


function secretCombination(){
    const COLORS = [ 'r','y','b','g','m','c'];
    const COMBINATION_LENGTH = 4;
    let combination = ``;
    return {
        generate(){
            let element;
            do {
                let exist;
                element = COLORS[parseInt(Math.random()* COLORS.length)];
                for (let i = 0;  !exist && i < COMBINATION_LENGTH; i++) {
                    exist = element === combination[i];
                }
                !exist ? combination += element : false;
            } while (combination.length < COMBINATION_LENGTH);
            return combination;
        },
        getColors(){
            return COLORS;
        },
        getLength(){
            return COMBINATION_LENGTH
        }
    }
}



function proposeCombinationView(){
    return{
        show(msg){
            return console.writeln(msg) 
        },
        ask(msg){
            return console.readString(msg)
        }
    }
}
function proposeCombination(){
    function checkLengh(combinationPropoused){
        if (combinationPropoused.length < secretCombination().getLength() || combinationPropoused.length > secretCombination().getLength())  { 
            proposeCombinationView().show('Wrong proposed combination length') 
            return false;
        } else{
            return true;
        }
    };
    function checkRepeated(combinationPropoused){
        let isRepeated;
        for (let i = 0; i < combinationPropoused.length - 1 ; i++) {
            for (let j = i + 1 ; !isRepeated && j < combinationPropoused.length; j++) {
                isRepeated = combinationPropoused[i] === combinationPropoused[j]
            }
        }
        if (isRepeated) {
             proposeCombinationView().show(`Error, at least one color is repetead`)
            return false;
        } else {
            return true;
        }
    };
    function checkCorrectColor(combinationPropoused) {
        let colorOk;
        for (let i = 0; i < secretCombination().getLength(); i++) {
            colorOk = false;
            for (let j = 0; !colorOk && j < secretCombination().getColors().length; j++) {
                colorOk = combinationPropoused[i] === secretCombination().getColors()[j]
            }
        } 
        if (!colorOk) {
             proposeCombinationView().show(`Wrong colors, they must be: ${secretCombination().getColors()}`) 
            return false;
        } else {
            return true;
        }
    };
    return {
        propouse(){
            let combinationPropoused; 
            let isCorrect;
            do {
                combinationPropoused = proposeCombinationView().ask('Propose a combination: ');
                if ( isCorrect = checkCorrectColor(combinationPropoused)){
                    if( isCorrect = checkLengh(combinationPropoused)){
                        isCorrect = checkRepeated(combinationPropoused)
                    }
                }
            } while (!isCorrect );
            return combinationPropoused
        },
    }
}


function askQuestionYesNoView(){
    return{
        ask(msg){
            return console.readString(msg)
        }
    }
}
function askQuestionYesNo( question ){
    let answer = ``;
    return {
        ask(){
            let error = ``;
            do {
                answer = askQuestionYesNoView().ask(question);
                error = !this.isYes() && !this.isNo();
                if(error) askQuestionYesNoView().ask(`Por favor responda "si" o "no"`)
            } while (error);
        },
        isYes(){
            return answer == 'si'
        },
        isNo(){
            return answer == 'no'
        }
    }
}
