import { Bounds } from "@react-three/drei";
import {
  EffectComposer,
  Selection,
  Outline,
  SSAO,
} from "@react-three/postprocessing";

const OutlineGroup = ({ children }) => {
  return (
    <Selection>
      <EffectComposer multisampling={0} autoClear={false}>
        <SSAO
          radius={0.05}
          intensity={150}
          luminanceInfluence={0.5}
          color="black"
        />
        <Outline
          visibleEdgeColor="white"
          hiddenEdgeColor="white"
          blur
          edgeStrength={100}
        />
      </EffectComposer>
      <Bounds fit clip margin={1.2} damping={0}>
        {children}
      </Bounds>
    </Selection>
  );
};

export default OutlineGroup;
