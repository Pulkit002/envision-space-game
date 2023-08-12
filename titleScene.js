class TitleScene extends Phaser.Scene {

    constructor() {
        // Constructor is automatically called when an instance of this class is created
        super({ key: 'titleScene' });
        this.starfield = null;
        this.title = null;
        this.play_btn=null;
    }

    preload() {
        // This method is part of the Phaser scene and is automatically called before the scene is created.
        // Used to preload game assets like images, audio, etc.
        this.load.image("starfield", "assets/starfield.png");
        this.load.image("title", "assets/title.png");
        this.load.image("play_btn", "assets/play.png");
    }

    create() {
        // This method is part of the Phaser scene and is called after the scene is created
		this.starfield = this.add.tileSprite(0, 0, 4000, 1400, "starfield"); // This adds the background to the scene
        this.title = this.add.image(650,250, "title"); // Adding the title
        this.title.setScale(0.7); // Scaling down the title image by a factor of 0.7
        this.play_btn = this.add.image(650,500, 'play_btn'); // Adding the play button
        this.play_btn.setScale(0.5);// Scaling down the play button image

        this.play_btn.setInteractive({ useHandCursor: true });// making the play button interactive. Shows a hand cursor when hovering over it
        this.play_btn.on('pointerdown', () => this.clickButton()); 
        // The above line calls the clickButton method of the TitleScene class when the playButton is triggered (mouse or touch)
	}
    
    clickButton() {
        // This function will be called when the play button is clicked
        this.scene.switch('gameScene');
    }


    update() {
        // This method is part of the Phaser scene and is called repeatedly in a game loop ater 'create()' has been executed.
        // It is used for continuous updates to the scene
        this.starfield.tilePositionY -= 2;
        // The above line scrolls the starfield tile sprite vertically by decrementing its tilePositionY property by 2 pixels. This creates the illusion of a moving starfield background.
    }

}
export default TitleScene; // Make the class available for importing in other files