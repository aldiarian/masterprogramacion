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
    var isfinished = false;
    var COLORS = ['r', 'y', 'b', 'g', 'm', 'c'];
    var COMBINATION_LENGTH = 4;
    var MAX_LENGHT = 4;
    var secretCombination;

    do {
      secretCombination = generateSecretCombination();
      isfinished = propouseCombination();
    } while (!isfinished);

    console.writeln(secretCombination);

    function propouseCombination() {
      var combination;
      var isCorrect = false;

      do {
        // combination = console.readString('Propose a combination: ');
        // console.writeln( `longitud : ${checkLengh(combination)}`)
        // console.writeln( `repetidos : ${  checkRepeated( combination)}`)
        // console.writeln( `colores correctos : ${  checkCorrectColor( combination, COLORS)}`)
        var createSecretCombination = function createSecretCombination() {
          var element;
          var combination = '';
          var exist;

          do {
            element = COLORS[Math.ceil(Math.random() * COLORS.length)];
            console.writeln("element : ".concat(element));

            for (var i = 0; i < COMBINATION_LENGTH; i++) {
              combination += "".concat(COLORS[i]);
              console.writeln("combiation : ".concat(combination));
              console.writeln("combiation lenght : ".concat(combination.length));
            }
          } while (combination.length < 4);

          return true;
        };

        var checkLengh = function checkLengh(combination) {
          if (combination.length > COMBINATION_LENGTH) {
            console.writeln('muy larga');
          } else {
            return true;
          }
        };

        var checkRepeated = function checkRepeated(combination) {
          var isRepeated;

          for (var i = 0; i < combination.length - 1; i++) {
            for (var j = i + 1; !isRepeated && j < combination.length; j++) {
              isRepeated = combination[i] === combination[j];
            }
          }

          return isRepeated;
        };

        var checkCorrectColor = function checkCorrectColor(combination, COLORS) {
          var isCorrect;

          for (var i = 0; i < combination.length; i++) {
            for (var j = 0; !isCorrect && j < COLORS.length; j++) {
              isCorrect = combination[i] === COLORS[j];
            }
          }

          return isCorrect;
        };

        createSecretCombination();
      } while (!isCorrect);

      return combination;
    }

    function generateSecretCombination() {
      return 'bgmc';
    }
  }

  function isResumed() {
    var answer;
    var result;
    var isError = false;

    do {
      answer = console.readString("Do you want to continue? (y/n): ");
      result = answer == "y";
      isError = !result && answer !== "n";

      if (isError) {
        console.writeln("Please answer 'y' or 'n'");
      }
    } while (isError);

    return result;
  }
}