import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

//SCENE
const scene = new THREE.Scene()

//CAMERA
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
camera.position.z = 2

//RENDERER
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

//OBJECT
const geometry = new THREE.BoxGeometry()

//MATERIAL
const material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true,
})

//MESH
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	render()
}

//LOOP
function animate() {
	requestAnimationFrame(animate)

	cube.rotation.x += 0.01
	cube.rotation.y += 0.01

	render()
}

function render() {
	renderer.render(scene, camera)
}

animate()
