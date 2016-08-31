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


var helpset ;


function createModels() {
   var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load('model/arm.json', addModel);
    function addModel(geometry, material) {
        var mtl = new THREE.MeshFaceMaterial (material);
        var mesh = new THREE.SkinnedMesh(geometry, mtl);
        mesh.skeleton.bones[1].rotation.z = 1;
        mesh.material.materials.forEach(function(m){    //
            m.skinning = true;                           // TMD 超級重要!!!!!!!!!!!!!!!!!!
        });                                              //


        scene.add(mesh);
        helpset = new THREE.SkeletonHelper(mesh);
        helpset.update();

        scene.add(helpset);



    }

}

function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);

    scene.traverse(function (child) {
        if(child instanceof THREE.SkinnedMesh){
            //child.rotation.y += 0.1;
            child.skeleton.bones[2].rotation.y += 0.05;
            child.skeleton.bones[1].rotation.y += 0.01;


        }else if (child instanceof THREE.SkeletonHelper){
            child.update();
        }

    });

}