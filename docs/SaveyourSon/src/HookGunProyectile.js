
 export default class HookGunProyectile extends Phaser.GameObjects.Sprite{
constructor(scene,levelManager,xDirection,yDirection,xPosition,yPosition){  
    let x=xPosition;
    let y=yPosition;
    super(scene,x,y,'HookGunProyectile');
    this.lvM=levelManager;
    this.xSpeed=xDirection;
    this.ySpeed=yDirection;
    this.gravity=0;
    scene.add.existing(this);    
scene.physics.add.existing(this);      
}
Update(){
    this.body.setVelocityX(this.xSpeed);
    this.body.setVelocityY(this.ySpeed);
}
Collision(){
    console.log("OwO");

    this.lvM.TeleportPlayer(this.body.x,this.body.y);
    this.destroy();
}
 }