import * as THREE from 'three';

// === Scene, camera, renderer ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Cube with texture ===
const geometry = new THREE.BoxGeometry();
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./img/jackson.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// === Messages (in order) ===
const messages = [
  "Hi im Jackson! 🎸",
  "im 23 🤘",
  "i love buffalo wild wings ❤️‍🔥",
  "Thursdyas they have BOGO 🎶",
  "i love jordyn 🔨",
  "they dont ONLY sell wings 🚀",
  "i love power tools!!! 😜",
  "they actually have like burgers and other menu items like sauces. super reasonably priced 🤾🏾‍♀️",
];

// === Counter to track current message index ===
let currentMessageIndex = 0;

// === Raycaster for clicks ===
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  // Convert mouse position to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Check if cube was clicked
  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
      // Show the next message in order
      messageDiv.textContent = messages[currentMessageIndex];

      // Advance index; loop back to 0 if at the end
      currentMessageIndex++;
      if (currentMessageIndex >= messages.length) {
        currentMessageIndex = 0;
      }

    }
  }
});

// === Animation loop ===
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// === Handle window resize ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
