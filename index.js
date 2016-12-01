var canvas = require("@msfeldstein/full-screen-canvas")()
var fs = require('fs')
window.THREE = require('three')
window.Tween = require('tween')

var Sprite = require('./Sprite')

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

var material = new THREE.ShaderMaterial({
  uniforms: {
    time: {type: 'f', value: 0},
    resolution: {type: 'v2', value: new THREE.Vector2(canvas.width, canvas.height)}
  },
  fragmentShader: fs.readFileSync('frag.fs').toString(),
  vertexShader: fs.readFileSync('./standard.vs').toString()
})
var quad = new Sprite.Quad(canvas, scene, camera, material)

scene.add(quad.obj)
quad.update()

var render = function(t) {
  requestAnimationFrame(render)
  material.uniforms.time.value = t / 1000
  quad.update()
  renderer.render(scene, camera)
  Tween.update(t)
}

requestAnimationFrame(render)

