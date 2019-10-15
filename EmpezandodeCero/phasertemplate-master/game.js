import Player from "./player.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('sky', 'assets/sky.png');
    
  }

  create() {
    this.player = new Player(this);

    this.add.image(10,10,'sky');
  }

  update(time, delta) {    
    //this.add.sprite()
    this.player.changeG();
  }
}