define([
    'phaser'
], function(Phaser) {
    'use strict';

    function Play() {}
    Play.prototype = {
        constructor: Play,
        parentPosition: null,
        dragUpdate: function(sprite, pointer, dragX, dragY, snapPoint) {
            if (!this.parentPosition) {
                this.parentPosition = new Phaser.Point(
                    this.parent.x,
                    this.parent.y
                );
            }
            var spriteWidth = 32;
            this.parent.x = this.parentPosition.x + (dragX - spriteWidth);
            this.parent.y = this.parentPosition.y + (dragY - spriteWidth);
        },
        dragStop: function() {
            this.parentPosition = null;
        },
        inputUp: function() {
            var distance = this.parentPosition.distance(this.parent.position);
            var threshold = 4;
            console.log('distance: ', distance);
            if (distance >= threshold) {
                console.log('User is dragging.');
            } else {
                console.log('User is clicking.');
            }
        },
        getBitmapData: function(width, height, color) {
            var bmd = this.game.add.bitmapData(width, height);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, width, height);
            bmd.ctx.fillStyle = color;
            bmd.ctx.fill();
            return bmd;
        },
        addBackground: function() {
            var background = this.game.add.sprite(0, 0, 'background');
            background.width = this.game.width;
            background.height = this.game.height;
        },
        addParent: function() {
            var bmd = this.getBitmapData(128, 128, '#ff0000');
            this.parent = this.game.add.sprite(200, 200, bmd);
            this.parent.inputEnabled = true;
            this.parent.input.enableDrag();
        },
        addChild: function() {
            var bmd = this.getBitmapData(64, 64, '#ffff00');
            this.child = this.parent.addChild(this.game.add.sprite(32, 32, bmd));
            this.child.inputEnabled = true;
            this.child.input.priorityID = 1;
            this.child.input.pixelPerfectClick = true;
            this.child.input.setDragLock(false, false);
            this.child.input.enableDrag(false, false, true);
        },
        addEventListeners: function() {
            this.child.events.onDragUpdate.add(this.dragUpdate, this);
            this.child.events.onDragStop.add(this.dragStop, this);
            this.child.events.onInputUp.add(this.inputUp, this);
        },
        create: function create() {
            this.addBackground();
            this.addParent();
            this.addChild();
            this.addEventListeners();
        }
    };
    return Play;
});