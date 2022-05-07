import Databus from "../databus.js"
const databus = new Databus()

export default class Background {
  constructor () {
    const imagesArr = [databus.imgObj.bg_day, databus.imgObj.bg_night]
    this.dayOrNight = Math.floor(Math.random() * 2)
    this.image = imagesArr[this.dayOrNight]
    this.x = 0
    this.y = 0
    this.w = this.image.width
    this.h = databus.canvas.height
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