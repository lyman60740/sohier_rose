'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { Environment } from '@react-three/drei';

export default function Scene(){
    return (
        <Canvas style={{background: 'black'}}>
            <directionalLight position={[0, 3, 2]} intensity={3} />
            <Environment preset='city' />
            
        <Model />
        </Canvas>
    );
}