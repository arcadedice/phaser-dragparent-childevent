(function () {
    'use strict';
    requirejs.config({
        baseUrl: 'js/',
        paths: {
            phaser: 'contrib/phaser.min',

            // Plugins you purchase from the Phaser shop (http://phaser.io/shop/plugins) go here.
            // box2d: '',
            // virtualjoystick: '',
            // particlestorm: '',

            // Phaser game states
            game: 'custom/game',
            boot: 'custom/states/boot',
            preload: 'custom/states/preload',
            play: 'custom/states/play'
        },
        shim: {
            'phaser': {
                exports: 'Phaser'
            }

            // Plugins you purchase from the Phaser shop (http://phaser.io/shop/plugins) go here.
            // ,
            // 'particlestorm': {
            //     exports: 'Phaser.ParticleStorm',
            //     deps: [
            //         'phaser'
            //     ]
            // },
            // 'box2d': {
            //     exports: 'Phaser.Physics.BOX2D',
            //     deps: [
            //         'phaser'
            //     ]
            // },
            // 'virtualjoystick': {
            //     exports: 'Phaser.VirtualJoystick',
            //     deps: [
            //         'phaser'
            //     ]
            // }
        }
    });
    require([
            'phaser',
            'game'
        ],
        function (Phaser, Game) {
            var game = new Game();
            game.start();
        }
    );
}());