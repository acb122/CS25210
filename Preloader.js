PandaLander.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

PandaLander.Preloader.prototype = {
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.image(this.world.centerX, this.world.centerY-220, 'titleimage');
		this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('titlescreen', 'images/TitleBG.png');
        this.load.image('gamescreen', 'images/gameover.png');
        this.load.image('sky', 'images/sky1.png');
        this.load.image('ground', 'images/platform.png');
        this.load.image('spike', 'images/spike.png');
        this.load.image('winplatform', 'images/platformwin.png');
        this.load.image('star', 'images/star.png');
        this.load.image('ship', 'images/1.png');
        this.load.image('up_ship', 'images/2.png');
        this.load.image('l_ship', 'images/3.png');
        this.load.image('l_up_ship', 'images/4.png');
        this.load.image('r_ship', 'images/5.png');
        this.load.image('r_up_ship', 'images/6.png');
        this.load.image('heart1', 'images/heart.png');
        this.load.image('heart2', 'images/heart.png');
        this.load.image('heart3', 'images/heart.png');
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
        this.state.start('StartMenu');
	}
};