function TicTacToe(){

    let tossWinner = "";
    let clicked = [];
    let currentPlayer = "";
    let size = 3;
    let currentWinner = "";
    let winnersList = [];
    let contestants = [];
    let choosenSymbol = "";
    let rowSum = [];
    let columnSum = [];
    let diagonalSum = [];

    const renderTicTacToe = (...gameState) => {
        // console.log(gameState);
        choosenSymbol = gameState[0];
        currentPlayer = tossWinner;
        if(gameState[1] === tossWinner){
            contestants.push(gameState[1]);
            contestants.push(gameState[2]);
        }else{
            contestants.push(gameState[2]);
            contestants.push(gameState[1]);
        }
        size = Number(document.getElementById('size').value) || 3;

        rowSum.push(0);
        columnSum.push(0);
        diagonalSum.push(0);
        for(let i =0;i<=size;i++){
            rowSum.push(0);
            columnSum.push(0);
        }

        for(let i =1;i<=2;i++){
            diagonalSum.push(0);
        }

        document.getElementById('player-data').innerHTML = `Contestants:  ${gameState[1]} and ${gameState[2]}. 
        ${tossWinner} won the toss.<br/> Choosen ${gameState[0] === "0"?"X":"O"} to start. <br/>
        Grid Size: ${size}`;
    
        document.getElementById('turn').innerHTML = `${currentPlayer}'s turn`;
    
        document.getElementById('play-button').style.display = "none";
        document.getElementById('reset-button').style.display = "block";
        
        let grid = document.getElementById('grid');
        grid.style.gridTemplateColumns = `repeat(${size},auto)`;
        grid.style.width = `${size*51}px`;
        grid.style.height = `${size*51}px`;
        grid.style.marginRight = `${size*5}px`;
        grid.style.marginRight = `${size*5}px`;
        grid.addEventListener('click',handleCellClick);

    
        for(let i =1;i<=(size*size);i++){
    
            let gridCell = document.createElement('button');
            gridCell.id = i;
            gridCell.className = "gridCell";
            grid.appendChild(gridCell);
    
        }
    
    }
    
    const handleCellClick = (e) => {
       
        if(clicked.length !== 0 && clicked.includes(e.target.id)){
            return;
        }else{
            clicked.push(e.target.id);
        }
        let currentCell = document.getElementById(e.target.id);
        if (currentPlayer === tossWinner) {
            currentCell.innerHTML = (choosenSymbol === "0" ?"X":"O");
            currentCell.style.color = "green";
        }
    
        else {
            currentCell.innerHTML = (choosenSymbol === "0" ?"O":"X");
            currentCell.style.color = "yellow";
        }
        if(clicked.length === (size*size) && !checkWinnerCondition() && winnersList.length === 0){
            document.getElementById('player-data').innerHTML = `Game Draw!`;
            document.getElementById('grid').removeEventListener('click',handleCellClick);
            document.getElementById('turn').innerHTML = "";
            document.getElementById('reset-button').innerText = "Play Again";
            return;
        }
        if (checkWinnerCondition(e.target.id))
        {
            if(currentWinner === tossWinner){
                document.getElementById('player-data').innerHTML = `Congratulations! ${tossWinner} wins`;
                document.getElementById('grid').removeEventListener('click',handleCellClick);
                document.getElementById('turn').innerHTML = "";
                document.getElementById('reset-button').innerText = "Play Again";
            }
            else if(currentWinner === contestants[1]){
                document.getElementById('player-data').innerHTML = `Congratulations! ${contestants[1]} wins`;
                document.getElementById('grid').removeEventListener('click',handleCellClick);
                document.getElementById('turn').innerHTML = "";
                document.getElementById('reset-button').innerText = "Play Again";
            }
                
        }else{
            if(currentPlayer === contestants[0]){
                currentPlayer = contestants[1];
            }else if(currentPlayer === contestants[1]){
                currentPlayer = contestants[0];
            }
            document.getElementById('turn').innerHTML = `${currentPlayer}'s turn`;
        }
    }
    
    
    const checkWinnerCondition = (cellId) =>{
        let isWinner = false;
        let rowIndex = Math.ceil(cellId/size);
        let columnIndex = cellId%size;
        if(columnIndex === 0){
            columnIndex = size;
        }
        if(currentPlayer === tossWinner){
            rowSum[rowIndex]++;
            columnSum[columnIndex]++;
            if(rowIndex === columnIndex){
                diagonalSum[1]++;
            }
            if(columnIndex === (size - rowIndex + 1)){
                diagonalSum[2]++;
            }
        }
        else if(currentPlayer === contestants[1]){
            rowSum[rowIndex]--;
            columnSum[columnIndex]--;
            if(rowIndex === columnIndex){
                diagonalSum[1]--;
            }
            if(columnIndex === (size - rowIndex + 1)){
                diagonalSum[2]--;
            }
        }
        //check for just that column and row.
        if(rowSum[rowIndex] === size || rowSum[rowIndex] === (-1 * size)){
            isWinner = true;
        }
        else if(columnSum[columnIndex] === size || columnSum[columnIndex] === (-1 * size)){
            isWinner = true;
        }
       else{
            for(let i =1;i<=2;i++){
                if(diagonalSum[i] === size || diagonalSum[i] === (-1 * size)){
                    isWinner = true;
                    break;
                }
            }
       }
        

        if(isWinner && currentPlayer === tossWinner){
            currentWinner = tossWinner;
            winnersList.push("p1");
        }
        else if(isWinner && currentPlayer === contestants[1]){
            currentWinner = contestants[1];
            winnersList.push("p2");
        }
    
        return isWinner;
    }
    
    this.startGame = function(){
      tossWinner = document.getElementById('toss-result').innerText;
      let symbol = document.getElementById('symbols').value;
      let player1Name = document.getElementById('player1').value || "Player 1";
      let player2Name = document.getElementById('player2').value || "Player 2";
      document.getElementById('symbol-div').style.display = "none";
      document.getElementById('toss-result').innerHTML = "";
      document.getElementById('extra-text').innerHTML = "";
      
      renderTicTacToe(symbol,player1Name,player2Name);
      
    }
    
    this.resetGame = function(){
      tossWinner = "";
      size = 0;
      contestants = [];
      choosenSymbol = "";
      clicked = [];
      currentPlayer = "";
      currentWinner = "";
      winnersList = [];
      rowSum = [];
      columnSum = [];
      diagonalSum = [];
      document.getElementById('reset-button').style.display = "none";
      document.getElementById('grid').innerHTML = "";
      document.getElementById('player1').value = "";
      document.getElementById('player2').value = "";
      document.getElementById('size').value = 0;
      document.getElementById("playersInput").style.display = "inline-flex";
      document.getElementById('player-data').innerHTML = "";
      document.getElementById('toss-button').style.display = "";
      document.getElementById('symbols').value = 0;
      document.getElementById('toss-result').display = "block";
      document.getElementById('turn').innerHTML = "";
    
      
    }
}

let newTicTacToe = new TicTacToe();


