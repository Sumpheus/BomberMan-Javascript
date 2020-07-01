const H_GRID = 20;
const V_GRID = 20;
const GRID_SIZE = 40;

const WINDOW_WIDTH = H_GRID * GRID_SIZE;
const WINDOW_HEIGHT = V_GRID * GRID_SIZE;

var plateau = document.getElementById('field');
field.style.width = WINDOW_WIDTH;
field.style.height = WINDOW_HEIGHT;

var pion = document.getElementById('pion'),
  stylePion = pion.style,
  x = pion.offsetLeft,
  y = pion.offsetTop;



var blockGrid = [];
for(var i = 0; i < H_GRID; i++){
  blockGrid.push([]);
  for (var j = 0; j < V_GRID; j++){
    var block = document.createElement("div");
    block.style.width = "40px";
    block.style.height = "40px";
    block.style.display = "flex";
    block.style.position = "absolute";

    if (random100() > 85){
      block.style.backgroundColor = "";
      block.style.backgroundImage = "url(Arts/Wall.png)";    
      block.traverser = false;
    }
    
    else if (random100() > 70){
      block.style.backgroundColor = "";
      block.style.backgroundImage = "url(Arts/Rock.png)";   
      block.traverser = false;    
    }
      
    else {
      block.style.backgroundColor = "";
      block.traverser = true;
    }

    block.style.marginLeft = (i * GRID_SIZE).toString()+"px";
    block.style.marginTop = (j * GRID_SIZE).toString()+"px";

    document.getElementById("field").appendChild(block);
    blockGrid[i].push(block); 
          
  }  
}

//enemies//

var vilainListe = []
for (var i = 0; i < 10; i++) {
  let vilain = document.createElement('div');

let x = 0;
let y = 0;
while (!blockGrid[x][y].traverser || (x === 0 && y ===0)) {
x = Math.floor(Math.random() * (H_GRID))
y = Math.floor(Math.random() * (V_GRID))
}
blockGrid[x][y].traverser = false;
  vilain.vilainX = x;
  vilain.vilainY = y;
  vilain.direction = "right";



  vilain.id = "vilain" + String(i);
  vilain.style.width = "40px";
  vilain.style.height = "40px";
  vilain.style.position = "absolute";
  vilain.style.backgroundColor = "yellow";
  vilain.style.backgroundSize = "contain";
  vilain.style.left = String(vilain.vilainX * GRID_SIZE) + "px";
  vilain.style.top = String(vilain.vilainY * GRID_SIZE) + "px";
  vilain.style.zIndex = "95";
  plateau.appendChild(vilain);



  vilainListe.push(vilain)
}


//Diamant = pièges et bonus(peut apparaitre lors de la destruction de murs)//
blockGrid[10][10].style.backgroundImage = "url(Arts/Diamond.gif)";

var frame = 0;

function loop() {
  if (frame === 60) {
    for (var i = 0; i < vilainListe.length; i++) {
      let vilain = vilainListe[i];
      let vilainX = vilain.vilainX
      let vilainY = vilain.vilainY
      let direction = vilain.direction
      blockGrid[vilainX][vilainY].traverser = true ;
      switch (direction) {
        case "left":
          if (vilainY > 0 && blockGrid[vilainX][vilainY - 1].traverser)
            vilainY--;
          break;

        case "right":

          if (vilainX < H_GRID - 1 && blockGrid[vilainX + 1][vilainY].traverser)
            vilainX++;
          break;

        case "up":
          console.log()
          if (vilainY < V_GRID - 1 && blockGrid[vilainX][vilainY + 1].traverser)

            vilainY++;
          break;

        case "down":
          if (vilainX > 0 && blockGrid[vilainX - 1][vilainY].traverser)
            vilainX--;
          break;
      }
      vilain.style.left = String(vilainX * GRID_SIZE) + 'px';
      vilain.style.top = String(vilainY * GRID_SIZE) + 'px';

      let random = random100();

      if (random < 25) {
        direction = "left";
      }

      if (random >= 25 && random < 50) {
        direction = "right";
      }

      if (random >= 50 && random < 75) {
        direction = "up";
      }

      if (random > 75) {
        direction = "down";
      }

      vilain.vilainX = vilainX
      vilain.vilainY = vilainY
      vilain.direction = direction
      blockGrid[vilainX][vilainY].traverser = false ;
    }

    frame = 0;
  }
  frame++;

  window.requestAnimationFrame(loop);

}

window.requestAnimationFrame(loop);


//Bombes//
    


document.body.onkeyup = function(e){
    if(e.keyCode === 87){
    var bombe = document.createElement('div');
    bombe.style.position = 'absolute';
    bombe.style.width = '40px';
    bombe.style.height = '40px';
    bombe.style.backgroundImage = 'url(SpriteSheet/Bombs/Bomb.gif)';    
    bombe.style.backgroundSize = "contain";
    bombe.style.display = 'flex';
    bombe.traverser = false;
    console.log(pion.offsetLeft);
    console.log(pion.offsetTop);   
    bombe.style.left = String(pion.offsetLeft) + "px";
    bombe.style.top = String(pion.offsetTop) + "px";
    plateau.appendChild(bombe);
    var audio = new Audio('Audio/TickingBomb.mp3');
    audio.play();
    setTimeout(function eclat() {
    var explofire = document.createElement('div');
    explofire.style.height = '40px';
    explofire.style.width = '40px';
    explofire.style.backgroundImage = 'url(Arts/explofire.gif)';
    explofire.style.position = 'absolute';
    explofire.style.backgroundSize = 'contain';
    explofire.style.display = 'flex';
    explofire.style.left = String(bombe.offsetLeft) + 'px';
    explofire.style.top = String(bombe.offsetTop) + 'px';        
    plateau.removeChild(bombe);
    var audio = new Audio('Audio/KaBoom.mp3');
    audio.play();
    plateau.appendChild(explofire);
    setTimeout(function afterblow(){
    var vide = document.createElement('div');    
        vide.style.height = '40px';
        vide.style.width = '40px';
        vide.style.backgroundImage = '';
        vide.style.position = 'absolute';
        vide.style.backgroundSize = 'contain';
        vide.style.display = 'flex';
        vide.style.left = String(bombe.offsetLeft) + 'px';
        vide.style.top = String(bombe.offsetTop) + 'px';
    plateau.removeChild(explofire);    
    plateau.appendChild(vide);    
    },2050);            
    },2050);
    }    
}
    

document.onkeydown = function(event){
  var event = event || window.event,
  keyCode = event.keyCode;
  switch(keyCode){
    case 38:
      if (y > 0 && blockGrid[x / GRID_SIZE][y / GRID_SIZE -1].traverser)
      y = y - GRID_SIZE; // ou y-=40;
      break;
    case 39:
      if (x < WINDOW_WIDTH && blockGrid[x / GRID_SIZE +1][y / GRID_SIZE].traverser)
      x = x + GRID_SIZE;
      break;
    case 40:
      if (y < WINDOW_HEIGHT && blockGrid[x / GRID_SIZE][y / GRID_SIZE +1].traverser)
      y = y + GRID_SIZE;
      break;
    case 37:
      if (x > 0 && blockGrid[x / GRID_SIZE -1][y / GRID_SIZE].traverser)
      x = x - GRID_SIZE;
      break;
    //touche espace pour bombe      
  }
  stylePion.left = String(x) + 'px';
  stylePion.top = String(y) + 'px';
}

function randomColor(){
  return "#" + ((1<<24)*Math.random()|0).toString(16);
}

function random100() {
  return Math.floor(Math.random() * 100);
}

//enemy

