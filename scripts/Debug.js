var steamGame = steamGame || {}

steamGame.Game = function(){}

steamGame.Game.prototype = {
    /*init: function(startingHP) {
        this.player = this.player || {};
        this.player.maxHP = startingHP;
    },*/

    create: function(){
        /******************************KEY DECLARATIONS***********************************/
        //movement 
        upKey = this.game.input.keyboard.addKey(87) //w
        upArrow = this.game.input.keyboard.addKey(38); // ^
        leftKey = this.game.input.keyboard.addKey(65) //a
        leftArrow = this.game.input.keyboard.addKey(37); // <-
        downKey = this.game.input.keyboard.addKey(83) //s
        downArrow = this.game.input.keyboard.addKey(40); // v
        rightKey = this.game.input.keyboard.addKey(68) //d
        rightArrow = this.game.input.keyboard.addKey(39); // ->
        //other interactivity
        spaceKey = this.game.input.keyboard.addKey(32); //space for swipe
        selectKey = this.game.input.keyboard.addKey(27) //escape
        interactKey = this.game.input.keyboard.addKey(69) // e interact
        abilityKey = this.game.input.keyboard.addKey(81) // q ability
        abilityScreenKey = this.game.input.keyboard.addKey(9); // tab ability screen
        dashKey = this.game.input.keyboard.addKey(16); // shift dash
        enterKey = this.game.input.keyboard.addKey(13); // enter
        mapKey = this.game.input.keyboard.addKey(77) // m map

        debugKey = this.game.input.keyboard.addKey(48); // 0

        abilityScreenKey.onDown.add(this.abilityTrans, this);
        mapKey.onDown.add(this.mapTrans, this);
        selectKey.onDown.add(this.pause, this);

        this.game.input.keyboard.addKeyCapture(9);
        this.game.input.keyboard.addKeyCapture(27);

        //begin scene setup
        this.game.stage.backgroundColor = '#acbfbc';
        this.scalingFactor = (this.game.world.width / 19) / 32;
        this.map = this.game.add.tilemap('debugMap');
        this.map.addTilesetImage('DebugTiles', 'debugTiles');
        this.water = this.map.createLayer('water');
        this.water.setScale(this.scalingFactor);
        this.wall = this.map.createLayer('wall');
        this.wall.setScale(this.scalingFactor);
        this.wall.hit = false;
        this.game.physics.arcade.enable(this.wall);
        this.floor = this.map.createLayer('floor');
        this.floor.setScale(this.scalingFactor);
        this.decWall = this.map.createLayer('wall1');
        this.decWall.setScale(this.scalingFactor);
        this.decFloor = this.map.createLayer('floor1');
        this.decFloor.setScale(this.scalingFactor);
        
        //this.wall.debug = true;
        this.map.setCollisionBetween(4, 25, true, 'wall');
        this.water.resizeWorld();

        //set scene boundary
        //this.game.world.setBounds(0, 0, this.game.world.width, this.game.world.height);
 
        /*************************************SINGLE MOST VITAL PIECE: THE PLAYER************************************************/
        //player declaration
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + (this.scalingFactor * 32), 'milutin');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.swipe = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY);
        this.player.scale.setTo(this.scalingFactor * 2, this.scalingFactor * 2);
        this.player.animations.add('idleDown', [39, 39, 39, 39, 39, 40, 40, 40, 41, 41, 41, 39], 12, true);
        this.player.animations.add('idleLeft', [42, 42, 42, 42, 42, 43, 43, 43, 44, 44, 44, 42], 12, true);
        this.player.animations.add('idleRight', [42, 42, 42, 42, 42, 43, 43, 43, 44, 44, 44, 42], 12, true);
        this.player.animations.add('idleUp', [36, 36, 36, 36, 36, 37, 37, 37, 38, 38, 38, 36], 12, true);
        this.player.animations.add('runDown', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 12, true);
        this.player.animations.add('runLeft', [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 12, true);
        this.player.animations.add('runUp', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        this.player.animations.add('runRight', [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 12, true);
        this.player.animations.add('swipeUp', [45, 46, 47, 48], 12, true);
        this.player.animations.add('swipeDown', [49, 50, 51, 52], 12, true);
        this.player.animations.add('swipeSide', [53, 54, 55, 56], 12, true);
        this.player.animations.add('swipeUp2', [57, 58, 59, 60], 12, true);
        this.player.animations.add('swipeDown2', [61, 62, 63, 64], 12, true);
        this.player.animations.add('swipeSide2', [65, 66, 67, 68], 12, true);
        this.player.animations.add('swipeUp3', [69, 70, 71, 72], 12, true);
        this.player.animations.add('swipeDown3', [73, 74, 75, 76], 12, true);
        this.player.animations.add('swipeSide3', [77, 78, 79, 80], 12, true);
        this.player.animations.add('sit', [42, 84, 85, 86, 87, 88, 89, 90], 12, false);
        this.player.animations.add('seated', [90, 90, 90, 90, 90, 91, 91, 91, 92, 92, 92, 92, 90], 4, true);
        this.player.animations.add('stand', [90, 89, 88, 87, 86, 85, 84, 42], 12, false);
        this.player.animations.add('trip', [93, 94, 95, 96, 97, 98, 98, 98, 98, 98, 98, 100, 100, 100, 101, 101, 102, 103], 12, false);
        this.player.animations.add('winanSide', [104, 105, 106, 107], 12, false);
        this.player.animations.add('winanUp', [108, 109, 110, 111], 12, false);
        this.player.animations.add('winanDown', [112, 113, 114, 115], 12, false);
        this.player.animations.add('winanSide2', [106, 106, 106, 106, 106, 106, 106, 107], 12, true);
        this.player.animations.add('winanUp2', [110, 110, 110, 110, 110, 110, 110, 111], 12, true);
        this.player.animations.add('winanDown2', [114, 114, 114, 114, 114, 114, 114, 115], 12, true);
        this.game.physics.arcade.enable(this.player);
        this.player.body.enbable = true;
        this.player.speed = (this.scalingFactor * 320) / 3.2;
        this.player.body.setSize(12, 22, 10, 10);
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player, 1);

        this.game.physics.arcade.enable(this.player.swipe);
        this.player.swipe.x = this.player.body.x - (this.player.body.width * 0.25);
        this.player.swipe.y = this.player.body.y + this.player.body.height;
        this.player.swipe.anchor.setTo(0.35, 1.1);
        this.player.swipe.width = this.player.body.width * 1.5;
        this.player.swipe.height = 42 * this.scalingFactor;
        this.player.swipe.debug = true;
        //this.player.swipe.body.setSize(this.player.body.width, this.player.body.height);

        /****************ALSO VITAL: SAVE STATE INFORMATION / PLAYER DATA********************/
        //player object stuff declaration
        this.player.maxHP = this.playerData.maxHP || 6;
        this.player.currentHP = this.playerData.currentHP || this.player.maxHP;
        if (this.playerData.currentHP == 0) {
            this.player.currentHP = 0;
        }
        this.player.maxSteam = this.playerData.maxSteam || 100;
        this.player.currentSteam = this.playerData.currentSteam || this.player.maxSteam;
        this.player.maxEnergy = this.playerData.maxEnergy || 50;
        this.player.currentEnergy = this.playerData.currentEnergy || this.player.maxEnergy;
        this.player.currency = 0;
        this.player.currencyData = {};
        this.player.newC = this.playerData.newC || 0;
        //ability declarations
        this.player.hasBomb = this.playerData.hasBomb || 0;
        this.player.hasBoots = this.playerData.hasBoots || 0;
        this.player.hasExoArm = this.playerData.hasExoArm || 0;
        this.player.hasTaserSword = this.playerData.hasTaserSword || 0;
        this.player.hasWinan = this.playerData.hasWinan || 0;
        this.player.hasHook = this.playerData.hasHook || 0;
        this.player.hasSteamShield = this.playerData.hasSteamShield || 1;
        this.player.hasLightRod = this.playerData.hasLightRod || 0;
        this.player.hasBoomerang = this.playerData.hasBoomerang || 0;
        this.player.hasGreekFire = this.playerData.hasGreekFire || 0;
        this.player.hasStunBaton = this.playerData.hasStunBaton || 0;
        this.player.hasHammer = this.playerData.hasHammer || 0;
        this.player.curAbil = this.playerData.curAbil || null;

        this.player.timer = 75;
        this.player.newSLevel = 0;
        this.player.newELevel = 0;
        this.player.state = 'walk';
        this.player.combo = 0;
        this.idling = false;
        this.tripCount = 0;
        this.usingAbil = "none";

        this.debugText = {};

        //menustate declarations
        this.menuState = 'none';

        //testing object for slashing
        this.dummy = this.game.add.sprite(this.game.world.centerX + (500 * this.scalingFactor), this.game.world.centerY + (100 * this.scalingFactor), 'Dummy');
        this.game.physics.arcade.enable(this.dummy);
        this.dummy.hit = false;
        this.dummy.scale.setTo(this.scalingFactor * 2, this.scalingFactor * 2);
        this.dummy.maxHP = 3;
        this.dummy.currentHP = this.dummy.maxHP;
        this.dummy.body.immovable = true;

        this.ESign = this.game.add.sprite(this.game.world.centerX + (600 * this.scalingFactor), this.game.world.centerY - (400 * this.scalingFactor), 'signSheets');
        this.game.physics.arcade.enable(this.ESign);
        this.ESign.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ESign.frame = 1;
        this.ESign.body.immovable = true;

        this.CSign = this.game.add.sprite(this.game.world.centerX + (300 * this.scalingFactor), this.game.world.centerY - (400 * this.scalingFactor), 'signSheets');
        this.game.physics.arcade.enable(this.CSign);
        this.CSign.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.CSign.frame = 0;
        this.CSign.value = 10;
        this.CSign.body.immovable = true;

        this.SSign = this.game.add.sprite(this.game.world.centerX + (400 * this.scalingFactor), this.game.world.centerY - (400 * this.scalingFactor), 'signSheets');
        this.game.physics.arcade.enable(this.SSign);
        this.SSign.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.SSign.frame = 2;
        this.SSign.body.immovable = true;

        this.HPSign = this.game.add.sprite(this.game.world.centerX + (500 * this.scalingFactor), this.game.world.centerY - (400 * this.scalingFactor), 'signSheets');
        this.game.physics.arcade.enable(this.HPSign);
        this.HPSign.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.HPSign.frame = 3;
        this.HPSign.body.immovable = true;

        this.kronaTestG = this.game.add.sprite(this.game.world.centerX - (this.game.camera.width), this.game.world.centerY, 'KronaG');
        this.game.physics.arcade.enable(this.kronaTestG);
        this.kronaTestG.value = 60;
        this.kronaTestG.scale.setTo(this.scalingFactor * 1.1, this.scalingFactor * 1.1);

        this.kronaTestS = this.game.add.sprite(this.game.world.centerX - (this.game.camera.width - 70), this.game.world.centerY, 'KronaS');
        this.game.physics.arcade.enable(this.kronaTestS);
        this.kronaTestS.value = 36;
        this.kronaTestS.scale.setTo(this.scalingFactor * 1.1, this.scalingFactor * 1.1);

        this.kronaTestZ = this.game.add.sprite(this.game.world.centerX - (this.game.camera.width - 140), this.game.world.centerY, 'KronaZ');
        this.game.physics.arcade.enable(this.kronaTestZ);
        this.kronaTestZ.value = 12;
        this.kronaTestZ.scale.setTo(this.scalingFactor * 1.1, this.scalingFactor * 1.1);

        this.winanWeapon = this.add.weapon(20, 'steamBullet');
        this.winanWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.winanWeapon.bulletAngleOffset = 180;
        this.winanWeapon.bulletSpeed = this.player.speed * 0.025;
        this.winanWeapon.addBulletAnimation('spin', [0, 1, 2, 3], 12, true);
        this.winanWeapon.bullets.forEach((b) => {
            b.scale.setTo(this.scalingFactor * 1.5, this.scalingFactor * 1.5);
            b.body.updateBounds();
        }, this);
        this.winanWeapon.trackSprite(this.player, (this.player.width / 32) * -3, (this.player.width / 32) * 7);
        

        /***************************************ABSOLUTELY VITAL: UI SCRIPT*****************************************************/
        //Heart declaration
        for (i = 0; i < (this.player.maxHP/2); i++) {
            this.hPosX = 0;
            this.hSpawn;
            if(this['heart' + (i-1).toString()] != null){
                this.hPosX = i; 
            }
            if(this.hPosX > 0){
                this.hSpawn = this['heart' + (i - 1).toString()].width + this['heart' + (i - 1).toString()].x - 5;
            } else {
                this.hSpawn = 0;
            }
            this['heart' + i.toString()] = this.game.add.sprite(this.hSpawn + 5, 10 , 'heart');
            this['heart' + i.toString()].fixedToCamera = true;
            this['heart' + i.toString()].scale.setTo (this.scalingFactor*0.65,this.scalingFactor*0.65)
            this.highestHeart = i;
        }

        this.ticker = {};
        for (i = 0; i < 4; i++) {
            if (this.ticker['plate' + i.toString()] == null) {
                this.ticker.posx = this.game.camera.width * 0.8;
            } else {
                this.ticker.posx = this.ticker['plate' + i.toString()].x + this.ticker['plate' + i.toString()].width
            }
            this.ticker['plate' + (i + 1).toString()] = this.game.add.sprite(this.ticker.posx, 10, 'ticker');
            this.ticker['plate' + (i + 1).toString()].fixedToCamera = true;
            this.ticker['plate' + (i + 1).toString()].scale.setTo(this.scalingFactor * 2, this.scalingFactor * 2);
            this.ticker['plate' + (i + 1).toString()].animations.add('flip', [10, 11, 12, 13, 14, 15]);
        }
        this.ticker.logo = this.game.add.sprite(this.ticker.plate1.x, this.ticker.plate1.y, 'KronaL');
        this.ticker.logo.anchor.setTo(1, 0);
        this.ticker.logo.fixedToCamera = true;
        this.ticker.logo.scale.setTo(this.scalingFactor / 2, this.scalingFactor / 2);

        //steam meter declaration
        this.steamMeter = this.game.add.sprite(3, (this.heart0.y + (this.heart0.height * 4) + 5), 'steamMeter');
        this.steamMeter.frame = 0;
        this.steamMeter.fixedToCamera = true;
        this.steamMeter.anchor.setTo(0, 1);
        this.steamMeter.scale.setTo(this.scalingFactor * 0.65, this.scalingFactor * 0.65);

        this.steamLevel = this.game.add.sprite(3, (this.heart0.y + (this.heart0.height * 4) - (8 * (this.scalingFactor * 0.65))), 'steamMeter');
        this.steamLevel.frame = 1;
        this.steamLevel.fixedToCamera = true;
        this.steamLevel.anchor.setTo(0, 86/96);
        this.steamLevel.scale.setTo(this.scalingFactor * 0.65, this.scalingFactor * 0.65);

        //Elec Meter declaration
        this.elecMeter = this.game.add.sprite(this.steamMeter.x + this.steamMeter.width, (this.heart0.y + (this.heart0.height * 4) + 5), 'elecMeter');
        this.elecMeter.frame = 0;
        this.elecMeter.fixedToCamera = true;
        this.elecMeter.anchor.setTo(0, 1);
        this.elecMeter.scale.setTo(this.scalingFactor * 0.65, this.scalingFactor * 0.65);

        this.elecLevel = this.game.add.sprite(this.steamMeter.x + this.steamMeter.width, (this.heart0.y + (this.heart0.height * 4) - (8 * (this.scalingFactor * 0.65))), 'elecMeter');
        this.elecLevel.frame = 1;
        this.elecLevel.fixedToCamera = true;
        this.elecLevel.anchor.setTo(0, 86/96);
        this.elecLevel.scale.setTo(this.scalingFactor * 0.65, this.scalingFactor * 0.65);

        //frame declaration
        this.frame = this.game.add.sprite(this.game.camera.width, 8, 'frame');
        this.frame.anchor.setTo(1,0);
        this.frame.fixedToCamera = true;
        this.frame.scale.setTo(this.scalingFactor * 1.75, this.scalingFactor * 1.75);

        this.frameAbil = this.game.add.sprite(this.game.camera.width - ((this.frame.width - (32 * this.scalingFactor * 1.3)) / 2), 8 + ((this.frame.width - (32 * this.scalingFactor * 1.3)) / 2));
        this.frameAbil.anchor.setTo(1,0);
        this.frameAbil.fixedToCamera = true;
        this.frameAbil.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.frameAbil.name = 'none';


        /*******************************************MENU SCREENS********************************************/
        //ability screen above
        this.abilityScreenBack = this.game.add.sprite(this.game.camera.x + (this.game.camera.width / 2), this.game.camera.y - (this.game.camera.height / 2), 'abilityBack');
        this.abilityScreenBack.anchor.setTo(0.5, 0.5);
        this.abilityScreenBack.width = this.game.camera.width / 1.5;
        this.abilityScreenBack.height = this.game.camera.height * 0.8;
        this.ASGroup = this.game.add.group();
        this.ASGroup.add(this.abilityScreenBack);
        this.ASGroup.fixedToCamera = true;
        this.ASGroup.stationary = true;
        this.ASGroup.pos = 'up';

        //ROW 1
        //winan 
        this.ASWinan = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * 32), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 2 * 32), 'Winan');
        this.ASWinan.anchor.setTo(0.5, 0.5);
        this.ASWinan.frame = 1;
        this.ASWinan.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASWinan);
        //hook 
        this.ASHook = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * 18), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 2 * 32), 'Hook');
        this.ASHook.anchor.setTo(0.5, 0.5);
        this.ASHook.frame = 1;
        this.ASHook.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASHook);
        //steamShield 
        this.ASSteamShield = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * 4), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 2 * 32), 'SteamShield');
        this.ASSteamShield.anchor.setTo(0.5, 0.5);
        this.ASSteamShield.frame = 1;
        this.ASSteamShield.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASSteamShield);
         //lightRod 
        this.ASLightRod = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * -10), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 2 * 32), 'LightRod');
        this.ASLightRod.anchor.setTo(0.5, 0.5);
        this.ASLightRod.frame = 1;
        this.ASLightRod.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASLightRod);
        
        //ROW 2
        //Baton
        this.ASStunBaton = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * 32), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 0 * 32), 'StunBaton');
        this.ASStunBaton.anchor.setTo(0.5, 0.5);
        this.ASStunBaton.frame = 1;
        this.ASStunBaton.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASStunBaton);
        //boomerang
        this.ASBoomerang = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * 18), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 0 * 32), 'Boomerang');
        this.ASBoomerang.anchor.setTo(0.5, 0.5);
        this.ASBoomerang.frame = 1;
        this.ASBoomerang.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASBoomerang);
        //greek fire
        this.ASGreekFire = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * 4), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 0 * 32), 'GreekFire');
        this.ASGreekFire.anchor.setTo(0.5, 0.5);
        this.ASGreekFire.frame = 1;
        this.ASGreekFire.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASGreekFire);
        //blank
        this.ASHammer = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * -10), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 0 * 32), 'Hammer');
        this.ASHammer.anchor.setTo(0.5, 0.5);
        this.ASHammer.frame = 1;
        this.ASHammer.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASHammer);

        //ROW 3
        //bomb 
        this.ASBomb = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * 32), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * -2 * 32), 'Bomb');
        this.ASBomb.anchor.setTo(0.5, 0.5);
        this.ASBomb.frame = 1;
        this.ASBomb.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASBomb);
        //blank 
        this.ASBoots = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * 18), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * -2 * 32), 'Boots');
        this.ASBoots.anchor.setTo(0.5, 0.5);
        this.ASBoots.frame = 1;
        this.ASBoots.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASBoots);
        //blank 
        this.ASBoots = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * 4), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * -2 * 32), 'Boots');
        this.ASBoots.anchor.setTo(0.5, 0.5);
        this.ASBoots.frame = 1;
        this.ASBoots.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASBoots);
        //blank 
        this.ASBoots = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * -10), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * -2 * 32), 'Boots');
        this.ASBoots.anchor.setTo(0.5, 0.5);
        this.ASBoots.frame = 1;
        this.ASBoots.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASBoots);

        //equipment section
        this.ASBoots = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * -29), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * -1.6 * 32), 'Boots');
        this.ASBoots.anchor.setTo(0.5, 0.5);
        this.ASBoots.frame = 1;
        this.ASBoots.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASBoots);

        this.ASArm = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * -35), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * -2.3 * 32), 'ExoArm');
        this.ASArm.anchor.setTo(0.5, 0.5);
        this.ASArm.frame = 1;
        this.ASArm.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASArm);

        this.ASSword = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * -31.7), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 0 * 32), 'menuSword');
        this.ASSword.anchor.setTo(0.5, 0.5);
        this.ASSword.frame = 0;
        this.ASSword.scale.setTo(this.scalingFactor * 1.3, this.scalingFactor * 1.3);
        this.ASGroup.add(this.ASSword);

        this.ASCouncil = this.game.add.sprite((this.game.camera.width / 2) - (this.scalingFactor * 4.8 * -31.7), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * 2 * 32), 'Council');
        this.ASCouncil.anchor.setTo(0.5, 0.5);
        this.ASCouncil.frame = 0;
        this.ASCouncil.scale.setTo(this.scalingFactor * 2.6, this.scalingFactor * 2.6);
        this.ASGroup.add(this.ASCouncil);

        this.ASSelector = this.game.add.sprite((this.game.camera.width * 3) - (this.scalingFactor * 4.8 * -10), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * -2 * 32), 'selector');
        this.ASSelector.anchor.setTo(0.5, 0.5);
        this.ASSelector.scale.setTo(this.scalingFactor * 1.7, this.scalingFactor * 1.7);
        this.ASGroup.add(this.ASSelector);
        
        
       

        this.ASGroup.maxH = this.abilityScreenBack.cameraOffset.y;
        this.ASGroup.selPos = {};
        if(this.player.curAbil == null) {
        } else if (this.player.curAbil == 'Winan') {
            this.ASGroup.curPos = 1;
        } else if (this.player.curAbil == 'Hook') {
            this.ASGroup.curPos = 2;
        } else if (this.player.curAbil == 'SteamShield') {
            this.ASGroup.curPos = 3;
        } else if (this.player.curAbil == 'LightRod') {
            this.ASGroup.curPos = 4;
        } else if (this.player.curAbil == 'StunBaton') {
            this.ASGroup.curPos = 5;
        } else if (this.player.curAbil == 'Boomerang') {
            this.ASGroup.curPos = 6;
        } else if (this.player.curAbil == 'GreekFire') {
            this.ASGroup.curPos = 7;
        } else if (this.player.curAbil == 'Hammer') {
            this.ASGroup.curPos = 8;
        } else if (this.player.curAbil == 'Bomb') {
            this.ASGroup.curPos = 9;
        }
        if (this.player.curAbil != null) {
            this.hasItems = true;
        }
        this.ASGroup.curAbil = this.player.curAbil;
        //map screen to the bottom
        this.mapOverworld = this.game.add.sprite(0, 0, 'mapOverworld');
        this.mapOverworld.anchor.setTo(0.5, 0.5);
        this.mapOverworld.width = this.game.camera.width / 1.5;
        this.mapOverworld.height = this.game.camera.height * 0.8;
        this.mapGroup = this.game.add.group();
        this.mapGroup.add(this.mapOverworld);
        this.mapGroup.fixedToCamera = true;
        this.mapGroup.stationary = true;
        this.mapGroup.pos = 'down';

        this.milutinHead = this.game.add.sprite((this.game.camera.width / 20) - (this.scalingFactor * 17 * 10), this.abilityScreenBack.cameraOffset.y - (this.scalingFactor * -2 * 45), 'milutinHead');
        this.milutinHead.anchor.setTo(0.5, 0.5);
        this.milutinHead.frame = 0;
        this.milutinHead.scale.setTo(this.scalingFactor * 2.2, this.scalingFactor * 2.2);
        this.mapGroup.add(this.milutinHead);
        this.milutinHead.animations.add('Blink');
        this.milutinHead.animations.play('Blink', 1.5, true);

        this.mapGroup.maxH = this.game.camera.height * 1.5;
        this.mapGroup.cameraOffset = {
            x: this.game.camera.width / 2,
            y: this.game.camera.height * 1.5
        }
        //pause appear
        this.pauseMenu = this.game.add.sprite(this.game.camera.width / 2, this.game.camera.height / 2, 'plaque');
        this.pauseMenu.anchor.setTo(0.5, 0.5);
        this.pauseMenu.width = this.game.camera.width / 2;
        this.pauseMenu.height = this.game.camera.height * 0.6;
        this.pauseGroup = this.game.add.group();
        this.pauseGroup.add(this.pauseMenu);
        this.pauseGroup.fixedToCamera = true;
        this.pauseGroup.stationary = true;
        this.pauseGroup.pos = 'gone';
        this.pauseGroup.alpha = 0;

        this.pauseText = this.game.add.bitmapText(this.game.camera.width / 2, (this.game.camera.height / 2) - (this.pauseMenu.height / 3), 'pixelFont', 'Pause', 15);
        this.pauseText.anchor.setTo(0.5, 0.5);
        this.pauseText.scale.setTo(this.scalingFactor * 2.2, this.scalingFactor * 2.2);
        this.pauseGroup.add(this.pauseText);

        this.pauseTextC = this.game.add.bitmapText(this.game.camera.width / 2, (this.game.camera.height / 2) - (this.pauseMenu.height / 12), 'pixelFont', 'Continue', 10);
        this.pauseTextC.anchor.setTo(0.5, 0.5);
        this.pauseTextC.scale.setTo(this.scalingFactor * 2.2, this.scalingFactor * 2.2);
        this.pauseGroup.add(this.pauseTextC);

        this.pauseTextS = this.game.add.bitmapText(this.game.camera.width / 2, (this.game.camera.height / 2) + (this.pauseMenu.height / 12), 'pixelFont', 'Save', 10);
        this.pauseTextS.anchor.setTo(0.5, 0.5);
        this.pauseTextS.scale.setTo(this.scalingFactor * 2.2, this.scalingFactor * 2.2);
        this.pauseGroup.add(this.pauseTextS);

        this.pauseTextSQ = this.game.add.bitmapText(this.game.camera.width / 2, (this.game.camera.height / 2) + (this.pauseMenu.height / 4), 'pixelFont', 'Save and Quit', 10);
        this.pauseTextSQ.anchor.setTo(0.5, 0.5);
        this.pauseTextSQ.scale.setTo(this.scalingFactor * 2.2, this.scalingFactor * 2.2);
        this.pauseGroup.add(this.pauseTextSQ);

        this.pausePointer = this.game.add.sprite((this.game.camera.width / 2) - (this.pauseTextSQ.width * (2 / 3)), (this.game.camera.height / 2) - (this.pauseMenu.height / 12), 'menuPointer');
        this.pausePointer.anchor.setTo(1, 0.5);
        this.pauseTextSQ.scale.setTo(this.scalingFactor * 2.2, this.scalingFactor * 2.2);
        this.pausePointer.animations.add('spin', [0, 0, 1, 2, 3, 4, 4, 3, 2, 1]);
        this.pausePointer.animations.play('spin', 12, true)
        this.pausePointer.pos = 1;
        this.pauseGroup.add(this.pausePointer);
        
        /*********************************************fade to black tiles***********************************************************/
        this.fade = this.game.add.tileSprite(this.game.camera.x, this.game.camera.y, this.game.camera.width, this.game.camera.height, 'black');
        this.fade.fixedToCamera = true;
        this.fade.alpha = 1;

    },
    update: function(){
        /***************************************** Collision handler for player vs. layers and debug text ***************************************************************/
        if (this.fade.alpha == 1 && this.intro == null) {
            this.game.add.tween(this.fade).to({alpha: 0}, 500, null, true);
            this.intro = true;
        }
        /*if (debugKey.isDown) {
            this.debugText = this.debugText || {};
            //this.playerData1_2 = window.localStorage.getItem('playerData');
            //this.playerData2 = JSON.parse(this.playerData1_2);
            //this.debugText.HP = this.game.debug.text('Save Data: ' + this.playerData1_2, this.game.world.centerX - 1900, this.game.camera.height - 150, null, 'rgb(0, 0, 0)');
            this.game.debug.text('True health: ' + this.player.currentHP, this.game.camera.width - 150, this.game.camera.height - 150, null, 'rgb(0, 0, 0)');
            //this.debugText.HPC = this.game.debug.text('Health collision timer: ' + this.player.timer, this.game.world.centerX - 150, this.game.camera.height - 135, null, 'rgb(0, 0, 0)');
            //this.debugText.HPC = this.game.debug.text('active data: ' + this.player.curAbil, this.game.world.centerX - 900, this.game.camera.height - 135, null, 'rgb(0, 0, 0)');
            //this.debugText.SL = this.game.debug.text('True steam level: ' + this.player.currentSteam, this.game.world.centerX - 150, this.game.camera.height - 120, null, 'rgb(0, 0, 0)');
            this.debugText.HPD = this.game.debug.text('Dummy health: ' + this.playerData.currentHP, this.game.camera.width - 150, this.game.camera.height - 120, null, 'rgb(0, 0, 0)');
            //this.debugText.SC = this.game.debug.text('Steam counter timer:' + this.player.newSLevel, this.game.world.centerX - 150, this.game.camera.height - 105, null, 'rgb(0, 0, 0)');
            //this.debugText.MS = this.game.debug.text('menu state:' + this.menuState, this.game.world.centerX - 150, this.game.camera.height - 105, null, 'rgb(0, 0, 0)');
            //this.debugText.MS = this.game.debug.text('mapPos:' + (this.ASGroup.curPos + 1), this.game.world.centerX - 150, this.game.camera.height - 105, null, 'rgb(0, 0, 0)');
            this.debugText.TC = this.game.debug.text('curAbil:' + this.ASGroup.curAbil, this.game.camera.width - 150, this.game.camera.height - 105, null, 'rgb(0, 0, 0)');
            this.debugText.EL = this.game.debug.text('True energy: ' + this.player.currentEnergy, this.game.world.centerX - 150, this.game.camera.height - 90, null, 'rgb(0, 0, 0)');
            this.debugText.K = this.game.debug.text('Currency: ' + (this.player.currency + 10), this.game.world.centerX - 150, this.game.camera.height - 75, null, 'rgb(0, 0, 0)');
            this.debugText.KC = this.game.debug.text('Currency change: ' + (this.player.newC + 10), this.game.world.centerX - 150, this.game.camera.height - 60, null, 'rgb(0, 0, 0)');
            this.debugText.DIR = this.game.debug.text('Active direction: ' + this.direction, this.game.world.centerX - 150, this.game.camera.height - 45, null, 'rgb(0, 0, 0)');

            this.debugText.PLYR = this.game.debug.body(this.player);
            this.debugText.PLYRS = this.game.debug.body(this.player.swipe);
            this.debugText.DB = this.game.debug.body(this.dummy);
            
            if (this.player.currency < 9990) {
                this.player.newC += 10;
            } else if (this.player.currency >= 9990 && this.player.currency < 9999){
                this.player.newC += 1;
            }
        }*/
        /*if (debugKey.isUp) {
            this.debugText.destroy();
        }*/

        this.game.physics.arcade.collide(this.player, this.wall);
        //this.game.physics.arcade.collide(this.player, this.wall, this.debugSteam);
        //this.game.physics.arcade.collide(this.player, this.wall, this.debugHurt, null, this);
        this.game.physics.arcade.collide(this.player, this.kronaTestG, this.collect, null, this);
        this.game.physics.arcade.collide(this.player, this.kronaTestS, this.collect, null, this);
        this.game.physics.arcade.collide(this.player, this.kronaTestZ, this.collect, null, this);
        this.game.physics.arcade.collide(this.player, this.CSign, this.collect, null, this);
        this.game.physics.arcade.collide(this.player, this.ESign, this.debugElec, null, this);
        this.game.physics.arcade.collide(this.player, this.SSign, this.debugSteam, null, this);
        this.game.physics.arcade.collide(this.player, this.HPSign, this.debugHurt, null, this);
        this.game.physics.arcade.overlap(this.player.swipe, this.dummy, this.debugSwipe, null, this);
        this.game.physics.arcade.collide(this.winanWeapon.bullets, this.dummy, this.debugSwipe, null, this);
        if (this.menuState == 'none') {
            /***************************************** Player HP manager ******************************************************************************************/
            if (this.player.currentHP < this.player.maxHP) {
                this.player.diffHP = this.player.maxHP - this.player.currentHP;
                if(this.player.diffHP > 0) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + this.highestHeart.toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 1) {
                        this['heart' + this.highestHeart.toString()].frame = 2;
                    }
                }
                if(this.player.diffHP > 2) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + (this.highestHeart - 1).toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 3) {
                        this['heart' + (this.highestHeart - 1).toString()].frame = 2;
                    }
                }
                if(this.player.diffHP > 4) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + (this.highestHeart - 2).toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 5) {
                        this['heart' + (this.highestHeart - 2).toString()].frame = 2;
                    }
                }
                if(this.player.diffHP > 6 && this['heart' + (this.highestHeart - 3).toString()] != null) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + (this.highestHeart - 3).toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 7) {
                        this['heart' + (this.highestHeart - 3).toString()].frame = 2;
                    }
                }
                if(this.player.diffHP > 8 && this['heart' + (this.highestHeart - 4).toString()] != null) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + (this.highestHeart - 4).toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 9) {
                        this['heart' + (this.highestHeart - 4).toString()].frame = 2;
                    }
                }
                if(this.player.diffHP > 10 && this['heart' + (this.highestHeart - 5).toString()] != null) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + (this.highestHeart - 5).toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 11) {
                        this['heart' + (this.highestHeart - 5).toString()].frame = 2;
                    }
                }
                if(this.player.diffHP > 12 && this['heart' + (this.highestHeart - 6).toString()] != null) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + (this.highestHeart - 6).toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 13) {
                        this['heart' + (this.highestHeart - 6).toString()].frame = 2;
                    }
                }
                if(this.player.diffHP > 14 && this['heart' + (this.highestHeart - 7).toString()] != null) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + (this.highestHeart - 7).toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 15) {
                        this['heart' + (this.highestHeart - 7).toString()].frame = 2;
                    }
                }
                if(this.player.diffHP > 16 && this['heart' + (this.highestHeart - 8).toString()] != null) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + (this.highestHeart - 8).toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 17) {
                        this['heart' + (this.highestHeart - 8).toString()].frame = 2;
                    }
                }
                if(this.player.diffHP > 18 && this['heart' + (this.highestHeart - 9).toString()] != null) {
                    if(this.player.diffHP % 2 != 0) {
                        this['heart' + (this.highestHeart - 9).toString()].frame = 1;
                    }
                    if(this.player.diffHP % 2 == 0 || this.player.diffHP > 19) {
                        this['heart' + (this.highestHeart - 9).toString()].frame = 2;
                    }
                }
                if (this.player.currentHP <= 0) {
                    if (this.fade.alpha == 0) {
                        this.game.add.tween(this.fade).to({alpha: 1}, 500, null, true);
                        if (this.frameAbil != null) {
                            this.frameAbil.name == "none";
                            this.frameAbil.destroy();
                        }
                    }
                }
            }

            /***************************************** Player Steam Handler **********************************************************************************************/
            if (this.player.currentSteam < this.player.maxSteam) {
                if (this.player.currentSteam <= 0) {
                    this.player.currentSteam = 0.01;
                }
                this.diffSteam = this.player.currentSteam / this.player.maxSteam;
                this.steamLevel.scale.setTo(this.scalingFactor * 0.65, this.scalingFactor * (0.65 * this.diffSteam));
                this.steamLevel.y += this.diffSteam * this.scalingFactor * 0.65
            } else {
                this.steamLevel.scale.setTo(this.scalingFactor * 0.65, this.scalingFactor * 0.65);
            }

            /***************************************** Player Electricity Handler **********************************************************************************************/
            if (this.player.currentEnergy < this.player.maxEnergy) {
                if (this.player.currentEnergy <= 0) {
                    this.player.currentEnergy = 0.01;
                }
                this.diffEnergy = this.player.currentEnergy / this.player.maxEnergy;
                this.elecLevel.scale.setTo(this.scalingFactor * 0.65, this.scalingFactor * (0.65 * this.diffEnergy));
                this.elecLevel.y += this.diffEnergy * this.scalingFactor * 0.65
            } else {
                this.elecLevel.scale.setTo(this.scalingFactor * 0.65, this.scalingFactor * 0.65);
            }

            /***************************************** Player Movement Handling ******************************************************************************************/
            if (this.player.state == 'hurt' && this.knockbackTimer == null) {
                this.knockbackTimer = this.game.time.events.add(Phaser.Timer.SECOND * 0.15, function(){ this.player.body.velocity.x = 0; this.player.body.velocity.y = 0; this.player.swipe.body.velocity.x = 0; this.player.swipe.body.velocity.y = 0; }, this);
                this.knockbackTimer = this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){ this.player.state = 'walk'; }, this);
            } if (this.player.state == 'hurt') {
                if (this.direction == 'right') {
                    this.player.frame = 83;
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'left') {
                    this.player.frame = 83;
                    if (this.player.scale.x > 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'up') {
                    this.player.frame = 81;
                }
                if (this.direction == 'down') {
                    this.player.frame = 82;
                }
            }
            if (this.player.state == 'walk') {
                this.game.time.events.remove(this.knockbackTimer);
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
                this.player.swipe.body.velocity.x = 0;
                this.player.swipe.body.velocity.y = 0;
                if (upKey.isDown || upArrow.isDown) {
                    this.player.body.velocity.y = -this.player.speed * 0.9;
                    this.player.swipe.body.velocity.y = -this.player.speed * 0.9;
                } else if (downKey.isDown || downArrow.isDown) {
                    this.player.body.velocity.y = this.player.speed * 0.9;
                    this.player.swipe.body.velocity.y = this.player.speed * 0.9;
                }
                if (rightKey.isDown || rightArrow.isDown) {
                    this.player.body.velocity.x = this.player.speed;
                    this.player.swipe.body.velocity.x = this.player.speed;
                } else if (leftKey.isDown || leftArrow.isDown) {
                    this.player.body.velocity.x = -this.player.speed;
                    this.player.swipe.body.velocity.x = -this.player.speed;
                }
            }
            if(spaceKey.duration < 1 && spaceKey.isDown && this.player.combo < 3) {
                if (this.player.state != 'attack') {
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = 0;
                    this.player.swipe.body.velocity.x = 0;
                    this.player.swipe.body.velocity.y = 0;
                    this.sitTimed = false;
                    if (this.player.combo == 0) {
                        if(this.direction == 'up') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeUp';
                        } else if(this.direction == 'down') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeDown';
                        } else if(this.direction == 'left') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeSide';
                        } else if(this.direction == 'right') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeSide';
                        }
                        this.player.combo = 1;
                        this.game.time.events.add(Phaser.Timer.SECOND * (1/3), function(){
                            this.player.state = 'walk';
                            this.game.time.events.remove(this.idleTimer1);
                            this.idling = false;
                        }, this);
                        this.comboTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * (2/3), function(){ this.player.combo = 0; }, this);
                    }
                    else if (this.player.combo == 1) {
                        if(this.direction == 'up') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeUp2';
                            this.player.body.velocity.y = -this.player.speed * 1.5;
                            this.player.swipe.body.velocity.y = -this.player.speed * 1.5;
                        } else if(this.direction == 'down') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeDown2';
                            this.player.body.velocity.y = this.player.speed * 1.5;
                            this.player.swipe.body.velocity.y = this.player.speed * 1.5;
                        } else if(this.direction == 'left') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeSide2';
                            this.player.body.velocity.x = -this.player.speed * 1.5;
                            this.player.swipe.body.velocity.x = -this.player.speed * 1.5;
                        } else if(this.direction == 'right') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeSide2';
                            this.player.body.velocity.x = this.player.speed * 1.5;
                            this.player.swipe.body.velocity.x = this.player.speed * 1.5;
                        }
                        this.player.combo = 2;
                        this.game.time.events.remove(this.comboTimer1);
                        this.game.time.events.add(Phaser.Timer.SECOND * (0.15), function(){ this.player.body.velocity.x = 0; this.player.body.velocity.y = 0; this.player.body.velocity.y = 0; this.player.swipe.body.velocity.x = 0; this.player.swipe.body.velocity.y = 0; }, this);
                        this.game.time.events.add(Phaser.Timer.SECOND * (1/3), function(){
                            this.player.state = 'walk';
                            this.game.time.events.remove(this.idleTimer1);
                            this.idling = false;
                        }, this);
                        this.comboTimer2 = this.game.time.events.add(Phaser.Timer.SECOND * (2/3), function(){ this.player.combo = 0; }, this);
                    }
                    else if (this.player.combo == 2) {
                        if(this.direction == 'up') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeUp3';
                            this.player.body.velocity.y = -this.player.speed * 2;
                            this.player.swipe.body.velocity.y = -this.player.speed * 2;
                        } else if(this.direction == 'down') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeDown3';
                            this.player.body.velocity.y = this.player.speed * 2;
                            this.player.swipe.body.velocity.y = this.player.speed * 2;
                        } else if(this.direction == 'left') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeSide3';
                            this.player.body.velocity.x = -this.player.speed * 2;
                            this.player.swipe.body.velocity.x = -this.player.speed * 2;
                        } else if(this.direction == 'right') {
                            this.player.state = 'attack';
                            this.animationName = 'swipeSide3';
                            this.player.body.velocity.x = this.player.speed * 2;
                            this.player.swipe.body.velocity.x = this.player.speed * 2;
                        }
                        this.player.combo = 3;
                        this.game.time.events.remove(this.comboTimer2);
                        this.game.time.events.add(Phaser.Timer.SECOND * (0.15), function(){ this.player.body.velocity.x = 0; this.player.body.velocity.y = 0; this.player.swipe.body.velocity.x = 0; this.player.swipe.body.velocity.y = 0; }, this);
                        this.game.time.events.add(Phaser.Timer.SECOND * (1/3), function(){
                            this.player.state = 'walk';
                            this.game.time.events.remove(this.idleTimer1);
                            this.idling = false;
                            this.player.combo = 0;
                        }, this);
                        
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * (2/3), function(){
                        spaceKey.duration = 0;
                    }, this);
                }
            }

            /************************************** Animation Controller for Player movement *****************************************************************************/
            this.direction = this.direction || 'down';
            if (this.player.state == 'walk') {
                if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0 && this.idling == false) {
                    this.idleTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 20, function(){ this.animationName = 'sit'; this.idling = "seated"; this.direction = "right"; }, this);
                    this.game.time.events.remove(this.standTimer);
                    this.game.time.events.remove(this.sitTimer);
                    this.animationName = "stopped";
                    this.idling = true;
                }

                if (this.idling == "seated") {
                    this.direction = "right";
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = -this.player.scale.x
                    }
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = 0;
                    this.player.swipe.body.velocity.x = 0;
                    this.player.swipe.body.velocity.y = 0;
                    if (this.player.animations.name == "sit" && this.sitTiming != true) {
                        this.sitTimer = this.game.time.events.add(Phaser.Timer.SECOND * 0.66, function () { this.sitTimed = true; this.sitTiming = false; this.animationName = "seated"; }, this);
                        this.sitTiming = true;
                    }
                    if (this.sitTimed == true) {
                        this.animationName = "seated";
                    }

                    if (upKey.isDown || upArrow.isDown || downKey.isDown || downArrow.isDown || leftKey.isDown || leftArrow.isDown || rightKey.isDown || rightArrow.isDown) {
                        if (this.player.animations.name == "seated") {
                            this.standTimer = this.game.time.events.add(Phaser.Timer.SECOND * (2/3), function() { this.idling = false; }, this);
                            this.animationName = 'stand';
                            this.sitTimed = false;
                        }
                    }
                }

                if (this.tripCount >= 20) {
                    this.player.state = "trip";
                    this.player.body.velocity.x = 0;
                    this.player.swipe.body.velocity.x = 0;
                    this.player.body.velocity.y = 0;
                    this.player.swipe.body.velocity.y = 0;
                    this.animationName = "trip";
                    if (this.tripTiming != true) {
                        this.tripTiming = true;
                        this.tripoverride = this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function() { this.player.state = "walk"; this.tripTiming = false; this.tripCount = 0; }, this);
                    }
                }
            //WINAN USAGE
                if (this.hasItems == true) {
                    if (abilityKey.isDown && abilityKey.duration < 2) {
                        if (this.ASGroup.curAbil == "Winan" && this.usingAbil == "none") {
                            this.sitTimed = false;
                            this.usingAbil = "Winan";
                            if (this.direction == "left" || this.direction == "right") {
                                this.animationName = "winanSide";
                                if (this.direction == "left") {
                                    this.winanWeapon.fireAngle = 180;
                                    this.winanWeapon.bulletSpeed = this.player.speed * 2.5;
                                    //this.winanWeapon.bulletAngleOffset =
                                    this.winanWeapon.trackSprite(this.player, (this.player.width / 32) * -11, (this.player.width / 32) * -3.5);
                                }
                                if (this.direction == "right") {
                                    this.winanWeapon.fireAngle = 0;
                                    this.winanWeapon.bulletSpeed = this.player.speed * 2.5;
                                    this.winanWeapon.trackSprite(this.player, (this.player.width / 32) * -11, (this.player.width / 32) * 3.5);
                                }
                            } else if (this.direction == "up") {
                                this.animationName = "winanUp";
                                this.winanWeapon.fireAngle = 270;
                                this.winanWeapon.bulletSpeed = this.player.speed * 2.5;
                                this.winanWeapon.trackSprite(this.player, (this.player.width / 32) * 5, (this.player.width / 32) * -15);
                            } else if (this.direction == "down") {
                                this.animationName = "winanDown";
                                this.winanWeapon.fireAngle = 90;
                                this.winanWeapon.bulletSpeed = this.player.speed * 2.5;
                                this.winanWeapon.trackSprite(this.player, (this.player.width / 32) * -3, (this.player.width / 32) * 7);
                            }
                            if (this.usingTiming != true) {
                                this.usingTimer = this.game.time.events.add(Phaser.Timer.SECOND * (1/2), function(){
                                    this.usingAbil = "none"; 
                                    abilityKey.duration = 0; 
                                    this.usingTiming = false; 
                                    this.refuel = false;
                                    if (this.direction == "left") {
                                        this.animationName = "idleLeft";
                                    }
                                    if (this.direction == "right") {
                                       this.animationName = "idleRight";
                                    }
                                    if (this.direction == "up") {
                                        this.animationName = "idleUp";
                                    }
                                    if (this.direction == "down") {
                                        this.animationName = "idleDown";
                                    }
                                    this.usingTiming = false;
                                }, this);
                                this.usingTiming = true;
                            }
                            this.idling = true;
                            this.game.time.events.remove(this.idleTimer1);
                        }
                    }
                    
                    if (abilityKey.duration > 490 && abilityKey.isDown) {
                        if (this.ASGroup.curAbil == "Winan" && this.usingAbil == "Winan") {
                            this.sitTimed = false;
                            this.usingAbil = "Winan2";
                            this.game.time.events.remove(this.usingTimer);
                            this.game.time.events.remove(this.usingTimer2);
                            this.usingTiming = false;
                            if (this.direction == "left" || this.direction == "right") {
                                this.animationName = "winanSide2";
                            } else if (this.direction == "up") {
                                this.animationName = "winanUp2";
                            } else if (this.direction == "down") {
                                this.animationName = "winanDown2";
                            }
                            if (this.usingTiming != true) {
                                this.refuel = false;
                                this.usingTimer = this.game.time.events.add(Phaser.Timer.SECOND * (2/3), function(){ this.usingAbil = "Winan"; this.usingTiming = false; this.refuel = false; }, this);
                                this.usingTimer2 = this.game.time.events.add(Phaser.Timer.SECOND * 0.7, function(){
                                    this.usingAbil = "none"; 
                                    abilityKey.duration = 0; 
                                    this.usingTiming = false; 
                                    this.refuel = false;
                                    if (this.direction == "left") {
                                        this.animationName = "idleLeft";
                                    }
                                    if (this.direction == "right") {
                                       this.animationName = "idleRight";
                                    }
                                    if (this.direction == "up") {
                                        this.animationName = "idleUp";
                                    }
                                    if (this.direction == "down") {
                                        this.animationName = "idleDown";
                                    }
                                    this.usingTiming = false;
                                }, this);
                                this.usingTiming = true;
                            }
                            this.idling = true;
                            this.game.time.events.remove(this.idleTimer1);
                        }
                    }

                    if (this.usingAbil == "Winan" || this.usingAbil == "Winan2") {
                        this.player.body.velocity.x = 0;
                        this.player.body.velocity.y = 0;
                        this.player.swipe.body.velocity.x = 0;
                        this.player.swipe.body.velocity.y = 0;
                        if (this.refuel != true) {
                            if (this.usingAbil == "Winan") {
                                this.shootTimer = this.game.time.events.add(Phaser.Timer.SECOND * (1/4), function(){ 
                                    if (this.player.currentSteam >= 10) {
                                        this.winanWeapon.fire();
                                        this.player.currentSteam -= 10;
                                    }
                                }, this);
                            } else if (this.usingAbil == "Winan2") {
                                this.shootTimer = this.game.time.events.add(Phaser.Timer.SECOND * (7/12), function(){ 
                                    if (this.player.currentSteam >= 10) {
                                        this.winanWeapon.fire();
                                        this.player.currentSteam -= 10;
                                    }
                                }, this);
                            }
                            this.refuel = true;
                        }
                    }

                    if (abilityKey.isUp && this.usingAbil == 'Winan2') {
                        this.usingAbil = "none"; 
                        abilityKey.duration = 0; 
                        this.usingTiming = false; 
                        this.refuel = false;
                        if (this.direction == "left") {
                            this.animationName = "idleLeft";
                        }
                        if (this.direction == "right") {
                            this.animationName = "idleRight";
                        }
                        if (this.direction == "up") {
                            this.animationName = "idleUp";
                        }
                        if (this.direction == "down") {
                            this.animationName = "idleDown";
                        }
                        this.usingTiming = false;
                        this.game.time.events.remove(this.usingTimer);
                        this.game.time.events.remove(this.usingTimer2);
                        this.game.time.events.remove(this.shootTimer);

                    }
                }
                //SHIELD USAGE
                if (this.hasItems == true) {
                    if (abilityKey.isDown && abilityKey.duration < 2) {
                        if (this.ASGroup.curAbil == "SteamShield" && this.usingAbil == "none") {
                            this.sitTimed = false;
                            this.usingAbil = "SteamShield";
                            if (this.direction == "left" || this.direction == "right") {
                                this.animationName = "winanSide";
                                if (this.usingTiming != true) {
                                    this.usingTimer = this.game.time.events.add(Phaser.Timer.SECOND * (1/2), function(){
                                        this.usingAbil = "none"; 
                                        this.duration = 0; 
                                        this.usingTiming = false; 
                                            if (this.direction == "left") {
                                            this.animationName = "idleLeft";
                                            }
                                            if (this.direction == "right") {
                                            this.animationName = "idleRight";
                                            }
                                            if (this.direction == "up") {
                                            this.animationName = "idleUp";
                                            }
                                            if (this.direction == "down") {
                                            this.animationName = "idleDown";
                                            }
                                    this.usingTiming = false;
                                    }, this);
                                    this.usingTiming = true;
                                }
                            this.idling = true;
                            this.game.time.events.remove(this.idleTimer1);
                            }
                        }
                    }
                    
                    if (abilityKey.duration > 490 && abilityKey.isDown) {
                        if (this.ASGroup.curAbil == "SteamShield" && this.usingAbil == "SteamShield") {
                            this.sitTimed = false;
                            this.usingAbil = "SteamShield";
                            this.game.time.events.remove(this.usingTimer);
                            this.game.time.events.remove(this.usingTimer2);
                            this.usingTiming = false;
                            if (this.direction == "left" || this.direction == "right") {
                                this.animationName = "winanSide2";
                            } else if (this.direction == "up") {
                                this.animationName = "winanUp2";
                            } else if (this.direction == "down") {
                                this.animationName = "winanDown2";
                            }
                            this.idling = true;
                            this.game.time.events.remove(this.idleTimer1);
                        }
                    }

                    if (this.usingAbil == "SteamShield") {
                        this.player.body.velocity.x = 0;
                        this.player.body.velocity.y = 0;
                        this.player.swipe.body.velocity.x = 0;
                        this.player.swipe.body.velocity.y = 0;
                            if (this.usingAbil == "SteamShield") {
                                this.shootTimer = this.game.time.events.add(Phaser.Timer.SECOND * (1/4), function(){ 
                                    if (this.player.currentSteam >= 0.5) {
                                        this.player.currentSteam -= 0.5;
                                    }
                                }, this);
                        }
                    }

                    if (abilityKey.isUp && this.usingAbil == 'SteamShield') {
                        this.usingAbil = "none"; 
                        abilityKey.duration = 0; 
                        this.usingTiming = false; 
                        if (this.direction == "left") {
                            this.animationName = "idleLeft";
                        }
                        if (this.direction == "right") {
                            this.animationName = "idleRight";
                        }
                        if (this.direction == "up") {
                            this.animationName = "idleUp";
                        }
                        if (this.direction == "down") {
                            this.animationName = "idleDown";
                        }
                        this.usingTiming = false;
                        this.game.time.events.remove(this.usingTimer);
                        this.game.time.events.remove(this.usingTimer2);
                        this.game.time.events.remove(this.shootTimer);

                    }
                }
                
                if (this.player.body.velocity.x < 0) {
                    this.animationName = 'runLeft';
                    this.direction = 'left';
                    this.player.swipe.x = this.player.x - (this.player.body.width / 2);
                    this.player.swipe.y = this.player.y + (this.player.height / 2);
                    this.player.swipe.anchor.setTo(1, 1.35);
                    this.player.swipe.width = 18 * this.scalingFactor;
                    this.player.swipe.height = this.player.body.height;
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                        this.tripCount += 1;
                        this.game.time.events.remove(this.tripTimer);
                        this.tripTimer = this.game.time.events.add(Phaser.Timer.SECOND * (1/3), function(){ this.tripCount = 0; }, this);
                    }
                    this.game.time.events.remove(this.idleTimer1);
                    this.idling = false;
                }
                if (this.player.body.velocity.x > 0) {
                    this.animationName = 'runRight';
                    this.direction = 'right';
                    this.player.swipe.x = this.player.x + (this.player.body.width / 2);
                    this.player.swipe.y = this.player.y + (this.player.height / 2);
                    this.player.swipe.anchor.setTo(0, 1.35);
                    this.player.swipe.width = 18 * this.scalingFactor;
                    this.player.swipe.height = this.player.body.height;
                    if (this.player.scale.x > 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                        this.tripCount += 1;
                        this.game.time.events.remove(this.tripTimer);
                        this.tripTimer = this.game.time.events.add(Phaser.Timer.SECOND * (1/3), function(){ this.tripCount = 0; }, this);
                    }
                    this.game.time.events.remove(this.idleTimer1);
                    this.idling = false;
                }
                if (this.player.body.velocity.y < 0) {
                    this.animationName = 'runUp';
                    this.direction = 'up';
                    this.player.swipe.x = this.player.body.x - (this.player.body.width * 0.25);
                    this.player.swipe.y = this.player.body.y;
                    this.player.swipe.anchor.setTo(0, 0.6);
                    this.player.swipe.width = this.player.body.width * 1.5;
                    this.player.swipe.height = 34 * this.scalingFactor;
                    this.game.time.events.remove(this.idleTimer1);
                    this.idling = false;
                    if (this.player.scale.x < 0 && this.player.body.velocity.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.player.body.velocity.y > 0) {
                    this.animationName = 'runDown';
                    this.direction = 'down';
                    this.player.swipe.x = this.player.body.x - (this.player.body.width * 0.25);
                    this.player.swipe.y = this.player.body.y + this.player.body.height;
                    this.player.swipe.anchor.setTo(0, 0.8);
                    this.player.swipe.width = this.player.body.width * 1.5;
                    this.player.swipe.height = 42 * this.scalingFactor;
                    this.game.time.events.remove(this.idleTimer1);
                    this.idling = false;
                    if (this.player.scale.x < 0 && this.player.body.velocity.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
            }
            if (this.direction == 'left') {
                if (this.player.scale.x < 0) {
                    this.player.scale.x = this.player.scale.x * -1;
                }
            }
            if (this.direction == 'right') {
                if (this.player.scale.x > 0) {
                    this.player.scale.x = this.player.scale.x * -1;
                }
            }
            //change current animation
            if (this.player.animations.name !== this.animationName && this.animationName !== 'stopped') {
                this.player.animations.play(this.animationName);
            } else if (this.animationName == 'stopped') {
                if (this.direction == 'down') {
                    this.player.animations.play('idleDown', 4, true);
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'right') {
                    this.player.animations.play('idleRight', 4, true);
                }
                if (this.direction == 'up') {
                    this.player.animations.play('idleUp', 4, true);
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'left') {
                    this.player.animations.play('idleLeft', 4, true);
                }
            }

            if (this.frameAbil.name != this.ASGroup.curAbil) {
                this.frameAbil.destroy();
                this.frameAbil = this.game.add.sprite(this.game.camera.width - ((this.frame.width - (32 * this.scalingFactor * 1.1)) / 2), 8 + ((this.frame.width - (32 * this.scalingFactor * 1.1)) / 2), this.ASGroup.curAbil);
                this.frameAbil.anchor.setTo(1,0);
                this.frameAbil.fixedToCamera = true;
                this.frameAbil.scale.setTo(this.scalingFactor * 1.1, this.scalingFactor * 1.1);
                this.frameAbil.name = this.ASGroup.curAbil;
            }
            //moving any and all menus away
            if (this.ASGroup.pos == 'down') {
                if (this.ASGroup.cameraOffset.y > this.ASGroup.maxH + (this.game.camera.height * 0.5)) {
                    this.ASGroup.cameraOffset.y -= this.game.camera.height / 40;
                    this.ASGroup.stationary = false;
                } else {
                    this.ASGroup.stationary = true;
                    this.ASGroup.pos = 'up';
                }
            }
            if (this.mapGroup.pos == 'up') {
                if (this.mapGroup.cameraOffset.y < this.mapGroup.maxH) {
                    this.mapGroup.cameraOffset.y += this.game.camera.height / 40;
                    this.mapGroup.stationary = false;
                } else {
                    this.mapGroup.stationary = true;
                    this.mapGroup.pos = 'down';
                }
            }
            if (this.pauseGroup.pos == 'there') {
                this.pauseGroup.alpha = 0;
                this.pauseGroup.pos = 'gone';
            }
        }
        if (this.menuState == 'ability') {
            if (this.mapGroup.pos == 'up') {
                if (this.mapGroup.cameraOffset.y < this.mapGroup.maxH) {
                    this.mapGroup.cameraOffset.y += this.game.camera.height / 40;
                    this.mapGroup.stationary = false;
                } else {
                    this.mapGroup.stationary = true;
                    this.mapGroup.pos = 'down';
                }
            }
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.swipe.body.velocity.x = 0;
            this.player.swipe.body.velocity.y = 0;
            if (this.animationName != "seated") {
                this.animationName = "stopped";
            }
            if (this.ASGroup.cameraOffset.y < this.ASGroup.maxH + (this.game.camera.height * 1.5)) {
                this.ASGroup.cameraOffset.y += this.game.camera.height / 40;
                this.ASGroup.stationary = false;
            } else {
                this.ASGroup.stationary = true;
                this.ASGroup.pos = 'down';
            }

            if (this.player.hasWinan == 1) {
                this.ASWinan.frame = 0;
                this.ASGroup.selPos.pos1 = 'Winan';
                this.hasItems = true;
            }
            if (this.player.hasHook == 1) {
                this.ASHook.frame = 0;
                this.ASGroup.selPos.pos2 = 'Hook';
                this.hasItems = true;
            }
            if (this.player.hasSteamShield == 1) {
                this.ASSteamShield.frame = 0;
                this.ASGroup.selPos.pos3 = 'SteamShield';
                this.hasItems = true;
            }
            if (this.player.hasLightRod == 1) {
                this.ASLightRod.frame = 0;
                this.ASGroup.selPos.pos4 = 'LightRod';
                this.hasItems = true;
            }
            if (this.player.hasStunBaton == 1) {
                this.ASStunBaton.frame = 0;
                this.ASGroup.selPos.pos5 = 'StunBaton';
                this.hasItems = true;
            }
            if (this.player.hasBoomerang == 1) {
                this.ASBoomerang.frame = 0;
                this.ASGroup.selPos.pos6 = 'Boomerang';
                this.hasItems = true;
            }
            if (this.player.hasGreekFire == 1) {
                this.ASGreekFire.frame = 0;
                this.ASGroup.selPos.pos7 = 'GreekFire';
                this.hasItems = true;
            }
            if (this.player.hasHammer == 1) {
                this.ASHammer.frame = 0;
                this.ASGroup.selPos.pos8 = 'Hammer';
                this.hasItems = true;
            }
            if (this.player.hasBomb == 1) {
                this.ASBomb.frame = 0;
                this.ASGroup.selPos.pos9 = 'Bomb';
                this.hasItems = true;
            }
            if (this.player.hasBoots == 1) {
                this.ASBoots.frame = 0;
                //this.ASGroup.selPos.pos13 = 'Boots';
                //this.hasItems = true;
            }
            if (this.player.hasExoArm == 1) {
                this.ASArm.frame = 0;
                //this.ASGroup.selPos.pos14 = 'ExoArm';
                //this.hasItems = true;
            }
            if (this.player.hasTaserSword == 1) {
                this.ASSword.frame = 1;
                //this.ASGroup.selPos.pos14 = 'ExoArm';
                //this.hasItems = true;
            }
            

            if (upKey.isDown || upArrow.isDown) {
                if (upKey.isDown && upKey.duration < 2) {
                    if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 4)]]) {
                        this.ASGroup.curPos -= 4;
                    } else if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 8)]]) {
                        this.ASGroup.curPos -= 8;
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        upKey.duration = 0;
                    }, this);
                }
                if (upArrow.isDown && upArrow.duration < 2) {
                    if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 4)]]) {
                        this.ASGroup.curPos -= 4;
                    } else if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 8)]]) {
                        this.ASGroup.curPos -= 8;
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        upArrow.duration = 0;
                    }, this);
                }
            } else if (downKey.isDown || downArrow.isDown) {
                if (downKey.isDown && downKey.duration < 2) {
                    if (this.ASGroup.curPos != null && this.ASGroup.curPos + 4 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 4)]]) {
                        this.ASGroup.curPos += 4;
                    } else if (this.ASGroup.curPos != null && this.ASGroup.curPos + 8 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 8)]]) {
                        this.ASGroup.curPos += 8;
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        downKey.duration = 0;
                    }, this);
                }
                if (downArrow.isDown && downArrow.duration < 2) {
                    if (this.ASGroup.curPos != null && this.ASGroup.curPos + 4 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 4)]]) {
                        this.ASGroup.curPos += 4;
                    } else if (this.ASGroup.curPos != null && this.ASGroup.curPos + 8 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 8)]]) {
                        this.ASGroup.curPos += 8;
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        downArrow.duration = 0;
                    }, this);
                }
            } else if (rightKey.isDown || rightArrow.isDown) {
                if (rightKey.isDown && rightKey.duration < 2) {
                    if (this.ASGroup.curPos != null && this.ASGroup.curPos + 1 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 1)]]) {
                        this.ASGroup.curPos += 1;
                    }  else if (this.ASGroup.curPos != null && this.ASGroup.curPos + 2 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 2)]]) {
                        this.ASGroup.curPos += 2;
                    }  else if (this.ASGroup.curPos != null && this.ASGroup.curPos + 3 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 3)]]) {
                        this.ASGroup.curPos += 3;
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        rightKey.duration = 0;
                    }, this);
                }
                if (rightArrow.isDown && rightArrow.duration < 2) {
                    if (this.ASGroup.curPos != null && this.ASGroup.curPos + 1 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 1)]]) {
                        this.ASGroup.curPos += 1;
                    }  else if (this.ASGroup.curPos != null && this.ASGroup.curPos + 2 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 2)]]) {
                        this.ASGroup.curPos += 2;
                    }  else if (this.ASGroup.curPos != null && this.ASGroup.curPos + 3 < 13 && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos + 3)]]) {
                        this.ASGroup.curPos += 3;
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        rightArrow.duration = 0;
                    }, this);
                }
            } else if (leftKey.isDown || leftArrow.isDown) {
                if (leftKey.isDown && leftKey.duration < 2) {
                    if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 1)]]) {
                        this.ASGroup.curPos -= 1;
                    }  else if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 2)]]) {
                        this.ASGroup.curPos -= 2;
                    }  else if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 3)]]) {
                        this.ASGroup.curPos -= 3;
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        leftKey.duration = 0;
                    }, this);
                }
                if (leftArrow.isDown && leftArrow.duration < 2) {
                    if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 1)]]) {
                        this.ASGroup.curPos -= 1;
                    }  else if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 2)]]) {
                        this.ASGroup.curPos -= 2;
                    }  else if (this.ASGroup.curPos != null && this['AS' + this.ASGroup.selPos['pos' + (this.ASGroup.curPos - 3)]]) {
                        this.ASGroup.curPos -= 3;
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        leftArrow.duration = 0;
                    }, this);
                }
            }

            if (this.frameAbil.name != this.ASGroup.selPos['pos' + this.ASGroup.curPos] && this.frameAbil.name != 'none') {
                this.frameAbil.destroy();
                this.frameAbil = this.game.add.sprite(this.game.camera.width - ((this.frame.width - (32 * this.scalingFactor * 1.1)) / 2), 8 + ((this.frame.width - (32 * this.scalingFactor * 1.1)) / 2), this.ASGroup.selPos['pos' + this.ASGroup.curPos]);
                this.frameAbil.anchor.setTo(1,0);
                this.frameAbil.fixedToCamera = true;
                this.frameAbil.scale.setTo(this.scalingFactor * 1.1, this.scalingFactor * 1.1);
                this.frameAbil.name = this.ASGroup.selPos['pos' + this.ASGroup.curPos];
                this.ASGroup.curAbil = this.ASGroup.selPos['pos' + this.ASGroup.curPos];
            }
            else if (this.frameAbil.name == "none") {
                this.frameAbil.destroy();
            }

            if (this.hasItems == true) {
                if (this['AS' + this.ASGroup.selPos['pos' + this.ASGroup.curPos]].x != null) {
                    if (this.ASSelector.x != this['AS' + this.ASGroup.selPos['pos' + this.ASGroup.curPos]].x) {
                        this.ASSelector.x = this['AS' + this.ASGroup.selPos['pos' + this.ASGroup.curPos]].x;
                    }
                    if (this.ASSelector.y != this['AS' + this.ASGroup.selPos['pos' + this.ASGroup.curPos]].y) {
                        this.ASSelector.y = this['AS' + this.ASGroup.selPos['pos' + this.ASGroup.curPos]].y;
                    }
                }
            }

            if (this.animationName == 'stopped') {
                if (this.direction == 'down') {
                    this.player.animations.play('idleDown', 4, true);
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'right') {
                    this.player.animations.play('idleRight', 4, true);
                }
                if (this.direction == 'up') {
                    this.player.animations.play('idleUp', 4, true);
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'left') {
                    this.player.animations.play('idleLeft', 4, true);
                }
            }
        }
        if (this.menuState == 'map') {
            if (this.ASGroup.pos == 'down') {
                if (this.ASGroup.cameraOffset.y > this.ASGroup.maxH + (this.game.camera.height * 0.5)) {
                    this.ASGroup.cameraOffset.y -= this.game.camera.height / 40;
                    this.ASGroup.stationary = false;
                } else {
                    this.ASGroup.stationary = true;
                    this.ASGroup.pos = 'up';
                }
            }
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.swipe.body.velocity.x = 0;
            this.player.swipe.body.velocity.y = 0;
            if (this.animationName != "seated") {
                this.animationName = "stopped";
            }
            if (this.mapGroup.cameraOffset.y > this.game.camera.height / 2) {
                this.mapGroup.cameraOffset.y -= this.game.camera.height / 40;
                this.mapGroup.stationary = false;
            } else {
                this.mapGroup.stationary = true;
                this.mapGroup.pos = 'up';
            }

            if (this.animationName == 'stopped') {
                if (this.direction == 'down') {
                    this.player.animations.play('idleDown', 4, true);
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'right') {
                    this.player.animations.play('idleRight', 4, true);
                }
                if (this.direction == 'up') {
                    this.player.animations.play('idleUp', 4, true);
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'left') {
                    this.player.animations.play('idleLeft', 4, true);
                }
            }
        }
        if (this.menuState == 'pause') {
            if (this.ASGroup.pos == 'down') {
                if (this.ASGroup.cameraOffset.y > this.ASGroup.maxH + (this.game.camera.height * 0.5)) {
                    this.ASGroup.cameraOffset.y -= this.game.camera.height / 40;
                    this.ASGroup.stationary = false;
                } else {
                    this.ASGroup.stationary = true;
                    this.ASGroup.pos = 'up';
                }
            }
            if (this.mapGroup.pos == 'up') {
                if (this.mapGroup.cameraOffset.y < this.mapGroup.maxH) {
                    this.mapGroup.cameraOffset.y += this.game.camera.height / 40;
                    this.mapGroup.stationary = false;
                } else {
                    this.mapGroup.stationary = true;
                    this.mapGroup.pos = 'down';
                }
            }
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.swipe.body.velocity.x = 0;
            this.player.swipe.body.velocity.y = 0;
            if (this.animationName != "seated") {
                this.animationName = "stopped";
            }
            if (this.pauseGroup.pos == 'gone') {
                this.pauseGroup.alpha = 1;
                this.pauseGroup.pos = 'there';
            }

            if (spaceKey.isDown || enterKey.isDown) {
                if (this.pausePointer.pos == 1) {
                    this.pause(this);
                } else if (this.pausePointer.pos == 2) {
                    this.save(this);
                    this.pause(this);
                } else if (this.pausePointer.pos == 3) {
                    this.save(this);
                    if (this.fade.alpha == 0) {
                        this.game.add.tween(this.fade).to({alpha: 1}, 500, null, true);
                        if (this.frameAbil != null) {
                            this.frameAbil.name == "none";
                            this.frameAbil.destroy();
                        }
                    }
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.75, function(){window.location.href = "http://wardenclyffegame.github.io";}, this);
                }
            }

            if (downKey.isDown || downArrow.isDown) {
                if (downKey.isDown && downKey.duration < 1) {
                    if (this.pausePointer.pos == 3) {
                        this.pausePointer.pos = 1;
                    } else {
                        this.pausePointer.pos += 1;
                    }

                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        downKey.duration = 0;
                    }, this);
                }
                if (downArrow.isDown && downArrow.duration < 1) {
                    if (this.pausePointer.pos == 3) {
                        this.pausePointer.pos = 1;
                    } else {
                        this.pausePointer.pos += 1;
                    }

                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        downArrow.duration = 0;
                    }, this);
                }
            }

            if (upKey.isDown || upArrow.isDown) {
                if (upKey.isDown && upKey.duration < 1) {
                    if (this.pausePointer.pos == 1) {
                        this.pausePointer.pos = 3;
                    } else {
                        this.pausePointer.pos -= 1;
                    }

                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        upKey.duration = 0;
                    }, this);
                }
                if (upArrow.isDown && upArrow.duration < 1) {
                    if (this.pausePointer.pos == 1) {
                        this.pausePointer.pos = 3;
                    } else {
                        this.pausePointer.pos -= 1;
                    }

                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                        upArrow.duration = 0;
                    }, this);
                }
            }

            if (this.pausePointer.pos == 1) {
                this.pausePointer.y = (this.game.camera.height / 2) - (this.pauseMenu.height / 12);
            } else if (this.pausePointer.pos == 2) {
                this.pausePointer.y = (this.game.camera.height / 2) + (this.pauseMenu.height / 12);
            } else if (this.pausePointer.pos == 3) {
                this.pausePointer.y = (this.game.camera.height / 2) + (this.pauseMenu.height / 4);
            }

            if (this.animationName == 'stopped') {
                if (this.direction == 'down') {
                    this.player.animations.play('idleDown', 4, true);
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'right') {
                    this.player.animations.play('idleRight', 4, true);
                }
                if (this.direction == 'up') {
                    this.player.animations.play('idleUp', 4, true);
                    if (this.player.scale.x < 0) {
                        this.player.scale.x = this.player.scale.x * -1;
                    }
                }
                if (this.direction == 'left') {
                    this.player.animations.play('idleLeft', 4, true);
                }
            }
        }
        /***************************************** Currency tracker **************************************************************************************************/
        if (this.player.newC != this.player.currency) {
            this.player.currency = this.player.newC;
            //this.changeTicker(this.player.currency, this.ticker, this.player.currencyData);
            this.player.currencyData.digit1 = Math.floor(this.player.currency / 1000);
            this.player.currencyData.digit2 = Math.floor(this.player.currency / 100) - (this.player.currencyData.digit1 * 10);
            this.player.currencyData.digit3 = Math.floor(this.player.currency / 10) - (this.player.currencyData.digit1 * 100) - (this.player.currencyData.digit2 * 10);
            this.player.currencyData.digit4 = this.player.currency - (this.player.currencyData.digit1 * 1000) - (this.player.currencyData.digit2 * 100) - (this.player.currencyData.digit3 * 10);
            this.ticker.plate1.animations.play('flip', 12, false);
            this.ticker.plate2.animations.play('flip', 12, false);
            this.ticker.plate3.animations.play('flip', 12, false);
            this.ticker.plate4.animations.play('flip', 12, false);
        }

        if(this.ticker.plate1.animations.isPlaying != true) {
            if (this.ticker.plate1.frame >= 15 && this.ticker.plate1.frame != this.player.currencyData.digit1) {
                this.ticker.plate1.frame = this.player.currencyData.digit1;
            } else if(this.ticker.plate1.frame == 15) {
                this.ticker.plate1.frame = this.player.currencyData.digit1;
            }
        }
        if(this.ticker.plate2.animations.isPlaying != true) {
            if (this.ticker.plate2.frame >= 15 && this.ticker.plate2.frame != this.player.currencyData.digit2) {
                this.ticker.plate2.frame = this.player.currencyData.digit2;
            } else if(this.ticker.plate2.frame == 15) {
                this.ticker.plate2.frame = this.player.currencyData.digit2;
            }
        }
        if(this.ticker.plate3.animations.isPlaying != true) {
            if (this.ticker.plate3.frame >= 15 && this.ticker.plate3.frame != this.player.currencyData.digit3) {
                this.ticker.plate3.frame = this.player.currencyData.digit3;
            } else if(this.ticker.plate3.frame == 15) {
                this.ticker.plate3.frame = this.player.currencyData.digit3;
            }
        }
        if(this.ticker.plate4.animations.isPlaying != true) {
            if (this.ticker.plate4.frame >= 15 && this.ticker.plate4.frame != this.player.currencyData.digit4) {
                this.ticker.plate4.frame = this.player.currencyData.digit4;
            } else if(this.ticker.plate4.frame == 15) {
                this.ticker.plate4.frame = this.player.currencyData.digit4;
            }
        }
    },
    debugHurt: function(player, walls) {
        player.timer += 1;
        if(player.timer === 100) {
            player.timer = 0;
            player.currentHP -= 1;
        }
    },
    debugSteam: function(player, walls) {
        if (player.currentSteam < player.maxSteam) {
            player.newSLevel += 0.1;
            if (player.newSLevel >= 1) {
                player.currentSteam ++;
                player.newSLevel = 0;
            }
        }
        /*if (player.currentSteam > 0) {
            player.newSLevel -= 0.1;
            if (player.newSLevel <= -1) {
                player.currentSteam --;
                player.newSLevel = 0;
            }
        }*/
    },
    debugElec: function(player, walls) {
        /*if (player.currentSteam < player.maxSteam) {
            player.newSLevel += 0.1;
            if (player.newSLevel >= 1) {
                player.currentSteam ++;
                player.newSLevel = 0;
            }
        }*/
        if (player.currentEnergy > 0) {
            player.newELevel -= 0.1;
            if (player.newELevel <= -1) {
                player.currentEnergy --;
                player.newELevel = 0;
            }
        }
    },
    debugSwipe: function(enemy, weapon){
        if(this.player.state == 'attack') {
            if(this.dummy.hit == false && this.dummy.currentHP > 1) {
                this.dummy.hit = true;
                this.dummy.frame = 1;

                this.dummy.currentHP -= 1;

                this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                    this.dummy.hit = false;
                    this.dummy.frame = 0;
                }, this);
            }
            if(this.dummy.hit == false && this.dummy.currentHP == 1) {
                this.dummy.currentHP = 0;
                this.dummy.value = 100;
                this.dummy.destroy();
                this.collect(this.player, this.dummy);
                this.player.hasBomb = 1;
                this.player.hasWinan = 1;
                this.player.hasLightRod = 1;
                this.player.hasStunBaton = 1;
                this.player.hasSteamShield = 1;
                this.player.hasHook = 1;
                this.player.hasHammer = 1;
                this.player.hasBoomerang = 1;
                this.player.hasGreekFire = 1;
                this.ASGroup.curPos = 5;
                this.ASGroup.curAbil = 'StunBaton';
                this.player.state = 'hurt';
                if (this.direction == 'right') {
                    this.player.body.velocity.x = -this.player.speed * 3;
                    this.player.swipe.body.velocity.x = -this.player.speed * 3;
                }
                if (this.direction == 'left') {
                    this.player.body.velocity.x = this.player.speed * 3;
                    this.player.swipe.body.velocity.x = this.player.speed * 3;
                }
                if (this.direction == 'up') {
                    this.player.body.velocity.y = this.player.speed * 3;
                    this.player.swipe.body.velocity.y = this.player.speed * 3;
                }
                if (this.direction == 'down') {
                    this.player.body.velocity.y = -this.player.speed * 3;
                    this.player.swipe.body.velocity.y = -this.player.speed * 3;
                }
            }
        } else if (enemy != this.player.swipe){
            if(this.dummy.hit == false && this.dummy.currentHP > 1) {
                this.dummy.hit = true;
                this.dummy.frame = 1;
                weapon.destroy();

                this.dummy.currentHP -= 2;

                this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
                    this.dummy.hit = false;
                    this.dummy.frame = 0;
                }, this);
            }
            if(this.dummy.hit == false && this.dummy.currentHP == 1) {
                this.dummy.currentHP = 0;
                weapon.destroy();
                this.dummy.value = 100;
                this.dummy.destroy();
                this.collect(this.player, this.dummy);
            }
            weapon.destroy();
        }
    },
    collect: function(player, coin) {
        if (player.newC + coin.value < 10000) {
            player.newC += coin.value;
        } else {
            player.newC = 9999;
        }
        if (coin != this.CSign) {
            coin.destroy();
        }
    },
    abilityTrans: function() {
        if (this.ASGroup.stationary == true) {
            if (this.menuState == 'none' || this.menuState == 'ability') {
                if (this.ASGroup.pos == 'up') {
                    this.menuState = 'ability';
                } else if (this.ASGroup.pos == 'down') {
                    this.menuState = 'none';
                }
            }
        }
    },
    mapTrans: function() {
        if (this.mapGroup.stationary == true) {
            if (this.menuState == 'none' || this.menuState == 'map') {
                if (this.mapGroup.pos == 'down') {
                    this.menuState = 'map';
                } else if (this.mapGroup.pos == 'up') {
                    this.menuState = 'none';
                }
            }
        }
    },
    pause: function() {
        if (this.mapGroup.pos == 'down' && this.ASGroup.pos == 'up' && this.mapGroup.stationary == true && this.ASGroup.stationary == true) {
            if (this.pauseGroup.pos == 'gone') {
                this.menuState = 'pause';
                this.pauseGroup.alpha = 1;
            } else if (this.pauseGroup.pos == 'there') {
                this.menuState = 'none';
                this.pauseGroup.alpha = 0;
                this.pausePointer.pos = 1;
            }
        }
    },
    save: function() {
        this.playerData.maxHP = this.player.maxHP;
        this.playerData.currentHP = this.player.currentHP;
        this.playerData.maxSteam = this.player.maxSteam;
        this.playerData.currentSteam = this.player.currentSteam;
        this.playerData.maxEnergy = this.player.maxEnergy;
        this.playerData.currentEnergy = this.player.currentEnergy;
        this.playerData.currency = 0;
        this.playerData.newC = this.player.newC;
        //ability declarations
        this.playerData.hasBomb = this.player.hasBomb;
        this.playerData.hasBoots = this.player.hasBoots;
        this.playerData.hasExoArm = this.player.hasExoArm;
        this.playerData.hasTaserSword = this.player.hasTaserSword;
        this.playerData.hasWinan = this.player.hasWinan;
        this.playerData.hasHook = this.player.hasHook;
        this.playerData.hasSteamShield = this.player.hasSteamShield;
        this.playerData.hasLightRod = this.player.hasLightRod;
        this.playerData.hasBoomerang = this.player.hasBoomerang;
        this.playerData.hasGreekFire = this.player.hasGreekFire;
        this.playerData.hasStunBaton = this.player.hasStunBaton;
        this.playerData.hasHammer = this.player.hasHammer;
        this.playerData.curAbil = this.ASGroup.selPos['pos' + this.ASGroup.curPos] || this.player.curAbil;
        this.playerData.map = "Debug";
        window.localStorage.setItem('playerData', JSON.stringify(this.playerData));
    }
};
