import Constants from './constants.js';
import Image_MainMenu from './imgs/Main_Menu.png'
import Image_Torch from './imgs/torch1_strip8.png'
import Image_Title from './imgs/sprite1_strip14.png'
import SFX_scroll from './sfx/sfx_menu_scroll.wav'
import SFX_start_game from './sfx/sfx_menu_start_game.wav'

export default class Menu_Main
{
  constructor()
  {
    //load in images
    this.backImg = new Image();
		this.backImg.src = Image_MainMenu;

    this.torchImg = new Image();
    this.torchImg.src = Image_Torch

    this.titleImg = new Image();
    this.titleImg.src = Image_Title;
    //end image loading

    this.volumeSFXSlider = .2;
    //load in sound effects
    this.sfx_scroll = new Audio();
    this.sfx_scroll.src = SFX_scroll;

    this.sfx_start_game = new Audio();
    this.sfx_start_game.src = SFX_start_game;

    //end sound effect loading
    this.cooldown = 150;
    this.frame_cd = 20;
    this.key_cd = this.cooldown;
    this.lastTime = +new Date();
    this.frameTime = this.frame_cd;
    this.currentTitleFrame = 0;
    this.currentTorchFrame = 0;

    this.torchSpeed = 8;
    this.titleSpeed = 20;

    this.menu_items = ["Play", "Options", "Exit"];
    this.select_possibley = [-14, 42, 98]
    this.selected_number = 0;
    this.select_ycord = this.select_possibley[this.selected_number];
    this.selected = this.menu_items[this.selected_number];
  }

  update(pressed)
  {
    let delta = +new Date() - this.lastTime;
		this.lastTime = +new Date();
    this.key_cd -= delta;

    if(pressed['Enter'] && this.key_cd <= 0)
    {
      this.key_cd = this.cooldown;
      switch(this.selected)
      {
        case "Play":
        {
          var sound = this.sfx_start_game.cloneNode();
          sound.volume = this.volumeSFXSlider;
          sound.play();
          window.currentState = "Gameplay";
          break;
        }
        case "Options":
        {
          break;
        }
        case "Exit":
        {
          window.currentState = "Title Screen";
          break;
        }
      }
    }
    else if( (pressed["w"] || pressed["ArrowUp"]) && this.key_cd <= 0)
    {
      var sound = this.sfx_scroll.cloneNode();
      sound.volume = this.volumeSFXSlider;
      sound.play();
      this.key_cd = this.cooldown;
      //move cursor up
      this.selected_number -= 1;
      //boundary check
      if (this.selected_number < 0)
      {
        this.selected_number = 2;
        this.select_ycord = this.select_possibley[this.selected_number];
      }
      else {
        this.select_ycord = this.select_possibley[this.selected_number];
      }
      this.selected = this.menu_items[this.selected_number];
    }
    else if( (pressed["s"] || pressed["ArrowDown"]) && this.key_cd <= 0)
    {
      var sound = this.sfx_scroll.cloneNode();
      sound.volume = this.volumeSFXSlider;
      sound.play();
      this.key_cd = this.cooldown;
      //move cursor down
      this.selected_number += 1;
      //boundary check
      if(this.selected_number > 2)
      {
        this.selected_number = 0;
        this.select_ycord = this.select_possibley[this.selected_number];
      }
      else{
        this.select_ycord = this.select_possibley[this.selected_number];
      }
      this.selected = this.menu_items[this.selected_number];
    }

  }

  render(ctx)
  {
		this.frameTime += 1;

    //change title frame rendering depending on time
    if(this.frameTime % this.titleSpeed === 0)
    {
      this.currentTitleFrame += 1;
      if(this.currentTitleFrame > 13)
      {
        this.currentTitleFrame = 0;
      }
    }

    //do the same for torch Animation
    if(this.frameTime % this.torchSpeed === 0)
    {
        this.currentTorchFrame += 1;
        if(this.currentTorchFrame > 7)
        {
          this.currentTorchFrame = 0;
        }
    }

    ctx.save();
    //draw the background
    ctx.drawImage(this.backImg, 0, 0);

    //draw the gifs
    ctx.drawImage(this.titleImg, 228*this.currentTitleFrame, 0, 228, 58, 18, 0, 228, 58);
    ctx.drawImage(this.torchImg, 16*this.currentTorchFrame, 0, 16, 32, 68, 200, 16, 32);
    ctx.drawImage(this.torchImg, 16*this.currentTorchFrame, 0, 16, 32, 174, 200, 16, 32);
    //img, renderStartXPos, renderStartYPos, widthX, heightY, xPos, yPos, imgXSize, imgYSize

    ctx.translate(76, 102);
    ctx.rotate(Math.PI/2)
    ctx.drawImage(
			Constants.tileset,
			13 * Constants.tileSize,
			3 * Constants.tileSize,
			Constants.tileSize,
			Constants.tileSize,
			this.select_ycord,
			0,
			Constants.tileSize ,
			Constants.tileSize
		);
    ctx.drawImage(
			Constants.tileset,
			13 * Constants.tileSize, //tilex
			2 * Constants.tileSize, //tiley
			Constants.tileSize,
			Constants.tileSize,
			this.select_ycord, //placey 56
			-16, //placex
			Constants.tileSize ,
			Constants.tileSize
		);
    ctx.restore();
  }

}
