import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const Earth = ({ autoRotate }: { autoRotate: boolean }) => {
  const earthRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (earthRef.current && autoRotate) {
      // Super smooth rotation with time-based animation
      earthRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[0.5, 128, 128]} />
      <meshStandardMaterial
        color="#4A90E2"
        roughness={0.3}
        metalness={0.1}
        emissive="#1a365d"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Helper to convert lat/lon to 3D position on sphere
function latLonToVec3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  ]
}

const IllinoisFlag = ({ onClick }: { onClick: () => void }) => {
  // Illinois: approx 40°N, 89°W
  const pos = latLonToVec3(40, -89, 0.52) // slightly above the surface
  return (
    <group position={pos}>
      {/* Flag pole */}
      <mesh onClick={onClick}>
        <cylinderGeometry args={[0.005, 0.005, 0.08, 16]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      {/* Flag (rectangle) */}
      <mesh position={[0, 0.04, 0.015]} rotation={[0, Math.PI / 2, 0]} onClick={onClick}>
        <boxGeometry args={[0.02, 0.015, 0.001]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  )
}

const EarthIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleClick = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    if (prefersReducedMotion) {
      // Instant transition for reduced motion
      setTimeout(() => {
        onComplete()
      }, 100)
    } else {
      // Animated transition: zoom toward Illinois, fade to white, then show home
      setTimeout(() => {
        onComplete()
      }, 1500) // Allow time for zoom animation
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 1 }}
        className="w-screen h-screen bg-bg fixed top-0 left-0 z-[1000]"
      >
        <Canvas
          camera={{ position: [0, 0, 1.8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 2, 1]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-2, -1, 1]} intensity={0.3} color="#4A90E2" />
          
          {/* Atmospheric glow */}
          <mesh>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshBasicMaterial 
              color="#4A90E2" 
              transparent 
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
          
          <Earth autoRotate={!prefersReducedMotion} />
          <IllinoisFlag onClick={handleClick} />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            autoRotate={!prefersReducedMotion}
            autoRotateSpeed={0.3}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
        
        {/* White overlay for transition */}
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute inset-0 bg-white"
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default EarthIntro
