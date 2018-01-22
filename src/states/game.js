import Paddle from "../prefabs/paddle";
import Ball from "../prefabs/ball";
import Brick from "../prefabs/brick";


class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //add background image
    this.background = this.game.add.sprite(0,0,'bg_starfield');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;


    //setup UI
    this.lives = 3;
    this.score = 0;
    this.livesText = this.game.add.text(30, 30, 'lives: '+this.lives, { font: "20px Arial", fill: "#ffffff", align: "right" });
    this.scoreText = this.game.add.text(30, 60, 'score: '+this.score, { font: "20px Arial", fill: "#ffffff", align: "right" });
    //set up click listeners
    this.game.input.onDown.add(this.shoot, this);

    //setup prefabs
    this.paddle = new Paddle(this.game);
    this.ball = new Ball(this.game);
    this.bricks = this.game.add.group();

    for (var y = 0; y < 5; y++)
    {
      for (var x = 0; x < 17; x++)
      {
        var brick = new Brick(this.game, 120 + (x * 36), 100 + (y * 52));
        this.bricks.add(brick);
      }
    }

    this.game.add.existing(this.paddle);
    this.game.add.existing(this.ball);
    this.game.add.existing(this.bricks);

    //setup a timer to end the game
    this.game.physics.arcade.checkCollision.down = false;
    this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.events.onOutOfBounds.add(this.ballLost, this);
  }

  shoot(click){

  }

  releaseBall(ball){
    ball.stateBall = "released";
    ball.body.velocity.y = -300;
    ball.body.velocity.x = -75;
  }

  update() {
    if (this.ball.stateBall === "toPaddle"){
      this.ball.body.x = this.paddle.x;
      this.ball.body.y = this.paddle.y-15;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.ball.stateBall === "toPaddle")
    {
      this.releaseBall(this.ball);
    }
    this.game.physics.arcade.collide(this.ball, this.paddle, this.ballHitPaddle, null, this);
    this.game.physics.arcade.collide(this.ball, this.bricks, this.ballHitBrick, null, this);
  }

  endGame() {
    this.game.state.start('gameover');
  }

  ballLost(){
    this.lives = this.lives - 1;
    this.livesText.text = 'lives: ' + this.lives;

    if (this.lives === 0)
    {
      this.endGame();
    }
    else
    {
      this.ball.stateBall = "toPaddle";
      this.ball.reset(this.paddle.x, this.paddle.y - 15);
      this.ball.animations.stop();
    }

  }

  ballHitPaddle (_ball, _paddle) {
    var diff = 0;

    if (_ball.x < _paddle.x)
    {
      //  Ball is on the left-hand side of the paddle
      diff = _paddle.x - _ball.x;
      _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _paddle.x)
    {
      //  Ball is on the right-hand side of the paddle
      diff = _ball.x -_paddle.x;
      _ball.body.velocity.x = (10 * diff);
    }
    else
    {
      //  Ball is perfectly in the middle
      //  Add a little random X to stop it bouncing straight up!
      _ball.body.velocity.x = 2 + Math.random() * 8;
    }

  }

  ballHitBrick (_ball, _brick) {

    _brick.kill();

    this.score += 10;

    this.scoreText.text = 'score: ' + this.score;

    //  Are they any bricks left?
    if (this.bricks.countLiving() == 0)
    {
      //  New level starts
      this.score += 1000;
      this.scoreText.text = 'score: ' + score;

      //  Let's move the ball back to the paddle
      this.ball.stateBall = 'toPaddle';
      this.ball.body.velocity.set(0);
      this.ball.animations.stop();

      //  And bring the bricks back from the dead :)
      this.bricks.callAll('revive');
    }

  }

}

export default Game;
