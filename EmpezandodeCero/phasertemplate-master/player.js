export default class Player extends Phaser.GameObjects.Sprite{
constructor(scene){


let x=0;
let y=0;
super(scene,x,y,'Player');



}



changeG(){
    this.body.gravity.y();


}
}