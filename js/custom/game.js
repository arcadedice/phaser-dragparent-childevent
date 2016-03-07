define([
    'phaser',
    'boot',
    'preload',
    'play'
], function (Phaser, Boot, Preload, Play) {
    'use strict';
    function Game() {}
    Game.prototype = {
        constructor: Game,
        start: function start() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'container');
            // Game states
            this.game.state.add('boot', Boot);
            this.game.state.add('preload', Preload);
            this.game.state.add('play', Play);
            this.game.state.start('boot');
        }
    };
    return Game;
});