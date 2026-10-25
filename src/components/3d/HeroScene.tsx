import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Mesh, BufferGeometry, Material } from 'three'
import * as THREE from 'three'

// Animated floating cubes and shapes
function FloatingGeometry() {
  const meshRef = useRef<Mesh>(null)
  const [time, setTime] = useState(0)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
    setTime(state.clock.elapsedTime)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 4]} />
      <meshPhongMaterial
        color="#39FF88"
        wireframe={true}
        emissive="#39FF88"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// Particle system
function ParticleField() {
  const pointsRef = useRef<Mesh>(null)
  const particleCount = 500

  useEffect(() => {
    if (!pointsRef.current) return

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40
      positions[i + 1] = (Math.random() - 0.5) * 40
      positions[i + 2] = (Math.random() - 0.5) * 40
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsRef.current.geometry = geometry
  }, [])

  useFrame((state) => {
    if (pointsRef.current && pointsRef.current.geometry) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.01
        if (positions[i + 1] < -20) positions[i + 1] = 20
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.1}
        color="#39FF88"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Main 3D Hero Scene
export function HeroScene() {
  return (
    <div className="hero-3d-scene" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: '#050505' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, 5]} intensity={0.3} color="#39FF88" />

        <FloatingGeometry />
        <ParticleField />
      </Canvas>

      {/* Overlay text */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 900,
            color: '#fff',
            margin: 0,
            textAlign: 'center',
            fontFamily: "'Big Shoulders Display', sans-serif",
            letterSpacing: '-0.02em',
            textShadow: '0 0 40px rgba(57, 255, 136, 0.2)',
          }}
        >
          YOGESH.WARAN
        </h1>
        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 24px)',
            color: '#9CA3AF',
            marginTop: '24px',
            textAlign: 'center',
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          UI/UX DESIGNER & DEVELOPER
        </p>
      </div>
    </div>
  )
}
