export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene,jugador,gameManager){
    
        let x=0;
        let y=0;
        super(scene,x,y,'dude');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    this.body.setCollideWorldBounds(true);
    this.aire=false;
    this.vehicle=false;
    this.modifier='normal';
    this.penalization=10;
    this.speedY=100;
    this.speedX=130-(gameManager.GetSpeedPenalizations()*this.penalization);
    this.player=jugador;
    }

    followPlayer(){

        if(this.player.x<this.x)
        this.body.setVelocityX(-this.speedX);
        else
        this.body.setVelocityX(this.speedX);
        if(this.player.y<this.y)
        this.body.setVelocityY(-this.speedY);
        else
        this.body.setVelocityY(this.speedY);

        // this.body.setVelocityX(this.speedX);
        // this.body.setVelocityX((Math.abs(this.player.x-this.x))/(this.player.x-this.x)*this.speedX);
        // this.body.setVelocityY((Math.abs(this.player.y-this.y))/(this.player.y-this.y)*this.speedY);
       //this.body.setVelocityX((this.player.x-this.x));
       
    }
    Stun(){
        this.speedX=0;
    }
    Recover(){
        this.speedX=130;
    }
    Update(stuned, recover){
        this.followPlayer();
        if(stuned)
        this.Stun();
        if(recover)
        this.Recover(); 

    }
}