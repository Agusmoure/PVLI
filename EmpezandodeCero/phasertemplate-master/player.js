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

changeModifier(newModifier){

    //this.speedY = 1000;
    if(this.modifier=="normal"){
this.modifier=newModifier;
    }
    else this.modifier="normal";

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
    this.speedX *=4;
}
resetSpeed(){
    this.speedX=160;
}
getSpeedX(){
    return this.speedX;
}
getSpeedY(){
    return this.speedY;
}
setVehicle(haveVehicle){
    this.vehicle=haveVehicle;
}
getVehicle(){
    return this.vehicle;
}

getModifier(){
    return this.modifier;
}

}