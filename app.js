var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x505050 );

var camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', onResize, true);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0x00ff00, overdraw:0.5});
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -5);
scene.add(cube);

light = new THREE.DirectionalLight(0xdfebff, 1);
light.position.set(50, 200, 100);
light.position.multiplyScalar(1.3);
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
var d = 300;
light.shadow.camera.left = -d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = -d;
light.shadow.camera.far = 1000;
scene.add(light);

renderer.render(scene, camera);
renderer.vr.enabled = true;

document.body.appendChild(renderer.domElement);
document.body.appendChild( WEBVR.createButton( renderer ) );

function render() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.001;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(render);
render();

function onResize(e) {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}