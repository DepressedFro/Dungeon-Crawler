import Title from './TitleTest.png'

export default class Menu_Title
{
  constructor()
  {
    this.img = new Image();
		this.img.src = Title;
  }

  update()
  {

  }

  render(ctx)
  {
    ctx.drawImage(this.img, 0, 0);
  }

}
