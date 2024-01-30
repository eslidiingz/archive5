import { GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Control from "../components/control";
import Land from "../components/land";
import OutlineGroup from "../components/outline";

const CanvasPage = () => {
  return (
    <Canvas
      pixelratio={window.devicePixelRatio}
      orthographic
      camera={{ position: [0, 0, 500], far: 10000 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Control />
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
    </Canvas>
  );
};

export default CanvasPage;
