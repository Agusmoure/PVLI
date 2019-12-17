import PowerUp from "./powerup.js";
export default class JetPack extends PowerUp{
    constructor(scene,xPos,yPos){
        
    
        let x=xPos;
        let y=yPos;
        super(scene,x,y,'jetpackHUD');
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    }

changeModifier(){

this.destroy(); //Importante que despues de esta linea no se vayan a ejecutar más instrucciones, sino va a petar
//this.body.disableBody(true,true);
}


}