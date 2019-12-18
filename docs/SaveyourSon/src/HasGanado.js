export default class HasGanado extends Phaser.Scene {
//Escena que sale al finalizar el juego
    constructor() {
      super( 'HasGanado');
    }
    preload(){
        this.load.image('menu','./SaveyourSon/assets/Menu.jpg');
        this.load.bitmapFont('font', './SaveyourSon/assets/carrier_command.png', './SaveyourSon/assets/carrier_command.xml');      
    }
    create(data){
      this.gM=data;
    this.add.image(350, 350, 'menu').setScale(2);
    this.add.bitmapText(50, 500, 'font', 'Has Ganado').setScale(3);
    this.pointer = this.input.activePointer;
    }

    update(){
      this.input.on('pointerdown',pointer=>{

        this.gM.scene--;
        this.scene.start(this.gM.GetSuperNextScene(),this.gM);
      });
    }
    }