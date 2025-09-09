import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const Earth = ({ autoRotate }: { autoRotate: boolean }) => {
  const earthRef = useRef<THREE.Mesh>(null)
  
  // Load Earth textures
  const [earthTexture, bumpMap, specularMap] = useTexture([
    '/textures/earth_texture.jpg',
    '/textures/earth_bump.jpg',
    '/textures/earth_specular.jpg'
  ])

  useFrame(() => {
    if (earthRef.current && autoRotate) {
      earthRef.current.rotation.y += 0.002 // Slow auto-rotation
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshPhongMaterial
        map={earthTexture}
        bumpMap={bumpMap}
        bumpScale={0.05}
        specularMap={specularMap}
        specular={new THREE.Color('white')}
        shininess={10}
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
  const pos = latLonToVec3(40, -89, 0.85) // slightly above the surface
  return (
    <group position={pos}>
      {/* Flag pole */}
      <mesh onClick={onClick}>
        <cylinderGeometry args={[0.008, 0.008, 0.1, 16]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      {/* Flag (rectangle) */}
      <mesh position={[0, 0.05, 0.02]} rotation={[0, Math.PI / 2, 0]} onClick={onClick}>
        <boxGeometry args={[0.03, 0.02, 0.002]} />
        <meshStandardMaterial color="#ff4444" />
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
          camera={{ position: [0, 0, 2], fov: 45 }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={1.5} color="#fff" />
          <Earth autoRotate={!prefersReducedMotion} />
          <IllinoisFlag onClick={handleClick} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            autoRotate={!prefersReducedMotion}
            autoRotateSpeed={0.5}
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
