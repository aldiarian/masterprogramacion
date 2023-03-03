const { Console } = require("console-mpds");
const console = new Console();


mastermind()

function mastermind(){
    do {
       startPlay()
    } while ( isResumed());

    function startPlay(){
        let gameObj = initGame();

        function initGame(){
            let game = {
                COLORS : [ 'r','y','b','g','m','c'],
                COMBINATION_LENGTH : 4,
                MAX_ATTEMPS : 4,
                attempts : 0,
                storageAttempts : ``,
                winner: ``,
                secretCombination : ``
            }
            game.secretCombination = createSecretCombination(game);
            console.writeln(`secret: ${game.secretCombination}\n`)
            console.writeln(`----- MASTERMIND -----\n`)

            function createSecretCombination(game){
                let element;
                do {
                    let exist = false;
                    element = game.COLORS[parseInt(Math.random()* game.COLORS.length)];
                    for (let i = 0;  !exist && i < game.COMBINATION_LENGTH; i++) {
                        exist = element === game.secretCombination[i];
                    }
                    !exist ? game.secretCombination += element : false;
                } while (game.secretCombination.length < game.COMBINATION_LENGTH);
                return game.secretCombination;
            }

            return game;
        }

        do {
            console.writeln(`${gameObj.attempts} attempt(s):`);
            console.writeln(`****`);
            if ( gameObj.attempts > 0) {
                console.writeln(`${gameObj.storageAttempts}`)
            }
            let combination =  proposeCombination(gameObj);
            gameObj.storageAttempts += `${combination} ---> ${checkBlackWhites( combination, gameObj)}`;
            
            if ( gameObj.secretCombination === combination){
                console.writeln(`${gameObj.storageAttempts}`)
                gameObj.winner = true;
            } else {
                gameObj.attempts++;
            }

        } while (!gameObj.winner && gameObj.attempts < gameObj.MAX_ATTEMPS );
        
        if(gameObj.winner) { 
            console.writeln(`You've won!!!`) }
        else {
            console.writeln(`${gameObj.attempts} attempt(s):`);
            console.writeln(`${gameObj.storageAttempts}`)
            console.writeln(`You've lost!!!`)
        }
        
  

        function checkBlackWhites(combination, gameObj){
            let exist;
            let blacks = 0;
            let whites = 0;
            for (let i = 0; i < gameObj.COMBINATION_LENGTH; i++) {
                for (let j = 0;  j < gameObj.COMBINATION_LENGTH; j++) {
                    exist = combination[i]  === gameObj.secretCombination[j]
                    if (exist) {
                        ( i === j )? blacks++ : whites++;
                    }
                }
            }
            return `${blacks} blacks and ${whites} whites\n`

        }

        function proposeCombination(gameObj){
            let combinationPropoused;
            let isCorrect = false;
            do {
                combinationPropoused = console.readString('Propose a combination: ');
                console.writeln();
                if ( isCorrect = checkLengh( combinationPropoused, gameObj )){
                    if( isCorrect = checkRepeated( combinationPropoused, gameObj )){
                        isCorrect = checkCorrectColor( combinationPropoused, gameObj )
                    }
                }

                function checkLengh( combinationPropoused, gameObj ){
                    if (combinationPropoused.length < gameObj.COMBINATION_LENGTH || combinationPropoused.length > gameObj.COMBINATION_LENGTH)  { 
                        console.writeln('Wrong proposed combination length') 
                        return false;
                    } else{
                        return true;
                    }
                }

                function checkRepeated( combinationPropoused, gameObj ){
                    let isRepeated;
                    for (let i = 0; i < combinationPropoused.length - 1 ; i++) {
                        for (let j = i + 1 ; !isRepeated && j < combinationPropoused.length; j++) {
                            isRepeated = combinationPropoused[i] === combinationPropoused[j]
                        }
                    }
                    if (isRepeated) {
                        console.writeln(`Error, at least one color is repetead`)
                        return false;
                    } else {
                        return true;
                    }
                }

                function checkCorrectColor( combinationPropoused, gameObj ) {
                    let colorOk;
                    for (let i = 0; i < gameObj.COMBINATION_LENGTH; i++) {
                        colorOk = false;
                        for (let j = 0; !colorOk && j < gameObj.COLORS.length; j++) {
                            colorOk = combinationPropoused[i] === gameObj.COLORS[j]
                        }
                    } 
                    if (!colorOk) {
                        console.writeln(`Wrong colors, they must be: ${gameObj.COLORS}`) 
                        return false;
                     } else{
                        return true;
                     }
                }


            } while (!isCorrect );

            return combinationPropoused
        }

      

    }

    function isResumed(){
        let result;
        let isError = false;
        do {
            let answer = console.readString(`Do you want to continue? (y/n): `)
            isError = answer !== `y` && answer !== `n`;
            isError ? console.writeln(`Please answer 'y' or 'n'`) : result = answer === 'y';
        } while ( isError );
        return result;
    }
}


