"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require("console-mpds"),
    Console = _require.Console;

var console = new Console();
playMasterMind();

function playMasterMind() {
  do {
    playGame();
  } while (isResumed());

  function playGame() {
    var COLORS = ["r", "g", "y", "b", "m", "c"];
    var COMBINATION_LENGTH = 4;
    var MAX_ATTEMPTS = 10;
    var board = [];
    var isWinner = false;
    var secretCombination = generateSecretCombination(COLORS, COMBINATION_LENGTH);
    console.writeln("----- MASTERMIND -----");

    do {
      var proposedCombination = askValidCombination(COLORS, COMBINATION_LENGTH);
      var resultsProposedCombination = getResults(proposedCombination, secretCombination);
      board = updateBoard(resultsProposedCombination, board);
      printBoard(board);

      if (board[board.length - 1][1] === COMBINATION_LENGTH) {
        isWinner = true;
        console.writeln("\xA1\xA1\xA1You've won!!! ;-)!!!");
      } else if (board.length === MAX_ATTEMPTS) {
        console.writeln("\xA1\xA1\xA1You've lost!!! :-(!!!");
      }
    } while (board.length < MAX_ATTEMPTS && !isWinner);

    function updateBoard(resultsProposedCombination, board) {
      var newBoard = [];
      newBoard = [].concat(_toConsumableArray(board), [[resultsProposedCombination[0], resultsProposedCombination[1], resultsProposedCombination[2]]]);
      return newBoard;
    }

    function printBoard(board) {
      console.writeln("\n".concat(board.length, " attempt(s): "));
      console.writeln("****");

      for (var _i = 0; _i < board.length; _i++) {
        console.write("".concat(board[_i][0], " -- > ").concat(board[_i][1], " blacks and ").concat(board[_i][2], " whites\n"));
        ;
      }
    }

    function generateSecretCombination(COLORS, COMBINATION_LENGTH) {
      var randomCombination = "";

      do {
        var randomColor = COLORS[generateRandomIndex(COLORS)];
        var isRepeatedColor = false;

        for (var _i2 = 0; !isRepeatedColor && _i2 < randomCombination.length; _i2++) {
          if (randomCombination[_i2] === randomColor) {
            isRepeatedColor = true;
          }
        }

        if (!isRepeatedColor) {
          randomCombination += randomColor;
        }
      } while (randomCombination.length != COMBINATION_LENGTH);

      return randomCombination;

      function generateRandomIndex(COLORS) {
        return parseInt(Math.random() * COLORS.length);
      }
    }

    function askValidCombination(COLORS, COMBINATION_LENGTH) {
      var combination, isWrongLenght, isWrongColorsCombination, isRepeatedColor;

      do {
        combination = console.readString("Propose a combination:");
        isWrongLenght = false;

        if (combination.length != COMBINATION_LENGTH) {
          isWrongLenght = true;
          console.writeln("Wrong proposed combination length");
        } else {
          isWrongColorsCombination = false;
          isRepeatedColor = false;

          for (var _i3 = 0; !isWrongColorsCombination && !isRepeatedColor && _i3 < COMBINATION_LENGTH; _i3++) {
            if (isCorrectColor(combination[_i3], COLORS) == false) {
              isWrongColorsCombination = true;
              console.writeln("Wrong color, they must be: rgybmc");
            } else if (isRepeated(combination, _i3) == true) {
              isRepeatedColor = true;
              console.writeln("Repeated color ".concat(combination[_i3], " try again"));
            }
          }
        }
      } while (isWrongLenght || isWrongColorsCombination || isRepeatedColor);

      return combination;

      function isRepeated(combination, indexColor) {
        var repeated = false;

        for (var _i4 = 0; !repeated && _i4 < combination.length; _i4++) {
          repeated = combination[_i4] === combination[indexColor] && _i4 !== indexColor;
        }

        return repeated;
      }

      function isCorrectColor(color, COLORS) {
        var correctColor = false;

        for (var _i5 = 0; !correctColor && _i5 < COLORS.length; _i5++) {
          correctColor |= COLORS[_i5] === color;
        }

        return correctColor;
      }
    }

    function getResults(proposedCombination, secretCombination) {
      var msg = [];
      var blacks = 0;
      var whites = 0;

      for (i = 0; i < proposedCombination.length; i++) {
        for (j = 0; j < proposedCombination.length; j++) {
          if (proposedCombination[i] === secretCombination[i] && i === j) {
            blacks++;
          } else if (proposedCombination[i] === secretCombination[j]) {
            whites++;
          }
        }
      }

      msg = [proposedCombination, blacks, whites];
      return msg;
    }
  }

  function isResumed() {
    var error = false;

    do {
      answer = console.readString("Do you want to continue?(y / n): ");

      if (answer !== "y" && answer !== "n") {
        error = true;
        console.writeln("Please, answer \"y\" o \"n\"");
      }
    } while (error);

    return answer === "y" ? true : false;
  }
}