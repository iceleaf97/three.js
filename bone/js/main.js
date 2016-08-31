/**
 * Created by iceleaf on 2016/8/29.
 */
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container, control;

var WIDTH, HEIGHT;

window.addEventListener('load', init, false);

function init(){
    createScene();
    createLight();
    createModels();
    createOrbit(); //建立3D環轉
    //renderer.render(scene, camera); //單次render放這就好
    loop();

    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH/HEIGHT;
    camera.updateProjectionMatrix();
}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
    control.object.position.set(0, 0, 15);  // 設定control camera原點
    control.target.set(0, 0, 0);  // 設定control camera 目標點
    control.update();
}


function createScene() {
    scene = new THREE.Scene();
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    aspectRatio = WIDTH/HEIGHT;
    fieldOfView = 50;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.set(0, 0, 100);

    renderer = new THREE.WebGLRenderer({alpha:true, antialias: true});
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x004444); //設定alpha: true 背景為透明，可用CSS設定背景顏色
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

}

function createLight() {
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(-100, 100, 50);
    //spotLight.castShadow = true;

    //spotLight.shadow.mapSize.width = 1024;
    //spotLight.shadow.mapSize.height = 1024;
    //spotLight.shadow.camera.near = 500;
    //spotLight.shadow.camera.far = 4000;
    //spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);

}

var set = [];
var helpset ;
var scaleVal = 3;

function createModels() {
   var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load('model/box.json', addModel);
    function addModel(geometry, material) {
        material.skinning = true;
        var mtl = new THREE.MeshFaceMaterial(material);
        var mesh = new THREE.SkinnedMesh(geometry, mtl);
        console.log(mesh.skeleton.bones[0].rotation.y);
        mesh.skeleton.bones[0].rotation.y = Math.PI/4;
        console.log(mesh.skeleton.bones[0].rotation.y);

        scene.add(mesh);
        helpset = new THREE.SkeletonHelper(mesh);
        scene.add(helpset);

    }

}

function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);

}