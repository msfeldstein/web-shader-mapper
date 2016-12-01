var canvas = require("@msfeldstein/full-screen-canvas")()

var width = canvas.width
var height = canvas.height

var renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
  devicePixelRatio: window.devicePixelRatio
})
renderer.setSize(width, height)

var scene = new THREE.Scene()
var camera = new THREE.OrthographicCamera(0 , width , height , 0 , 0, 100)
camera.position.z = 1

var callbacks = []

var render = function(t) {
  requestAnimationFrame(render)
  callbacks.forEach((cb) => {cb(t)})
  Tween.update(t)
  renderer.render(scene, camera)
}

requestAnimationFrame(render)

module.exports = {
  canvas,
  renderer,
  scene,
  camera,
  onFrame: function(cb) {
    callbacks.push(cb)
  }
}