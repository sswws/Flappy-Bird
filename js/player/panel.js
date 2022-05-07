import Databus from "../databus.js"
const databus = new Databus()

export default class Panel {
  constructor () {    
    this.image = databus.imgObj.score_panel
    this.x = (databus.canvas.width - this.image.width) / 2
    this.y = databus.canvas.height
    this.w = this.image.width
    this.h = this.image.height
    this.ey = 210
    this.end = false
    databus.addActor(this)
  }
  update () {
    this.y -= 40
    // 折返点
    if (this.y <= this.ey) {
      this.y = this.ey
      this.end = true
    }
  }
  render () {
    databus.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    if (this.end) {
      databus.ctx.save()
      databus.ctx.font = "20px Arail"
      databus.ctx.fillText(databus.score, databus.canvas.width / 2 + 70, 260)
      databus.ctx.fillText(databus.max, databus.canvas.width / 2 + 70, 305)
      databus.ctx.restore()
    }
  }
}