export default class HookGun{
constructor(scene,levelManager){  
    let x=0;
    let y=0;
    super(scene,x,y,'HookGunProyectile');
    this.lvM=levelManager;
    this.xSpeed=0;
    this.ySpeed=0;
    scene.add.existing(this);    
scene.physics.add.existing(this);      
}
Shoot(mouseclickX,mouseclickY){
    if(this.picked){
        this.xSpeed=50*Math.cos((Math.abs(mouseclickX)/mouseclickX)*Math.sqrt(Math.pow(mouseclickX-this.x)+Math.pow(mouseclickY-this.y)/mouseclickX-this.x));
        this.ySpeed=50*Math.cos((Math.abs(mouseclickY)/mouseclickY)*Math.sqrt(Math.pow(mouseclickX-this.x)+Math.pow(mouseclickY-this.y)/mouseclickY-this.y));
    }
}
Update(){
    this.body.setVelocityX(this.xSpeed);
    this.body.setVelocityY(this.ySpeed);
}
}