export default class Player extends Phaser.GameObjects.Sprite{
constructor(scene){

    let x=100;
    let y=100;
    super(scene,x,y,'dude');
    scene.add.existing(this);
    
    scene.physics.add.existing(this);
    
this.body.setCollideWorldBounds(true);
this.aire=false;
this.vehicle=false;
this.modifier='normal';
this.speedY=60;
this.speedX=150;
}

changeModifier(){

    console.log(this.modifier);
   this.modifier='jetpack';
   console.log(this.modifier);
}
moveRight(){
    this.body.setVelocityX(this.speedX);
}
moveLeft(){
    this.body.setVelocityX(-this.speedX);
}
dontMove(){
    this.body.setVelocityX(0);
}
moveUp(){
    if(this.modifier==='normal')
    this.body.setVelocityY(-this.speedY);
    else if(this.modifier==='jetpack')
    this.body.setVelocityY(-500);
 
}
changeG(){
    this.body.gravity.y();
}
aumentSpeed(){
   // speedX *=4;
    // this.setVX(this.velx * 4)
}
resetSpeed(){
    speedX=160;
}
getSpeedX(){
    return speedX;
}
getSpeedY(){
    return speedY;
}
setVehicle(haveVehicle){
    vehicle=haveVehicle;
}
getVehicle(){
    return vehicle;
}

}