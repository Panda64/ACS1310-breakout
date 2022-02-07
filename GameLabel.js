class GameLabel {
  constructor(text, x, y, color, font = '16px Arial') {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = 0;
    this.font = font;
  }
  
  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);
  }
}