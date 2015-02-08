PandaLander.GameOver = function(game) {
    this.startBG= null;
    this.startPrompt = null;

};

PandaLander.GameOver.prototype = {

    create: function () {


        var startBG = new this.add.image(0, 0, 'gamescreen');
        startBG.inputEnabled = true;
        startBG.events.onInputDown.addOnce(this.startGame, this);

    },

    startGame: function () {

        this.state.start('Game');
    }
};
