//Imports 
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'https://unpkg.com/three@0.141.0/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'https://unpkg.com/three@0.141.0/examples/jsm/geometries/TextGeometry.js'

//Setup camera and scene with the size of the window
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

const white = new THREE.Color( "rgb(255,255,255)" )
const red = new THREE.Color( "rgb(255,10,10)" )
const green = new THREE.Color( "rgb(10,255,10)" )
const purple = new THREE.Color( "rgb(60,0,80)" )

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30);
camera.position.setY(10)

renderer.render(scene, camera);

let count = 0;

//Donut Mesh

const donut = new THREE.TorusGeometry(10,3,10,90)
const donut2 = new THREE.TorusGeometry(10,3,10,95)
const donut3 = new THREE.TorusGeometry(10,3,10,100)
const donut4 = new THREE.TorusGeometry(10,3,10,105)

const donutMat = new THREE.MeshBasicMaterial( {color: 0xFFFFF, wireframe: true} )
const donutMat2 = new THREE.MeshBasicMaterial( {color: red, wireframe: true} )
const donutMat3 = new THREE.MeshBasicMaterial( {color: green, wireframe: true} )
const donutMat4 = new THREE.MeshBasicMaterial( {color: purple, wireframe: true} )

const donutMesh = new THREE.Mesh(donut, donutMat)
const donutMesh2 = new THREE.Mesh(donut2, donutMat2)
const donutMesh3 = new THREE.Mesh(donut3, donutMat3)
const donutMesh4 = new THREE.Mesh(donut4, donutMat4)

scene.add(donutMesh, donutMesh2, donutMesh3, donutMesh4)

const pointLight = new THREE.PointLight(white)

pointLight.position.set(-10,-20,40)

scene.add(pointLight)

const gridHelper = new THREE.GridHelper(400,100);
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

controls.rotateSpeed = 5.0;

const loader = new FontLoader();

//Add error22 text 
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

// Animates the donut then renders the donut 
function animate () {
  requestAnimationFrame(animate)

  donutMesh.position.y = 5
  donutMesh.position.z = -5
  donutMesh.rotation.x += 0.005
  donutMesh.rotation.y += .001
  donutMesh.rotation.z += .001

  donutMesh2.position.y = 5
  donutMesh2.position.z = -5
  donutMesh2.rotation.x += 0.006
  donutMesh2.rotation.y += .001
  donutMesh2.rotation.z += .001

  donutMesh3.position.y = 5
  donutMesh3.position.z = -5
  donutMesh3.rotation.x += 0.007
  donutMesh3.rotation.y += .001
  donutMesh3.rotation.z += .001

  donutMesh4.position.y = 5
  donutMesh4.position.z = -5
  donutMesh4.rotation.x += 0.008
  donutMesh4.rotation.y += .001
  donutMesh4.rotation.z += .001

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

function vistorCount(){
  count ++;

  document.getElementById("visitor-count").innerHTML = count
}


