import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.insertBefore(renderer.domElement, document.body.firstChild);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '0';
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Camera position
camera.position.z = 10;

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 8000;
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 100;
    
    // Create gradient colors from cyan to pink
    colorsArray[i] = Math.random() * 0.3 + 0.3;     // R
    colorsArray[i + 1] = Math.random() * 0.3 + 0.8; // G
    colorsArray[i + 2] = Math.random() * 0.3 + 0.8; // B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Geometric shapes

const networkStructure = [30,50,40,20];// Example network architecture
const nodes = [];
const connections = [];
const layerSpacing = 10;  // Increased spacing for better visualization
const nodeSpacing = 2.5; // Adjusted node spacing
const nodeRadius = 0.15;    // Smaller node radius
const connectionColor = 0x4a5568; // Tailwind gray-700
const inputNodeColor = 0x68d391; // Tailwind green-400
const hiddenNodeColor = 0x90caf9; // Tailwind blue-300
const outputNodeColor = 0xf687b8; // Tailwind pink-400


networkStructure.forEach((layerSize, layerIndex) => {
    const layerZ = layerIndex * layerSpacing - (networkStructure.length - 1) * layerSpacing / 2;
    for (let i = 0; i < layerSize; i++) {
        const x = i * nodeSpacing - (layerSize - 1) * nodeSpacing / 2;
        const y = 0;
        const geometry = new THREE.SphereGeometry(nodeRadius, 32, 32);
        let material;
        if (layerIndex === 0) {
            material = new THREE.MeshPhysicalMaterial({ color: inputNodeColor, metalness: 0.3, roughness: 0.6 });
        } else if (layerIndex === networkStructure.length - 1) {
            material = new THREE.MeshPhysicalMaterial({ color: outputNodeColor, metalness: 0.3, roughness: 0.6 });
        } else {
            material = new THREE.MeshPhysicalMaterial({ color: hiddenNodeColor, metalness: 0.3, roughness: 0.6 });
        }
        const node = new THREE.Mesh(geometry, material);
        node.position.set(x, y, layerZ);
        scene.add(node);
        nodes.push(node);
    }
});

for (let i = 0; i < networkStructure.length - 1; i++) {
    const currentLayerSize = networkStructure[i];
    const nextLayerSize = networkStructure[i + 1];
    const currentLayerNodes = nodes.slice(
        networkStructure.slice(0, i).reduce((a, b) => a + b, 0),
        networkStructure.slice(0, i + 1).reduce((a, b) => a + b, 0)
    );
    const nextLayerNodes = nodes.slice(
        networkStructure.slice(0, i + 1).reduce((a, b) => a + b, 0),
        networkStructure.slice(0, i + 2).reduce((a, b) => a + b, 0)
    );

    for (let j = 0; j < currentLayerSize; j++) {
        for (let k = 0; k < nextLayerSize; k++) {
            const startPoint = currentLayerNodes[j].position;
            const endPoint = nextLayerNodes[k].position;
            const points = [startPoint, endPoint];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: connectionColor, transparent: true, opacity: 0.3 }); // More subtle connections
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            connections.push(line);
        }
    }
}

const shapes = [];
const geometries = [
   
];

for(let i = 0; i < 10; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshPhysicalMaterial({
        color: Math.random() < 0.5 ? 0x4ecdc4 : 0xff6b6b,
        transparent: true,
        opacity: 0.8,
        metalness: 0.2,
        roughness: 0.5,
        wireframe: Math.random() > 0.5
    });
    const shape = new THREE.Mesh(geometry, material);
    
    shape.position.x = (Math.random() - 0.5) * 800;
    shape.position.y = (Math.random() - 0.5) * 800;
    shape.position.z = (Math.random() - 0.5) * 400;
    
    shape.rotation.x = Math.random() * Math.PI;
    shape.rotation.y = Math.random() * Math.PI;
    shape.rotation.z = Math.random() * Math.PI;
    
    shape.castShadow = true;
    shape.receiveShadow = true;
    
    shapes.push(shape);
    scene.add(shape);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x4ecdc4, 1);
pointLight1.position.set(25, 25, 25);
pointLight1.castShadow = true;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xff6b6b, 1);
pointLight2.position.set(-25, -25, 25);
pointLight2.castShadow = true;
scene.add(pointLight2);

// Add subtle hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0x4ecdc4, 0xff6b6b, 0.3);
scene.add(hemisphereLight);

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Rotate particles
    particlesMesh.rotation.y = time * 0.1;
    particlesMesh.rotation.x = time * 0.05;
    
    // Animate shapes
    shapes.forEach((shape, index) => {
        shape.rotation.x += 0.002;
        shape.rotation.y += 0.003;
        
        // Add floating motion
        shape.position.y += Math.sin(time + index) * 0.02;
        shape.position.x += Math.cos(time + index) * 0.02;
    });
    
    // Animate lights
    pointLight1.position.x = Math.sin(time * 0.7) * 30;
    pointLight1.position.y = Math.cos(time * 0.5) * 30;
    pointLight2.position.x = Math.cos(time * 0.3) * 30;
    pointLight2.position.y = Math.sin(time * 0.5) * 30;
    
    // Camera movement based on mouse position
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
