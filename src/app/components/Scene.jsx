'use client';
import React, { useState } from "react";
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { Environment } from '@react-three/drei';
import '../scene.css';

export default function Scene(){
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <>
        <button className="playButton" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
        <Canvas style={{background: 'black'}}>
            <directionalLight position={[0, 3, 2]} intensity={3} />
            <Environment preset='city' />
            
        <Model isPlaying={isPlaying} />
        </Canvas>
        </>
    );
}