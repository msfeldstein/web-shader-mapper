var Tween = window.Tween

var Dot = function(x, y) {
  var dotSize = 30
  var planeGeom = new THREE.PlaneGeometry(dotSize, dotSize)
  var planeMat = new THREE.MeshBasicMaterial({
    color: 0xFF0000,
    side: THREE.DoubleSide,
    transparent: true
  })
  var plane = new THREE.Mesh(planeGeom, planeMat)
  plane.position.x = x
  plane.position.y = y
  plane.pickable = true
  return plane  
}

var Quad = function(canvas) {
  var width = canvas.width
  var height = canvas.height
  var obj = new THREE.Object3D()
  this.material = new THREE.MeshBasicMaterial({
    color: 0x0000ff
  })
  this.geometry = new THREE.PlaneGeometry(30, 30)
  this.mesh = new THREE.Mesh(this.geometry, this.material)
  var tl = new Dot(width / 2 - 100, height / 2 + 100)
  var tr = new Dot(width / 2 + 100, height / 2 + 100)
  var bl = new Dot(width / 2 - 100, height / 2 - 100)
  var br = new Dot(width / 2 + 100, height / 2 - 100)
  obj.add(this.mesh)
  obj.add(tl, tr, bl, br)
  this.dotsObj = {tl, tr, bl, br}
  this.dots = [tl, tr, bl, br]
  this.obj = obj
  
  canvas.addEventListener('mouseenter', function() {
    this.dots.forEach(function(d) {
      new Tween.Tween(d.material)
        .to({opacity: 1}, 300)
        .start()
    })
  }.bind(this))

  canvas.addEventListener('mouseleave', function() {
    this.dots.forEach(function(d) {
      new Tween.Tween(d.material)
        .to({opacity: 0}, 300)
        .start()
    })
  }.bind(this))
}

Quad.prototype.update = function(t) {
  var verts = this.geometry.vertices
  this.geometry.verticesNeedUpdate = true
  var dots = this.dotsObj
  verts[0].set(dots.tl.position.x, dots.tl.position.y, 0)
  verts[1].set(dots.tr.position.x, dots.tr.position.y, 0)
  verts[2].set(dots.bl.position.x, dots.bl.position.y, 0)
  verts[3].set(dots.br.position.x, dots.br.position.y, 0)
  Tween.update(t)
}

module.exports = {
  Quad,
  Dot
}