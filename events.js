// Luisa Rojas-Garcia (100518772), Jose Miguel Mendez (100468440)
window.onload = function() {
    
    var count = 0; //keeps track of cells taken
    var playerx = true; //x
    var gameArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var xscoreCounter = 0;
    var oscoreCounter = 0;
    
    var warningMessage = document.getElementById('warning');
    var boardSpace = document.getElementsByTagName('td');
    var turnMessage = document.getElementById('turn');
    var gameTable = document.getElementById('board');
    var xscoreDiv = document.getElementById('xscore');
    var oscoreDiv = document.getElementById('oscore');
    
    for (var i = 0; i < boardSpace.length; i++) {
        boardSpace[i].onclick = function () {
            
            warningMessage.innerHTML = '';
            
            cell = this;
            cellIndex = getIndex(cell);
            
            if (cell.innerHTML.length == 0) { //if the space is empty
                if (playerx) {
                    cell.innerHTML = 'X';
                    gameArray[cellIndex-1] = 'X';
                    count++;
                    playerx = false;
                    turnMessage.innerHTML = 'Turn: O';
                } else {
                    cell.innerHTML = 'O';
                    gameArray[cellIndex-1] = 'O';
                    count++;
                    playerx = true;
                    turnMessage.innerHTML = 'Turn: X';
                }
                
                console.log(gameArray);
                
                if(hasSomeoneWon(gameArray, count, turnMessage, gameTable, xscoreCounter, oscoreCounter, xscoreDiv, oscoreDiv)) {
                    //disable board
                    for (var i = 0; i < boardSpace.length; i++) {
                        boardSpace[i].style.pointerEvents = 'none';
                        boardSpace[i].classList.remove('hover');
                    }
                    gameTable.classList.remove('pointerCursor');
                    warningMessage.className = 'transText';
                }
                                
            } else {
                warningMessage.innerHTML = 'Pick a different space!';
            }
        };
    }
    
    var btnNewRound = document.getElementById('new-round');
    
    btnNewRound.onclick = function() {
        
        gameArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        //console.log(gameArray);
        
        for (var i = 0; i < boardSpace.length; i++) {
            boardSpace[i].innerHTML = '';
            boardSpace[i].style.pointerEvents = '';
            boardSpace[i].classList.add('hover');
            boardSpace[i].classList.remove('won');
            
        }
        
        gameTable.classList.add('pointerCursor');
        gameTable.classList.remove('tied');
        turnMessage.innerHTML = 'Turn: X';
        playerx = true;
        count = 0;
        warningMessage.innerHTML = '';
        warningMessage.classList.remove('transText');
    }
    
    var btnNewGame = document.getElementById('new-game');
    
    btnNewGame.onclick = function () {
        window.location.reload();
    }
    
    function hasSomeoneWon() {
    
        var endGame = false;
        var winner = '';

        //rows
        var win1 = gameArray[0].concat(gameArray[1], gameArray[2]);
        var win2 = gameArray[3].concat(gameArray[4], gameArray[5]);
        var win3 = gameArray[6].concat(gameArray[7], gameArray[8]);

        //columns
        var win4 = gameArray[0].concat(gameArray[3], gameArray[6]);
        var win5 = gameArray[1].concat(gameArray[4], gameArray[7]);
        var win6 = gameArray[2].concat(gameArray[5], gameArray[8]);

        //diagonals
        var win7 = gameArray[0].concat(gameArray[4], gameArray[8]);
        var win8 = gameArray[2].concat(gameArray[4], gameArray[6]);

        if (sameElems(win1)) {
            //console.log('Player ' + win1[0] + ' has won!');
            document.getElementById('top-left').className = 'won';
            document.getElementById('top-centre').className = 'won';
            document.getElementById('top-right').className = 'won';
            winner = win1[0];
            endGame = true;
        }

        if (sameElems(win2)) {
            //console.log('Player ' + win2[0] + ' has won!');
            document.getElementById('centre-left').className = 'won';
            document.getElementById('centre-centre').className = 'won';
            document.getElementById('centre-right').className = 'won';
            winner = win2[0];
            endGame = true;
        }

        else if (sameElems(win3)) {
            //console.log('Player ' + win3[0] + ' has won!');
            document.getElementById('bottom-left').className = 'won';
            document.getElementById('bottom-centre').className = 'won';
            document.getElementById('bottom-right').className = 'won';
            winner = win3[0];
            endGame = true;
        }

        else if (sameElems(win4)) {
            //console.log('Player ' + win4[0] + ' has won!');
            document.getElementById('top-left').className = 'won';
            document.getElementById('centre-left').className = 'won';
            document.getElementById('bottom-left').className = 'won';
            winner = win4[0];
            endGame = true;
        }

        else if (sameElems(win5)) {
            //console.log('Player ' + win5[0] + ' has won!');
            document.getElementById('top-centre').className = 'won';
            document.getElementById('centre-centre').className = 'won';
            document.getElementById('bottom-centre').className = 'won';
            winner = win5[0];
            endGame = true;
        }

        else if (sameElems(win6)) {
            //console.log('Player ' + win6[0] + ' has won!');
            document.getElementById('top-right').className = 'won';
            document.getElementById('centre-right').className = 'won';
            document.getElementById('bottom-right').className = 'won';
            winner = win6[0];
            endGame = true;
        }

        else if (sameElems(win7)) {
            //console.log('Player ' + win7[0] + ' has won!');
            document.getElementById('top-left').className = 'won';
            document.getElementById('centre-centre').className = 'won';
            document.getElementById('bottom-right').className = 'won';
            winner = win7[0];
            endGame = true;
        }

        else if (sameElems(win8)) {
            //console.log('Player ' + win8[0] + ' has won!');
            document.getElementById('top-right').className = 'won';
            document.getElementById('centre-centre').className = 'won';
            document.getElementById('bottom-left').className = 'won';
            winner = win8[0];
            endGame = true;
        }

        else if (count == 9 && endGame == false) {
            //console.log('There is a tie');
            turnMessage.innerHTML = 'There is a tie... Click on the button below to start a new round or a new game.';
            gameTable.classList.add('tied');
            warningMessage.className = 'transText';
            
            for (var i = 0; i < boardSpace.length; i++) {
                boardSpace[i].classList.remove('hover');
            }
            
            gameTable.classList.remove('pointerCursor');
            
        }

        if (endGame) {
            turnMessage.innerHTML = 'Player ' + winner + ' has won! Click on the button below to start a new round or a new game.';

            if (winner == 'X') {
                xscoreCounter++;
                xscoreDiv.innerHTML = '<b>Player X</b>: ' + xscoreCounter;
            } else if (winner == 'O') {
                oscoreCounter++;
                oscoreDiv.innerHTML = '<b>Player O</b>: ' + oscoreCounter;
            }
            
        }

        return endGame;
    }
};

function getIndex(tdElement) {
    
    var currCell = tdElement;
    var currRow = tdElement.parentElement;
    var row = 0;
    var col = 0;
    
    while (currCell != null) {
        col++;
        currCell = currCell.previousElementSibling;
    }
    //console.log('col:' + col);
    
    while (currRow != null) {
        row++;
        currRow = currRow.previousElementSibling;
    }
    //console.log('row:'+row);
    
    var index = col+((row-1)*3);
    
    //console.log('index:'+index);
    return index;
}

function sameElems(array) {
    for(var i = 0; i < array.length-1; i++) {
        if(array[i] !== array[i+1]) {
            return false;
        }
    }
    return true;
}