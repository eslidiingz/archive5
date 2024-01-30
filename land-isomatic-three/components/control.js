import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

const CameraControl = () => {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return (
    <OrbitControls
      ref={ref}
      target={[0, 1, 4]}
      enableDamping
      args={[camera, gl.domElement]}
    />
  );
};

export default CameraControl;
