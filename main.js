let scene, camera, renderer, cube;
let animating = true;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    const container = document.getElementById('canvas-container');
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: false
    });

    cubeModel = new THREE.Mesh(cubeGeometry, cubeMaterial);

    const cubeModelRotationX = 0.01;
    const cubeModelRotationY = 0.01;

    scene.add(cubeModel);

    camera.position.z = 5;

    setupEventListeners();

    animate();

}

function animate() {
    requestAnimationFrame(animate);

    if (animating) {
        cubeModel.rotation.x += cubeModelRotationX;
        cubeModel.rotation.y += cubeModelRotationY;

    }

    renderer.render(scene, camera);

}

function setupEventListeners() {
    window.addEventListener('resize', handleResize);

    document.addEventListener('keydown', (event) =>{
        switch(event.code) {
            case 'Space':
                event.preventDefault();
                toggleAnimation();
                break;
            case 'keyQ':
                changeColor();
                break;
            case 'keyW':
                toggleWireFrame();
                break;
            case 'keyR':
                resetCube();
                break;
        }
    })
}

function toggleAnimation() {
    animating = !animating;
    console.log('Animation: ', animating ? 'Playing' : 'Paused');
}

function changeColor() {
    const randomColor = Math.random() * 0xffffff;
    cubeModel.material.color.setHex(randomColor);
}

function resetCube() {
    cubeModel.rotation.x = 0;
    cubeModel.rotation.y = 0;
    cubeModel.material.color.setHex(0x00ff00);
    animating = true;
}

function toggleWireFrame() {
    cubeModel.material.wireframe = !cubeModel.material.wireframe;
}

