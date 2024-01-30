import {
  GizmoHelper,
  GizmoViewport,
  MapControls,
  OrthographicCamera,
  Stats,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import CameraControl from "../components/control";
import Land from "../components/land";
import OutlineGroup from "../components/outline";

const SceneCamera = () => {
  useFrame(({ camera }) => {
    camera.position.set(20, 20, 20);
    camera.rotation.order = "YXZ";
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
    // camera.translateZ(100);
  });
  return <OrthographicCamera makeDefault />;
};

const CanvasPage = () => {
  return (
    <Canvas>
      <SceneCamera />
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <CameraControl />
        <OutlineGroup>
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
        </OutlineGroup>
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

      <Stats />
    </Canvas>
  );
};

export default CanvasPage;
