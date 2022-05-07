import Databus from "../databus.js"
const databus = new Databus()
const g = 0.98 / 2.9
export default class Bird {
  constructor () {
    const imagesArr = [[databus.imgObj.bird0_0, databus.imgObj.bird0_1, databus.imgObj.bird0_2],
    [databus.imgObj.bird1_0, databus.imgObj.bird1_1, databus.imgObj.bird1_2],
    [databus.imgObj.bird2_0, databus.imgObj.bird2_1, databus.imgObj.bird2_2]]
    this.color = Math.floor(Math.random() * 3)
    this.images = imagesArr[this.color]
    this.wing = 0
    this.x = 100
    this.y = 200
    this.image = this.images[this.wing]
    this.w = this.image.width
    this.h = this.image.height
    this.ey = databus.canvas.height - this.h - databus.imgObj.land.height + 11
    this.t = 0
    this.fly = false
    this.rotate = 0
    databus.addActor(this)
    databus.bird = this
  }
  update () {
    this.wing++
    if (this.wing > 2) {
      this.wing = 0
    }
    if (this.fly) {
      this.t++
      this.rotate += 0.08
      if (this.rotate >= Math.PI / 2) {
        this.rotate =Math.PI / 2
      }
      this.y = this.y - 10 + g * this.t * this.t / 2
      // 小鸟触底，游戏就结束了
      if (this.y >= this.ey) {
        this.y = this.ey
        databus.scene = 2
      }
      if (this.y < -13) {
        this.y = -13
      }
    }
  }
  render () {
    this.image = this.images[this.wing]
    databus.ctx.save()
    databus.ctx.translate(this.x + this.w / 2, this.y + this.h / 2)
    databus.ctx.rotate(this.rotate)
    databus.ctx.drawImage(this.image, - this.w / 2, - this.h / 2, this.w, this.h)
    databus.ctx.restore()
  }
  bindFly () {
    this.fly  = true
    this.t = 0
    this.rotate = -0.7
  }
}