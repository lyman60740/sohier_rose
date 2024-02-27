import { useGLTF, Text, MeshTransmissionMaterial, MeshDistortMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";
import { useControls } from "leva";
import { AudioLoader, AudioListener, Audio, AudioAnalyser } from "three";
import '../scene.css';

export default function Model({ isPlaying }) {
    
    const mesh = useRef();
    const mesh1 = useRef();
    const groupRef = useRef();
    const barbed = useRef();
    const font = useRef();
    const { nodes: nodesRose } = useGLTF("/medias/roseS.glb");
const { nodes: nodesBarbed } = useGLTF("/medias/wire1.glb");
const isMobile = window.innerWidth < 768;


const { viewport, camera } = useThree();
    const analyserRef = useRef(null);
    const { position, rotation } = useControls('Transform', {
        position: { value: { x: 0, y: 0, z: !isMobile ? -0.7 : 1.8 }, step: 0.1 },
        rotation: { value: { x: -1.7, y: -3.2, z: 0 }, step: 0.1 },
      });
      const { positionFont,textFontSize, rotationFont, letterSpace, opacity } = useControls('Font Params', {
        positionFont: { value: { x: 0, y: 0., z: -1.2 }, step: 0.1 },
        rotationFont: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
        textFontSize: { value: !isMobile ? 0.8 : 1.4, min: 0.1, max: 5, step: 0.1 },
        letterSpace: { value: 0.1, min: 0.001, max: 2, step: 0.1 },
        opacity: { value: 1, min: 0, max: 1, step: 0.1 },
      });
      const {  rotationSpeed } = useControls({
        
        rotationSpeed: { value: 0.001, min: 0.000, max: 0.100, step: 0.001 },
      });

      
      useEffect(() => {
        const listener = new AudioListener();
        camera.add(listener);
    
        const sound = new Audio(listener);
        const audioLoader = new AudioLoader();
        audioLoader.load('/medias/paradisio.mp3', (buffer) => {
          sound.setBuffer(buffer);
          sound.setLoop(true);
          sound.setVolume(0.5);
          if (isPlaying) {
            sound.play();
        } else {
            sound.pause(); // ou sound.stop() selon le besoin
        }

        });
    
        const analyser = new AudioAnalyser(sound, 32);
        analyserRef.current = analyser; // Stocke l'analyseur dans la ref

        // Gère la lecture ou la pause basée sur la prop isPlaying
       
        return () => {
          camera.remove(listener);
          if (sound.isPlaying) {
              sound.stop();
          }
        };
    }, [camera, isPlaying]);

    useFrame(() => {
        
 
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

        if (analyserRef.current && groupRef.current) {
            const data = analyserRef.current.getAverageFrequency();
            const scale = data / 1000; // Adjust the scale factor as needed
            groupRef.current.scale.set(scale + 1, scale + 1, scale + 1); 
            
          }

        groupRef.current.position.y = position.y;
        groupRef.current.position.x = position.x;
        groupRef.current.position.z = position.z;

        groupRef.current.rotation.x += rotationSpeed;
        groupRef.current.rotation.y += rotationSpeed;
        groupRef.current.rotation.z += rotationSpeed;

      });
 

    // const materialProps = useControls({
    //     thickness: {value: 0.2, min: 0, max: 3, step: 0.05},
    //     roughness: {value: 0, min: 0, max: 1, step: 0.1},
    //     transmission: {value: 1, min: 0, max: 1, step: 0.1},
    //     ior: {value: 1.2, min: 1, max: 3, step: 0.1},
    //     chromaticAberration: {value: 0.02, min: 0, max: 1},
    //     backside: {value: true},
        


    // })

    const materialProps = {
        thickness: 0.2, // valeur directe
        roughness: 0, // valeur directe
        transmission: 1, // valeur directe
        ior: 1.2, // valeur directe
        chromaticAberration: 0.02, // valeur directe
        backside: true, // valeur directe
    };
    return (
        <group scale={viewport.width /3.5}> 
        <Text ref={font} fontSize={textFontSize} letterSpacing={letterSpace} fillOpacity={opacity}  font="fonts\BrokenScript.otf" >
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