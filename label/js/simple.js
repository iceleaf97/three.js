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

    createLabel();

    render();
    createOrbit();
    loop();


}

function createLabel() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var grd = ctx.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "white");

    ctx.fillStyle = grd;
    ctx.fillRect(20, 20, 150, 100);


    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial(
        { map: texture, useScreenCoordinates: true } );
    var sprite = new THREE.Sprite( spriteMaterial );
   // sprite.scale.set(100,50,1.0);
    sprite.position.set(0, 0, 20);
    scene.add(sprite);


}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);


}

function createScene() {
    scene = new THREE.Scene();

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    fieldOfView = 40;
    aspectRatio = WIDTH/HEIGHT;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.set(0, 0, 200);

}

function createLight(){
    var spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(-100, 100, 100);
    scene.add(spotLight);
}

function createModel(){
    var geom = new THREE.SphereGeometry(10, 20, 20);
    var mtl = new THREE.MeshLambertMaterial({color:0xffffff});
    var mesh = new THREE.Mesh(geom, mtl);
    scene.add(mesh);




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


