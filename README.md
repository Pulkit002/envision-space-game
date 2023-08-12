# Galactic Wide Web
A fun space themed game where the player’s goal is to shoot the asteroids while avoiding the planets

# Technologies used
HTML - A standard markup language used for structuring and creating web pages. 
CSS - A style sheet language used for modifying the presentation and design of a webpage. 
Javascript - It is a scripting/programming language that is often used for more complex operations and functions in web design. It can help create dynamically updated content.
Phaser - It is a 2D game framework used for making HTML5 games that can be used for games in browsers, mobile and desktop. It is a framework that is growing popular that is built in Javascript and is written in the same. In this particular project, we use the latest version ie: Phaser3.

## Game Implementation
The game has a total of 3 visible scenes : title scene, game scene and end game scene

### Title Scene:
![image 1](/assets/readme/titleScene.png)

### Game Scene:
The scene consists of :-
i)   The player sprite, which is a spaceship
ii)  A moving space background
iii) The asteroids to be destroyed (n=30)
iv)  A text that shows number of lives left (n=5)
v)   A text that shows number of points gained
vi) Planets

Every time the player sprite crashes into a planet, a life is lost and an extra planet is generated. The objective of the game is to shoot all the asteroids, avoiding the planets. However, if the player loses all the 5 lives before this is achieved, the game is over.
![image 2](/assets/readme/gameScene.png)

### End Scene:
This is the final scene that the user sees. This scene consists of the moving space background, a game over text, the player’s final score and two buttons:- (i) a replay button which on clicking would take the user back to a fresh start of the game, and (ii) a home button which on clicking would take the user to the title scene.
![image 3](/assets/readme/endScene.png)

## Controls

Left arrow key - Move player left
Right arrow key - Move player right
Up arrow key - Move player up
Down arrow key - Move player down
Space bar - Shoot bullet

## Future Ventures

Like any project, this project can also be developed into more interesting versions with some great features that could be added. These include:-
i)  Background music specific to each scene.
ii) A pause button to pause the game while playing
iii)Game levels of varying difficulties (Easy, Medium and Hard)
iv) Backend programming to store user scores and establish a basic scoreboard using Django.
v)  A help scene to go over how to play the game
