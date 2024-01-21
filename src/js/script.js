import dat from "dat.gui";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import nebulla from '../images/nebulla.jpg'
import stars from '../images/stars.jpg';
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement)
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const orbit = new OrbitControls(camera, renderer.domElement)
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
camera.position.set(-10, 30, 30)
orbit.update()


const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true;
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI;
const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)
const sphareGeometry = new THREE.SphereGeometry(4)
const sphareMaterial = new THREE.MeshStandardMaterial({color: 0x0000FF, wireframe: false})
const sphare = new THREE.Mesh(sphareGeometry, sphareMaterial)
sphare.castShadow = true;
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
directionalLight.position.set(-30, 50, 0)
directionalLight.castShadow = true;

scene.add(directionalLight)
scene.add(dLightHelper)

// const spotLight = new THREE.SpotLight()
// scene.add(spotLight)
scene.add(sphare)

sphare.position.set(-10, 10, 0)

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(stars)


const gui = new dat.GUI()
const options = {
    sphareColor: '#ffea00',
    wireframe: false,
    speed: 0.01
}
gui.addColor(options, 'sphareColor').onChange((e) => {
    sphare.material.color.set(e)
})

gui.add(options, 'wireframe').onChange((e)=>{
    sphare.material.wireframe = e;
})
gui.add(options, 'speed', 0, 0.1)

let step = 0;

function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    renderer.render(scene, camera)
    step += options.speed;
    sphare.position.y = 10 * Math.abs(Math.sin(step));


}



renderer.setAnimationLoop(animate)
