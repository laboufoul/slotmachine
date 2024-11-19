// 1. how much money user has; deposit $
// 2. determine # lines to bet on
// 2. collect bet amount
// 4. spin slots
// 5. check if user won
// 6. give user $$
// 7. play again

//import user input package
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
//called an object in js, like dictionary in python
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};
const SYMBOL_VALUES  = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};

function deposit(){
    while(true) {
        const deposit_amount = prompt("Enter a deposit amount: ");
        //line 13 will retrun a string! we have to convert to an integer or double
        const numberDepositAmount = parseFloat(deposit_amount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid input.");
        } else {
            return numberDepositAmount;
        }
    } 
};

function getNumberOfLines() {
    while(true) {
        const lines = prompt("Enter number of lines to bet on (1-3): ");
        //line 13 will retrun a string! we have to convert to an integer or double
        const number_lines = parseFloat(lines);

        if (isNaN(number_lines) || number_lines <= 0 || number_lines > 3){
            console.log("Invalid input.");
        } else {
            return number_lines;
        }
    } 
};

function getBet(balance, lines) {
    while(true) {
        const bet = prompt("Enter bet per line: ");
        //line 13 will retrun a string! we have to convert to an integer or double
        const number_bet = parseFloat(bet);

        if (isNaN(number_bet) || number_bet <= 0 || number_bet > balance/lines){
            console.log("Invalid bet, try again.");
        } else {
            return number_bet;
        }
    } 
};

function spin(){
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        //copying everything in symbols array into reelSymbols
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1); //splice function will remove element (1 element only) at index randomIndex
        }
    }
    return reels;
};

function transpose(reels){
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

function printRows(rows){
    for (const row of rows){
        let rowString = "";
        //i will give index and letter in rows array
        for (const [i, symbol] of row.entries()){
            rowString += symbol; //adding elements to the symbol string
            if (i != row.length - 1){//if reached last element in array
                rowString += " | ";//add pipe between letters excpet after last one
            }
        }
        console.log(rowString);
    }
};

//lines are row indices we will be checking
function getWinnings (rows, bets, lines){
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += bet* SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

function game() {
    let balance = deposit(); //let will let us change the value of depositAmt so we can add subtract to it; const cannot be changed
    while (true){
        console.log("You have a balance of $" + balance);
        const numLines = getNumberOfLines();
        const bet = getBet(balance, numLines);
        balance -= bet * numLines;
        const reels = spin()
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numLines);
        balance += winnings;
        console.log("You won $" + winnings);
        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again? Enter y for yes or n for no.");
        if (playAgain != "y"){
            console.log("Sorry to see you go!");
            break;
        } 

    }
};

game();
