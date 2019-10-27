export default class PowerUp extends Phaser.GameObjects.Sprite{
    constructor(scene,xInit, yInit, type){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,type);
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    }
    PickMe(/*gameManager*/){
        //gameManager.AddKeyToActuallevel();
        this.destroy(); //Importante que despues de esta linea no se vayan a ejecutar más instrucciones, sino va a petar
        //this.body.disableBody(true,true);
       // super.disableBody(true, true);
        }    
}