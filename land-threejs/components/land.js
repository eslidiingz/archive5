import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Land = ({ ...props }) => {
  const landTexture = useLoader(TextureLoader, "assets/images/land-s.jpeg");
  return (
    <mesh {...props}>
      <boxGeometry attach="geometry" args={[1, 0.1, 1]} />
      <meshStandardMaterial attach="material" map={landTexture} />
    </mesh>
  );
};

export default Land;
