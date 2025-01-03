import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Group } from 'three'

const AnimatedBall = () => {
  const meshRef = useRef<Group>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
  })

  return (
    <group ref={meshRef}>
      <Sphere args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#4ade80"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </group>
  )
}

const AnimatedSphere = () => {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedBall />
      </Canvas>
    </div>
  )
}

export default AnimatedSphere 