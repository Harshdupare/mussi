"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";



export default function trythree(){
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() =>{
        
        const canvas = canvasRef.current
        if (!canvas) {
            console.error('Canvas element not found');
            return ;
        }
        const renderer = new THREE.WebGLRenderer({antialias: true, canvas });
        
        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.z = 2;

        const scene = new THREE.Scene();
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
        
        function render(time  :any ) {
            time *= 0.001;  // convert time to seconds
           
            cube.rotation.x = time;
            cube.rotation.y = time;
           
            renderer.render(scene, camera);
           
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
        renderer.render(scene, camera)

    }, []);


    
    
    return(
        <div>
            <canvas ref={canvasRef} id="#c"></canvas>
        </div>
    )
}