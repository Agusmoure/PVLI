export default class MovableWall extends Phaser.GameObjects.Sprite{
    constructor(scene,xInit, xEnd,yInit,yEnd){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,'ground');
        scene.add.existing(this);    
        scene.physics.add.existing(this);    
        this.body.setGravityY(-1000);
        this.body.setImmovable(true); 
        this.body.setBounce(0);
         this.startX=xInit;
         this.finalX=xEnd;
         this.startY=yInit;
         this.finalY=yEnd;
         this.velX=100;
         this.velY=0;
    }

    Update(){
if(this.x<=this.finalX && this.x>=this.startX)
this.body.setVelocityX(this.velX);

else{
    if(this.x>this.startX)
    this.velX=Math.abs(this.velX)*-1;
    else
    this.velX=Math.abs(this.velX);
    this.body.setVelocityX(this.velX);    
}

if(this.y<=this.finalY && this.y>=this.startY)
this.body.setVelocityY(this.velY);

else{
    if(this.y>this.startY)
    this.velY=Math.abs(this.velY)*-1;
    else
    this.velY=Math.abs(this.velY);
    this.body.setVelocityY(this.velY);    
}

}    
}