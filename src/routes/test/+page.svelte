<script lang="ts">
    import {onMount} from "svelte";
    import * as THREE from "three";
    import {Camera, DirectionalLight, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer} from "three";

    import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

    let container: HTMLDivElement;

    onMount(() => {
        const scene = new Scene();
        let camera: Camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        let renderer = new WebGLRenderer();
        renderer.outputColorSpace = SRGBColorSpace;

        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Add a bright light so we can see the car
        const light = new DirectionalLight( 0xffffff, 1 );
        light.position.set( 1, 1, 1 ).normalize();
        scene.add( light );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        const loader = new GLTFLoader();

        loader.load(
            '/scene/mclaren_f1_1993_nfs2_edition._scene_version.glb',
            ( gltf ) => {
                console.log(gltf);
                scene.add( gltf.scene );
                // camera = gltf.cameras[0];
            },
            undefined,
            ( error ) => {
            console.error( error );
            }
        );

        camera.position.z = 5;

        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }

        animate();
    });



    // let scene = new THREE.Scene();
    // let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //
    // let renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

</script>


<div bind:this={container}></div>