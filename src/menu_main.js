import MenMain from './MainTest.png'

export default class Menu_Main
{
  constructor()
  {
    this.img = new Image();
		this.img.src = MenMain;
  }

  update()
  {

  }

  render(ctx)
  {
    ctx.drawImage(this.img, 0, 0);
  }

}
