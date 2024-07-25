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
let playBtn = document.querySelector(".play")
let menu = document.querySelector(".menu")
let clickSound = document.getElementById("clickSound");
let bgm = document.getElementById("bgm");
let winSound = document.getElementById("winSound");
let btnSound = document.getElementById("btnSound");
let checkboxes = document.querySelectorAll('.custom');
let checkbox1 = document.getElementById('checkbox1');
let checkbox2 = document.getElementById('checkbox2');

window.onload = () => {
  bgm.play()
}

let turnX = true;

let clickedBtns = [];

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

startBtn.addEventListener("click", () => {
    btnSound.play()
    startBtn.classList.add("hidden")
    heading2.classList.add("hidden")
    menu.classList.remove("hidden")
    playBtn.classList.remove("hidden")
}
)
function resetGame() {
    turnX = true;
    enableBtn()
    turn.innerHTML = `turn -> <img width="25px" src="cross.png" alt="">`
    turn.classList.remove("blink1")
    clickedBtns = [];
}

newGame.addEventListener("click", () => {
    btnSound.play()
    home();
}
)
function home() {
    game.classList.add("hidden")
    newGame.classList.add("hidden")
    resetBtn.classList.add("hidden")
    turn.classList.add("hidden")
    startBtn.classList.remove("hidden")
    homePage.classList.remove("hidden")
    turn.classList.remove("blink1")
    resetGame();
}

resetBtn.addEventListener("click", () => {
    btnSound.play()
    resetGame();
}
)
function isDraw() {
    if (clickedBtns.length === 9) {
        turn.innerHTML = `THE GAME IS DRAW`
        winSound.play()
    }
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (checkbox2.checked) {

            clickSound.play()
            if (turnX) {
                turn.innerHTML = `turn -> <img width="25px" src="circle.png" alt="">`
                box.innerHTML = `<img class="cross"  width="60vmin" src="cross.png" alt="">`
                turnX = false;
                clickedBtns.push(box)
                box.disabled = true;
                isDraw()
            }
            else {
                turn.innerHTML = `turn -> <img width="25px" src="cross.png" alt="">`
                box.innerHTML = `<img class="circle" width="73vmin" src="circle.png" alt="">`
                turnX = true;
                clickedBtns.push(box)
                box.disabled = true;
                isDraw()
            }
            checkWinner();
        }
        else if (checkbox1.checked) {
            let gameWon = checkWinner();
            if (turnX) {
                clickSound.play()
                turn.innerHTML = `turn -> <img width="25px" src="circle.png" alt="">`
                box.innerHTML = `<img class="cross"  width="60vmin" src="cross.png" alt="">`
                box.disabled = true;
                turnX = false;
                clickedBtns.push(box);
                checkWinner();
                    setTimeout(() => {
                        if (!gameWon) {
                        btnSound.play();
                        let availableBoxes = Array.from(boxes).filter(box => !clickedBtns.includes(box));
                        if (availableBoxes.length > 0) {
                            let randIdx = Math.floor(Math.random() * availableBoxes.length);
                            let computerMove = availableBoxes[randIdx];
                            turn.innerHTML = `turn -> <img width="25px" src="cross.png" alt="">`;
                            computerMove.innerHTML = `<img class="circle" width="73vmin" src="circle.png" alt="">`;
                            computerMove.disabled = true;
                            clickedBtns.push(computerMove);
                            turnX = true;
                            checkWinner();
                        }}
                    }, 1000);
                }
            }
        }
    );
})

function checkWinner() {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                let winner = boxes[pattern[0]].firstChild
                showWinner(winner);
                disableBtn()
            }
        }
    }
}

function showWinner(winner) {
    let win = winner.getAttribute("class");
    winSound.play();
    turn.classList.add("blink1")
    disableBtn()
    if (win === "cross") {
        turn.innerHTML = `Winner is <img width="25px" src="cross.png" alt="">`
    }
    else if (win === "circle") {
        turn.innerHTML = `Winner is <img width="25px" src="circle.png" alt="">`
    }
    else {
        turn.innerHTML = `Draw`
    }
    newGame.classList.remove("hidden")
}

function disableBtn() {
    for (let box of boxes) {
        box.disabled = true;
    }
}

function enableBtn() {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = ""
    }
}

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        btnSound.play()
        if (this.checked) {
            checkboxes.forEach(function (otherCheckbox) {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});

playBtn.addEventListener("click", () => {
    btnSound.play()
    
    if(checkbox2.checked || checkbox1.checked){
         playBtn.classList.add("hidden")
    menu.classList.add("hidden")
    game.classList.remove("hidden")
    turn.classList.remove("hidden")
    resetBtn.classList.remove("hidden")
    newGame.classList.remove("hidden")
    }
    else{
        alert(`please select one mode`)
    }
   
})