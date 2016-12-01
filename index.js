var canvas = require("@msfeldstein/full-screen-canvas")()
var fs = require('fs')
window.THREE = require('three')
window.Tween = require('tween')
var Touches = require("touches")
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
var quad = new Sprite.Quad(canvas, material)

scene.add(quad.obj)
quad.update()

var render = function(t) {
  requestAnimationFrame(render)
  material.uniforms.time.value = t / 1000
  quad.update()
  renderer.render(scene, camera)
  Tween.update(t)
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var picked = null
var lastEvent
Touches().on('start', function(event) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
  raycaster.setFromCamera(mouse, camera)
  var intersects = raycaster.intersectObjects(scene.children, true)
  intersects.forEach(function(c) {
    if (c.object.pickable) picked = c
  })
  picked = picked && picked.object
  if (picked) {
    picked.material.color.setHex(0x00ff00)
  }
  lastEvent = event
})

.on('move', function(event) {
  if (picked) {
    var dx = event.clientX - lastEvent.clientX
    var dy = event.clientY - lastEvent.clientY
    picked.position.x += dx
    picked.position.y += -dy
    lastEvent = event
  }
})

.on('end', function(event) {
  if (picked) {
    picked.material.color.setHex(0xff0000)
    picked = null
  }
})
requestAnimationFrame(render)

