export default class Enemy extends Phaser.GameObjects.Sprite{

    constructor(scene,key){
    
        let x=0;
        let y=-200;
        super(scene,x,y,key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
    //metodo que situa el fondo donde esta el player
    Update(player){
        this.body.setVelocityY(0);
        this.x=player.x+50;
        this.y=player.y-200;
    }
}
