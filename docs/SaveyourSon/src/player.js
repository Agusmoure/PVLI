import Bomba from "./bomb.js";
import GameManager from "./GameManager.js"
export default class Player extends Phaser.GameObjects.Sprite{
    ///Crea al jugador y para ello se le pasa la escena, el GM y el LVM
constructor(scene,gameManager,levelManager){
    let x=500;
    let y=0;
    super(scene,x,y,'dude');
    scene.add.existing(this);
    scene.physics.add.existing(this);
   // this.gm=gameManager;
   this.lvM=levelManager;
//this.body.setCollideWorldBounds(true);
this.vehicle=false;
this.modifier='normal';
this.modifierAUX='normal';
this.modifierDisponible=true;
//500 es la potencia equilibrada sin el fallo de la bomba y 900 tras salir de ella
this.speedY=950;
this.maxSpeedY=1000;
this.speedImprovment=10;
this.speedX=400;
this.stunTime=0;
this.defaultSpeed=100+(gameManager.GetSpeedImprovments()*this.speedImprovment);
this.speedX=this.defaultSpeed*3;
this.right = true;
this.gravity=2000;
this.fuel = 1000;
this.maxFuel=1000;
this.impulsoX=0;
this.impulsoY=0;
this.anims.play('playerRunning');
this.animPlaying =false;
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
this.AntigravedadSound = scene.sound.add('Antigravedad',config);
this.saltoSound =scene.sound.add('Salto',config);
this.touchedSound = scene.sound.add('PlayerTouched',config);
this.jetpackSound = scene.sound.add('Jetpack',config);
this.noFuel = scene.sound.add('JetpackNoFuel',config);
this.pickUpItem = scene.sound.add('PickUpItem',config);
//levelManager.SetPlayerModifier('normal');
}

update(){
    console.log(this.modifier+"");

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
    this.pickUpItem.play();
}
changeModifierJetPack(){
    this.body.setGravityY(Math.abs(this.gravity));
   this.modifier='jetpack';
   this.modifierDisponible=true;
   this.lvM.SetPlayerModifier('jetpack');
   this.pickUpItem.play();
}
changeModifierAntigravedad(){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifier='antigravedad';
    this.modifierDisponible=true;
    this.lvM.SetPlayerModifier('antigravedad');
    this.pickUpItem.play();
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
    this.pickUpItem.play();
 }

 changeModifierBomba(bomba){
    this.body.setGravityY(Math.abs(this.gravity));
    this.modifierAUX=this.modifier;
    this.modifier='bomba';
    this.modifierDisponible=true;
    this.bomba=bomba;
    this.lvM.SetPlayerModifier('bomba');
    this.pickUpItem.play();
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
    //  this.speedX=0;
    //  this.defaultSpeed=0;
     this.PlayerHit.play();
     this.sonido=false;
    // this.anims.stop();
     }
 }
 useGadget(){
     if(this.stunTime<1){
    if(this.modifier==='jetpack' && this.modifierDisponible){
        this.body.setVelocityY(-250);
        if( this.fuel >0){
            if(!this.animPlaying)
            this.play('playerFlying');
        this.fuel -=10;
        if(!this.jetpackSound.isPlaying)
        this.jetpackSound.play()
        }
        else{
            if(this.jetpackSound.isPlaying)
            this.jetpackSound.stop();
        this.modifierDisponible=false;
        }
        console.log(this.fuel);
    }
    else  if(this.modifier==='jetpack' && !this.modifierDisponible && !this.noFuel.isPlaying)
    this.noFuel.play();
    else if(this.modifier === 'antigravedad' && this.modifierDisponible){
        if(this.flipY)
        this.flipY=false;
        else
        this.flipY=true;
        this.gravity*=-1;
        this.modifierDisponible=false;
        this.body.setGravityY(this.gravity);
        this.body.setVelocityY(0);
        this.AntigravedadSound.play();
    }

    else if(this.modifier === 'bomba' && this.modifierDisponible){
        this.lvM.SetBomba(this.bomba);
        console.log(this.bomba);
        this.modifier=this.modifierAUX;
        this.lvM.SetPlayerModifier(this.modifierAUX);
    }
}
 }
moveUp(){
    if(this.stunTime<1){
    if( /*this.body.touching.down  &&*/  (this.modifier==='normal') &&  Math.abs(this.body.velocity.y)<10&&this.avalibleJump>0){   // Que la velocidad sea muy pequeña para poder saltar (parecido a que estuviese tocando el suelo)
    this.body.setVelocityY(-this.speedY);
   this.avalibleJump--;
   this.saltoSound.play();
    //this.lvM.LiberarPreso(true);
    
}
else if(/*this.body.touching.down  &&*/  (this.modifier!=='normal' && this.modifier !=='antigravedad') &&  Math.abs(this.body.velocity.y)<10&&this.avalibleJump>0){
    this.body.setVelocityY(-this.speedY);
   this.avalibleJump--;
   this.saltoSound.play();
}
}
 
}

keyUp(){
    if(this.modifier==='jetpack' || this.modifier === 'bomba' ){
       this.jetpackSound.stop();
       this.animPlaying=false;
       this.play('playerRunning');
    }
    else if(this.modifier === 'antigravedad')
    this.modifierDisponible=true;
    
}

LiberarPresos(valor){
this.lvM.LiberarPreso(valor);
}

SetVelX(velModifier){
this.speedX=this.speedX+velModifier;
if(velModifier<0)
this.touchedSound.play();
}
Impulse(velX,velY){
    this.impulsoX=velX;
    this.impulsoY=velY;
   
 }
 getStunned(time){
this.stunTime=time;
this.touchedSound.play();
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

Restart(modifi){
this.x=this.oX;
this.y = this.oY;
this.modifier = modifi;
this.lvM.SetPlayerModifier(modifi);
this.anims.play('playerRunning');

}

ResetJumps(){
    //la condicion no funca
    //Esta condición es para que solo resetee saltos en todos los casos que no sean no tocar el suelo y tocar el lado derecho o izquierdo
    if(!(!this.body.touching.down&&(this.body.touching.right||this.body.touching.left)))
    this.avalibleJump=this.maxJump;

}

}