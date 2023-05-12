# yzhanBG
![npm](https://img.shields.io/npm/v/yzhanbg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/yzhanbg)
![npm](https://img.shields.io/npm/dt/yzhanbg)
[![GitHub license](https://img.shields.io/github/license/mantoufan/yzhanbg)](https://github.com/mantoufan/yzhanbg/blob/main/LICENSE)
![ie10+](https://img.shields.io/badge/IE-10-skyblue)  
Use multiple videos, images, and weather as background, with mute, hide, text, and cherry blossom, rain, snow, firefly, and butterfly animations.  
用多个视频、图片、天气作背景，支持静音、隐藏内容、文字，以及樱花、雨、雪、萤火虫和蝴蝶动画
## Demo
[Online Demo](https://mantoufan.github.io/yzhanBG)  
![DEMO GIF](https://s2.loli.net/2023/05/12/3xwLHqyRthi2EYJ.gif)
## Setup
### Node.js
```javascript
npm i yzhanbg
import YZhanBG from 'yzhanbg'
```
### Browser
```html
<script src="https://cdn.jsdelivr.net/npm/yzhanbg@latest/docs/yzhanbg.min.js"></script>
```
## Usage
```javascript 
const yzhanbg = new YZhanBG()
yzhanbg.run([{
  url: './bg/1.mp4',
  weather: {
    type: 'firefly', // Options: sakura | snow | firefly | rain | butterfly 
    maxDuration: 10 // Default: 10s, this option can determine the speed of animations
  },
  text: '©ナルトMinh'
},{
  url: './bg/2.jpg',
  duration: 3, // Default: undefined. Units: seconds. If video duration < this, it ends early
  weather: {
    type: 'sakura',
    maxDuration: 5
  },
  text: '©narumilk'
},{
  url: './bg/3.mp4',
  weather: {
    type: 'butterfly',
    maxDuration: 5
  },
  text: '©DeRanK'
}]) // Add multiple objects with videos, weather, and text to the list in the shown format.
yzhanbg.pause() // Pause the video and clear the weather
yzhanbg.resume() // Resume the video and the weather
yzhanbg.mute() // Mute the video
yzhanbg.unmute() // Unmute the video
yzhanbg.current() // { url: './bg/1.mp4', weather: { type: 'firefly', maxDuration: 10 }, text: '@author' }
yzhanbg.destory() // Destory the instance and free up memory
```
## Development
### Build
```shell
npm run build
```
### Preview
```shell
npm run dev
```