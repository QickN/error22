
//Imports 
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'https://unpkg.com/three@0.141.0/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'https://unpkg.com/three@0.141.0/examples/jsm/geometries/TextGeometry.js'


//Setup camera and scene with the size of the window
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

const white = new THREE.Color("rgb(255,255,255)")

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30);
camera.position.setY(10)

renderer.render(scene, camera);

const donut = new THREE.TorusGeometry(10,3,10,90)
const donutMat = new THREE.MeshBasicMaterial( {color: 0xFFFFF, wireframe: true})
const donutMesh = new THREE.Mesh(donut, donutMat)

scene.add(donutMesh)

const pointLight = new THREE.PointLight(white)
pointLight.position.set(-10,-20,40)

scene.add(pointLight)

const gridHelper = new THREE.GridHelper(400,100);
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new FontLoader();



loader.load('Roboto Black_Italic.json', function( font ){
  const name = new TextGeometry( "error22", {
    font: font,
    size: 3,
    height: 2,
  });
  const nameMat = new THREE.MeshStandardMaterial({color: white})
  const nameMesh = new THREE.Mesh(name, nameMat)
  nameMesh.position.set(-7.5,5,10)
  scene.add(nameMesh)
});

function animate() {
  requestAnimationFrame(animate)

  donutMesh.position.y = 5
  donutMesh.position.z = -5
  donutMesh.rotation.x += 0.005
  donutMesh.rotation.y += .001
  donutMesh.rotation.z += .001

  controls.update()
  renderer.render(scene,camera)
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

animate()
