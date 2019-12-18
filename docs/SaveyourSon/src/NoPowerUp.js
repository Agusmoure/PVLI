import PowerUp from "./powerup.js";
export default class NoPowerUp extends PowerUp{
    constructor(scene,xInit, yInit,levelManager){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,'hitboxExtra');
        scene.add.existing(this);    
    scene.physics.add.existing(this);    
    this.lvM=  levelManager;
    this.gravity*=0;
    this.oX = xInit;
    this.oY = yInit;
    const config = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    };
    this.pickUpItem = scene.sound.add('PickUpItem',config);
    }
    preUpdate(time, delta){
        this.body.setVelocityY(0);
        //Evito que se mueva
this.x=this.oX;
this.y = this.oY;
    }
    PickMe(){
        this.pickUpItem.play();
        this.destroy();
        }    
}