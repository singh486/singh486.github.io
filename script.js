var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sizeInput = document.getElementById('size');
//var stop = setInterval(timer, 1000);
var changeSize = document.getElementById('change-size');
var scoreLabel = document.getElementById('score');
var numInput = document.getElementById('num');
var num = 2;
var changeNum = document.getElementById('change-num');
var score = 0;
var size = 4;
var width = canvas.width / size - 6;
var cells = [];
var fontSize;
var loss = false;
var start = false;
startGame();

changeSize.onclick = function () {
   if (sizeInput.value >= 2 && sizeInput.value <= 20) {
       size = sizeInput.value;
       width = canvas.width / size - 6;
       console.log(sizeInput.value);
       score = 0;
       canvasClean();
       startGame();
   }
}

changeNum.onclick = function () {
   if (numInput.value >= 2 && numInput.value <= 20) {
       num = numInput.value;
       console.log(numInput.value);
       score = 0;
       canvasClean();
       startGame();
   //    start = false;
   }
}

function cell(row, col) {
   this.value = 0;
   this.x = col * width + 5 * (col + 1);
   this.y = row * width + 5 * (row + 1);
}

function createCells() {
   var i, j;
   for(i = 0; i < size; i++) {
       cells[i] = [];
       for(j = 0; j < size; j++) {
           cells[i][j] = new cell(i, j);
       }
   }
}

function drawCell(cell) {
   ctx.beginPath();
   ctx.rect(cell.x, cell.y, width, width);
   switch (cell.value){
       case 0 : ctx.fillStyle = '#A9A9A9'; break;
       case Math.pow(num,1) : ctx.fillStyle = '#69d2c7'; break;
       case Math.pow(num,2) : ctx.fillStyle = '#ffbdd4'; break;
       case Math.pow(num,3) : ctx.fillStyle = '#aec6ff'; break;
       case Math.pow(num,4) : ctx.fillStyle = '#b2ffa6'; break;
       case Math.pow(num,5) : ctx.fillStyle = '#3dffba'; break;
       case Math.pow(num,6) : ctx.fillStyle = '#00bfff'; break;
       case Math.pow(num,7) : ctx.fillStyle = '#dcb9ff'; break;
       case Math.pow(num,8) : ctx.fillStyle = '#ffc576'; break;
       case Math.pow(num,9) : ctx.fillStyle = '#ff76a6'; break;
       case Math.pow(num,10) : ctx.fillStyle = '#cfd2a0'; break;
       case Math.pow(num,11) : ctx.fillStyle = '#9061ff';
           alert("You win!");
       break;
       case Math.pow(num,12) : ctx.fillStyle = '#a2ffc7'; break;
       default : ctx.fillStyle = '#fc83ff';
   }
   ctx.fill();
   var x = cell.value;
   if(x <= Math.pow(num,5))
       fontSize = width/2;
   else
       fontSize = (width/num)*2;
   if (cell.value) {
       ctx.font = fontSize + 'px Arial';
       ctx.fillStyle = 'white';
       ctx.textAlign = 'center';
        ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
  }
       

}

function canvasClean() {
   ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
   if (start) {
       if (event.keyCode === 38 || event.keyCode === 87) {
           moveUp();
       } else if (event.keyCode === 39 || event.keyCode === 68) {
           moveRight();
       } else if (event.keyCode === 40 || event.keyCode === 83) {
           moveDown();
       } else if (event.keyCode === 37 || event.keyCode === 65) {
           moveLeft();
       }
       scoreLabel.innerHTML = 'Score : ' + score;
   }
}

document.getElementById('up').onclick = () =>{
    moveUp()
}

document.getElementById('down').onclick = () =>{
    moveDown()
}

document.getElementById('left').onclick = () =>{
    moveLeft()
}

document.getElementById('right').onclick = () =>{
    moveRight()
}

function startGame() {
    score = 0;
    scoreLabel.innerHTML = 'Score : ' + score;
    createCells();
   drawAllCells();
   start = true;
//    pasteNewCell();
//    pasteNewCell();
   //startClock();
   //timer();
   //canMove();
}

function finishGame() {
   canvas.style.opacity = '0.5';
   loss = true;
   //document.getElementById("demo").innerHTML = "";
  //stopCount();
  //clearInterval(stop);
  start = false;
  if(stop){
    clearInterval(stop);
    stop = null;
}
    // stopClock();
       alert("You lost!");
       //want to start again message?
       
}

function drawAllCells() {
   var i, j;
   for(i = 0; i < size; i++) {
       for(j = 0; j < size; j++) {
           drawCell(cells[i][j]);
       }
   }
}

function pasteNewCell() {
    
   var countFree = 0;
   var i, j;


   for(i = 0; i < size; i++) {
       for(j = 0; j < size; j++) {
           if(!cells[i][j].value) {
               countFree++;
           }
       }
   }

   if(!countFree) {
    var pair1=0;
    var pair2 = 0;
    for(i = 0; i < size-1; i++) {
        for(j = 0; j < size-1; j++) {
            if(cells[i][j].value == cells[i][j+1].value || cells[i][j].value == cells[i+1][j].value) {
                pair1++;
            }
        }
    }
    for(i = size-1; i >=1 ; i--) {
        for(j = size-1; j >= 1; j--) {
            if(cells[i][j].value == cells[i][j-1].value || cells[i][j].value == cells[i-1][j].value) {
                pair2++;
            }
        }
    }
    //console.log(pair);
    if(pair1 == 0 && pair2 == 0){
       finishGame();
       return;
    }
    else{
        drawAllCells();
        return;
    }
   }


   while(true) {
       var row = Math.floor(Math.random() * size);
       var col = Math.floor(Math.random() * size);
       if(!cells[row][col].value) {
           cells[row][col].value = Math.pow(num, Math.floor(Math.random() * 2)+1);
           drawAllCells();
           return;
       }
   }
}

function moveRight () {
    if(start){
   var i, j;
   var col;
   for(i = 0; i < size; i++) {
       for(j = size - 2; j >= 0; j--) {
           if(cells[i][j].value) {
               col = j;
               while (col + 1 < size) {
                   if (!cells[i][col + 1].value) {
                       cells[i][col + 1].value = cells[i][col].value;
                       cells[i][col].value = 0;
                       col++;
                   } else if (cells[i][col].value == cells[i][col + 1].value) {
                       cells[i][col + 1].value *= num;
                       score +=  cells[i][col + 1].value;
                       cells[i][col].value = 0;
                       break;
                   } else {
                       break;
                   }
               }
           }
       }
   }
   pasteNewCell();
}
}

function moveLeft() {
    if(start){
   var i, j;
   var col;
   for(i = 0; i < size; i++) {
       for(j = 1; j < size; j++) {
           if(cells[i][j].value) {
               col = j;
               while (col - 1 >= 0) {
                   if (!cells[i][col - 1].value) {
                       cells[i][col - 1].value = cells[i][col].value;
                       cells[i][col].value = 0;
                       col--;
                   } else if (cells[i][col].value == cells[i][col - 1].value) {
                       cells[i][col - 1].value *= num;
                       score +=   cells[i][col - 1].value;
                       cells[i][col].value = 0;
                       break;
                   } else {
                       break;
                   }
               }
           }
       }
   }
   pasteNewCell();
}
}

function moveUp() {
    if(start){
   var i, j, row;
   for(j = 0; j < size; j++) {
       for(i = 1; i < size; i++) {
           if(cells[i][j].value) {
               row = i;
               while (row > 0) {
                   if(!cells[row - 1][j].value) {
                       cells[row - 1][j].value = cells[row][j].value;
                       cells[row][j].value = 0;
                       row--;
                   } else if (cells[row][j].value == cells[row - 1][j].value) {
                       cells[row - 1][j].value *= num;
                       score +=  cells[row - 1][j].value;
                       cells[row][j].value = 0;
                       break;
                   } else {
                       break;
                   }
               }
           }
       }
   }
   pasteNewCell();
}
}

function moveDown() {
    if(start){
   var i, j, row;
   for(j = 0; j < size; j++) {
       for(i = size - 2; i >= 0; i--) {
           if(cells[i][j].value) {
               row = i;
               while (row + 1 < size) {
                   if (!cells[row + 1][j].value) {
                       cells[row + 1][j].value = cells[row][j].value;
                       cells[row][j].value = 0;
                       row++;
                   } else if (cells[row][j].value == cells[row + 1][j].value) {
                       cells[row + 1][j].value *= num;
                       score +=  cells[row + 1][j].value;
                       cells[row][j].value = 0;
                       break;
                   } else {
                       break;
                   }
               }
           }
       }
   }
   pasteNewCell();
}
}
var t;
var timer_is_on = 0;
var stop; 

function stopClock(){
    clearInterval(stop);
    alert("Thanks for playing!");
    startGame();
}

function timer(){
    //if(!stop){
        var countDownDate ;
        //= localStorage.getItem('startDate');
        if (countDownDate) {
            countDownDate = new Date(countDownDate);
        } else {
            countDownDate = new Date();
            //localStorage.setItem('startDate', countDownDate);
        }
        
        // Update the count down every 1 second
        stop = setInterval(function() {
          //  t = setInterval(function(){
              //  if(timer_is_on==1){
        //     // Get todays date and time
             var now = new Date().getTime();
         
        //     // Find the distance between now an the count down date
             var distance = now - countDownDate.getTime();
         
        //     // Time calculations for days, hours, minutes and seconds
             var days = Math.floor(distance / (1000 * 60 * 60 * 24));
             var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
             var seconds = Math.floor((distance % (1000 * 60)) / 1000);
             var mil = Math.floor((distance % (1000)));
         
        //     // Output the result in an element with id="demo"
            document.getElementById("demo").innerHTML = minutes + " minutes " + seconds + " seconds " + mil + " milliseconds "; 
          //  t = setTimeout(function(){timer()}, 1000);
               // }
                // else{
                //     return;
                // }
            }, 10);
        //}
        // }, 1000);
}

function startClock(){
    canvas.style.opacity = '1';
    clearTimeout(stop);
    score = 0;
    startGame();
    pasteNewCell();
    pasteNewCell();
    timer();
}