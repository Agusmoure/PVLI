export default class Player extends Phaser.GameObjects.Sprite{
constructor(scene){

    let x=100;
    let y=100;
    super(scene,x,y,'player');
this.aire=false;
this.vehicle=false;
this.speedX=160;
this.modifier='normal';
this.speedY=60;
this.sprite = undefined;
//this.changeModifier();
}

changeModifier(){

    //this.speedY = 1000;

}
moveRight(){
    this.sprite.setVelocityX(this.speedX);
}
moveLeft(){
    this.sprite.setVelocityX(-this.speedX);
}
dontMove(){
    this.sprite.setVelocityX(0);
}
moveUp(){
    if(this.modifier=='normal')
    this.sprite.setVelocityY(-this.speedY);
    else if(this.modifier=='jetpack')
    this.sprite.setVelocityY(-500);
 
}
changeG(){
    this.sprite.body.gravity.y();
}
aumentSpeed(){
    speedX *=4;
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