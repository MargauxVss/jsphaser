class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    // setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    // setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {
    this.game.load.image('background','assets/bg_wood.png');
    this.game.load.image('crosshairs', 'assets/crosshair_red_small.png');

    this.game.load.image('text_go', 'assets/text_go.png');
    this.game.load.image('text_ready', 'assets/text_ready.png');

    this.game.load.spritesheet('target', 'assets/target.png',128.66,128);

    this.game.load.audio('gunshot','assets/gunshot.wav');
    this.game.load.audio('ding','assets/ding.wav');

    this.game.load.image('paddle','assets/paddle.png');
    this.game.load.image('ball','assets/ball.png');
    this.game.load.image('brick_0','assets/brick0.png');
    this.game.load.image('brick_1','assets/brick1.png');
    this.game.load.image('brick_2','assets/brick2.png');
    this.game.load.image('brick_3','assets/brick3.png');
    this.game.load.image('brick_4','assets/brick4.png');
    this.game.load.image('brick_5','assets/brick5.png');
    this.game.load.image('bg_starfield','assets/starfield.jpg');

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);
  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
