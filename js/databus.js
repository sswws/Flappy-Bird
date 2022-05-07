let instance
export default class Databus {
  constructor () {
    if (instance) return instance
    instance = this
    this.canvas
    this.ctx
    this.imgObj = {}
    this.load = false
    this.speed = 2
    this.actors = []
    this.bird 
    this.scene = 0
    this.score = 0
    this.max = 0
  }
  addActor (actor) {
    this.actors.push(actor)
  }
  reset () {
    this.actors = []
    this.bird = null
    this.scene = 0
    this.speed = 2
    this.score = 0
  }
}