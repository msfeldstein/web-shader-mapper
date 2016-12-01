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

var Quad = function(canvas, material) {
  var width = canvas.width
  var height = canvas.height
  
  var points = [
    [width / 2 - 100, height / 2 + 100],
    [width / 2 + 100, height / 2 + 100],
    [width / 2 - 100, height / 2 - 100],
    [width / 2 + 100, height / 2 - 100]
  ]
  var jsonData = localStorage.getItem('dots')
  if (jsonData) {
    points = JSON.parse(jsonData)
  }
  var obj = new THREE.Object3D()
  this.material = material || new THREE.MeshBasicMaterial({
    color: 0x0000ff
  })
  this.geometry = new THREE.PlaneGeometry(30, 30)
  this.mesh = new THREE.Mesh(this.geometry, this.material)
  var tl = new Dot(points[0][0], points[0][1])
  var tr = new Dot(points[1][0], points[1][1])
  var bl = new Dot(points[2][0], points[2][1])
  var br = new Dot(points[3][0], points[3][1])
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
  
  window.addEventListener('unload', () => {
    localStorage.setItem('dots', JSON.stringify([
      [this.dots[0].position.x, this.dots[0].position.y],
      [this.dots[1].position.x, this.dots[1].position.y],
      [this.dots[2].position.x, this.dots[2].position.y],
      [this.dots[3].position.x, this.dots[3].position.y],
    ]))
  })
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