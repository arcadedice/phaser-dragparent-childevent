define([
    'phaser'
], function (Phaser) {
    'use strict';
    function Play() {}
    Play.prototype = {
        constructor: Play,
        dragUpdate: function(sprite, pointer, dragX, dragY, snapPoint) {
            if (!this.parentPosition) {
                this.parentPosition = {
                    x: this.parent.x,
                    y: this.parent.y
                };
            }
            var spriteWidth = 32;
            this.parent.x = this.parentPosition.x + (dragX - spriteWidth);
            this.parent.y = this.parentPosition.y + (dragY - spriteWidth);
        },
        dragStop: function() {
            this.parentPosition = null;
        },
        create: function create() {
            var background = this.game.add.sprite(0, 0, 'background');
            background.width = this.game.width;
            background.height = this.game.height;
            // create a new bitmap data object
            var bmd = this.game.add.bitmapData(128,128);
            // draw to the canvas context like normal
            bmd.ctx.beginPath();
            bmd.ctx.rect(0,0,128,128);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.fill();
            // use the bitmap data as the texture for the sprite
            this.parent = this.game.add.sprite(200, 200, bmd);
            this.parent.inputEnabled = true;
            this.parent.input.enableDrag();

            this.parentPosition = null;

            // create a new bitmap data object
            var bmd = this.game.add.bitmapData(64,64);
            // draw to the canvas context like normal
            bmd.ctx.beginPath();
            bmd.ctx.rect(0,0,64,64);
            bmd.ctx.fillStyle = '#ffff00';
            bmd.ctx.fill();
            // use the bitmap data as the texture for the sprite
            var child = this.parent.addChild(this.game.add.sprite(32, 32, bmd));
            child.inputEnabled = true;
            child.input.priorityID = 1;
            child.inputEnabled = true;
            child.input.setDragLock(false, false);
            child.input.enableDrag();
            child.events.onDragUpdate.add(this.dragUpdate, this);
            child.events.onDragStop.add(this.dragStop, this);
            child.events.onInputUp.add(function() {
                // At this point you can use distance to determine whether the user is clicking or dragging
                console.log('You clicked on the child sprite.');
            }, this);
        }
    };
    return Play;
});