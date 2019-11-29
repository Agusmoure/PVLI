export default class MenuPowerUps extends Phaser.Scene {

    constructor() {
      super(/*{ key: 'main' }*/ 'MenuPowerUps');
    this.fuelPrice=10;
    this.speedImprovementPrice=5;
    this.speedPenalizationPrice=5;
    this.releaseDtoPrsionerPrice=6;
    }

    preload() {

        this.load.image('sky', '/SaveyourSon/assets/sky.png');
        this.load.image('botonNivel','/SaveyourSon/assets/botonNivel.png');


    }

    create(data) {
        this.gM=data;
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
    //this.scene.start('Level3', this.gM);
    this.scene.start(this.gM.GetSuperNextScene(), this.gM);


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
            if(this.gM.GetKey()>=this.speedImprovementPrice){
            this.gM.AddSpeedImprovment(1);
            console.log("before"+this.gM.GetKey()+" "+this.gM.GetSpeedImprovments());
            this.gM.AddKeys(-this.speedImprovementPrice);
            console.log("after"+this.gM.GetKey());
            }

        }
        this.mouseClick=true;
        });
        
        this.botonLLaves.on('pointerup',pointer => {
            this.mouseClick=false;
            });
        
        
        }
    
}