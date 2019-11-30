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
        this.load.image('botonCompra','/SaveyourSon/assets/boton_Compra_verde.png');
        this.load.image('botonMejora','/SaveyourSon/assets/Mejoras_Verde.png');
       // this.load.image('nextLevel','');
        this.load.bitmapFont('font', '/SaveyourSon/assets/carrier_command.png', '/SaveyourSon/assets/carrier_command.xml');      


    }

    create(data) {
        this.gM=data;
        this.mouseClick=false;
        this.add.image(10, 10, 'sky').setScale(3.5);
        this.Mejora = this.add.sprite(470,300,'botonMejora');
        this.Mejora.setScale(0.25);
        this.buttonSpeedImprovement = this.add.sprite(850,296,'botonCompra').setInteractive();
        this.buttonSpeedImprovement.setScale(0.115);
        this.Mejora2 = this.add.sprite(470,500,'botonMejora');
        this.Mejora2.setScale(0.25);
        this.buttonSpeedPenalization = this.add.sprite(850,496,'botonCompra').setInteractive();
        this.buttonSpeedPenalization.setScale(0.115);
        this.Mejora3 = this.add.sprite(470,700,'botonMejora');
        this.Mejora3.setScale(0.25);
        this.buttonfuel= this.add.sprite(850,696,'botonCompra').setInteractive();
        this.buttonfuel.setScale(0.115);
        this.add.bitmapText(721, 285, 'font', 'comprar');
        this.add.bitmapText(721, 485, 'font', 'comprar');
        this.add.bitmapText(721, 685, 'font', 'comprar');
        this.add.bitmapText(290, 285, 'font', 'mas velocidad').setScale(0.5);
        this.add.bitmapText(290, 485, 'font', 'Alcaide mas\n\n   lento').setScale(0.5);
        this.add.bitmapText(290, 685, 'font', 'Mejora Jetpack').setScale(0.5);
       // this.nextLevel = this.add.sprite(850,296,'nextLevel').setInteractive();

    }


    update(time, delta) {

        
this.Mejora.on('pointerdown',pointer => {
if(!this.mouseClick){
    //this.scene.start('Level3', this.gM);
    this.scene.start(this.gM.GetSuperNextScene(), this.gM);


}
this.mouseClick=true;
});

this.Mejora.on('pointerup',pointer => {
    if(this.mouseClick){
        console.log('adios');
    }
    this.mouseClick=false;
    });


    this.buttonSpeedImprovement.on('pointerdown',pointer => {
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
        
        this.buttonSpeedImprovement.on('pointerup',pointer => {
            this.mouseClick=false;
            });
        
        
        }
    
}
