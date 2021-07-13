var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstacle;
var gameState = "play";

var score = 0;
var obstaclegroup, cloudgroup;
var trexEnd
var restart
var gameOver

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
 
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  
  trexEnd = loadImage("trex_collided.png");
  restart = loadImage("restart.png");
  gameOver = loadImage("gameOver.png");
}

function setup() {
  background(220)
  //createCanvas(600,200)
  createCanvas(windowWidth,windowHeight);

  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("ending", trexEnd);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(400,180,windowWidth,windowHeight);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /8;
  ground.velocityX = -8;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  
  trex.setCollider("circle",0,0,40)
  trex.debug = true
  
  
  
  restart1 = createSprite(50,-40,10,10);
  restart1.addAnimation("r", restart);
  restart1.scale = 1.5;
  
  gameOver1 = createSprite(50,40,10,10);
  gameOver1.addAnimation("g", gameOver);
  gameOver1.scale = 2;
  
  obstaclegroup = new Group();
  cloudgroup = new Group();
}

function draw() {
  //set background color
  background(180);
  console.log(gameState)
  if (gameState === "play"){
     score = score+Math.round(getFrameRate()/60);
     textSize(30);
     text("score "+score, 500, 10);
     
   
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -13   ;
  }

  camera.y = trex.y;
	camera.x = trex.x;
  
  
  trex.velocityY = trex.velocityY + 0.8
     if (ground.x < 0){
    ground.x = ground.width/2;
  }
     //Spawn Clouds
  spawnClouds()
  
  spawnObstacles()
  if (obstaclegroup.isTouching(trex)){
    gameState = "end";
  }
  
  restart1.visible = false;
  gameOver1.visible = false;
    
  }
  else if (gameState === "end"){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-50);
    cloudgroup.setLifetimeEach(-50);
    trex.changeAnimation("ending", trexEnd);
    restart1.visible = true;
    gameOver1.visible = true;
    text("score "+score, 500, 50);
    if(mousePressedOver(restart1)){
      reset();
    }
  }
 
  
 
  
 
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
 
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
  if (frameCount%60  === 0){
    cloud = createSprite(600,100, 40, 10);
    cloud.addImage(cloudImage);
    cloud.scale = 0.4;
    cloud.velocityX = -3
    cloud.y = Math.round(random(10,60));
    console.log(cloud.x);
    cloud.lifetime = 200;
    cloudgroup.add(cloud);
    var a=5;
    console.log(a);
  }
    
}

function spawnObstacles(){
  if(frameCount%80 === 0){
    obstacle = createSprite(600,165, 10,30);
    obstacle.velocityX = -5;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:   obstacle.addImage(o1);
                break;
      case 2: obstacle.addImage(o2);
              break;
      case 3: obstacle.addImage(o3);
              break;
      case 4: obstacle.addImage(o4);
              break;
      case 5: obstacle.addImage(o5);
              break;
      case 6: obstacle.addImage(o6);
           break;
      default:break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    obstaclegroup.add(obstacle);
    
  }
}
function reset(){
  gameState= "play";
  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
  restart1.visible=false;
  gameOver1.visible=false;
  trex.changeAnimation("running", trex_running);
  score=0;
}


