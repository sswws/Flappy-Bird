import Databus from "../databus.js"
const databus = new Databus()

export default class Land {
  constructor () {    
    this.image = databus.imgObj.land
    this.x = 0
    this.y = databus.canvas.height - this.image.height
    this.w = this.image.width
    this.h = this.image.height
    databus.addActor(this)
  }
  update () {
    this.x -= databus.speed
    // 折返点
    if (this.x <= - this.w) {
      this.x = 0
    }
  }
  render () {
    databus.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    databus.ctx.drawImage(this.image, this.x + this.w, this.y, this.w, this.h)
    databus.ctx.drawImage(this.image, this.x + this.w * 2, this.y, this.w, this.h)
  }
}