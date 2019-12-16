export default class HasPerdido extends Phaser.Scene {

    constructor() {
      super(/*{ key: 'main' }*/ 'HasPerdido');
    }
    preload(){
        this.load.image('menu','./SaveyourSon/assets/Menu.jpg');
        this.load.bitmapFont('font', './SaveyourSon/assets/carrier_command.png', './SaveyourSon/assets/carrier_command.xml');      
    }
    create(){
    this.add.image(350, 350, 'menu').setScale(2);

    this.add.bitmapText(50, 500, 'font', 'Has Perdido').setScale(3);
    }
    }