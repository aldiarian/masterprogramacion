"use strict";

var _require = require("console-mpds"),
    Console = _require.Console;

var console = new Console();
mastermind();

function mastermind() {
  do {
    startPlay();
  } while (isResumed());

  function startPlay() {
    var COLORS = ['r', 'y', 'b', 'g', 'm', 'c'];
    var COMBINATION_LENGTH = 4;
    var MAX_ATTEMPS = 4;
    var attempts = 0;
    var storageAttempts = "";
    var winner;
    var secretCombination = createSecretCombination(COLORS, COMBINATION_LENGTH); // secretCombination = 'bycr';

    console.writeln("secret: ".concat(secretCombination, "\n"));
    console.writeln("----- MASTERMIND -----\n");

    do {
      console.writeln("".concat(attempts, " attempt(s):"));
      console.writeln("****");

      if (attempts > 0) {
        console.writeln("".concat(storageAttempts));
      }

      var combination = proposeCombination();
      storageAttempts += "".concat(combination, " ---> ").concat(checkBlackWhites(combination, secretCombination));

      if (secretCombination === combination) {
        console.writeln("".concat(storageAttempts));
        winner = true;
      } else {
        attempts++;
      }
    } while (!winner && attempts < MAX_ATTEMPS);

    if (winner) {
      console.writeln("You've won!!! ;-)");
    } else {
      console.writeln("".concat(attempts, " attempt(s):"));
      console.writeln("".concat(storageAttempts));
      console.writeln("You've lost!!! :-(");
    }

    function createSecretCombination(COLORS, COMBINATION_LENGTH) {
      var element;
      var secretCombination = '';

      do {
        var exist = false;
        element = COLORS[parseInt(Math.random() * COLORS.length)];

        for (var i = 0; !exist && i < COMBINATION_LENGTH; i++) {
          exist = element === secretCombination[i];
        }

        !exist ? secretCombination += element : false;
      } while (secretCombination.length < COMBINATION_LENGTH);

      return secretCombination;
    }

    function checkBlackWhites(combination, secretCombination) {
      var exist;
      var blacks = 0;
      var whites = 0;

      for (var i = 0; i < COMBINATION_LENGTH; i++) {
        for (var j = 0; j < COMBINATION_LENGTH; j++) {
          exist = combination[i] === secretCombination[j];

          if (exist) {
            i === j ? blacks++ : whites++;
          }
        }
      }

      return "".concat(blacks, " blacks and ").concat(whites, " whites\n");
    }

    function proposeCombination() {
      var combinationPropoused;
      var isCorrect = false;

      do {
        var checkLengh = function checkLengh(combinationPropoused) {
          if (combinationPropoused.length < COMBINATION_LENGTH || combinationPropoused.length > COMBINATION_LENGTH) {
            console.writeln('Wrong proposed combination length');
            return false;
          } else {
            return true;
          }
        };

        var checkRepeated = function checkRepeated(combinationPropoused) {
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
        };

        var checkCorrectColor = function checkCorrectColor(combinationPropoused, COLORS) {
          var colorOk;

          for (var i = 0; i < COMBINATION_LENGTH; i++) {
            colorOk = false;

            for (var j = 0; !colorOk && j < COLORS.length; j++) {
              colorOk = combinationPropoused[i] === COLORS[j];
            }
          }

          if (!colorOk) {
            console.writeln("Wrong colors, they must be: ".concat(COLORS));
            return false;
          } else {
            return true;
          }
        };

        combinationPropoused = console.readString('Propose a combination: ');
        console.writeln();

        if (isCorrect = checkLengh(combinationPropoused)) {
          if (isCorrect = checkRepeated(combinationPropoused)) {
            isCorrect = checkCorrectColor(combinationPropoused, COLORS);
          }
        }
      } while (!isCorrect);

      return combinationPropoused;
    }
  }

  function isResumed() {
    var result;
    var isError = false;

    do {
      var answer = console.readString("Do you want to continue? (y/n): ");
      isError = answer !== "y" && answer !== "n";
      isError ? console.writeln("Please answer 'y' or 'n'") : result = answer === 'y';
    } while (isError);

    return result;
  }
}