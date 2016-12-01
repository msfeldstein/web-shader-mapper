var fs = require('fs')
window.THREE = require('three')
window.Tween = require('tween')
var app = require('./js/boilerplate')
var Sprite = require('./js/Sprite')

var material = new THREE.ShaderMaterial({
  uniforms: {
    time: {type: 'f', value: 0},
    resolution: {type: 'v2', value: new THREE.Vector2(app.canvas.width, app.canvas.height)}
  },
  fragmentShader: fs.readFileSync('frag.fs').toString(),
  vertexShader: fs.readFileSync('./standard.vs').toString()
})
var quad = new Sprite.Quad(app.canvas, app.scene, app.camera, material)

app.scene.add(quad.obj)

app.onFrame(function(t) {
  material.uniforms.time.value = t / 1000
  quad.update()
})


