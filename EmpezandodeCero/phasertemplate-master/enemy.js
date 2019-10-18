export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene,jugador){
    
        let x=100;
        let y=100;
        super(scene,x,y,'dude');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    this.body.setCollideWorldBounds(true);
    this.aire=false;
    this.vehicle=false;
    this.modifier='normal';
    this.speedY=60;
    this.speedX=100;
    this.player=jugador;
    }

    followPlayer(){

        this.body.setVelocityX((Math.abs(this.player.x-this.x))/(this.player.x-this.x)*this.speedX);
    }
}