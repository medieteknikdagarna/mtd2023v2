import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {
  OrbitControls,
  Preload,
  useFBX,
  useAnimations,
} from "@react-three/drei";
import CanvasLoader from "./CanvasLoader.jsx";

const Sphere = () => {
  //const fbxLoader = new FBXLoader();
  const group = useRef();
  const sphere = useFBX("/images/renders/MTSPHERE2.fbx");
  const sphere2 = useFBX("/images/renders/test.fbx");
  const { actions } = useAnimations(sphere2.animations);
  console.log(sphere2);
  console.log(actions);

  useEffect(() => {
    if (actions) {
      const animationAction = actions["Plane|Area.001Action"];
      if (animationAction) {
        animationAction.reset().play();
      }
    }
  }, [actions]);

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <primitive object={sphere} scale={0.02} />
    </mesh>
  );
};

const SphereCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls autoRotate />
        <Sphere />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};
export default SphereCanvas;
