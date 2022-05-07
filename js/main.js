import Databus from "./databus.js"
import ResourceLoader from "base/resourceLoader.js"
import Background from "runtime/background.js"
import Land from "runtime/land.js"
import Pipe from "runtime/pipe.js"
import Bird from "player/bird.js"
import Score from "player/score.js"
import Over from "./player/over.js"
import Panel from "./player/panel.js"
const databus = new Databus()

// 设置整个动画的帧率 为 30
wx.setPreferredFramesPerSecond(30)

export default class Main {
  constructor () {
    // 获取 canvas 画布，以及绘图上下文
    this.canvas = wx.createCanvas()
    this.ctx = this.canvas.getContext("2d")
    this.aniId = 0
    databus.canvas = this.canvas
    databus.ctx = this.ctx
    this.resource = new ResourceLoader()
    this.status = false
    this.loop()
    this.bindEvent()
  }
  init () {
    if (this.status) return
    this.status = true
    // 清空数据
    databus.reset()
    this.bg = new Background()
    this.land = new Land()
    this.bird = new Bird()
    this.score = new Score()
    this.over = null
    this.bg.render()
    this.land.render()
  }
  update () {
    // 每次重新绘制
    databus.ctx.clearRect(0,0,databus.canvas.width,databus.canvas.height)    
    databus.actors.forEach(value => {
      value.update()
      value.render()
    })
    this.score.render()
  }
  loop () {
    // 开启定时器
    this.aniId = requestAnimationFrame(() => {
      // 判断图片是否加载完成
      if (databus.load) {
        // 进行场景判断，0 代表开始游戏画面 ，1 代表游戏过程中， 2 代表游戏结束
        if (databus.scene === 0) {
          // 初始化
          this.init()
          
        } else if (databus.scene === 1) {
          // 每隔 100 帧 添加一对管子
          if (this.aniId % 100 === 0) {
            const pipe = new Pipe()
          }
        } else if (databus.scene === 2 ) {
          databus.speed = 0
          databus.bird.wing = 0
          databus.bird.rotate = Math.PI / 2
          if (!this.over) {
            this.over = new Over()
            this.panel = new Panel()
          }
          if (databus.score > databus.max) {
            databus.max = databus.score
          }
        }   
        
        this.update()
      }
      this.loop()
    })
  }
  bindEvent () {
    wx.onTouchStart((result) => {
      
      if (databus.scene === 0) {
        this.bird.bindFly()
        databus.scene = 1
      } else if (databus.scene === 1) {
        this.bird.bindFly()
      } else if (databus.scene === 2 ) {
        databus.scene = 0
        this.status = false
      } 
    })
  }
}