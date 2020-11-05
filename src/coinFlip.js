function flipCoin(){
    let x = (Math.floor(Math.random() * 2) === 0);
    let player1Name = document.getElementById('player1').value;
    let player2Name = document.getElementById('player2').value;
    let coin = "";
    if(x){
    	coin = player1Name ? player1Name:"Player 1";
    }else{
        coin = player2Name ? player2Name:"Player 2";
    }
    document.getElementById("playersInput").style.display = "none";
    document.getElementById("toss-result").innerHTML = `${coin}`;
    document.getElementById("extra-text").innerHTML = " won the toss";
    document.getElementById("toss-button").style.display = "none";
    document.getElementById('symbol-div').style.display = "block";
    document.getElementById('play-button').style.display = "block";
}