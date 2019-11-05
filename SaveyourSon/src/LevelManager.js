export default class LevelManager{
    constructor(){
        this.keys=0;//En esta variable guardaremos las llaves que el jugador tiene para comprar mejoras
        this.bomba=false;
        this.player=undefined;
    //    // this.scene=0;//en esta escena guardaremos la escena en la que nos encontramos 
    //     //this.speedImprovmentsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la velocidad del jugador
    //     this.speedPenalizationBought=5;//En esta variable se guardará cuantas veces hemos reducido la velocidad del alcaide
    //     this.jetpacksImprovementsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la resistencia del jetpack
    //     this.bombImprovmentBought=0;//En esta variable se guardará cuantas veces hemos ampliado la fuerza de la bomba
    //     this.catapultImprovmentBought=0;//En esta variable se guardará cuantas veces hemos ampliado la fuerza de la catapulta
    }

    GetPlayerX(){
        return this.player.body.x;
    }
    GetPlayerY(){
        return this.player.body.y;
    }
    GetPlayerVelX(){
return this.player.GetVelX();
    }
    GetKey(){
        return this.keys;
    }
    SetBomba()
    {
        this.bomba=true;
    }
    LanzarBomba(){
return this.bomba;
    }
    SetPlayerX(vel){
        this.player.SetVelX(vel);
    }
    SetPlayerY(vel){
        this.player.SetVelY(vel);
    }

    ImpulsePlayer(velX){
        this.player.Impulse(velX);
    }
    
    AddKey(){
        this.keys=this.keys+1;
        console.log(this.keys);
    }
   
}