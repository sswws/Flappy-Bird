import Databus from "../databus.js"
const databus = new Databus()

export default class Over {
  constructor () {    
    this.image = databus.imgObj.game_over
    this.x = (databus.canvas.width - this.image.width) / 2
    this.y = - this.image.height
    this.w = this.image.width
    this.h = this.image.height
    this.ey = 140
    databus.addActor(this)
  }
  update () {
    this.y += 12
    // 折返点
    if (this.y >= this.ey) {
      this.y = this.ey
    }
  }
  render () {
    databus.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }
}