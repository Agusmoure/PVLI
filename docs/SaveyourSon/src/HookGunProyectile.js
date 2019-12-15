
 export default class HookGunProyectile extends Phaser.GameObjects.Sprite{
constructor(scene,levelManager,xDirection,yDirection,xPosition,yPosition){  
    let x=xPosition;
    let y=yPosition;
    super(scene,x,y,'portalAnimation');
    this.lvM=levelManager;
    this.xSpeed=xDirection *500;
    this.ySpeed=yDirection*500;
    this.gravity=0;
    this.count=false;
    this.end=false;
    this.escena = scene;
    scene.add.existing(this);    
scene.physics.add.existing(this);      

const config = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
};
this.TPSound = scene.sound.add('Gancho',config);
}
Update(){
    if(!this.end){
    this.body.setVelocityX(this.xSpeed);
    this.body.setVelocityY(this.ySpeed);
    this.lvM.player.modifierDisponible=false;
    }
    else{
        this.body.setVelocityX(0);
    this.body.setVelocityY(0);
    }
}
Collision(){
if(!this.end){
    this.lvM.TeleportPlayer(this.body.x,this.body.y);
    this.TPSound.play();
    this.play('portalAnimation');
    this.on('animationcomplete',this.Explode,this);

    this.end=true;
}
}

Explode(){
    this.lvM.player.modifierDisponible=true;
    this.escena.NuevoProyectil();
    this.destroy();
}
 }