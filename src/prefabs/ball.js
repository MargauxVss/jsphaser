// Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Ball extends Phaser.Sprite {

  // initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'ball', frame);

    this.stateBall = "toPaddle";
    this.anchor.setTo(0.5, 0.5);

    // setup physics properties
    if (this.game.physics.arcade){
      this.game.physics.arcade.enableBody(this);
    }
    if (this.body){
      this.body.collideWorldBounds = true;
      this.body.bounce.set(1);
    }
    // set click event
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(function(){}, this);
    this.events.onInputDown.add(this.clicked, this);
  }

  update (){

  }

  clicked()  {

  }

}

export default Ball;
