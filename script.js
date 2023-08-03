const boxes=document.querySelectorAll('.box');
const navItems=document.querySelectorAll('.navItem');
const screens=document.querySelectorAll('.myScreen');
let currPlayer;
let gameGrid;
let lastWinnerIndex=-1;
let turnsPlayed;
let currScreen;
let currNav;
const winningPOS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
document.querySelector('#screen1').classList?.remove('hidden');
document.querySelector('#screen2').classList?.add('hidden');
document.querySelector('#screen3').classList?.add('hidden');
document.getElementById('navItem1').classList.add('activeNavItem');
document.querySelector('#screen1').classList.add('active');


function initializeGame(){
    currPlayer='X';
    gameGrid=["","","","","","","","",""]; 
    turnsPlayed=0;
    boxes.forEach((box,index)=>{
        box.innerHTML="";
        box.classList?.remove('noPointerEvents');
    })
    document.getElementById('newGame').classList?.remove('active');
    document.getElementById('newGame').classList.add('hidden');
    document.getElementById('gameStatus').innerText=`Current Player- ${currPlayer}`;
    currScreen=document.getElementById('screen1');
    currNav=document.getElementById('navItem1');
    if(lastWinnerIndex!=-1)
        removeGreenBG(lastWinnerIndex);


}
initializeGame(); 

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
})

navItems.forEach((item,index)=>{
    item.addEventListener('click',()=>{
        changeScreen(index);
    })
})
function changeScreen(index){
    if(screens[index]!=currScreen){
        currNav.classList.remove('activeNavItem');
        currNav=navItems[index];
        currNav.classList.add('activeNavItem');
        currScreen.classList.remove('active');
        currScreen.classList.add('hidden');
        currScreen=screens[index];
        currScreen.classList.remove('hidden');
        currScreen.classList.add('active');

    }
}

function handleClick(index){
    if(gameGrid[index]===""){
        turnsPlayed++;
        boxes[index].innerHTML=currPlayer;
        boxes[index].classList?.remove("noPointerEvents");
        gameGrid[index]=currPlayer;
        
        document.getElementById('gameStatus').innerText=`Current Player- ${currPlayer}`;


        if(checkGameOver()){
            setGreenBG(lastWinnerIndex);
            document.getElementById('newGame').classList.remove('hidden');

            document.getElementById('newGame').classList.add('active');
            document.getElementById('gameStatus').innerText=` ${currPlayer} WINS!!!!`;
            boxes.forEach((box)=>{
                box.classList.add("noPointerEvents");
            })
            if(currPlayer=='X'){
                let score=parseInt(document.getElementById('score1').innerHTML);
                score+=1;
                document.getElementById('score1').innerHTML=score;

            }
            else{
                let score=parseInt(document.getElementById('score2').innerHTML);
                score+=1;
                document.getElementById('score2').innerHTML=score;
            }
            

        }
        else if(checkGameOver()==false && turnsPlayed==9){
            document.getElementById('gameStatus').innerText=` DRAW`;
            document.getElementById('newGame').classList.remove('hidden');
            document.getElementById('newGame').classList.add('active');
        }
        if(currPlayer==='X'){
            currPlayer='O';
        }
        else{
            currPlayer='X';
        }
        console.log(turnsPlayed);
            

    }
}



function setGreenBG(index){
    for(let i=0;i<3;i++){
        boxes[winningPOS[index][i]].classList.add('greenBG');
    }
}

function removeGreenBG(index){
    for(let i=0;i<3;i++){
        boxes[winningPOS[index][i]].classList.remove('greenBG');
    }
}
function checkGameOver(){
     for(let i=0;i<winningPOS.length;i++){

        if(gameGrid[winningPOS[i][0]]!=""){

            let currCharacter=gameGrid[winningPOS[i][0]];

            for(let j=0;j<winningPOS[i].length;j++){
                if(gameGrid[winningPOS[i][j]]!=currCharacter || gameGrid[winningPOS[i][j]]=="")
                    break;
                else if(j==2){
                    
                    lastWinnerIndex=i;
                    return true;
                }
            }
        }
        

        
    }
     return false;
}

document.getElementById('newGame').addEventListener('click',()=>{
    initializeGame();
})