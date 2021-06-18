var balloonImg, balloon,bgImg,bg;
var position, database;

function preload(){
  bgImg = loadImage("images/HotAirBallon-01.png");
  balloonImg = loadImage("images/HotAirBallon-02.png");
}

function setup(){
    database = firebase.database();
    createCanvas(1200,600);
    
    

    bg = createSprite(0,0,1200,600);
    bg.addImage(bgImg);
    

    balloon = createSprite(250,600,10,10);
    balloon.addImage(balloonImg);
    balloon.scale=0.5;

    var ballPosition = database.ref('balloon/position');
    ballPosition.on("value",readPosition,showError);
}

function draw(){
  background.velocityX = -3;
  if(background.x < 0){
    background.x = background.width/2;
  }
    

    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-10,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(10,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-10);
            balloon.scale -= 0.005;
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+10);
            balloon.scale += 0.005;
        }
    
    drawSprites();
    }
}

function writePosition(x,y){
    database.ref("balloon/position").set(
        { 
            'x':position.x+x,
            'y':position.y+y
        }
    )
}
function readPosition(data){
    position = data.val();
    console.log(position);
    balloon.x=position.x;
    balloon.y=position.y;
}
function showError(){
    console.log("error");    
}
