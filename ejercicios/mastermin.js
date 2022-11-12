const { Console } = require("console-mpds");
const console = new Console();


mastermind()

function mastermind(){
    do {
       startPlay()
    } while ( isResumed());

    function startPlay(){
        const COLORS =[ 'r','y','b','g','m','c'];
        const COMBINATION_LENGTH = 4;
        const MAX_ATTEMPS = 4;
        let attempts = 0;
        let storageAttempts = ``;
        let winner;

        
        let secretCombination = createSecretCombination(COLORS, COMBINATION_LENGTH);
        // secretCombination = 'bycr';
        console.writeln(`secret: ${secretCombination}\n`)
        console.writeln(`----- MASTERMIND -----\n`)

        do {
            console.writeln(`${attempts} attempt(s):`);
            console.writeln(`****`);
            if ( attempts > 0) {
                console.writeln(`${storageAttempts}`)
            }
            let combination =  proposeCombination();
            storageAttempts += `${combination} ---> ${checkBlackWhites( combination, secretCombination)}`;
            
            if ( secretCombination === combination){
                console.writeln(`${storageAttempts}`)
                winner = true;
            } else {
                attempts++;
            }

        } while (!winner && attempts < MAX_ATTEMPS );
        
        if(winner) { 
            console.writeln(`You've won!!! ;-)`) }
        else {
            console.writeln(`${attempts} attempt(s):`);
            console.writeln(`${storageAttempts}`)
            console.writeln(`You've lost!!! :-(`)
        }
        
        function createSecretCombination(COLORS, COMBINATION_LENGTH){
            let element;
            let secretCombination = '';
            do {
                let exist = false;
                element = COLORS[parseInt(Math.random()*COLORS.length)];
                for (let i = 0;  !exist && i < COMBINATION_LENGTH; i++) {
                    exist = element === secretCombination[i];
                }
                !exist ? secretCombination += element : false;
            } while (secretCombination.length < COMBINATION_LENGTH);
            return secretCombination;
        }

        function checkBlackWhites(combination, secretCombination){
            let exist;
            let blacks = 0;
            let whites = 0;
            for (let i = 0; i < COMBINATION_LENGTH; i++) {
                for (let j = 0;  j < COMBINATION_LENGTH; j++) {
                    exist = combination[i]  === secretCombination[j]
                    if (exist) {
                        ( i === j )? blacks++ : whites++;
                    }
                }
            }
            return `${blacks} blacks and ${whites} whites\n`

        }

        function proposeCombination(){
            let combinationPropoused;
            let isCorrect = false;
            do {
                combinationPropoused = console.readString('Propose a combination: ');
                console.writeln();
                if ( isCorrect = checkLengh( combinationPropoused )){
                    if( isCorrect = checkRepeated( combinationPropoused )){
                        isCorrect = checkCorrectColor( combinationPropoused, COLORS )
                    }
                }

                function checkLengh( combinationPropoused ){
                    if (combinationPropoused.length < COMBINATION_LENGTH || combinationPropoused.length > COMBINATION_LENGTH)  { 
                        console.writeln('Wrong proposed combination length') 
                        return false;
                    } else{
                        return true;
                    }
                }

                function checkRepeated( combinationPropoused ){
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

                function checkCorrectColor( combinationPropoused, COLORS ) {
                    let colorOk;
                    for (let i = 0; i < COMBINATION_LENGTH; i++) {
                        colorOk = false;
                        for (let j = 0; !colorOk && j < COLORS.length; j++) {
                            colorOk = combinationPropoused[i] === COLORS[j]
                        }
                    } 
                    if (!colorOk) {
                        console.writeln(`Wrong colors, they must be: ${COLORS}`) 
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

