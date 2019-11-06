import PowerUp from "./powerup.js";
export default class Key extends PowerUp{
    constructor(scene,xInit, yInit,levelManager){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,'key');
        scene.add.existing(this);    
    scene.physics.add.existing(this);    
    this.lvM=  levelManager;
    }
    PickMe(){
        this.lvM.AddKey();
        //gameManager.AddKeyToActuallevel();
        this.destroy(); //Importante que despues de esta linea no se vayan a ejecutar más instrucciones, sino va a petar
        //this.body.disableBody(true,true);
        }    
}