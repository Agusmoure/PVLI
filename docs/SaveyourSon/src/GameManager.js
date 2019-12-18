export default class GameManager{
    //Constructor
    constructor(){
        this.keys=0;//En esta variable guardaremos las llaves que el jugador tiene para comprar mejoras
        this.scene=2;//en esta escena guardaremos la escena en la que nos encontramos 
        this.speedImprovmentsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la velocidad del jugador
        this.speedPenalizationBought=0;//En esta variable se guardará cuantas veces hemos reducido la velocidad del alcaide
        this.jetpacksImprovementsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la resistencia del jetpack
        this.maxImprovemnts=5;

        this.scenesForPlay=['Level1','MenuPowerUps','Level2','MenuPowerUps','Level3','HasGanado']
    }
    //Devuelve la cantidad de llaves
    GetKey(){
        return this.keys;
    }
    //Devuelve la escena actual
    GetCurrentScene(){
        return this.scene;
    }
    //Devuelve la cantidad de mejoras de velocidad hemos comprado
    GetSpeedImprovments(){
        return this.speedImprovmentsBought;
    }
    //Devuelve la cantidad de reducciones de velocidad hemos comprado

    GetSpeedPenalizations(){
        return this.speedPenalizationBought;
    }
    //Devuelve la cantidad de mejoras de jetpack hemos comprado

    GetJetpackImprovements(){
        return this.jetpacksImprovementsBought;
    }
    //añade x cantidad de llaves a las llaves y en caso de ser negativas no baja de 0
    AddKeys(keysToAdd){
this.keys+=keysToAdd;
if(this.keys<0) this.keys=0;
    }
    //Suma 1 a la escena
    GoNextScene(){
    this.scene+=1;
}
//Añade x mejoras a la velocidad
    AddSpeedImprovment(improvedSpeedBought){
        this.speedImprovmentsBought+=improvedSpeedBought;
    }
//Añade x mejoras a la penalizacion

    AddSpeedPenalization(penalizatedSpeedBought){
        this.speedPenalizationBought+=penalizatedSpeedBought;
    }
//Añade x mejoras al jetpack

    AddJetPackImprovment(improvementJetpackBought){
        this.jetpacksImprovementsBought+=improvementJetpackBought;
    }
//Devuelve el super de la proxima escena
    GetSuperNextScene(){
        this.scene++;
        return this.scenesForPlay[this.scene];
    }
    //Devuelve la maxima cantidad de mejoras de cada una que se pueden comprar
    GetMaxImprovements(){
        return this.maxImprovemnts;
    }
}