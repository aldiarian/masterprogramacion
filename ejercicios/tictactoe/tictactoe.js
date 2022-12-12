const { Console } = require("./console");
const console = new Console();

playTicTacToe();

function playTicTacToe(){

  do{
    playGame()
  } while ( newPlay() )


  function playGame(){
    let turn = 0;
    let isFinish = false;
    const MAX_TOKENS = 3;
    const TOKEN_EMPTY = ` `;
    let tokens = [
      [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
      [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
      [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY]
    ];
    
    do {
      writeTokens(tokens);
      placeToken(tokens, turn);
      turn = nextTurn(turn);

    } while (!isFinish);
    writeTokens(tokens);

   
    function nextTurn(turn){
      return turn === 0 ? 1 : 0;
    }

    function isTicTacToe(tokens){
     if ( getNumTokensEmpties(tokens, TOKEN_EMPTY) != 0 ){
       checkRow(tokens)
       checkCol(tokens)
       checkCrossLeft(tokens)
       checkCrossRight(tokens)
     } else {
      console.writeln(`EMPATE`);
      isFinish = true;
     }


      function getNumTokensEmpties(tokens, tokenEmpty){
        let empties = 0;
        for (let i = 0; i < tokens.length; i++) {
          for (let j = 0; j < tokens[i].length; j++) {
           if( tokens[i][j] ===  tokenEmpty ){
              empties++;
           }
          }
        }
        return empties;
      }
  
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
        isFinish = true;
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

