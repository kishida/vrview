var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//var controls = new THREE.VRControls(camera);
//controls.standing = true;

//var effect = new THREE.VREffect(renderer);
//effect.setSize(window.innerWidth, window.innerHeight);

//var manager = new WebVRManager(renderer, effect);

window.addEventListener('resize', onResize, true);
//window.addEventListener('vrdisplaypresentchange', onResize, true);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -5);
scene.add(cube);
renderer.render(scene, camera);
renderer.vr.enabled = true;

document.body.appendChild( WEBVR.createButton( renderer ) );

function render() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.001;
  //requestAnimationFrame(render);

  //controls.update();

  renderer.render(scene, camera);
  //manager.render(scene, camera);
}
renderer.setAnimationLoop(render);
render();

function onResize(e) {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}