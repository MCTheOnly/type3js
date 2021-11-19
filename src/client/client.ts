'use strict'

// import _ from 'lodash';
import './style.scss';

import * as THREE from 'three';
import * as dat from 'dat.gui';
import { DoubleSide, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//SCENE
const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl');

//GUI
const gui = new dat.GUI();

const GUIlights = gui.addFolder('Lights');
const GUIlight1 = GUIlights.addFolder('Light1');
const GUIlight2 = GUIlights.addFolder('Light2');

const GUIobjects = gui.addFolder('Objects');
const GUIearth = GUIobjects.addFolder('Earth');
const GUImoon = GUIobjects.addFolder('Moon');
