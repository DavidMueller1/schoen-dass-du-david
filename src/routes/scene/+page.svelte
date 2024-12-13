<script lang="ts">
    import {onMount} from "svelte";
    import {
        AmbientLight,
        BoxGeometry,
        Camera,
        Color,
        DirectionalLight, DirectionalLightHelper, Mesh, MeshBasicMaterial, PCFSoftShadowMap,
        PerspectiveCamera,
        RectAreaLight,
        Scene, TextureLoader,
        WebGLRenderer,
    } from "three";

    import Baked from '$lib/assets/textures/Baked.jpg';

    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    let container: HTMLDivElement;

    onMount(() => {
        const scene = new Scene();
        // Set a background color
        scene.background = new Color(0x33707f);

        let camera: Camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

        let renderer = new WebGLRenderer({ antialias: true });

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = PCFSoftShadowMap;

        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);

        // Add ambient light
        const ambientLight = new AmbientLight(0xffffff, 10.0)
        scene.add(ambientLight);

        const geometry = new BoxGeometry( 1, 1, 0.1 );
        const material = new MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new Mesh( geometry, material );
        cube.position.set(0, 10, 0);
        // scene.add( cube );

        // // Add an area light
        // const light = new RectAreaLight(0xffffff, 10, 10, 10);
        // light.position.set(0, 10, 0);
        // light.lookAt(0, 0, 0);
        // scene.add(light);



        // Add a point light
        // const light = new DirectionalLight(0xffffff, 1);
        // light.position.set(0, 10, 0);
        // light.castShadow = true;
        // scene.add(light);

        const loader = new GLTFLoader();

        loader.load(
            // '/scene/mclaren_f1_1993_nfs2_edition._scene_version.glb',
            '/scene/2024_my_room_baked.glb',
            ( gltf ) => {
                const texture = new TextureLoader().load(Baked);
                texture.flipY = false;
                texture.colorSpace = "srgb";

                const material = new MeshBasicMaterial({ map: texture });
                gltf.scene.traverse((child) => {
                    if (child instanceof Mesh) {
                        // if (child.name === 'Floor_Top') {

                        child.material = material;
                        // }
                    }
                    // console.log(child.name);

                });
                // console.log(gltf);
                scene.add( gltf.scene );
                // camera = gltf.cameras[0];
            },
            undefined,
            ( error ) => {
            console.error( error );
            }
        );

        camera.position.set(11, 12, 11);
        // pan the camera to the right and down
        camera.lookAt(0, 4, 0);

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


<!--<div bind:this={container}></div>-->
<div>WIP</div>