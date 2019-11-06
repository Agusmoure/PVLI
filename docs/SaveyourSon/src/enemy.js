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
    this.stunTime=0;
    this.speedY=100;
    this.speedX=130-(gameManager.GetSpeedPenalizations()*this.penalization);
    this.player=jugador;
    }

    followPlayer(){

        if(this.stunTime<1){
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
        else{
            this.body.setVelocityX(0);
            this.stunTime=this.stunTime-1;
            
        }
       
    }
    Stun(){
        this.speedX=0;
    }
    Recover(){
        this.speedX=130;
    }
    getStunned(time){
this.stunTime=time;
    }
    Update(stuned, recover){
        this.followPlayer();
        if(stuned)
        this.Stun();
        if(recover)
        this.Recover(); 

    }
}