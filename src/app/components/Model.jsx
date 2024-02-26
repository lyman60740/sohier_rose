import { useGLTF, Text, MeshTransmissionMaterial, MeshDistortMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, {useRef} from "react";
import { useControls } from "leva";


export default function Model() {

    const mesh = useRef();
    const mesh1 = useRef();
    const groupRef = useRef();
    const barbed = useRef();
    const font = useRef();
    const { nodes: nodesRose } = useGLTF("/medias/roseS.glb");
const { nodes: nodesBarbed } = useGLTF("/medias/wire1.glb");

    const { viewport } = useThree();
    const { position, rotation } = useControls('Transform', {
        position: { value: { x: 0, y: 0, z: -0.7 }, step: 0.1 },
        rotation: { value: { x: -1.7, y: -3.2, z: 0 }, step: 0.1 },
      });
      const { positionFont, rotationFont } = useControls('Transform', {
        positionFont: { value: { x: 0, y: 0., z: -1.2 }, step: 0.1 },
        rotationFont: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
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

        font.current.position.x = positionFont.x;
        font.current.position.y = positionFont.y;
        font.current.position.z = positionFont.z; 

        font.current.rotation.x = rotationFont.x;
        font.current.rotation.y = rotationFont.y;
        font.current.rotation.z = rotationFont.z;



        // barbed.current.rotation.x = rotationFont.x;
        // barbed.current.rotation.y = rotationFont.y;
        // barbed.current.rotation.z = rotationFont.z;
        
        // barbed.current.position.y = positionFont.y;
        // barbed.current.position.x = positionFont.x;
        // barbed.current.position.z = positionFont.z;




        


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
        <Text ref={font} fontSize={textFontSize}  font="fonts\BrokenScript.otf">
    sohier
  </Text>
        
        <group ref={groupRef}  position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
            <mesh {...nodesRose.Object_6} >
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
            <mesh ref={mesh1} {...nodesRose.Object_8}  >
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
            {/* <mesh ref={barbed} {...nodesBarbed.Rail_by_daftvid__0}   position={[positionFont.x, positionFont.y, positionFont.z]} rotation={[rotationFont.x, rotationFont.y, rotationFont.z]}>
                <MeshTransmissionMaterial {...materialProps} />
            </mesh> */}
            {/* <mesh ref={mesh1} {...nodes.Object_8} position={[positionFont.x, positionFont.y, positionFont.z]} rotation={[rotationFont.x, rotationFont.y, rotationFont.z]} >
                <MeshTransmissionMaterial {...materialProps} />
            </mesh> */}
        </group>
     
        </group>
    );
    }