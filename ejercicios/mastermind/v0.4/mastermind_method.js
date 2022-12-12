const { Console } = require("console-mpds");
const console = new Console();


mastermind()

function mastermind(){
    let askContinue = askQuestionYesNo(`¿Quieres jugar otra partida?`);
    do {
        let game = initGame();
        game.play()
        askContinue.ask();

    } while ( askContinue.isYes());

}

function initGame(){
    console.writeln(`----- MASTERMIND -----\n`);
    let secretComb = secretCombination().generate();
    console.writeln(`secret: ${secretComb}`);
    return {
        MAX_ATTEMPS : 4,
        attempts : 0,
        storageAttempts : ``,
        winner: ``,

        play(){

            do {
                console.writeln(`${this.attempts} attempt(s):`);
                console.writeln(`****`);
                if ( this.attempts > 0) {
                    console.writeln(`${this.storageAttempts}`)
                }
                let combinationPropoused =  proposeCombination().propouse();
                this.storageAttempts += `${combinationPropoused} ---> ${checkBlackWhites(combinationPropoused, secretComb)}`;
                
                if ( secretComb === combinationPropoused){
                    console.writeln(`${this.storageAttempts}`)
                    this.winner = true;
                } else {
                    this.attempts++;
                }
    
            } while (!this.winner && this.attempts < this.MAX_ATTEMPS );
            
            if(this.winner) { 
                console.writeln(`You've won!!!`) }
            else {
                console.writeln(`${this.attempts} attempt(s):`);
                console.writeln(`${this.storageAttempts}`)
                console.writeln(`You've lost!!!`)
            }

        },
    }
}


function checkBlackWhites(combinationPropoused, secretComb){
    let exist;
    let blacks = 0;
    let whites = 0;
    for (let i = 0; i < secretCombination().getLength(); i++) {
        for (let j = 0;  j < secretCombination().getLength(); j++) {
            exist = combinationPropoused[i]  === secretComb[j]
            if (exist) {
                ( i === j )? blacks++ : whites++;
            }
        }
    }
    return `${blacks} blacks and ${whites} whites\n`

}


function secretCombination(){
    return {
        COLORS : [ 'r','y','b','g','m','c'],
        COMBINATION_LENGTH: 4,
        combination : ``,
        generate: function(){
            let element;
            do {
                let exist;
                element = this.COLORS[parseInt(Math.random()* this.COLORS.length)];
                for (let i = 0;  !exist && i < this.COMBINATION_LENGTH; i++) {
                    exist = element === this.combination[i];
                }
                !exist ? this.combination += element : false;
            } while (this.combination.length < this.COMBINATION_LENGTH);
            return this.combination;
        },
        getColors: function(){
            return this.COLORS;
        },
        getLength: function(){
            return this.COMBINATION_LENGTH
        }
    }
}


function proposeCombination(){
    let isCorrect = false;
    let combinationPropoused; 
    return {
        propouse: function(){
            do {
                combinationPropoused = console.readString('Propose a combination: ');
                console.writeln();
                if ( isCorrect = this.checkCorrectColor()){
                    if( isCorrect = this.checkLengh()){
                        isCorrect = this.checkRepeated()
                    }
                }
            } while (!isCorrect );
            return combinationPropoused
        },
        checkLengh: function(){
            if (combinationPropoused.length < secretCombination().getLength() || combinationPropoused.length > secretCombination().getLength())  { 
                console.writeln('Wrong proposed combination length') 
                return false;
            } else{
                return true;
            }
        },
        checkRepeated: function(){
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
        },
        checkCorrectColor: function() {
            let colorOk;
            for (let i = 0; i < secretCombination().getLength(); i++) {
                colorOk = false;
                for (let j = 0; !colorOk && j < secretCombination().getColors().length; j++) {
                    colorOk = combinationPropoused[i] === secretCombination().getColors()[j]
                }
            } 
            if (!colorOk) {
                console.writeln(`Wrong colors, they must be: ${secretCombination().getColors()}`) 
                return false;
                } else{
                return true;
                }
        },
    }
}

function askQuestionYesNo( question ){
    return {
        question: question,
        answer : ``,
        ask: function(){
            let error = false;
            do {
                this.answer = console.readString(this.question);
                error = !this.isYes() && !this.isNo();
                if(error) console.writeln(`Please response "yes" or "no"`)
            } while (error);
        },
        isYes: function(){
            return this.answer == 'yes'
        },
        isNo: function(){
            return this.answer == 'no'
        }
    }
}
