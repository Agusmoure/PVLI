export default class PowerUp extends Phaser.GameObjects.Sprite{
    constructor(scene,xInit, yInit, type){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,type);
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    }
    PickMe(){
        this.destroy();
        }    
}