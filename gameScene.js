import Explosion from "./explosion.js";

// Parent Class --> Phaser.Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' })
    }

    init() {
        // Initialize properties used within the scene
        this.starfield = null;
        this.player = null;
        this.cursors = null;
        this.boundary = null;
        this.asteroids = null;
        this.planet1 = null;
        this.planet2 = null;
        this.planet3 = null;
        this.planet4 = null;
        this.planet5 = null;
        this.bullets = null;
        this.explosions = null;
        this.lives = 5;
        this.points = 0;
        this.maxpoints = 150;
        this.pointsText = null;
        this.livesText = null;
        this.numOfPlanets = 0;
        // this.gameOver = false;
        this.bulletTime = 0;
        //this.bulletFiring = null;
        //this.explsoionSound = null;
    }

    preload() {
        // Preload game assets

        this.load.image("starfield", "assets/starfield.png");
        this.load.image("boundary", "assets/boundary.png");
        this.load.image("player", "assets/player.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("asteroid", "assets/asteroid.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("planet1", "assets/planet_1.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("planet2", "assets/planet_2.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("planet3", "assets/planet_3.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("planet4", "assets/planet_4.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("planet5", "assets/planet_5.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("explode", "assets/explode.png", {
            // This is a spritesheet which will be played when "explode()" method is called from the Explosion class imported from the file "explosion.js"
            frameWidth: 128,
            frameHeight: 128,
        });
        this.load.image("bullet", "assets/bullet.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        //this.load.audio("bulletFiring", "assets/shoot.wav");
        //this.load.audio("explosionSound", "assets/explosion.wav");
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 4000, 1400, "starfield"); // Background
        this.boundary = this.physics.add
            .sprite(0, 450, "boundary") // represents a boudary at the bottom of the screen to prevent game objects from falling off the screen
            .setScale(2.23)
            .setImmovable(true);
        this.player = this.physics.add.sprite(400, 500, "player"); // plane which will be controlled by the player. It is initially positioned at coordinates (400,500)
        this.player.setScale(1.2); // Scaling up the player image
        this.player.setCollideWorldBounds(true); //This line sets up collision detection for the player sprite with the world bounds. It ensures that the player sprite cannot move beyond the boundaries of the game screen.

        const collisionHandler = (boundary, obj) => {
            // this function is used to handle collisions b/w the boundary and other game objects
            obj.setBounce(1) //This line sets the bounce property of the collided object to 1, causing the object to bounce back when it collides with the boundary.
        };

        this.livesText = this.add.text(16, 16, "Lives left: " + this.lives, {
            fontSize: "32px",
            fill: "#fff",
        });

        this.pointsText = this.add.text(16, 50, "Points: " + this.points, {
            fontSize: "32px",
            fill: "#fff",
        });

        this.cursors = this.input.keyboard.createCursorKeys(); // to detect player input (from keyboard)
        this.cursors.left.isDown=false; // This line sets the initial state of the left arrow key to false. This will be used to track whether the left arrow key is currently being held down.
        this.cursors.right.isDown=false;// this line sets the initial state of the right arrow key to false.
        this.cursors.down.isDown=false;// This line sets the initial state of the down arrow key to false.
        this.cursors.up.isDown=false;// This line sets the initial state of the up arrow key to false.

        this.asteroids = this.physics.add.group({
            //This block of code creates a physics group named asteroids to manage multiple asteroid objects.
            maxSize: 30, // This line sets the maximum number of asteroids that can exist in the group to 30.
            runChildUpdate: true, // to allow each asteroid in the group to have its own individual behaviour
        });

        for (let y = 0; y < 30; y++) {
            // this loop creates 30 asteroid objects positioned at random coordinates within the specified ranges
            // This loop effectively populates the asteroids group with 30 randomly positioned asteroid objects, each of which will have its own individual behavior due to the runChildUpdate: true configuration previously set for the group.
            this.asteroids.create(
                Phaser.Math.Between(0, 1300), // this line generates a random value between 0 and 1300 (Determines the x-coordinate of the asteroid)
                Phaser.Math.Between(0, 350), // this line generates a random value between 0 and 350 (Determines the Y-coordinate of the asteroid)
                "asteroid" // key of the image loaded in the "preload()" method
            );
        }

        this.bullets = this.physics.add.group({
            //This block of code creates a physics group named 'bullets' to manage multiple bullet objects
            runChildUpdate: true, // to allow each bullet in the group to have its own individual behaviour
        });

        this.asteroids.getChildren().forEach(function(asteroid) {
            //This block of code iterates through each individual asteroid within the asteroids group and applies various settings and behaviours to each asteroid
            asteroid.setCollideWorldBounds(true); // This line sets up collision detection for each individual asteroid with the world bounds. It ensures that the asteroids bounce back when they collide with the screen's edges, preventing them from moving outside the game area.
            this.physics.add.collider(this.boundary, asteroid, collisionHandler);// This line adds a collider between the boundary object (bottom screen boundary) and each asteroid. When an asteroid collides with the boundary, the collisionHandler function defined earlier will be called. This function typically sets the asteroid's bounce behavior.
            asteroid.setBounce(1);// This line sets the bounce property of each asteroid to 1, causing the asteroid to bounce back when it collides with another object.
            asteroid.setVelocityX(Phaser.Math.Between(-100, 100)); // Initial velocity of the asteroid
            asteroid.setVelocityY(Phaser.Math.Between(-100, 100));
        }, this); 
        // The this parameter at the end of the function is used to preserve the outer context, ensuring that the correct context (scope) is used within the loop.
        // The forEach function is being used to iterate through each child asteroid within the asteroids group. Inside the function passed to forEach, a new context is created, and the value of this might not refer to the same context that you're currently in. This can be problematic if you want to access properties or methods of the outer context (such as the instance of the GameScene class).
        // To overcome this issue and ensure that the correct context (scope) is used within the loop, the this parameter at the end of the forEach function is used:
        // By passing this as the second argument to forEach, you're explicitly telling the function to use the current value of this from the outer context. This is often referred to as "binding" the value of this to the outer context.

        this.explosions = this.physics.add.group({
            // This block of code creates a physics group named explosions to manage multiple explosion objects.
            max: 0,//This option sets the maximum number of explosion objects that can exist in the group to 0. By setting this to 0, you indicate that the group can dynamically grow to accommodate as many explosion instances as needed without a specific limit. This is useful for managing explosions that can occur at various times without being restricted by a fixed quantity.
        });

        this.anims.create({
            // This block of code sets up an animation named explode using the animation system provided by phaser
            key: "explode",
            frames: this.anims.generateFrameNumbers("explode", {
                //generates an array of frame numbers between 0 and 15 from the "explode" spritesheet (stored in assets folder).
                start: 0,
                end: 15,
            }),
            frameRate: 24, // This sets the frame rate of the animation to 24 frames per second. This determines how fast the animation will play.
            repeat: 0,
            hideOnComplete: true,
        });


        this.physics.add.overlap(
            //  This block of code utilizes the physics system of Phaser to set up an overlap collision check between two groups or objects.
            this.bullets,//This is the first parameter and represents the first group or object to be checked for overlap
            this.asteroids,//This is the second parameter and represents the second group or object to be checked for overlap
            this.bulletHitAsteroid,// This is the third parameter and specifies the callback function that will be executed when an overlap occurs between a bullet and an asteroid. This function will handle the logic when a bullet hits an asteroid.
            null,//This is the fourth parameter, which specifies the context in which the callback function will be called. In this case, null indicates that the callback will be called in the default context.
            this//This is the fifth parameter and specifies the context (scope) in which the callback function (bulletHitAsteroid) should be executed. By passing this, you ensure that the correct context (the instance of the GameScene class) is used when the callback is invoked.
        );

        //this.bulletFiring = this.sound.add("bulletFiring");
        //this.explosionSound = this.sound.add("explsoionSound");
    }

    update() {
        // The update method in the game loop is where the main gameplay logic and mechanics are handled. It's executed in every frame of the game and ensures that the game state is updated continuously.

        if (this.lives == 0) {
            this.end();
        }

        if (this.numOfPlanets == 0) { // ERROR --------------------------------------------------------------------------------------------
            this.numOfPlanets += 1;
            this.time.delayedCall(1000, this.nextLevel, [], this);
        }

        this.starfield.tilePositionY -= 2; //scrolls the starfield background vertically, giving the illusion of movement.

        if (this.cursors.space.isDown) { // When spacebar is pressed
            if (this.time.now > this.bulletTime) {// this if condition checks whether enough time has passed since the last bullet was fired (this.time.now > this.bulletTime). If so, a new bullet is created and shot upward.
                //this.bulletFiring.play();
                // create new bullet using the bullets group
                // the getFirst() method is used to get an inactive bullet from the group or create a new one if none are available
                var bullet = this.bullets.getFirst( 
                    false, //  This parameter indicates that the method should not create a new sprite if no inactive sprite is available. Instead, it will return null in case all bullets are active.
                    true, // This parameter indicates that if a new sprite needs to be created (because no inactive sprite is available), it should also be set as active.
                    this.player.x, //This sets the initial x-coordinate of the bullet to match the x-coordinate of the player's position.
                    this.player.y + 8, // This sets the initial y-coordinate of the bullet slightly above the player's y-coordinate. The + 8 is used to position the bullet a little higher on the screen.
                    "bullet"
                );
                bullet.setVelocityY(-500); // bullet moves upward on the screen
                this.bulletTime = this.time.now + 200; //  After firing a bullet, the current time (this.time.now) is stored in the this.bulletTime variable to track the time of the last bullet fired. Additionally, 200 milliseconds are added to ensure a cooldown period before the player can fire another bullet.
            }
        }

        // Now update the position of player depending on which arrow key is pressed
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-180);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(180);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-180);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(+180);
        } else {
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
        }

        // Now setup collision detection between the player object and the five planets.
        // When the player collides with any of these planet sprites, the playerHitPlanet function is called to handle the collision.
        this.physics.add.overlap(this.player, this.planet1, this.playerHitPlanet, null, this);
        this.physics.add.overlap(this.player, this.planet2, this.playerHitPlanet, null, this);
        this.physics.add.overlap(this.player, this.planet3, this.playerHitPlanet, null, this);
        this.physics.add.overlap(this.player, this.planet4, this.playerHitPlanet, null, this);
        this.physics.add.overlap(this.player, this.planet5, this.playerHitPlanet, null, this);
        // 'null': This parameter is used for a process callback function, but in this case, it's set to null indicating that no custom process callback is needed.
        //       This tells Phaser that no additional conditions or checks are needed to determine whether the overlap should be processed or not.
        // 'this': This parameter specifies the context (scope) in which the callback functions (playerHitPlanet or the process callback) will be executed.

    }

    bulletHitAsteroid(bullet, asteroid) {
        // This function is called when a bullet collides with an asteroid
        
        //this.explosionSound.play();
        var explosion = new Explosion(this, asteroid.x, asteroid.y); // This line creates a new instance of the Explosion class, passing in the current scene (this), the x-coordinate of the asteroid, and the y-coordinate of the asteroid. This prepares to display an explosion animation.
        explosion.setScale(0.5); // scaling down the explosion animation
        explosion.explode(); // This line calls the explode method of the explosion object, which triggers the explosion animation.
        bullet.destroy(); // remove bullet from the scene
        asteroid.destroy(); // remove asteroid from the scene

        this.points = this.points + 5; // increment points by 5
        this.pointsText.setText("Points: " + this.points); // update the points displayed on the screen
        
        if (this.points == this.maxpoints) {
            // ERROR -----------------------------------------------------------------------------------------------------------------------
            
            // This block of code checks if the player's points have reached the maximum points (maxpoints). If they have, it calls the end function to handle the end of the game.
            // maxpoints = 150
            // this.gameOver = true;
            this.end();
        }
    }

    playerHitPlanet(ply, planet) {
        // This function is called when the player collides with one of the five planets

        //this.explosionSound.play();
        var explosion = new Explosion(this, this.player.x, this.player.y); //This line creates a new instance of the Explosion class, positioned at the player's current x and y coordinates.
        explosion.explode(); //This line calls the explode method of the explosion object, triggering the explosion animation.
        this.player.disableBody(false, true); // This line disables the player's physics body, making it inactive in the game world. 
                                              // The false parameter indicates that the player's sprite remains visible, while the true parameter ensures that the body is removed from the physics simulation.
        this.lives -= 1; // decrease the remaining lives by 1
        this.livesText.setText("Lives left: " + this.lives); // update the lives displayed on the screen
        
        this.numOfPlanets += 1; // Increment the count of planets encountered by the player

        if (this.lives <= 0) {
            this.gameOver = true;
        }

        this.time.delayedCall(1000, this.nextLevel, [], this); // activates the next level
        this.time.delayedCall(1000, this.respawnPlayer, [], this); // respawns the player
    }

    respawnPlayer() {
        if (this.lives != 1) this.player.enableBody(true, 600, 500, true, true);
        else this.player.enableBody(true, 1200, 800, true, true);
        
        //this.player.enableBody(true, x, y, true, true);: This line re-enables the player's physics body for collision detection and interaction. The true parameter indicates that the sprite's physics body is enabled, and the other true parameter ensures that the sprite is reset to its original state. The x and y parameters define the coordinates where the player will respawn.
    }

    nextLevel() {
        if (this.numOfPlanets == 1) {
            // This block of code is responsible for creating and initializing the first planet (planet1) when this.numOfPlanets is equal to 1. 
            this.planet1 = this.physics.add.sprite(30, 30, "planet1");
            this.planet1.setScale(1);
            this.planet1.setBounce(1);
            this.planet1.setCollideWorldBounds(true);
            this.planet1.x = 30;
            this.planet1.y = 30;
            var velocityCoin = Phaser.Math.FloatBetween(0, 1); // Generates a random float value between 0 and 1, which is used to determine the direction of the initial velocity.
            this.planet1.setVelocityX(
                Phaser.Math.Between(
                    // Sets the initial horizontal velocity of planet1 based on the random value. If velocityCoin is greater than 0.5, it sets a positive velocity between 100 and 300; otherwise, it sets a negative velocity between -100 and -300.
                    velocityCoin > 0.5 ? 100 : -300,
                    velocityCoin > 0.5 ? 300 : -100
                )
            );

            velocityCoin = Phaser.Math.FloatBetween(0, 1); //Generates another random float value between 0 and 1, which will be used for determining the vertical velocity.
            this.planet1.setVelocityY(
                Phaser.Math.Between(
                    // Sets the initial vertical velocity of planet1 based on the new random value, following the same logic as the horizontal velocity.
                    velocityCoin > 0.5 ? 100 : -300,
                    velocityCoin > 0.5 ? 300 : -100
                )
            );
        }

        if (this.numOfPlanets == 2) {
            // This block of code is responsible for creating and initializing the first planet (planet2) when this.numOfPlanets is equal to 2. 
            this.planet2 = this.physics.add.sprite(700, 15, "planet2");
            this.planet2.setScale(0.9);
            this.planet2.setBounce(1);
            this.planet2.setCollideWorldBounds(true);
            this.planet2.x = 700;
            this.planet2.y = 15;
            var velocityCoin = Phaser.Math.FloatBetween(0, 1); // Generates a random float value between 0 and 1, which is used to determine the direction of the initial velocity.
            this.planet2.setVelocityX(
                Phaser.Math.Between(
                    // Sets the initial horizontal velocity of planet2 based on the random value. If velocityCoin is greater than 0.5, it sets a positive velocity between 100 and 300; otherwise, it sets a negative velocity between -100 and -300.
                    velocityCoin > 0.5 ? 100 : -300,
                    velocityCoin > 0.5 ? 300 : -100
                )
            );
            velocityCoin = Phaser.Math.FloatBetween(0, 1); //Generates another random float value between 0 and 1, which will be used for determining the vertical velocity.
            this.planet2.setVelocityY(
                Phaser.Math.Between(
                    // Sets the initial vertical velocity of planet2 based on the new random value, following the same logic as the horizontal velocity.
                    velocityCoin > 0.5 ? 100 : -300,
                    velocityCoin > 0.5 ? 300 : -100
                )
            );
        }
        if (this.numOfPlanets == 3) {
            this.planet3 = this.physics.add.sprite(1000, 15, "planet3");
            this.planet3.setScale(0.25);
            this.planet3.setBounce(1);
            this.planet3.setCollideWorldBounds(true);
            this.planet3.x = 1000;
            this.planet3.y = 15;
            var ve3ocityCoin = Phaser.Math.FloatBetween(0, 1);
            this.planet3.setVelocityX(
                Phaser.Math.Between(
                    velocityCoin > 0.5 ? 100 : -400,
                    velocityCoin > 0.5 ? 400 : -100
                )
            );
            velocityCoin = Phaser.Math.FloatBetween(0, 1);
            this.planet3.setVelocityY(
                Phaser.Math.Between(
                    velocityCoin > 0.5 ? 100 : -400,
                    velocityCoin > 0.5 ? 400 : -100
                )
            );
        }
        if (this.numOfPlanets == 4) {
            this.planet4 = this.physics.add.sprite(1300, 15, "planet4");
            this.planet4.setScale(0.25);
            this.planet4.setBounce(1);
            this.planet4.setCollideWorldBounds(true);
            this.planet4.x = 1300;
            this.planet4.y = 15;
            var velocityCoin = Phaser.Math.FloatBetween(0, 1);
            this.planet4.setVelocityX(
                Phaser.Math.Between(
                    velocityCoin > 0.5 ? 100 : -400,
                    velocityCoin > 0.5 ? 400 : -100
                )
            );
            velocityCoin = Phaser.Math.FloatBetween(0, 1);
            this.planet4.setVelocityY(
                Phaser.Math.Between(
                    velocityCoin > 0.5 ? 100 : -400,
                    velocityCoin > 0.5 ? 400 : -100
                )
            );
        }
        if (this.numOfPlanets == 5) {
            this.planet5 = this.physics.add.sprite(350, 15, "planet5");
            this.planet5.setScale(0.25);
            this.planet5.setBounce(1);
            this.planet5.setCollideWorldBounds(true);
            this.planet5.x = 350;
            this.planet5.y = 15;
            var velocityCoin = Phaser.Math.FloatBetween(0, 1);
            this.planet5.setVelocityX(
                Phaser.Math.Between(
                    velocityCoin > 0.5 ? 90 : -100,
                    velocityCoin > 0.5 ? 100 : -90
                )
            );
            velocityCoin = Phaser.Math.FloatBetween(0, 1);
            this.planet5.setVelocityY(
                Phaser.Math.Between(
                    velocityCoin > 0.5 ? 100 : -100,
                    velocityCoin > 0.5 ? 100 : -100
                )
            );
        }
    }

    end() {
        //The end() function is responsible for ending the current game scene and transitioning to another scene named 'endScene'.
        this.livesText.setText(
            "Lives left: " +
            this.lives +
            ". Thankyou for playing :) Your score: " +
            this.points
        );
        this.scene.stop(); //Stops the current game scene, effectively pausing its execution and rendering.
        this.scene.start('endScene', {points:this.points}); //Starts a new scene named 'endScene' and passes an object containing the player's score as a parameter. This will allow the 'endScene' to display the player's final score when it starts.
    }

}

export default GameScene;