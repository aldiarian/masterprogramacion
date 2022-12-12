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
    var gameObj = initGame(); // for (const key in gameObj) {
    //     console.writeln(`${key}: ${gameObj[key]}`);
    // }

    function initGame() {
      var game = {
        COLORS: ['r', 'y', 'b', 'g', 'm', 'c'],
        COMBINATION_LENGTH: 4,
        MAX_ATTEMPS: 4,
        attempts: 0,
        storageAttempts: "",
        winner: "",
        secretCombination: ""
      };
      game.secretCombination = createSecretCombination(game);
      console.writeln("secret: ".concat(game.secretCombination, "\n"));
      console.writeln("----- MASTERMIND -----\n");

      function createSecretCombination(game) {
        var element;

        do {
          var exist = false;
          element = game.COLORS[parseInt(Math.random() * game.COLORS.length)];

          for (var i = 0; !exist && i < game.COMBINATION_LENGTH; i++) {
            exist = element === game.secretCombination[i];
          }

          !exist ? game.secretCombination += element : false;
        } while (game.secretCombination.length < game.COMBINATION_LENGTH);

        return game.secretCombination;
      }

      return game;
    }

    do {
      console.writeln("".concat(gameObj.attempts, " attempt(s):"));
      console.writeln("****");

      if (gameObj.attempts > 0) {
        console.writeln("".concat(gameObj.storageAttempts));
      }

      var combination = proposeCombination(gameObj);
      gameObj.storageAttempts += "".concat(combination, " ---> ").concat(checkBlackWhites(combination, gameObj));

      if (gameObj.secretCombination === combination) {
        console.writeln("".concat(gameObj.storageAttempts));
        gameObj.winner = true;
      } else {
        gameObj.attempts++;
      }
    } while (!gameObj.winner && gameObj.attempts < gameObj.MAX_ATTEMPS);

    if (gameObj.winner) {
      console.writeln("You've won!!!");
    } else {
      console.writeln("".concat(gameObj.attempts, " attempt(s):"));
      console.writeln("".concat(gameObj.storageAttempts));
      console.writeln("You've lost!!!");
    }

    function checkBlackWhites(combination, gameObj) {
      var exist;
      var blacks = 0;
      var whites = 0;

      for (var i = 0; i < gameObj.COMBINATION_LENGTH; i++) {
        for (var j = 0; j < gameObj.COMBINATION_LENGTH; j++) {
          exist = combination[i] === gameObj.secretCombination[j];

          if (exist) {
            i === j ? blacks++ : whites++;
          }
        }
      }

      return "".concat(blacks, " blacks and ").concat(whites, " whites\n");
    }

    function proposeCombination(gameObj) {
      var combinationPropoused;
      var isCorrect = false;

      do {
        var checkLengh = function checkLengh(combinationPropoused, gameObj) {
          if (combinationPropoused.length < gameObj.COMBINATION_LENGTH || combinationPropoused.length > gameObj.COMBINATION_LENGTH) {
            console.writeln('Wrong proposed combination length');
            return false;
          } else {
            return true;
          }
        };

        var checkRepeated = function checkRepeated(combinationPropoused, gameObj) {
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

        var checkCorrectColor = function checkCorrectColor(combinationPropoused, gameObj) {
          var colorOk;

          for (var i = 0; i < gameObj.COMBINATION_LENGTH; i++) {
            colorOk = false;

            for (var j = 0; !colorOk && j < gameObj.COLORS.length; j++) {
              colorOk = combinationPropoused[i] === gameObj.COLORS[j];
            }
          }

          if (!colorOk) {
            console.writeln("Wrong colors, they must be: ".concat(gameObj.COLORS));
            return false;
          } else {
            return true;
          }
        };

        combinationPropoused = console.readString('Propose a combination: ');
        console.writeln();

        if (isCorrect = checkLengh(combinationPropoused, gameObj)) {
          if (isCorrect = checkRepeated(combinationPropoused, gameObj)) {
            isCorrect = checkCorrectColor(combinationPropoused, gameObj);
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