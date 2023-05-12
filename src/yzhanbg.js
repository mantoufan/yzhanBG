import YZhanWeather from 'yzhanweather'
let lastInstance = null
export default class {
  constructor() {
    if (lastInstance) lastInstance.destory()
    this.wrapper = document.createElement('DIV')
    document.body.appendChild(this.wrapper)
    this.prefix = 'yzhanbg'
    this.initClass()
    this.list = []
    this.cur = 0
    this.video = this.initVideo()
    this.wrapper.appendChild(this.video)
    this.img = this.initImg()
    this.wrapper.appendChild(this.img)
    this.control = this.initControl()
    this.wrapper.appendChild(this.control)
    this.weather = new YZhanWeather()
    lastInstance = this
  }
  initClass() {
    const styleSheet = this.wrapper.appendChild(document.createElement('STYLE')).sheet
    const classes = [
      'video, .' + this.prefix + '-img {position: fixed; visibility: hidden; top: 0; left: 0; z-index: -1; width: 100%; height: 100%; object-fit: cover}',
      'cur {visibility: visible !important}',
      'control {position: absolute; top: 0; right: 0; font-size: 12px; z-index: 1; background-color: rgba(255, 255, 255, .5); border-radius: 0 0 0 5px}',
      'control span {margin-left: 3px; vertical-align: top; cursor: pointer}',
      'icon {display: inline-block; width: 15px; height: 15px; opacity: .75; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAPCAYAAAC4EqxxAAAACXBIWXMAAAsTAAALEwEAmpwYAAACpklEQVRIieXWP4gVVxQG8N8YXSW4/mOJhXEbQbEwRUCRWFhsIagoslEQIwppRIgICWghIglRG0FstEvEpBGEiEZQsLARRRCTDYigIBGb9WESTRFRfCnOmd3nY2b3LSur4oFhZu453z33u985c6doNpveJ5s83gmKoug0dBr+K1/e1EZPmsBc32Dt65qsKApFUSwtimJRPo96kQrXqLQGL3CxLukIKrViP8SX+AmHcB2PKvLOx3osxRw8xg2cxYOanE+wF4exAJsS+1cVlmqFu7AbO7C4jlGNtWNn4uNcxApcwucVuH4cwyq8xM28r8rx/pp8d3BEkH6I+/gtfZXYsoe70jlF9NqMtonXoRs/o0eU5/d4Ogp2Ab7CAaHCHnyHEyil2t6yqAu4hiX4BcuxOmO68WPburbhExwVG30Ys/Ecy6qwpcJTMA8fVZCFq1gplDuI20l2NOxNDKavgakZPzP9fS1kG0n2W2zM+7Ucl3F9LXP3iWpZiA1Jdi+eYXMdttOPVkOUzhrRNyc7xBE91IO/xYY8xfT0bW2J+1Mo22pLcry0rTXPHwhlj2GXqMTposRfie+UcA++xq+56G0d4oiPUQOzxGZ149/0nWqJ68VAG3Ygx0s7VfPcK8p4i2HSg4bbZii+7OHnounrevgzXPFqD3cLtUbCfirKeTBxzzL+n/RfFhvSn/7l2C+UHcj3now9k/EqsHNEz5bKluV9VLTP7yW2aDab7cdDF3aKmr+coErrAPsD5oqeupv+aTjehu3HF0KAhijj3iT7QhxpZ8qcGAl7Xyh7VnzIjuCPofVWLLq01Zns0hgIV2HLc/icOId34VEFdkzn8AjY2Yk9jXuGz+k7Q4THY2P4tdyHWzjfuvAJyLtItNmNiSb8VvxLj5vwu2b/A3QZ1pa7ROuXAAAAAElFTkSuQmCC)}',
      'icon-mute {background-position-x: 0}',
      'icon-unmute {background-position-x: -15px}',
      'icon-show {background-position-x: -30px}',
      'icon-hide {background-position-x: -45px}'
    ]
    const n = classes.length
    for (let i = 0; i < n; i++) styleSheet.insertRule('.' + this.prefix + '-' + classes[i], 0)
  }
  initVideo() {
    const video = document.createElement('VIDEO')
    video.addEventListener('ended', () => this.next())
    video.muted = true
    video.autoplay = true 
    video.className = this.prefix + '-video'
    return video
  }
  initImg() {
    const img = document.createElement('IMG')
    img.className = this.prefix + '-img'
    return img
  }
  initControl() {
    const control = document.createElement('DIV')
    for (let i = 0; i < 3; i++) {
      const s = document.createElement('SPAN')
      control.appendChild(s)
      if (i === 2) {
        control.text = s
        break
      }
      s.className = this.prefix + '-icon ' + this.prefix + '-icon-' + (i === 0 ? 'mute' : 'show')
      if (i === 0) (control.mute = s).onclick = () => s.className.indexOf('unmute') >-1 ? this.mute() : this.unmute()
      else (control.show = s).onclick = () => s.className.indexOf('hide') >-1 ? this.show() : this.hide()
    }
    control.className = this.prefix + '-control'
    return control
  }
  run(list) {
    this.list = list
    this.cur = 0
    this.play()
  }
  isImage(url) {
    return /jpg|jpeg|png|gif|webp|avif|bmp$/i.test(url)
  }
  play() {
    const { url, weather: {type, maxDuration}, text, duration } = this.current()
    const tagName = this.isImage(url) ? 'img' : 'video', curClassName = this.prefix + '-cur'
    this[tagName].src = url
    this['img'].classList.remove(curClassName)
    this['video'].classList.remove(curClassName)
    this[tagName].classList.add(curClassName)
    this.control.text.innerHTML = text
    this.weather.run(type, { maxDuration })
    if (duration !== void 0) setTimeout(() => this.next(), duration * 1000) 
  }
  next() {
    this.pause(), ++this.cur === this.list.length && (this.cur = 0), this.play()
  }
  pause() {
    this.video.pause()
    this.weather.clear()
  }
  resume() {
    this.video.play()
    const { weather: {type, maxDuration} } = this.current()
    this.weather.run(type, { maxDuration })
  }
  mute() {
    this.video.muted = true
    this.processClassName('mute', '-unmute', '-mute')
  }
  unmute() {
    this.video.muted = false
    this.processClassName('mute', '-mute', '-unmute')
  }
  processChildren(fn) {
    const children = document.body.children, n = children.length
    for (let i = 0; i < n; i++) {
      if (children[i] === this.wrapper || ['SCRIPT', 'STYLE', 'LINK', 'META'].indexOf(children[i].tagName) > -1) continue
      fn(children[i])
    }
  }
  processClassName(bt, oldClass, newClass) {
    this.control[bt].className = this.control[bt].className.replace(oldClass, newClass)
  }
  show() {
    this.processChildren(child => child.style.visibility = 'visible')
    this.processClassName('show', '-hide', '-show')
  }
  hide() {
    this.processChildren(child => child.style.visibility = 'hidden')
    this.processClassName('show', '-show', '-hide')
  }
  current() {
    return this.list[this.cur]
  }
  remove(node) {
    node.parentNode.removeChild(node)
  }
  destory() {
    this.list.length = this.cur = 0
    this.weather.destory()
    this.remove(this.wrapper)
    this.remove(this.control)
    this.video = this.weather = this.control = null
  }
}