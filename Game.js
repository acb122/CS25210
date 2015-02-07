PandaLander.Game = function (game) {
    var player;
    var platforms;
    var landings;
    var lives;
    var cursors;
    var startH;
    var startL;

    var stars;
    var score;
    var scoreText;
};

PandaLander.Game.prototype = {

    create: function () {

        
        this.thisover = false;
        this.secondsElapsed = 0;
        this.timer = this.time.create(false);
        this.timer.loop(1000, this.updateSeconds, this);

        score=0;
        lives = 2;
        startH = this.world.width - 50;
        startL = this.world.height - 170;

        //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.buildWorld();
    },

    updateSeconds: function () {
        this.secondsElapsed++;
    },

    buildWorld: function () {
        this.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.add.group();
        landings = this.add.group();
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;
        landings.enableBody = true;

        var landingSite = landings.create(201, 201, 'winplatform');
        landingSite.body.immovable = true;
        // Here we create the ground.
        var ground = platforms.create(0, this.world.height - 64, 'ground');

        //  Scale it to fit the width of the this (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = platforms.create(400, 200, 'spike');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'spike');
        ledge.body.immovable = true;

        // The player and its settings
        player = this.add.sprite(startH, startL, 'ship');


        //  We need to enable physics on the player
        this.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.

       // player.body.offset();
        player.body.setSize(140,150,30,-5);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.body.height = 105;




        //player.animations.add('right', [5, 6, 7, 8], 10, true);

        //  Finally some stars to collect
        stars = this.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++) {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 100;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  The score
        scoreText = this.add.text(this.world.width - 160, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
        livesText = this.add.text(16,16, 'lives: 3', {fontSize: '32px', fill: '#000'});

        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();
        this.timer.start();
    },


    quitGame: function (pointer) {

        this.state.start('StartMenu');
    },


    update: function () {



        //  Collide the player and the stars with the platforms
        // this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(stars, platforms);
        this.physics.arcade.overlap(player, landings, win, null, this);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.arcade.overlap(player, stars, collectStar, null, this);
        this.physics.arcade.overlap(player, platforms, die, null, this);

        //  Reset the players velocity (movement)
        //player.body.velocity.x = 0;

        if (cursors.left.isDown && cursors.up.isDown) {
            //  Move to the left
            player.body.velocity.x += -1.5;
            player.body.velocity.y += -10;

            player.loadTexture('r_up_ship');
        }
        else if (cursors.right.isDown && cursors.up.isDown) {
            //  Move to the right
            player.body.velocity.x += 1.5;
            player.body.velocity.y += -10;

            player.loadTexture('l_up_ship');
        }
        else if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x += -1.5;


            player.loadTexture('r_ship');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x += 1.5;

            player.loadTexture('l_ship');
        }
        else if (cursors.up.isDown) {
            player.body.velocity.y += -10;

            player.loadTexture('up_ship');
        }
        else {
            //  Stand still
            player.loadTexture('ship');

        }

        //  Allow the player to jump if they are touching the ground.


    }}
    function collectStar(player, star)
{

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function die(player, collide) {

    if (player.body.velocity.y < -10 || player.body.velocity.y > 200) {
        // Removes the star from the screen
        resetPlayer(player);

    }
    else {

        player.body.velocity.y = -10;
    }


}
function win(player, collide) {

    if (player.body.velocity.y < -10 || player.body.velocity.y > 200) {
        // Removes the star from the screen
        resetPlayer(player);


    }
    else {
        //winner
        //player.body.drag.add(10,0);
        player.body.velocity.y = -10;
    }


}

function resetPlayer(player) {

    if (lives > 0) {
        player.body.x = startH;
        player.body.y = startL;
        livesText.text = 'Lives: ' + lives;
        lives--;
    }
    else {
        player.kill();

        //this over here
    }




}