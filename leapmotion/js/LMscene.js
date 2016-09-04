/**
 * Created by iceleaf on 2016/9/4.
 */
var scene, camera, fieldOfView, aspectRadio, nearPlane, farPlane,
    renderer, container, fox, snowGL;

var WIDTH, HEIGHT;

var posX, posY, posZ, pointer;

var originX			= 600,
    originY			= 600,
    originZ			= 600,
    maxX			= originX,
    maxY			= originY,
    maxZ			= originZ,
    maxSpan			= 100,
    maxZSpan		= 160,
    offsetY			= 1400;

var processValue = 10;

Leap.loop(function(frame) {
    pointer = frame.pointables[0];
    if(pointer){
        posX = translateX(pointer.tipPosition[0]);
        posY = translateY(pointer.tipPosition[1]);
        posZ = translateZ(pointer.tipPosition[2]);
        animate(posX, posY, posZ);
        console.log(pointer.tipPosition[0], pointer.tipPosition[1], pointer.tipPosition[2]);

    }

});




window.addEventListener('load', init, false);

function init() {
    createScene();
    createLight();
    createModel();

    render();
    loop();

    animate();

    window.addEventListener('resize', windowRize, false);

}

function windowRize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH/HEIGHT;
    camera.updateProjectionMatrix();

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
    camera.position.set(0, 4, 40);
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



    container = document.getElementById('world');
    container.appendChild(renderer.domElement);


}

function loop() {
    if(processValue==100){
        $('#cover').delay(500).fadeOut(1000);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(loop);

}

function translateX(distance) {
    return (distance / maxSpan) * maxX;
}
function translateY(distance) {
    return offsetY - ((distance / maxSpan) * maxY);
}
function translateZ(distance){
    return (distance / maxZSpan) * maxZ;
}

function animate(posX,posY,posZ) {
    if(fox && snowGL){
       // mesh.rotation.x = posY / 200;
        fox.rotation.y = posX / 200;
        snowGL.rotation.y = posX / 200;
       // mesh.rotation.z = posZ / 200;
    }

    renderer.render( scene, camera );
}

