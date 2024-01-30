import { OrbitControls } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

const Control = () => {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return (
    <OrbitControls
      ref={ref}
      target={[0, 0, 0]}
      enableDamping
      args={[camera, gl.domElement]}
    />
  );
};

export default Control;
