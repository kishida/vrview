var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -5);
scene.add(cube);
renderer.render(scene, camera);

function render() {
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.01;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();