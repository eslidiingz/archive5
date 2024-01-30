import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import {
  GizmoHelper,
  GizmoViewport,
  OrthographicCamera,
} from "@react-three/drei";
import Land from "../components/land";
import Control from "../components/control";

const Scene = () => {
  const [isZoom, setZoom] = useState(false);
  const toggleZoom = () => setZoom((active) => !active);

  return (
    <Canvas orthographic camera={{ zoom: 50 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <directionalLight intensity={4.16} />
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Control />
        <group>
          <Land position={[0, 0, 0]} />
          <Land position={[0, 0, 1]} />
          <Land position={[0, 0, 2]} />
          <Land position={[1, 0, 0]} />
          <Land position={[1, 0, 1]} />
          <Land position={[1, 0, 2]} />
          <Land position={[2, 0, 0]} />
          <Land position={[2, 0, 1]} />
          <Land position={[2, 0, 2]} />
        </group>
      </Suspense>
      <GizmoHelper
        alignment="bottom-right"
        margin={[80, 80]}
        renderPriority={2}
      >
        <GizmoViewport
          axisColors={["hotpink", "aquamarine", "#3498DB"]}
          labelColor="black"
        />
      </GizmoHelper>
    </Canvas>
  );
};

export default Scene;
