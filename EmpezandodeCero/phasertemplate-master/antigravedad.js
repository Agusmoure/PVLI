export default class Antigravedad extends Phaser.GameObjects.Sprite{
    constructor(scene){
        
    
        let x=300;
        let y=200;
        super(scene,x,y,'bomb');
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    }

changeModifier(){
    this.destroy(); //Importante que despues de esta linea no se vayan a ejecutar más instrucciones, sino va a petar
    //this.body.disableBody(true,true);
}

}
