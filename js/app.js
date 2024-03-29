// Enemies our player must avoid
var allEnemies=[];
var Enemy = function(col,row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=col;
    this.y=row;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.move(dt/2);
    clearEnemy();
}
Enemy.prototype.move = function(dt) {
   this.x=this.x+dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*83-18);
}
var prevRow;
var curRow;
var flag=0;
createEnemy();
setInterval(function(){
    createEnemy();
},4000);

function createEnemy(){
    curRow = Math.floor(Math.random()*3)+1;
    var col = -1;
    while(prevRow==curRow ){
         curRow = Math.floor(Math.random()*3)+1;
    }
    var enemy = new Enemy(col,curRow);
    prevRow=curRow;
    allEnemies.push(enemy);
}

function clearEnemy(){
    for(var i=0;i<allEnemies.length;i++){
        if(allEnemies[i].x>5){
             allEnemies.splice(i, 1);
        }
    }
}

function checkCollisions(){
     for(var i=0;i<allEnemies.length;i++){
        var enemy = allEnemies[i];
        if(enemy.y== player.row && (Math.ceil(enemy.x)==player.col || Math.floor(enemy.x) == player.col)){
            console.log("Game Over Dude");
           return true;
        }
    }
}

var Player=function(){
    this.sprite='images/char-boy.png';
    this.col=2;
    this.row=5;
}
Player.prototype.update = function(dt){
  //  player.render();
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.col*101, this.row*83);
}
Player.prototype.handleInput = function(direction){
   if(direction==='left' && this.col>0){
        this.col--;
   }
   else if(direction==='right' && this.col<4){
        this.col++;
   }
   else if(direction==='up' && this.row>0){
        this.row--;
   }
   else if(direction==='down' && this.row<5){
        this.row++;
   }

}
var player=new Player();
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
