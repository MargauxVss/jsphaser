// Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Brick extends Phaser.Sprite {

  // initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'brick_0', frame);

    this.anchor.setTo(0.5, 0.5);

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

  }

}

export default Brick;
