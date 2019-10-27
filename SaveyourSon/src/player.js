import Bomba from "./bomb.js";
export default class Player extends Phaser.GameObjects.Sprite{
constructor(scene){

    let x=100;
    let y=100;
    super(scene,x,y,'dude');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
this.body.setCollideWorldBounds(true);
this.vehicle=false;
this.modifier='normal';
this.modifierDisponible=true;
this.speedY=800;
this.maxSpeedY=800;
this.speedX=150;
this.defaultSpeed=75;
this.right = true;
this.gravity=2000;
this.fuel = 1000;
this.maxFuel=1000;
this.escena = scene;
this.bomba = undefined;
}

update(){
if(this.right)
this.body.setVelocityX(this.defaultSpeed);
else
this.body.setVelocityX(-this.defaultSpeed);

if( this.modifier==='jetpack' && this.fuel<this.maxFuel && Math.abs(this.body.velocity.y)<10){
this.fuel+=10;
console.log(this.fuel);
}
 if(this.modifier==='jetpack' && !this.modifierDisponible &&  this.fuel>=this.maxFuel){
this.fuel=this.maxFuel;
this.modifierDisponible=true;
console.log("verdad");
}

if(this.modifier === 'bomba'&& this.bomba !==undefined){
    this.bomba.Update(this.x,this.y);
}
else if(this.modifier === 'bomba'&& this.bomba ===undefined){
    this.modifier='normal';
}
//if(this.modifier==='jetpack' && !this.modifierDisponible)




}
//SETERS
changeModifierNormal(){
    this.modifier='normal';
    this.modifierDisponible=true;
}
changeModifierJetPack(){
   this.modifier='jetpack';
   this.modifierDisponible=true;
}
changeModifierAntigravedad(){
    this.modifier='antigravedad';
    this.modifierDisponible=true;
 }
 changeModifierCatapulta(){
    this.modifier='catapulta';
    this.modifierDisponible=true;
 }
 changeModifierGancho(){
    this.modifier='gancho';
    this.modifierDisponible=true;
 }

 changeModifierBomba(bomba){
    this.modifier='bomba';
    this.modifierDisponible=true;
    this.bomba=bomba;
 }

 
moveRight(){
    this.body.setVelocityX(this.speedX);
    this.right=true;
}
moveLeft(){
    this.body.setVelocityX(-this.speedX);
    this.right=false;
}

 dontMove(){
     this.body.setVelocityX(0);
 }
moveUp(){
    if( this.body.touching.down  &&  this.modifier=='normal' &&  Math.abs(this.body.velocity.y)<10){   // Que la velocidad sea muy pequeña para poder saltar (parecido a que estuviese tocando el suelo)
    this.body.setVelocityY(-this.speedY);}
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
        //this.bomba= new Bomba(this.escena,this.x,this.y,true).setScale(0.10);
       this.bomba.Lanzamiento(this.right);
        //this.modifier='normal';


    }
 
}

keyUp(){
    if(this.modifier==='jetpack'){
       
    }
    else if(this.modifier === 'antigravedad')
    this.modifierDisponible=true;
}

caught(){
    
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