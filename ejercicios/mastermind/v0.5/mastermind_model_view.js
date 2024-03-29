const { Console } = require("console-mpds");
const console = new Console();


mastermindView().play();


function mastermindView() {
    const askContinueView = initAskQuestionYesNoView(`Do you want to play another game?`);
    return {
        play() {
            do {
                initGameView().play()
                askContinueView.ask();
            } while (askContinueView.isYes());
        }
    }

}

function initGameView() {
    let game = initGame();
    return {
        play() {
            console.writeln(`\n----- MASTERMIND -----`);
            console.writeln(`secret: ${game.getSecretCombination()}\n`);
            do {
                game.setCombinationPropoused( proposeCombinationView().propouse() );
                game.setStorageAttempts();
                console.writeln(game.getStorageAttempts());
                game.setAttempts();

            } while (!game.isEndGame());
            console.writeln(game.isWinner() ? `You've won!!!` : `You've lost!!!`);
        }
    }
}

function initGame() {
    const MAX_ATTEMPS = 4;
    let attempts = 0;
    let storageAttempts = ``;
    let combinationPropoused;
    const secretComb = secretCombination().generate();
    return {
        isEndGame() {
            return (this.isWinner() || this.isLoser());
        },
        isWinner() {
            return this.getSecretCombination() === this.getCombinationPropoused();
        },
        isLoser() {
            return attempts == MAX_ATTEMPS;
        },
        setAttempts(){
            attempts++
        },
        setStorageAttempts() {
            storageAttempts += `${combinationPropoused} ---> ${this.getBlackWhites()}`;

        },
        getSecretCombination() {
            return secretComb;
        },
        getStorageAttempts() {
            return storageAttempts;
        },
        getCombinationPropoused() {
            return combinationPropoused;
        },
        setCombinationPropoused(newComb) {
            combinationPropoused = newComb;
        },
        getBlackWhites() {
            let exist;
            let blacks = 0;
            let whites = 0;
            for (let i = 0; i < secretCombination().getLength(); i++) {
                for (let j = 0; j < secretCombination().getLength(); j++) {
                    if (exist = combinationPropoused[i] === secretComb[j]) {
                        (i === j) ? blacks++ : whites++;
                    }
                }
            }
            return `${blacks} blacks and ${whites} whites\n`

        }

    }

}



function secretCombination() {
    const COLORS = ['r', 'y', 'b', 'g', 'm', 'c'];
    const COMBINATION_LENGTH = 4;
    let combination = ``;
    return {
        generate() {
            let element;
            do {
                let exist;
                element = COLORS[parseInt(Math.random() * COLORS.length)];
                for (let i = 0; !exist && i < COMBINATION_LENGTH; i++) {
                    exist = element === combination[i];
                }
                !exist ? combination += element : false;
            } while (combination.length < COMBINATION_LENGTH);
            return combination;
        },
        getColors() {
            return COLORS;
        },
        getLength() {
            return COMBINATION_LENGTH
        }
    }
}



function proposeCombinationView() {
    return {
        propouse() {
            let combinationPropoused;
            let isCorrect;
            do {
                combinationPropoused = console.readString('Propose a combination: ');
                if (isCorrect = proposeCombination().checkCorrectColor(combinationPropoused)) {
                    if (isCorrect = proposeCombination().checkLengh(combinationPropoused)) {
                        isCorrect = proposeCombination().checkRepeated(combinationPropoused)
                    }
                }
            } while (!isCorrect);
            return combinationPropoused
        },
    }
}
function proposeCombination() {

    return {
        checkLengh(combinationPropoused) {
            if (combinationPropoused.length < secretCombination().getLength() || combinationPropoused.length > secretCombination().getLength()) {
                console.writeln('Wrong proposed combination length')
                return false;
            } else {
                return true;
            }
        },
        checkRepeated(combinationPropoused) {
            let isRepeated;
            for (let i = 0; i < combinationPropoused.length - 1; i++) {
                for (let j = i + 1; !isRepeated && j < combinationPropoused.length; j++) {
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
        checkCorrectColor(combinationPropoused) {
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
            } else {
                return true;
            }
        },
    }
}


function initAskQuestionYesNoView(question) {
    let answer = ``;
    return {
        ask() {
            let error = ``;
            do {
                answer = console.readString(question);
                error = !this.isYes() && !this.isNo();
                if (error) console.writeln(`Please answer "yes" or "no".`)
            } while (error);
        },
        isYes() {
            return answer == 'yes'
        },
        isNo() {
            return answer == 'no'
        }
    }
}
