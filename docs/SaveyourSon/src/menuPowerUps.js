export default class MenuPowerUps extends Phaser.Scene {

    constructor(gamemanager) {
      super(/*{ key: 'main' }*/ 'MenuPowerUps');
      //this.gameOver=false;
      this.gM= gamemanager;
      //this.lvM = new LevelManager();
    }


    preload() {

        this.load.image('sky', '/SaveyourSon/assets/sky.png');
        this.load.image('botonNivel','/SaveyourSon/assets/botonNivel.png');


    }

    create() {

        this.mouseClick=false;
        this.add.image(10, 10, 'sky').setScale(3.5);
        this.botonNivel = this.add.sprite(400,300,'botonNivel').setInteractive();
        this.botonNivel.setScale(0.5);
        this.botonLLaves = this.add.sprite(800,300,'botonNivel').setInteractive();
        this.botonLLaves.setScale(0.5);

    }


    update(time, delta) {

        
this.botonNivel.on('pointerdown',pointer => {
if(!this.mouseClick){
    this.scene.start('Level1', this.gM);

}
this.mouseClick=true;
});

this.botonNivel.on('pointerup',pointer => {
    if(this.mouseClick){
        console.log('adios');
    }
    this.mouseClick=false;
    });


    this.botonLLaves.on('pointerdown',pointer => {
        if(!this.mouseClick){
            this.gM.AddSpeedImprovment(10);
        }
        this.mouseClick=true;
        });
        
        this.botonLLaves.on('pointerup',pointer => {
            this.mouseClick=false;
            });
        
        
        }
    
}
