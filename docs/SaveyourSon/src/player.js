import Bomba from "./bomb.js";
import GameManager from "./GameManager.js"
export default class Player extends Phaser.GameObjects.Sprite{
constructor(scene,gameManager,levelManager){

    let x=100;
    let y=150;
    super(scene,x,y,'dude');
    scene.add.existing(this);
    scene.physics.add.existing(this);
   // this.gm=gameManager;
   this.lvM=levelManager;
this.body.setCollideWorldBounds(true);
this.vehicle=false;
this.modifier='normal';
this.modifierDisponible=true;
this.speedY=800;
this.maxSpeedY=800;
this.speedImprovment=10;
this.speedX=150;
this.stunTime=0;
this.defaultSpeed=75;//+(gameManager.GetSpeedImprovments()*this.speedImprovment);
this.speedX=this.defaultSpeed*2;
this.right = true;
this.gravity=2000;
this.fuel = 1000;
this.maxFuel=1000;
this.impulsoX=0;
this.impulsoY=0;

this.escena = scene;
}

update(){
    if(this.stunTime<1){
if(this.right)
this.body.setVelocityX(this.defaultSpeed+this.impulsoX);
else
this.body.setVelocityX(-this.defaultSpeed+this.impulsoX);
if( this.modifier==='jetpack' && this.fuel<this.maxFuel && Math.abs(this.body.velocity.y)<10){
this.fuel+=10;
}
 if(this.modifier==='jetpack' && !this.modifierDisponible &&  this.fuel>=this.maxFuel){
this.fuel=this.maxFuel;
this.modifierDisponible=true;
}

if(this.impulsoY>0)
this.impulsoY=this.impulsoY-10;

if(this.impulsoX>0)
this.impulsoX=this.impulsoX-10;
 }
    else{
        this.body.setVelocityX(0);
    this.stunTime= this.stunTime-1;
    console.log(this.stunTime);
    }




}
//SETERS
changeModifierNormal(){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifier='normal';
    this.modifierDisponible=true;
}
changeModifierJetPack(){
    this.body.setGravityY(Math.abs(this.gravity));
   this.modifier='jetpack';
   this.modifierDisponible=true;
}
changeModifierAntigravedad(){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifier='antigravedad';
    this.modifierDisponible=true;
 }
 changeModifierCatapulta(){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifier='catapulta';
    this.modifierDisponible=true;
 }
 changeModifierGancho(){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifier='gancho';
    this.modifierDisponible=true;
 }

 changeModifierBomba(bomba){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifier='bomba';
    this.modifierDisponible=true;
    this.bomba=bomba;
 }

 
moveRight(){
    if(this.stunTime<1)
    this.body.setVelocityX(this.speedX+this.impulsoX);
    this.right=true;

}
moveLeft(){
    if(this.stunTime<1)
    this.body.setVelocityX(-this.speedX+this.impulsoX);
    this.right=false;
}

 dontMove(){
     this.body.setVelocityX(0);
 }
moveUp(){
    if(this.stunTime<1){
    if( this.body.touching.down  &&  this.modifier=='normal' &&  Math.abs(this.body.velocity.y)<10){   // Que la velocidad sea muy pequeña para poder saltar (parecido a que estuviese tocando el suelo)
    this.body.setVelocityY(-this.speedY);
    //this.lvM.LiberarPreso(true);
}
    else if(this.modifier==='jetpack' && this.modifierDisponible){
        this.body.setVelocityY(-100);
        if( this.fuel >0)
        this.fuel -=10;
        else{
        this.modifierDisponible=false;
        }
    }
    else if(this.modifier === 'antigravedad' && this.modifierDisponible){
        this.gravity*=-1;
        this.modifierDisponible=false;
        this.body.setGravityY(this.gravity);
        this.body.setVelocityY(0);
    }

    else if(this.modifier === 'bomba' && this.modifierDisponible){
        this.lvM.SetBomba();
        this.modifier='normal';
    }
}
 
}

keyUp(){
    if(this.modifier==='jetpack'){
       
    }
    else if(this.modifier === 'antigravedad')
    this.modifierDisponible=true;
    
}

LiberarPresos(valor){
this.lvM.LiberarPreso(valor);
}

SetVelX(velModifier){
this.speedX=this.speedX+velModifier;
}
Impulse(velX,velY){
    this.impulsoX=velX;
    this.impulsoY=velY;
   
 }
 getStunned(time){
     console.log('ikb   wñujfb2cbvfeuiñvbeºvbkki3ebcki3ºbefik3ºbecfkj3ebiº´kj3ebvcki');
this.stunTime=time;
 }
GetVelX(){
    return this.body.velocity.x;
}
changeG(){
    this.body.gravity.y();
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