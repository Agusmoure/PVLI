export default class Key extends Phaser.GameObjects.Sprite{
    constructor(scene,xInit, yInit){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,'key');
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    }
    PickMe(/*gameManager*/){
        //gameManager.AddKeyToActuallevel();
        this.destroy(); //Importante que despues de esta linea no se vayan a ejecutar más instrucciones, sino va a petar
        //this.body.disableBody(true,true);
        }    
}