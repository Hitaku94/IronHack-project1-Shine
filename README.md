# Project's name
[Link Deploy](https://github.com/Hitaku94/IronHack-project1-Shine)


## Description

Escape the darkness that chase you, Let the light shine


## MVP

- Character that can jump, go right and left
- objects that comes from right to left that pushes the character, 
- if the character touch the  Darkness behind him, it is game over




## Backlog

- not the objects coming from left to right anymore but when the character moves to the right, objects come from the right.
- Like that, the bad guy moves as well and if he catches the character, it is game over.
- plateforms to jump on to pass bigger walls
- the speed of the bad guy increases after some time.


## Data structure
Classes and methods definition. Or functions.

game.js

- window.addEventListener('load', () => {}
- SplashScreen(){}
- gameScreen(){}
- GameOverScreen(){}
- function gameOver(){}
- function start(){}
- function restart(){}
- function animate(){}
- function collision(){}

Light-ball.js

- constructor(){this.x, this.y}
- draw(){}
- move(){
    (jump, moveLeft, moveRight)
}
- wallCollision(){}
- darknessCollision(){}

Walls.js

- constructor(){this.x, this.y}
- draw(){}
- move(){}
- leftScreenCollision(){}
- ((lightBallCollision(){}))


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen


## Task
Task definition in order of priority

- HTML
- CSS
- DOM
- DrawImages
- SplashScreen
- gameScreen
- Light-ball.js
    - move : up, left, right
- walls.js
    - move : loop
- light-ball.js
    - collision : walls, Darkness
- walls.js
    - collision : light-ball, left side screen
- score
- function gameOver(){}


## Additional Links


### Trello
[Link url](https://trello.com/b/laIdgnf6/ironhack-project1-game-shine)


### Slides
[Link Slides.com](http://slides.com)