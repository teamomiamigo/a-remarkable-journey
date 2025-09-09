import styled from '@emotion/styled'
import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import * as THREE from 'three'

const IntroContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`

const LoadingText = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #64ffda;
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
`

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null)
  
  // Load Earth textures
  const [earthTexture, bumpMap, specularMap] = useTexture([
    '/textures/earth_texture.jpg',
    '/textures/earth_bump.jpg',
    '/textures/earth_specular.jpg'
  ])

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[0.5, 64, 64]} />
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
  const pos = latLonToVec3(40, -89, 0.52) // slightly above the surface
  return (
    <group position={pos}>
      {/* Flag pole */}
      <mesh onClick={onClick}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 16]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      {/* Flag (rectangle) */}
      <mesh position={[0, 0.06, 0.025]} rotation={[0, Math.PI / 2, 0]} onClick={onClick}>
        <boxGeometry args={[0.04, 0.025, 0.002]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
    </group>
  )
}

const EarthIntro = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <AnimatePresence>
      <IntroContainer
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Canvas
          camera={{ position: [0, 0, 1.5], fov: 45 }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={1.5} color="#fff" />
          <Earth />
          <IllinoisFlag onClick={onComplete} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </IntroContainer>
    </AnimatePresence>
  )
}

export default EarthIntro 