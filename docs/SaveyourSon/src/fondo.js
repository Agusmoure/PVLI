export default class Enemy extends Phaser.GameObjects.Sprite{

    constructor(scene){
    
        let x=0;
        let y=-200;
        super(scene,x,y,'fondo');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
    Update(player){
        //this.body.gravity=0;
        this.body.setVelocityY(0);
        this.x=player.x;
        this.y=player.y-200;
    }
}