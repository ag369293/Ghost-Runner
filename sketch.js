var towerImg,tower;
var doorImg,door,doorsGroup;
var climberImg,climber,climbersGroup;
var ghostImg,ghost;
var invisibleBlockGroup,invisibleBlock;
var gameState = "PLAY";
var spookySound;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png")
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,300,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
}

function draw(){
  background(0);
  if(gameState==="PLAY")
    {
      
    
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
    
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
   if(keyDown("right_arrow")){
    ghost.x=ghost.x+3; 
   }       
  ghost.velocityY=ghost.velocityY+0.8;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState="END";
  } 
    
  
  spawnDoor();
  drawSprites();
}
  if(gameState==="END"){
   textSize(36);
    text("GameOver",230,250);
  }
}

function spawnDoor(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);
    door.addImage(doorImg);
    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    var invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=800;
    
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
