import {Resources} from "./resources.js"
import Databus from "../databus.js"
const databus = new Databus()

export default class ResourceLoader {
  constructor () {
    this.srcs = Resources
    this.maxCount = Object.keys(this.srcs).length
    this.count = 0
    this.loadResources()
  }
  loadResources () {
    // 需要存储所有的图片对象到一个对象中
    // 创建多个新的图片对象
    // 给对象的 src 赋值
    // 保证图片加载完成，然后才能进行游戏的下一步
    for (var k in this.srcs) {
      databus.imgObj[k] = wx.createImage()
      databus.imgObj[k].src = this.srcs[k]
      databus.imgObj[k].onload = () => {
        // 判断是否所有的图片都加载完成了
        this.count++
        if (this.count >= this.maxCount) {
          databus.load = true
        }
      }
    }
  }
}