import PowerUp from "./powerup.js";
export default class HookGun extends PowerUp{
    constructor(scene,levelManager,oX,oY){
        let x=oX;
        let y=oY;
        super(scene,x,y,'portalAnimation');
        this.lvM=levelManager;
        this.xSpeed=0;
        this.ySpeed=0;
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    }
    PickGun(player){
        player.changeModifierGancho();
        this.PickMe();
    }
}