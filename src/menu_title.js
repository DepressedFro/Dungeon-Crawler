import Image_Screen from './imgs/Title_Screen.png'
import Image_Title from './imgs/sprite1_strip14.png'
import Image_Wizard from './imgs/wizard_strip2.png'
import Image_Knight from './imgs/knight_strip2.png'
import Image_Bandit from './imgs/bandit_strip2.png'
import Image_Torch from './imgs/torch1_strip8.png'

import SFX_start from './sfx/sfx_trap_flame_spit.wav'

export default class Menu_Title
{
  constructor()
  {
    //load in images
    this.backImg = new Image();
		this.backImg.src = Image_Screen;

    this.torchImg = new Image();
    this.torchImg.src = Image_Torch

    this.titleImg = new Image();
    this.titleImg.src = Image_Title;

    this.knightImg = new Image();
    this.knightImg.src = Image_Knight;

    this.banditImage = new Image();
    this.banditImage.src = Image_Bandit;

    this.wizardImage = new Image();
    this.wizardImage.src = Image_Wizard;
    //end image loading

    this.volumeSFXSlider = .2;
    //load in sound effects
    this.sfx_start = new Image();
    this.sfx_start.src = SFX_start;

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
  }

  update(pressed)
  {
    let delta = +new Date() - this.lastTime;
		this.lastTime = +new Date();
    this.key_cd -= delta;

    if(pressed['Enter'] && this.key_cd <= 0)
    {
      window.currentState = "Main Menu";
    }
  }

  render(ctx)
  {
    this.frameTime += 1;
    console.log(this.frameTime);
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
    ctx.drawImage(this.backImg, 0 ,0);
    //draw the gifs
    ctx.drawImage(this.titleImg, 228*this.currentTitleFrame, 0, 228, 58, 18, 0, 228, 58);
    ctx.drawImage(this.torchImg, 16*this.currentTorchFrame, 0, 16, 32, 68, 114, 16, 32);
    ctx.drawImage(this.torchImg, 16*this.currentTorchFrame, 0, 16, 32, 172, 114, 16, 32);
    //img, renderStartXPos, renderStartYPos, widthX, heightY, xPos, yPos, imgXSize, imgYSize

    ctx.restore();
  }

}
