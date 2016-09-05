/**
 * Created by iceleaf on 2016/9/4.
 */
var scene, camera, fieldOfView, aspectRadio, nearPlane, farPlane,
    renderer, container, fox, snowGL, effect, controls;

var WIDTH, HEIGHT;
var processValue = 10;


window.addEventListener('load', init, false);

function init() {
    createScene();
    createLight();
    createModel();

    render();
    loop();



    window.addEventListener('resize', windowRize, false);

}

function windowRize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH/HEIGHT;
    camera.updateProjectionMatrix();

    effect.setSize(WIDTH, HEIGHT);

}

function processing() {
    processValue += 45;
    $( "#progressbar" ).progressbar({
        value: processValue
    });

}


function createScene() {
    scene = new THREE.Scene();

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    fieldOfView = 40;
    aspectRadio = WIDTH/HEIGHT;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRadio, nearPlane, farPlane);
    camera.position.set(0, 0, 40);
}


function createLight() {
    var ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    scene.add(ambientLight);
}

function createModel() {
    $( "#progressbar" ).progressbar({

        value: processValue
    });


    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load('model/snowGL.json', addGL);
    function addGL(geometry, material) {
        var mtl = new THREE.MeshFaceMaterial(material);
        snowGL = new THREE.Mesh(geometry, mtl);
        snowGL.position.set(0, 0, 0);
        scene.add(snowGL);
        console.log(snowGL);
        console.log(50);
        processing();
    }

    jsonLoader.load('model/Fox.json', addFox);
    function addFox(geometry, material) {
        var mtl = new THREE.MeshFaceMaterial(material);
        fox = new THREE.Mesh(geometry, mtl);
        fox.position.set(0, 0, 0);
        scene.add(fox);
        processing();
    }


}

function render() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xbef0ff);
    renderer.render(scene, camera);

    effect = new THREE.StereoEffect(renderer);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
   // controls.rotateUp(Math.PI / 4);
    controls.target.set(0, 0, 0);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.update();

    function setOrientationControls(e) {
        if (!e.alpha) {
            return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();


        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);


    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    windowRize();



}

function loop() {
    if(processValue==100){
        $('#cover').delay(500).fadeOut(1000);
    }
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);

    controls.update();

    effect.render(scene, camera);
    requestAnimationFrame(loop);

}

