// ----------------------------------------------------------------------------

// Ball

// ----------------------------------------------------------------------------

class Ball extends Sprite {
  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = 'red') {
    super(x, y, radius * 2, radius * 2, color);
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.PI2 = Math.PI * 2;
  }

  move() {
    this.moveBy(this.dx, this.dy);
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, this.PI2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
