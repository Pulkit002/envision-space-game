// Declaring a class named explosion that extends the "Phaser.Physics.Arcade.Sprite" class.
// By doing this, the explosion class will inherit properties and methods from "Phaser.Physics.Arcade.Sprite" class which we will be using
// Parent Class --> Phaser.Physics.Arcade.Sprite

class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);// "super" keyword is used to call the constructor of the parent class
        // It sets up the sprite's(parent class) initial state using the provided "scene" as well as "x" and "y" parameters.
        scene.add.existing(this);
    }
    explode() {
        this.play("explode"); // plays an animation (or spritesheet) named "explode". 
        // explode is basically a spritesheet stored in the assets folder which will be played when "explode()" method of this class is called
        // So, play method of the parent class plays the spritesheet given as input

        // We will add this expload spritesheet in the gameScene class in the preload method using the command below
        // this.load.spritesheet("explode", "assets/explode.png", {
        //     frameWidth: 128,
        //     frameHeight: 128,
        // });
    }
}
export default Explosion; // Make the class available for importing in other files