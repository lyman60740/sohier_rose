import { useGLTF, Text, MeshTransmissionMaterial, MeshDistortMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, {useRef} from "react";
import { useControls } from "leva";


export default function Model() {

    const mesh = useRef();
    const mesh1 = useRef();
    const groupRef = useRef();
    const barbed = useRef();
    const { nodes: nodesRose } = useGLTF("/medias/roseS.glb");
const { nodes: nodesBarbed } = useGLTF("/medias/wire1.glb");

    const { viewport } = useThree();
    const { position, rotation } = useControls('Transform', {
        position: { value: { x: 0, y: 0, z: -0.7 }, step: 0.1 },
        rotation: { value: { x: -1.7, y: -3.2, z: 0 }, step: 0.1 },
      });
      const { position1, rotation1, scaleX, scaleY } = useControls('Transform', {
        position1: { value: { x: 0, y: 0.1, z: 0 }, step: 0.1 },
        rotation1: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
      });
      const { textFontSize, rotationSpeed } = useControls({
        textFontSize: { value: 0.8, min: 0.1, max: 5, step: 0.1 },
        rotationSpeed: { value: 0.01, min: 0.001, max: 0.1, step: 0.001 },
      });
    useFrame(({ mouse }) => {
        
 
        mesh1.current.rotation.x = -1.8;
        mesh1.current.rotation.y = -1.4;
        mesh1.current.rotation.z = -0.1;

        mesh1.current.position.x =0;
        mesh1.current.position.y = 0.1;
        mesh1.current.position.z = 0.5; 

        // barbed.current.rotation.x = rotation1.x;
        // barbed.current.rotation.y = rotation1.y;
        // barbed.current.rotation.z = rotation1.z;
        
        // barbed.current.position.y = position1.y;
        // barbed.current.position.x = position1.x;
        // barbed.current.position.z = position1.z;




        


        groupRef.current.rotation.x = rotation.x;
        groupRef.current.rotation.y = rotation.y;
        // groupRef.current.rotation.z += 0.005;
        
        groupRef.current.position.y = position.y;
        groupRef.current.position.x = position.x;
        groupRef.current.position.z = position.z;

        groupRef.current.rotation.z += rotationSpeed;

      });
 

    const materialProps = useControls({
        thickness: {value: 0.2, min: 0, max: 3, step: 0.05},
        roughness: {value: 0, min: 0, max: 1, step: 0.1},
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: {value: 1.2, min: 1, max: 3, step: 0.1},
        chromaticAberration: {value: 0.02, min: 0, max: 1},
        backside: {value: true},


    })

    
    return (
        <group scale={viewport.width /3.5}> 
        <Text fontSize={textFontSize} position={[0, 0, -1]} font="fonts\BrokenScript.otf">
    SOHIER
  </Text>
        
        <group ref={groupRef}  position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
            <mesh {...nodesRose.Object_6} >
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
            <mesh ref={mesh1} {...nodesRose.Object_8}  >
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
            {/* <mesh ref={barbed} {...nodesBarbed.Rail_by_daftvid__0}   position={[position1.x, position1.y, position1.z]} rotation={[rotation1.x, rotation1.y, rotation1.z]}>
                <MeshTransmissionMaterial {...materialProps} />
            </mesh> */}
            {/* <mesh ref={mesh1} {...nodes.Object_8} position={[position1.x, position1.y, position1.z]} rotation={[rotation1.x, rotation1.y, rotation1.z]} >
                <MeshTransmissionMaterial {...materialProps} />
            </mesh> */}
        </group>
     
        </group>
    );
    }