"use strict";

var _require = require("console-mpds"),
    Console = _require.Console;

var console = new Console();
mastermind();

function mastermind() {
  var askContinue = askQuestionYesNo("\xBFQuieres jugar otra partida?");

  do {
    var game = initGame();
    game.play();
    askContinue.ask();
  } while (askContinue.isYes());
}

function initGame() {
  console.writeln("----- MASTERMIND -----\n");
  var secretComb = secretCombination().generate();
  console.writeln("secret: ".concat(secretComb));
  return {
    MAX_ATTEMPS: 4,
    attempts: 0,
    storageAttempts: "",
    winner: "",
    play: function play() {
      do {
        console.writeln("".concat(this.attempts, " attempt(s):"));
        console.writeln("****");

        if (this.attempts > 0) {
          console.writeln("".concat(this.storageAttempts));
        }

        var combinationPropoused = proposeCombination().propouse();
        this.storageAttempts += "".concat(combinationPropoused, " ---> ").concat(checkBlackWhites(combinationPropoused, secretComb));

        if (secretComb === combinationPropoused) {
          console.writeln("".concat(this.storageAttempts));
          this.winner = true;
        } else {
          this.attempts++;
        }
      } while (!this.winner && this.attempts < this.MAX_ATTEMPS);

      if (this.winner) {
        console.writeln("You've won!!!");
      } else {
        console.writeln("".concat(this.attempts, " attempt(s):"));
        console.writeln("".concat(this.storageAttempts));
        console.writeln("You've lost!!!");
      }
    }
  };
}

function checkBlackWhites(combinationPropoused, secretComb) {
  var exist;
  var blacks = 0;
  var whites = 0;

  for (var i = 0; i < secretCombination().getLength(); i++) {
    for (var j = 0; j < secretCombination().getLength(); j++) {
      exist = combinationPropoused[i] === secretComb[j];

      if (exist) {
        i === j ? blacks++ : whites++;
      }
    }
  }

  return "".concat(blacks, " blacks and ").concat(whites, " whites\n");
}

function secretCombination() {
  return {
    COLORS: ['r', 'y', 'b', 'g', 'm', 'c'],
    COMBINATION_LENGTH: 4,
    combination: "",
    generate: function generate() {
      var element;

      do {
        var exist = void 0;
        element = this.COLORS[parseInt(Math.random() * this.COLORS.length)];

        for (var i = 0; !exist && i < this.COMBINATION_LENGTH; i++) {
          exist = element === this.combination[i];
        }

        !exist ? this.combination += element : false;
      } while (this.combination.length < this.COMBINATION_LENGTH);

      return this.combination;
    },
    getColors: function getColors() {
      return this.COLORS;
    },
    getLength: function getLength() {
      return this.COMBINATION_LENGTH;
    }
  };
}

function proposeCombination() {
  var isCorrect = false;
  var combinationPropoused;
  return {
    propouse: function propouse() {
      do {
        combinationPropoused = console.readString('Propose a combination: ');
        console.writeln();

        if (isCorrect = this.checkCorrectColor()) {
          if (isCorrect = this.checkLengh()) {
            isCorrect = this.checkRepeated();
          }
        }
      } while (!isCorrect);

      return combinationPropoused;
    },
    checkLengh: function checkLengh() {
      if (combinationPropoused.length < secretCombination().getLength() || combinationPropoused.length > secretCombination().getLength()) {
        console.writeln('Wrong proposed combination length');
        return false;
      } else {
        return true;
      }
    },
    checkRepeated: function checkRepeated() {
      var isRepeated;

      for (var i = 0; i < combinationPropoused.length - 1; i++) {
        for (var j = i + 1; !isRepeated && j < combinationPropoused.length; j++) {
          isRepeated = combinationPropoused[i] === combinationPropoused[j];
        }
      }

      if (isRepeated) {
        console.writeln("Error, at least one color is repetead");
        return false;
      } else {
        return true;
      }
    },
    checkCorrectColor: function checkCorrectColor() {
      var colorOk;

      for (var i = 0; i < secretCombination().getLength(); i++) {
        colorOk = false;

        for (var j = 0; !colorOk && j < secretCombination().getColors().length; j++) {
          colorOk = combinationPropoused[i] === secretCombination().getColors()[j];
        }
      }

      if (!colorOk) {
        console.writeln("Wrong colors, they must be: ".concat(secretCombination().getColors()));
        return false;
      } else {
        return true;
      }
    }
  };
}

function askQuestionYesNo(question) {
  return {
    question: question,
    answer: "",
    ask: function ask() {
      var error = false;

      do {
        this.answer = console.readString(this.question);
        error = !this.isYes() && !this.isNo();
        if (error) console.writeln("Please response \"yes\" or \"no\"");
      } while (error);
    },
    isYes: function isYes() {
      return this.answer == 'yes';
    },
    isNo: function isNo() {
      return this.answer == 'no';
    }
  };
}