'use strict'

// import _ from 'lodash';
import './style.scss';

import * as THREE from 'three';
import * as dat from 'dat.gui';
import { DoubleSide, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

//HTML
const buttonWarm = document.querySelector('.js--warm') as HTMLElement
const buttonCold = document.querySelector('.js--cold') as HTMLElement
const canvas = document.querySelector('canvas.webgl') as HTMLElement

//SCENE
const scene = new THREE.Scene()
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

//GUI
const gui = new dat.GUI();
const GUIlights = gui.addFolder('Lights')
const GUIlight1 = GUIlights.addFolder('Light1')
const GUIlight2 = GUIlights.addFolder('Light2')

const GUIobjects = gui.addFolder('Objects')
const GUIearth = GUIobjects.addFolder('Earth')
const GUImoon = GUIobjects.addFolder('Moon')
const GUIcameras = gui.addFolder('Cameras')

//OBJECTS
const geometry = new THREE.SphereBufferGeometry(5, 64, 64);
const geometry2 = new THREE.SphereBufferGeometry(.5, 64, 64);

//TEXTURES
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('./sphereNM.png');

//MATERIALS
const material = new THREE.MeshStandardMaterial();
const material2 = new THREE.MeshStandardMaterial();
material.metalness = .7;
material.roughness = 0.2;
material.color = new THREE.Color(0x666666);
material.normalMap = normalTexture;
material2.metalness = .1;
material2.roughness = 1;
material2.color = new THREE.Color(0x666666);
material2.normalMap = normalTexture;

//MESH
const earth = new THREE.Mesh(geometry, material);
const moon = new THREE.Mesh(geometry2, material2);
scene.add(earth);
scene.add(moon);

//CAMERA
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, .1, 10000);

camera.position.set(0, 5, 14)
camera.lookAt(0, 0, 0);
scene.add(camera);

function updateCamera() {
	camera.updateProjectionMatrix();
}

GUIcameras.add(camera.position, 'x').min(-30).max(30).step(0.01);
GUIcameras.add(camera.position, 'y').min(-30).max(30).step(0.01);
GUIcameras.add(camera.position, 'z').min(-30).max(30).step(0.01);
GUIcameras.add(camera.rotation, 'x').min(-10).max(10).step(0.01);
GUIcameras.add(camera.rotation, 'y').min(-10).max(10).step(0.01);
GUIcameras.add(camera.rotation, 'z').min(-10).max(10).step(0.01);
GUIcameras.add(camera, 'fov', 1, 180).onChange(updateCamera);

const controls = new OrbitControls(camera, canvas);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	render()
}

//LIGHT
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x823d00, 2);
pointLight2.position.set(-7.6, 4.3, 2.4);
pointLight2.intensity = 10;
scene.add(pointLight2);

GUIlight1.add(pointLight2.position, 'x').min(-15).max(15).step(0.01);
GUIlight1.add(pointLight2.position, 'y').min(-15).max(15).step(0.01);
GUIlight1.add(pointLight2.position, 'z').min(-15).max(15).step(0.01);
GUIlight1.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

const light2color = {
	color: 0xff0000
}

GUIlight1.addColor(light2color, 'color').onChange(() => {
	pointLight2.color.set(light2color.color);
});

const pointLight3 = new THREE.PointLight(0x1c69af, 2);
pointLight3.position.set(11.6, -3.6, 3.4);
pointLight3.intensity = 10;
scene.add(pointLight3);

GUIlight2.add(pointLight3.position, 'x').min(-20).max(20).step(0.01);
GUIlight2.add(pointLight3.position, 'y').min(-20).max(20).step(0.01);
GUIlight2.add(pointLight3.position, 'z').min(-20).max(20).step(0.01);
GUIlight2.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

const light3color = {
	color: 0xff0000
}

GUIlight2.addColor(light3color, 'color').onChange(() => {
	pointLight3.color.set(light3color.color);
});

//RENDERER
const renderer = new WebGLRenderer({
	canvas: canvas,
	alpha: true
});

window.addEventListener('resize', () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;
	// camera.aspect = sizes.width / sizes.height;
	// camera.updateProjectionMatrix();
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//RAYCASTER
const raycaster = new THREE.Raycaster();
let intersects: THREE.Intersection[]

//CLOCK
const clock = new THREE.Clock();

//OTHER
const mouse = new THREE.Vector2();

const objs: THREE.Mesh[] = []

scene.traverse((object) => {
	if ((object as THREE.Mesh).isMesh) {
		objs.push(object as THREE.Mesh);
	}
});

buttonWarm.addEventListener('click', () => {
	// camera.rotation.set(-2.44, -1.56, -2.44);
	// camera.rotation.set(0, 0, 0);
	camera.position.set(-6.66, 1.28, 5.25);
	camera.lookAt(0, 0, 0);
	pointLight3.intensity = 0;
	pointLight2.intensity = 10;
	updateCamera();
});
buttonCold.addEventListener('click', () => {
	// camera.rotation.set(0, 0, 0);

	camera.position.set(6.66, -1.28, -5.25);
	camera.lookAt(0, 0, 0);
	pointLight3.intensity = 10;
	pointLight2.intensity = 0;
	updateCamera();
});

window.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX / sizes.width * 2 - 1;
	mouse.y = e.clientY / sizes.height * -2 + 1;
});

var r = 10;
var theta = 1;
var dTheta = 3 * Math.PI / 1000;

const tick = () => {
	let cameraX = camera.position.x;
	let cameraY = camera.position.y;
	let cameraZ = camera.position.z;

	const v1 = new THREE.Vector3(cameraX, cameraY, cameraZ);
	const v2 = new THREE.Vector3(6.66, -1.28, -5.25);

	const elapsedTime = clock.getElapsedTime();
	camera.position.lerpVectors(v2, v1, 1);

	//Raycaster
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(objs);

	for (const intersect of intersects) {
		if (intersect.object == moon) {
			dTheta = 1 * Math.PI / 1000;

			theta += dTheta;
			intersect.object.position.x = -r * Math.cos(theta);
			intersect.object.position.z = r * Math.sin(theta);
			// intersect.object.position.x = intersect.object.position.x;
			// intersect.object.position.z = intersect.object.position.z;
		}
	}
	for (const object of objs) {
		if (!intersects.find(intersect => intersect.object === object)) {
			if (object == moon) {
				dTheta = 3 * Math.PI / 1000;

				theta += dTheta;
				moon.scale.set(1.5, 1.5, 1.5);
				object.position.x = -r * Math.cos(theta);
				object.position.z = r * Math.sin(theta);

			}
		}
	}

	earth.rotation.y = .08 * elapsedTime;

	// moon.updateMatrix();
	camera.updateMatrix();
	window.requestAnimationFrame(tick);
	render();
}
tick();

function render() {
	renderer.render(scene, camera)
}

