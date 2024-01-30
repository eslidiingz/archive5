import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let camera, scene, renderer;
let mesh;
let size = 100;
let height = size / 10;
let pointLight;
let group;
let controls;

// renderer.domElement.addEventListener("click", (e) => {
//     console.log(e)
// }, true);

const init = () => {
  group = new THREE.Group();
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(500, 500, 500);
  camera.rotation.order = "YXZ";
  camera.rotation.y = -Math.PI / 4;
  camera.rotation.x = Math.atan(-1 / Math.sqrt(2));

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // pointLight = new THREE.PointLight(0xffffff)
  // pointLight.position.set(5, 5, 5)

  // console.log(textureCube);
  const geometry = new THREE.BoxGeometry(size, height, size);
  const textureCube = new THREE.TextureLoader().load(
    // "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
    "assets/images/land-s.jpeg"
  );
  const material = new THREE.MeshBasicMaterial({
    map: textureCube,
  });

  for (let j = 0; j < 64; j++) {
    for (let i = 0; i < 64; i++) {
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(i * size, 0, j * size);
      group.add(mesh);
      //   scene.add(mesh);
    }
  }
  scene.add(group);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 2000;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enableRotate = false;
  controls.addEventListener("mousedown", myOnMouseDownFunction, false);
  //   controls.mouseButtons

  //   function cubeScale() {
  //     cube.scale.x *= 20;
  //   }
  window.addEventListener("resize", onWindowResize);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  requestAnimationFrame(animate);
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  render();
};

const render = () => {
  renderer.render(scene, camera);
};
function myOnMouseDownFunction(evt) {
  //   evt.preventDefault();
  //   var array = getMousePosition(contB1, evt.clientX, evt.clientY);
  //   onClickPosition.fromArray(array);
  //   var intersects = getIntersects(onClickPosition, sceneB1.children);
  //   if (intersects.length > 0 && intersects[0].uv) {
  //     controls.enabled = false;
  //     var uv = intersects[0].uv;
  //     console.log(uv);
  //   } else {
  //     controls.enabled = true;
  //   }
  console.log("I am being called");
}

const threePage = () => {
  useEffect(() => {
    init();
    animate();
  }, []);
  return (
    <>
      <canvas id="bg"></canvas>
    </>
  );
};
export default threePage;
