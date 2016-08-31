/**
 * Created by iceleaf on 2016/8/31.
 */
/**
 * Created by iceleaf on 2016/8/30.
 */
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container, control;

var WIDTH, HEIGHT;

window.addEventListener('load', init, false);

function init() {
    createScene();
    createLight();
    createModel();


    render();
    createOrbit();
    loop();


}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);


}

function createScene() {
    scene = new THREE.Scene();

    WIDTH = document.getElementById('world').clientWidth;
    HEIGHT = document.getElementById('world').clientHeight;
    fieldOfView = 40;
    aspectRatio = WIDTH/HEIGHT;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.set(0, 0, 10);

}

function createLight(){
    var ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    //spotLight.position.set(-100, 100, 100);
    scene.add(ambientLight);
}

function createModel(){


    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load('model/ball.json', addBall);
    function addBall(geometry, material) {
        var mtl = new THREE.MeshFaceMaterial(material);
        var mesh = new THREE.Mesh(geometry, mtl);
        scene.add(mesh);
    }
    jsonLoader.load('model/floor.json', addFloor);
    function addFloor(geometry, material) {
        var mtl = new THREE.MeshFaceMaterial(material);
        var mesh = new THREE.Mesh(geometry, mtl);
        console.log(mesh.material);
        scene.add(mesh);
    }


}

function render() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    renderer.render(scene, camera);

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}


function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);

}


