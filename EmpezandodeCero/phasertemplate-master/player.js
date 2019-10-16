export default class Player extends Phaser.GameObjects.Sprite{
constructor(scene){


let x=0;
let y=0;
let aire=false;
let speedX=160;
let speedY =50;
let vehicle=false;
super(scene,x,y,'Player');



}



changeG(){
    this.body.gravity.y();
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