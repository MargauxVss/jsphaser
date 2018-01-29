// Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Paddle extends Phaser.Sprite {

  // initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, game.height - 50, 'paddle', frame);

    this.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    if (this.game.physics.arcade){
      this.game.physics.arcade.enableBody(this);
    }

    if (this.body){
      this.body.collideWorldBounds = true;
      this.body.bounce.set(1);
      this.body.immovable = true;
    }
  }

  update() {
    var speed = 20;
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
      this.x = this.x - speed;
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      this.x = this.x + speed;
    }

    if (this.x < 24)
    {
      this.x = 24;
    }
    else if (this.x >this.game.width - 24)
    {
      this.x = this.game.width - 24;
    }
  }
}

export default Paddle;
