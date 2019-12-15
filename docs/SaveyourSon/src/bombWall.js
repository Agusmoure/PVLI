export default class BombWall extends Phaser.GameObjects.Sprite{
    constructor(scene,posX,posY){
        
    
        let x=posX;
        let y=posY;
        super(scene,x,y,'bombWall');
    
        scene.add.existing(this);    
        scene.physics.add.existing(this);    
        this.body.setGravityY(-1000);    
        this.body.setImmovable(true);      
    }

    Destroy(bombX,bombY){

        if(Math.abs(this.x-bombX)<300 && Math.abs(this.y-bombY)<100){
            this.destroy();
        }
    }
}