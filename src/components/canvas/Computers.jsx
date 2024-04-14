import React, { Suspense, useEffect, useState } from "react";
import { Canvas,extend } from "@react-three/fiber";
import { Effects,OrbitControls, Preload, useGLTF,BakeShadows,MeshReflectorMaterial } from "@react-three/drei";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import { useLoader } from '@react-three/fiber'
import { UnrealBloomPass } from 'three-stdlib'
import CanvasLoader from "../Loader";
extend({ UnrealBloomPass })

const Computers = ({ isMobile }) => {
//   const materials = useLoader(MTLLoader, "./samidal_asset/SAMIDALE_lowpoly.mtl")
// const object = useLoader(OBJLoader, './samidal_asset/SAMIDALE_lowpoly.obj', loader => {
//   materials.preload()
//   loader.setMaterials(materials)
// })
  //const obj = useLoader()

  const computer = useGLTF("./1965_Mustang/mustang.gltf");

  return (
    <mesh>
      {/* <hemisphereLight intensity={0.15} groundColor='black' /> */}
      {/* <spotLight
        position={[0, 10, -10]}
        angle={3}
        penumbra={3}
        intensity={0.5}
        castShadow
        shadow-mapSize={1024}
      /> */}
   <ambientLight intensity={0.1} />
   <directionalLight color="white" position={[0, 0, 5]} />
  <directionalLight color="white" position={[0, 0, -5]} />
  <directionalLight color="orange" position={[0, 1, 0]} />
  <directionalLight color="white" position={[0, -11, 0]} />
      {/* <directionalLight castShadow intensity={1} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} position={[10, 10, -10]} /> */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 1 : 2}
        position={isMobile ? [0, -3, -2.2] : [0, -3, 0]}
        rotation={[0,0, 0]}
      />
     
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
