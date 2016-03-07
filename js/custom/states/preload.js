define([
    'phaser'
], function (Phaser) {
    'use strict';
    function Preload() {}
    Preload.prototype = {
        constructor: Preload,
        preload: function preload() {
            this.load.image('preloaderBackground', 'assets/images/preloader_background.jpg');
            this.load.image('preloaderBar', 'assets/images/preloader_bar.png');
            this.load.image('background', 'assets/images/background.jpg');
        },
        create: function create() {
            var background = this.game.add.sprite(0, 0, 'background');
            background.width = this.game.width;
            background.height = this.game.height;
            // Setup preloader graphics
            var preloaderBackground = this.add.sprite(0, 0, 'preloaderBackground');
            var preloadBar = this.add.sprite(300, 400, 'preloaderBar');
            preloaderBackground.x = this.game.world.centerX - (preloadBar.width / 2);
            preloaderBackground.y = this.game.world.centerY + 50;
            preloadBar.x = this.game.world.centerX - (preloadBar.width / 2);
            preloadBar.y = this.game.world.centerY + 50;
            this.load.setPreloadSprite(preloadBar);
            preloadBar.cropEnabled = false;
            // Go to next state
            this.game.state.start('play');
        }
    };
    return Preload;
});