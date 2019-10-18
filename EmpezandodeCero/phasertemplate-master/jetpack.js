export default class JetPack extends Phaser.GameObjects.Sprite{
    constructor(scene){
        
    
        let x=200;
        let y=200;
        super(scene,x,y,'star');
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    }

changeModifier(){


this.body.setVelocityY(-100);
//this.body.disableBody(true,true);
}


}