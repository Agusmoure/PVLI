import Bomba from "./bomb.js";
import GameManager from "./GameManager.js"
export default class Player extends Phaser.GameObjects.Sprite{
    ///Crea al jugador y para ello se le pasa la escena, el GM y el LVM
constructor(scene,gameManager,levelManager){
    let x=100;
    let y=100;
    super(scene,x,y,'dude');
    scene.add.existing(this);
    scene.physics.add.existing(this);
   this.lvM=levelManager;
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
}

update(){

    //En caso de que el player no esté stuneado
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
//Si el player esta stuneado, no se moverá y voy quitando tiempo de stun
    else{
        this.body.setVelocityX(0);
    this.stunTime= this.stunTime-1;
    console.log(this.stunTime);
    }

    //Controlamos que el player no se mueva demasiado rapido en ninguno de los ejes para que no haya problemas 
    //a la hora de colisionar con determinados elementos
    if(this.body.velocity.y>=this.maxSpeedY)
    this.body.velocity.y=this.maxSpeedY;
    else if(this.body.velocity.y<=-this.maxSpeedY) 
    this.body.velocity.y=-this.maxSpeedY;
}

//SETERS DE MODIFIERS
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

 //Cuando el jugador presiona el boton de moverse a la derecha
moveRight(){
    if(this.stunTime<1)
    this.body.setVelocityX(this.speedX+this.impulsoX);
    this.right=true;
    this.flipX=false;
}
//Cuando el jugador ha pulsado el botón de moverse a la izquierda
moveLeft(){
    if(this.stunTime<1)
    this.body.setVelocityX(-this.speedX+this.impulsoX);
    this.right=false;
    this.flipX=true;
}

//Metodo que se llama cuando el player es pillado por el alcaide
 dontMove(){
     if(this.sonido){
     this.body.setVelocityX(0);
     this.PlayerHit.play();
     this.sonido=false;
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

 //Metodo para saltar
moveUp(){
    if(this.stunTime<1){
    if( /*this.body.touching.down  &&*/  (this.modifier==='normal') &&  Math.abs(this.body.velocity.y)<10&&this.avalibleJump>0){   // Que la velocidad sea muy pequeña para poder saltar (parecido a que estuviese tocando el suelo)
    this.body.setVelocityY(-this.speedY);
   this.avalibleJump--;
   this.saltoSound.play();
    
}
else if(/*this.body.touching.down  &&*/  (this.modifier!=='normal' && this.modifier !=='antigravedad') &&  Math.abs(this.body.velocity.y)<10&&this.avalibleJump>0){
    this.body.setVelocityY(-this.speedY);
   this.avalibleJump--;
   this.saltoSound.play();
}
}
 
}

//Metodo que controla cuando se ha dejado de pulsar el botón de usar el modifiers para que el antigravedad no cambie la gravedad cada frame
keyUp(){
    if(this.modifier==='jetpack' || this.modifier === 'bomba' ){
       this.jetpackSound.stop();
       this.animPlaying=false;
       this.play('playerRunning');
    }
    else if(this.modifier === 'antigravedad')
    this.modifierDisponible=true;
    
}


//Le digo al level manager que he pulsado el botón de liberar presos
LiberarPresos(valor){
this.lvM.LiberarPreso(valor);
}

SetVelX(velModifier){
this.speedX=this.speedX+velModifier;
if(velModifier<0)
this.touchedSound.play();
}

//Acumulo un impulso en cada eje para cuando el jugador está cerca de las bombas y tiene que ser expulsado
Impulse(velX,velY){
    this.impulsoX=velX;
    this.impulsoY=velY;
 }

 //Me guardo el tiempo que tengo que estar en estado Stun 
 getStunned(time){
this.stunTime=time;
this.touchedSound.play();
 }

 aumentSpeed(){
     this.speedX *=4;
    }
    resetSpeed(){
        this.speedX=160;
    }
   GetVelX(){
    return this.body.velocity.x;
    }

getSpeedX(){
    return this.speedX;
}
getSpeedY(){
    return this.speedY;
}
getModifier(){
    return this.modifier;
}


//Pongo al jugador su primera posición del nivel, ajusto el modifier al primero que tenía, le digo que se renderice corriendo y le pongo la gravedad normal
//Por si fue pillado con el modifier antigravedad 
Restart(modifi){
this.x=this.oX;
this.y = this.oY;
this.modifier = modifi;
this.lvM.SetPlayerModifier(modifi);
this.anims.play('playerRunning');
this.body.setGravityY(Math.abs(this.gravity));

}

ResetJumps(){
    //Esta condición es para que solo resetee saltos en todos los casos que no sean no tocar el suelo y tocar el lado derecho o izquierdo
    if(!(!this.body.touching.down&&(this.body.touching.right||this.body.touching.left)))
    this.avalibleJump=this.maxJump;

}

}