import Bomba from "./bomb.js";
import GameManager from "./GameManager.js"
export default class Player extends Phaser.GameObjects.Sprite{
    ///Crea al jugador y para ello se le pasa la escena, el GM y el LVM
constructor(scene,gameManager,levelManager){

    let x=15900;
    let y=100;
    super(scene,x,y,'dude');
    scene.add.existing(this);
    scene.physics.add.existing(this);
   // this.gm=gameManager;
   this.lvM=levelManager;
//this.body.setCollideWorldBounds(true);
this.vehicle=false;
this.modifier='normal';
this.modifierDisponible=true;
//500 es la potencia equilibrada sin el fallo de la bomba y 900 tras salir de ella
this.speedY=900;
this.maxSpeedY=1000;
this.speedImprovment=10;
this.speedX=150;
this.stunTime=0;
this.defaultSpeed=75+(gameManager.GetSpeedImprovments()*this.speedImprovment);
this.speedX=this.defaultSpeed*2;
this.right = true;
this.gravity=2000;
this.fuel = 1000;
this.maxFuel=1000;
this.impulsoX=0;
this.impulsoY=0;
this.anims.play('playerRunning');
this.escena = scene;
this.maxJump=2;
this.avalibleJump=this.maxJump;
this.sonido=true;

const config = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
};
this.PlayerHit = scene.sound.add('PlayerHit',config);
//levelManager.SetPlayerModifier('normal');
}

update(){
    console.log(this.modifier+"");

    if(this.stunTime<1){
if(this.right)
this.body.setVelocityX(this.defaultSpeed+this.impulsoX);
else
this.body.setVelocityX(-this.defaultSpeed+this.impulsoX);
if( this.modifier==='jetpack' && this.fuel<this.maxFuel && this.body.touching.down){
this.fuel+=10;
}
 if(this.modifier==='jetpack' && !this.modifierDisponible &&  this.fuel>=this.maxFuel){
this.fuel=this.maxFuel;
this.modifierDisponible=true;
}

if(Math.abs(this.impulsoY)>0){
if(this.impulsoY>0)
    this.impulsoY=this.impulsoY-10;
    else
    this.impulsoY=this.impulsoY+10;
}

if(Math.abs(this.impulsoX)>0){
    if(this.impulsoX>0)
    this.impulsoX=this.impulsoX-10;
    else
    this.impulsoX=this.impulsoX+10;
}

 }
    else{
        this.body.setVelocityX(0);
    this.stunTime= this.stunTime-1;
    console.log(this.stunTime);
    }
    if(this.body.velocity.y>=this.maxSpeedY)this.body.velocity.y=this.maxSpeedY;
    else if(this.body.velocity.y<=-this.maxSpeedY) this.body.velocity.y=-this.maxSpeedY;
}
//SETERS
changeModifierNormal(){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifier='normal';
    this.modifierDisponible=true;
    this.lvM.SetPlayerModifier('normal');
}
changeModifierJetPack(){
    this.body.setGravityY(Math.abs(this.gravity));
   this.modifier='jetpack';
   this.modifierDisponible=true;
   this.lvM.SetPlayerModifier('jetpack');
}
changeModifierAntigravedad(){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifier='antigravedad';
    this.modifierDisponible=true;
    this.lvM.SetPlayerModifier('antigravedad');
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
    this.lvM.SetPlayerModifier('gancho');
 }

 changeModifierBomba(bomba){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifier='bomba';
    this.modifierDisponible=true;
    this.bomba=bomba;
    this.lvM.SetPlayerModifier('bomba');
 }

 
moveRight(){
    if(this.stunTime<1)
    this.body.setVelocityX(this.speedX+this.impulsoX);
    this.right=true;
    this.flipX=false;


}
moveLeft(){
    if(this.stunTime<1)
    this.body.setVelocityX(-this.speedX+this.impulsoX);
    this.right=false;
    this.flipX=true;

}

 dontMove(){
     if(this.sonido){
     this.body.setVelocityX(0);
     this.speedX=0;
     this.defaultSpeed=0;
     this.PlayerHit.play();
     this.sonido=false;
     this.anims.stop();
     }
 }
moveUp(){
    if(this.stunTime<1){
    if( /*this.body.touching.down  &&*/  this.modifier=='normal' &&  Math.abs(this.body.velocity.y)<10&&this.avalibleJump>0){   // Que la velocidad sea muy pequeña para poder saltar (parecido a que estuviese tocando el suelo)
    this.body.setVelocityY(-this.speedY);
   this.avalibleJump--;
    //this.lvM.LiberarPreso(true);
}
    else if(this.modifier==='jetpack' && this.modifierDisponible){
        this.body.setVelocityY(-100);
        if( this.fuel >0)
        this.fuel -=10;
        else{
        this.modifierDisponible=false;
        }
        console.log(this.fuel);
    }
    else if(this.modifier === 'antigravedad' && this.modifierDisponible){
        this.gravity*=-1;
        this.modifierDisponible=false;
        this.body.setGravityY(this.gravity);
        this.body.setVelocityY(0);
    }

    else if(this.modifier === 'bomba' && this.modifierDisponible){
        this.lvM.SetBomba(this.bomba);
        console.log(this.bomba);
        this.modifier='normal';
        this.lvM.SetPlayerModifier('normal');
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
    this.modifier='normal';
   
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
ResetJumps(){
    //la condicion no funca
    //Esta condición es para que solo resetee saltos en todos los casos que no sean no tocar el suelo y tocar el lado derecho o izquierdo
    if(!(!this.body.touching.down&&(this.body.touching.right||this.body.touching.left)))
    this.avalibleJump=this.maxJump;

}

}