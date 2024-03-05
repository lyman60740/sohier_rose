'use client';
import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import '../scene.css';

// Icônes SVG en exemple
const PlayIcon = () => (
    <svg width="50" height="50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M5 3l14 9-14 9V3z"></path>
    </svg>
);

const PauseIcon = () => (
    <svg width="50" height="50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M6 4h4v16H6zM14 4h4v16h-4z"></path>
    </svg>
);

export default function Scene(){
    
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Animation de transition ici
        const icon = document.querySelector('.playButton');
        // Exemple d'animation d'opacité
        gsap.fromTo(icon, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out'});
      }, [isPlaying]); // Se déclenche à chaque changement de isPlaying
      

    return (
        <>
        <Suspense  fallback={<div className="suspense">Chargement...</div>}>
        <button className="playButton" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <Canvas style={{background: 'black'}}>
            <directionalLight position={[0, 3, 2]} intensity={3} />
            <Environment preset='city' />
            
            <Model isPlaying={isPlaying} />
        </Canvas>
        </Suspense>
        </>
    );
}
