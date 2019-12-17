import PowerUp from "./powerup.js";
export default class Antigravedad extends PowerUp{
    constructor(scene,xPos,yPos){
        
    
        let x=xPos;
        let y=yPos;
        super(scene,x,y,'antigravedadHUD');
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    }

changeModifier(){
    this.destroy(); //Importante que despues de esta linea no se vayan a ejecutar más instrucciones, sino va a petar
}

}
