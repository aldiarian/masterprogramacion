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
        let oldAttempts = ``;
        let winner;
        let secretCombination;
        let combination;

        // secretCombination = 'bycr';
        secretCombination = createSecretCombination();
        console.writeln(`----- MASTERMIND -----\n`)
        console.writeln(`secret: ${secretCombination}\n`)
            do {
                console.writeln(`${attempts} attempt(s):`);
                console.writeln(`****`);
                if (oldAttempts.length > 0) {
                    console.writeln(`${oldAttempts}`)
                }
                combination =  propouseCombination();
                oldAttempts += `${combination} ---> ${checkBlackWhites( combination, secretCombination)}`;
                
                if ( secretCombination === combination){
                    console.writeln(`${oldAttempts}`)
                    winner = true;
                } else {
                    attempts++;
                }

            } while (!winner && attempts < MAX_ATTEMPS );
            
            if(winner) { 
                console.writeln(`You've won!!! ;-)`) }
            else {
                console.writeln(`${attempts} attempt(s):`);
                console.writeln(`${oldAttempts}`)
                console.writeln(`You've lost!!! :-(`)
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
        

        function propouseCombination(){
            let lenghtOk = false;
            let repeatedOK = false;
            let colorOk = false;
            let isOk;
            do {
                combination = console.readString('Propose a combination: ');
                console.writeln();
                if (checkLengh(combination)){
                    if(checkRepeated( combination)){
                        checkCorrectColor( combination, COLORS)
                    }
                }

                function checkLengh(combination){
                    if (combination.length < COMBINATION_LENGTH || combination.length > COMBINATION_LENGTH)  { 
                        console.writeln('Wrong proposed combination length') 
                    } else{
                        return lenghtOk = true;
                    }
                }

                function checkRepeated( combination ){
                    let isRepeated;
                    for (let i = 0; i < combination.length - 1 ; i++) {
                        for (let j = i + 1 ; !isRepeated && j < combination.length; j++) {
                            isRepeated = combination[i] === combination[j]
                        }
                    }
                    if (isRepeated) {
                        console.writeln(`Error, at least one color is repetead`)
                    } else {
                        return repeatedOK = true;
                    }
                }

                function checkCorrectColor(combination, COLORS) {
                    for (let i = 0; i < COMBINATION_LENGTH; i++) {
                        colorOk = false;
                        for (let j = 0; !colorOk && j < COLORS.length; j++) {
                            colorOk = combination[i] === COLORS[j]
                        }
                    } 
                    if (!colorOk) {
                        console.writeln(`Wrong colors, they must be: ${COLORS}`) 
                     } else{
                        return colorOk = true;
                     }
                }


            } while (!lenghtOk || !repeatedOK || !colorOk);

            return combination
        }

        function createSecretCombination(){
            let element;
            let combination = '';
            do {
                let exist = false;
                element = COLORS[Math.ceil(Math.random()*COLORS.length)];
                for (let i = 0;  !exist && i < COMBINATION_LENGTH; i++) {
                    exist = element === combination[i];
                }
                !exist ? combination += element : false;
            } while (combination.length < COMBINATION_LENGTH);
            return combination;
        }

    }

    function isResumed(){
        let answer;
        let result;
        let isError = false;
        do {
            answer = console.readString(`Do you want to continue? (y/n): `)
            result = answer == `y`;
            isError  = !result && answer !== `n`;
            if (isError) {
                console.writeln(`Please answer 'y' or 'n'`);
            }
        } while ( isError );
        return result;
    }
}

