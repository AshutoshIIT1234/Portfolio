import * as THREE from 'three';

/**
 * Neural Network Three.js Scene
 * A living 3D representation of interconnected ideas and domains
 */

class NeuralNetworkScene {
    constructor() {
        this.container = document.getElementById('three-container');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = null;
        this.renderer = null;
        this.nodes = [];
        this.connections = [];
        this.particles = null;
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.scrollY = 0;
        this.time = 0;
        this.isInitialized = false;

        // Domain colors (softer, premium feel)
        this.domainColors = {
            ai: new THREE.Color(0x14b8a6),      // Teal
            backend: new THREE.Color(0xe53e3e),  // Red
            frontend: new THREE.Color(0x8b5cf6), // Purple
            data: new THREE.Color(0xf59e0b),     // Amber
            core: new THREE.Color(0xffffff)      // White (center)
        };

        this.init();
    }

    init() {
        this.setupRenderer();
        this.setupCamera();
        this.setupLights();
        this.createNeuralNetwork();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
        this.isInitialized = true;
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 30);
        this.camera.lookAt(0, 0, 0);
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        // Point lights for dynamic effects
        this.pointLight1 = new THREE.PointLight(0x14b8a6, 1, 100);
        this.pointLight1.position.set(20, 20, 20);
        this.scene.add(this.pointLight1);

        this.pointLight2 = new THREE.PointLight(0xe53e3e, 0.8, 100);
        this.pointLight2.position.set(-20, -10, 10);
        this.scene.add(this.pointLight2);
    }

    createNeuralNetwork() {
        // Clear existing
        this.nodes.forEach(node => this.scene.remove(node.mesh));
        this.connections.forEach(conn => this.scene.remove(conn));
        this.nodes = [];
        this.connections = [];

        // Network configuration
        const domains = [
            { id: 'ai', label: 'AI & ML', position: new THREE.Vector3(-8, 6, 0), size: 1.2 },
            { id: 'backend', label: 'Backend', position: new THREE.Vector3(8, 6, 0), size: 1.1 },
            { id: 'frontend', label: 'Frontend', position: new THREE.Vector3(-8, -6, 0), size: 1.0 },
            { id: 'data', label: 'Data', position: new THREE.Vector3(8, -6, 0), size: 1.0 },
        ];

        // Central core node
        const coreNode = this.createNode(
            new THREE.Vector3(0, 0, 2),
            1.5,
            this.domainColors.core,
            0.9
        );
        this.nodes.push({ mesh: coreNode, originalPos: new THREE.Vector3(0, 0, 2), domain: 'core' });

        // Domain nodes
        domains.forEach(domain => {
            const node = this.createNode(
                domain.position,
                domain.size,
                this.domainColors[domain.id],
                0.8
            );
            this.nodes.push({ mesh: node, originalPos: domain.position.clone(), domain: domain.id });

            // Connect to core
            const connection = this.createConnection(domain.position, new THREE.Vector3(0, 0, 2), this.domainColors[domain.id]);
            this.connections.push(connection);

            // Create satellite nodes
            const satelliteCount = 4 + Math.floor(Math.random() * 3);
            for (let i = 0; i < satelliteCount; i++) {
                const angle = (i / satelliteCount) * Math.PI * 2;
                const radius = 3 + Math.random() * 2;
                const satellitePos = new THREE.Vector3(
                    domain.position.x + Math.cos(angle) * radius,
                    domain.position.y + Math.sin(angle) * radius,
                    domain.position.z + (Math.random() - 0.5) * 4
                );

                const satelliteNode = this.createNode(
                    satellitePos,
                    0.3 + Math.random() * 0.3,
                    this.domainColors[domain.id],
                    0.6
                );
                this.nodes.push({ mesh: satelliteNode, originalPos: satellitePos.clone(), domain: domain.id });

                // Connect to parent
                const satConnection = this.createConnection(satellitePos, domain.position, this.domainColors[domain.id], 0.15);
                this.connections.push(satConnection);
            }
        });

        // Cross-domain connections (subtle)
        const crossConnections = [
            ['ai', 'backend', 0.08],
            ['ai', 'data', 0.08],
            ['frontend', 'backend', 0.08],
            ['data', 'backend', 0.08],
        ];

        crossConnections.forEach(([from, to, opacity]) => {
            const fromNode = domains.find(d => d.id === from);
            const toNode = domains.find(d => d.id === to);
            if (fromNode && toNode) {
                const conn = this.createConnection(fromNode.position, toNode.position, new THREE.Color(0x666666), opacity);
                this.connections.push(conn);
            }
        });
    }

    createNode(position, size, color, opacity = 1) {
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const material = new THREE.MeshPhysicalMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            metalness: 0.3,
            roughness: 0.4,
            emissive: color,
            emissiveIntensity: 0.2,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        this.scene.add(mesh);

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(size * 1.5, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        mesh.add(glow);

        return mesh;
    }

    createConnection(start, end, color, opacity = 0.3) {
        const points = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const point = new THREE.Vector3().lerpVectors(start, end, t);
            // Add slight curve
            const midOffset = Math.sin(t * Math.PI) * 0.5;
            point.z += midOffset;
            points.push(point);
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 32, 0.02, 8, false);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity
        });
        const tube = new THREE.Mesh(geometry, material);
        this.scene.add(tube);
        return tube;
    }

    createParticles() {
        const particleCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Spread particles in a sphere
            const radius = 20 + Math.random() * 30;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Random colors from palette
            const colorChoice = Math.random();
            if (colorChoice < 0.4) {
                colors[i3] = 0.08; colors[i3 + 1] = 0.72; colors[i3 + 2] = 0.65; // Teal
            } else if (colorChoice < 0.7) {
                colors[i3] = 0.9; colors[i3 + 1] = 0.24; colors[i3 + 2] = 0.24; // Red
            } else {
                colors[i3] = 1; colors[i3 + 1] = 1; colors[i3 + 2] = 1; // White
            }

            sizes[i] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Scroll
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        });

        // Resize
        window.addEventListener('resize', () => this.onResize());

        // Domain tag hover effects
        document.querySelectorAll('.domain-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                const domain = tag.dataset.domain;
                this.highlightDomain(domain);
            });
            tag.addEventListener('mouseleave', () => {
                this.resetHighlight();
            });
        });

        // Update cursor glow position
        const cursorGlow = document.querySelector('.cursor-glow');
        if (cursorGlow) {
            document.addEventListener('mousemove', (e) => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
        }
    }

    highlightDomain(domainId) {
        this.nodes.forEach(node => {
            if (node.domain === domainId) {
                node.mesh.material.emissiveIntensity = 0.5;
                node.mesh.scale.setScalar(1.3);
            } else {
                node.mesh.material.opacity = 0.3;
            }
        });
    }

    resetHighlight() {
        this.nodes.forEach(node => {
            node.mesh.material.emissiveIntensity = 0.2;
            node.mesh.material.opacity = node.domain === 'core' ? 0.9 : 0.8;
            node.mesh.scale.setScalar(1);
        });
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.time += 0.01;

        // Smooth mouse movement
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        // Camera parallax based on mouse
        const parallaxIntensity = 3;
        this.camera.position.x = this.mouse.x * parallaxIntensity;
        this.camera.position.y = this.mouse.y * parallaxIntensity;

        // Camera zoom out on scroll (only in hero section)
        const heroHeight = window.innerHeight;
        const scrollProgress = Math.min(this.scrollY / heroHeight, 1);
        this.camera.position.z = 30 + scrollProgress * 20;

        // Fade out on scroll
        this.scene.traverse((child) => {
            if (child.isMesh || child.isPoints) {
                if (child.material.opacity !== undefined) {
                    const baseOpacity = child.userData.baseOpacity || child.material.opacity;
                    child.userData.baseOpacity = baseOpacity;
                    child.material.opacity = baseOpacity * (1 - scrollProgress * 0.8);
                }
            }
        });

        this.camera.lookAt(0, 0, 0);

        // Animate nodes with subtle floating
        this.nodes.forEach((node, i) => {
            const floatOffset = Math.sin(this.time + i * 0.5) * 0.2;
            node.mesh.position.y = node.originalPos.y + floatOffset;
            node.mesh.rotation.y += 0.005;
        });

        // Animate particles
        if (this.particles) {
            this.particles.rotation.y = this.time * 0.05;
            this.particles.rotation.x = this.time * 0.02;
        }

        // Animate lights
        this.pointLight1.position.x = Math.sin(this.time * 0.5) * 25;
        this.pointLight1.position.y = Math.cos(this.time * 0.3) * 25;
        this.pointLight2.position.x = Math.cos(this.time * 0.4) * 20;
        this.pointLight2.position.y = Math.sin(this.time * 0.6) * 20;

        // Pulse connections (subtle)
        this.connections.forEach((conn, i) => {
            const pulse = 0.15 + Math.sin(this.time * 2 + i) * 0.05;
            conn.material.opacity = pulse;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize scene when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        new NeuralNetworkScene();
    }
});

export default NeuralNetworkScene;
