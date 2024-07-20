let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset")
let crosses = document.querySelectorAll(".cross")
let turn = document.querySelector(".turn")
let newGame = document.querySelector(".new")
let game = document.querySelector(".game")
let heading1 = document.querySelector(".heading1")
let heading2 = document.querySelector(".heading2")
let homePage = document.querySelector(".home")
let startBtn = document.querySelector(".startBtn")

let turnX = true;

const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

startBtn.addEventListener("click", () => {
  game.classList.remove("hidden")
  startBtn.classList.add("hidden")
  resetBtn.classList.remove("hidden")
  turn.classList.remove("hidden")
}
)
function resetGame(){
    turnX = true;
    enableBtn()
    turn.innerHTML = `turn -> <img width="25px" src="cross.png" alt="">`
    newGame.classList.add("hidden")
}

newGame.addEventListener("click", () => {
  home();
}
)
function home(){
    game.classList.add("hidden")
    newGame.classList.add("hidden")
    resetBtn.classList.add("hidden")
    heading1.classList.add("hidden")
    turn.classList.add("hidden")
    startBtn.classList.remove("hidden")
    homePage.classList.remove("hidden")
}

resetBtn.addEventListener("click", () => {
  resetGame();
}
)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX){
            turn.innerHTML = `turn -> <img width="25px" src="circle.png" alt="">`
            box.innerHTML = `<img class="cross"  width="60vmin" src="cross.png" alt="">`
            turnX = false;
        }
        else{
            turn.innerHTML = `turn -> <img width="25px" src="cross.png" alt="">`
            box.innerHTML = `<img class="circle" width="73vmin" src="circle.png" alt="">`
            turnX = true;
        }box.disabled  = true;
        checkWinner();
    });
});

function checkWinner(){
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;
        if( pos1Val != "" && pos2Val != "" && pos3Val != "" ){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                let winner = boxes[pattern[0]].firstChild
                showWinner(winner);
                 
            }
        }
    }
}

function showWinner(winner){
   let win =  winner.getAttribute("class");
   disableBtn()
   if(win ==="cross"){
    turn.innerHTML = `Winner is <img width="25px" src="cross.png" alt="">`
   }
   else if(win ==="circle"){
    turn.innerHTML = `Winner is <img width="25px" src="circle.png" alt="">`
   }
   else {
    turn.innerHTML = `Draw`
   }
   newGame.classList.remove("hidden")
}

function disableBtn(){
    for(let box of boxes){
        box.disabled = true;
    }
}

function enableBtn(){
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = ""
    }
}