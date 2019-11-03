export default class GameManager{
    constructor(){
        this.keys=0;//En esta variable guardaremos las llaves que el jugador tiene para comprar mejoras
        this.scene=0;//en esta escena guardaremos la escena en la que nos encontramos 
        this.speedImprovmentsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la velocidad del jugador
        this.speedPenalizationBought=5;//En esta variable se guardará cuantas veces hemos reducido la velocidad del alcaide
        this.jetpacksImprovementsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la resistencia del jetpack
        this.bombImprovmentBought=0;//En esta variable se guardará cuantas veces hemos ampliado la fuerza de la bomba
        this.catapultImprovmentBought=0;//En esta variable se guardará cuantas veces hemos ampliado la fuerza de la catapulta
    }
    GetKey(){
        return this.keys;
    }
    GetCurrentScene(){
        return this.scene;
    }
    GetSpeedImprovments(){
        return this.speedImprovmentsBought;
    }
    GetSpeedPenalizations(){
        return this.speedPenalizationBought;
    }
    GetJetpackImprovements(){
        return this.jetpacksImprovementsBought;
    }
    GetBombImprovments(){
        return this.bombImprovmentBought;
    }
    GetCatapultImprovments(){
        return this.catapultImprovmentBought;
    }
    AddKeys(keysToAdd){
this.keys+=keysToAdd;
    }
    GoNextScene(){
    this.scene+=1;
}
    AddSpeedImprovment(improvedSpeedBought){
        this.speedImprovmentsBought+=improvedSpeedBought;
    }
    AddSpeedPenalization(penalizatedSpeedBought){
        this.speedPenalizationBought+=penalizatedSpeedBought;
    }
    AddJetPackImprovment(improvementJetpackBought){
        this.jetpacksImprovementsBought+=improvementJetpackBought;
    }
    AddBombImprovement(bombsImprovement){
        this.bombImprovmentBought+=bombsImprovement;
    }
    AddCatapultImprovement(catapultsImprovent){
        this.catapultImprovmentBought+=catapultsImprovent;
    }
}