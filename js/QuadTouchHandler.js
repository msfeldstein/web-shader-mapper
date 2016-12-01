var Touches = require("touches")
module.exports = function(scene, camera) {
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
  return true  
}
