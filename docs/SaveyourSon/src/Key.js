import PowerUp from "./powerup.js";
export default class Key extends PowerUp{
    constructor(scene,xInit, yInit,levelManager){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,'key');
        scene.add.existing(this);    
    scene.physics.add.existing(this);    
    this.lvM=  levelManager;
    this.gravity*=0;
    const config = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    };
    this.pickMeSound = scene.sound.add('CojerLlave',config);
    }
    PickMe(){
        this.lvM.AddKey();
        this.pickMeSound.play();
        //gameManager.AddKeyToActuallevel();
        this.destroy(); //Importante que despues de esta linea no se vayan a ejecutar más instrucciones, sino va a petar
        //this.body.disableBody(true,true);
        }    
}