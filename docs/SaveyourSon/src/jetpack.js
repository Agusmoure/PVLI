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
    this.PickMe();
}


}