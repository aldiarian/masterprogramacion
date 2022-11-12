const { Console } = require("./console");
const console = new Console();

playTicTacToe();

function playTicTacToe(){

  do{
    playGame()
  } while ( newPlay() )


  function playGame(){
    let turn = 0;
    let winner = false;
    const MAX_TOKENS = 3;
    const TOKEN_EMPTY = ` `;
    let typeOfGames = [ gameOnlyMachine, gameMachinePerson, gameOnlyPerson  ];
    let tokens = [
      [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
      [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
      [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY]
    ];
    

    do {
      chooseTipeOfGme();
      // writeTokens(tokens);
      // placeToken(tokens, turn);
      // getNumTokens(tokens);
      // turn = nextTurn(turn);

    } while (!winner);
    writeTokens(tokens);


function chooseTipeOfGme{
  let game = console.readString(`0,1 o 2`);
  
}
function gameOnlyMachine{
  console.writeln(`Juego gameOnlyMachine`)
}
function gameMachinePerson{
console.writeln(`Juego gameMachinePerson`)
}
function gameOnlyPerson {
console.writeln(`Juego gameMachinePerson`)
}


    function nextTurn(turn){
      return turn === 0 ? 1 : 0;
    }

    function isTicTacToe(tokens){
      let full = false;
      let first ;

      checkRow(tokens)
      checkCol(tokens)
      checkCrossLeft(tokens)
      checkCrossRight(tokens)

      function checkCrossLeft(tokens){
        let testBox = ['0','0','0'];
        for (let i = 0; i < tokens.length; i++) {
          testBox[i] = tokens[i][i]
        }
        if (checkTestBox(testBox)) {
          showTicTock(turn, 'diagonal left to right')
        }
        
      }

      function checkCrossRight(tokens){
        let testBox = ['0','0','0'];
        let counter = MAX_TOKENS - 1;
        for (let i = 0; i < tokens.length; i++) {
          testBox[i] = tokens[i][counter]
          counter--;
        }
        if (checkTestBox(testBox)) {
          showTicTock(turn, 'diagonal right to left')
        }
      }
      
      function checkRow(tokens){
        let testBox = ['0','0','0'];
        for (let i = 0; i < tokens.length; i++) {
          for (let j = 0; j < tokens[i].length; j++) {
            testBox[j] = tokens[i][j]
          }
          if (checkTestBox(testBox)) {
            showTicTock(turn, 'horizontal')
          }
        }
       
      }

      function checkCol(tokens){
        let testBox = ['0','0','0'];
        for (let i = 0; i < tokens[0].length; i++) {
          for (let j = 0; j < tokens.length; j++) {
            testBox[j] = tokens[j][i]
          }
          if(checkTestBox(testBox)){
            showTicTock(turn, 'vertical')
          }
        }
        
      }
      

      function checkTestBox(testBox){
        let full = false;
        for (let j = 0; j < testBox.length; j++) {
          full = testBox[j] != ' '; 
        }
        if (full){
          let equals = true;
          for (let j = 0; equals && j < testBox.length; j++  ) {
            equals = testBox[j] === testBox[testBox.length -1];
          }
          return equals 
        }
        return full
      }

      function showTicTock(turn, msg){
        console.writeln(`-----------------------------------`)
        console.writeln(`línea ${msg}\ngana: ${getTurn(turn)}` );
        console.writeln(`-----------------------------------`)
        winner = true;
      }

    }


    function getNumTokens(tokens){
      let empty = 0;
      for (let i = 0; i < tokens.length; i++) {
        for (let j = 0; j < tokens[i].length; j++) {
          tokens[i][j] === TOKEN_EMPTY ? empty++ : false;
        }
      }
    }

    function writeTokens(tokens){
      const HORIZONTAL_SEPARTOR = `-------------`;
      const VERTICAL_SEPARATOR = `|`;
      let msg=``;
        for (let i = 0; i < tokens.length; i++) {
          msg +=`${HORIZONTAL_SEPARTOR}\n`;
          for (let j = 0; j < tokens[i].length; j++) {
            msg += `${VERTICAL_SEPARATOR} ${tokens[i][j]} `;
          }
          msg +=`${VERTICAL_SEPARATOR}\n`;
        }
        msg += HORIZONTAL_SEPARTOR;
      
        console.writeln(msg)
    } 

    function placeToken(tokens, turn){
      console.writeln(`Turno para: ${getTurn(turn)}`)
      let targetRow;
      let targetCol;
      let error;
      do {
        targetRow = readTarget(`Fila destino`);
        targetCol = readTarget(`Columna destino`);
        error = !isEmpty(tokens, targetRow, targetCol)
        if (error){
          console.writeln(`casilla ya ocupada`)
        }
      } while (error);
      tokens[targetRow][targetCol] = getTurn(turn);
      isTicTacToe(tokens);


    }

    function getTurn(turn){
      let TURN_X = 'X';
      let TURN_Y = 'Y';
      return turn === 0 ? TURN_X : TURN_Y
    }

    function isEmpty(tokens, targetRow, targetCol){
        return tokens[targetRow][targetCol] === TOKEN_EMPTY;
    }
    
    function readTarget(title){
      let position;
      do {
        position = console.readNumber(`${title}:`);
        error = position < 1 || position > MAX_TOKENS ;  // opciones de error
        if ( error ){
          console.writeln(`Por favor un numero entre 1 y ${MAX_TOKENS} inclusives`)
        }
        
      } while (error);
      return position - 1;
    }

  }

  function newPlay() {  
    let result;
    let answer;
    let error = false;
    do {
        answer = console.readString(`¿Quieres jugar otra partida? si / no`);
        result = answer === `si`; // true o false
        error = !result && answer !== `no`; // result diferente de 'si' y es diferente de 'no'
        if (error) {
            console.writeln(`Por favor, responda "si" o "no"`);
        }
    } while (error);
    return result;
  }

}

