import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useEffect } from 'react'
import type { MousePosition } from '../hooks/useMouse'

interface SculptureProps {
  shape: 'torusKnot' | 'icosahedron' | 'octahedron' | 'torus'
  color: string
  active: boolean
  direction: 1 | -1
  mouse: MousePosition
}

export function Sculpture({ shape, color, active, direction, mouse }: SculptureProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const targetRotation = useRef({ x: 0, y: 0 })

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torusKnot':
        return new THREE.TorusKnotGeometry(1.0, 0.35, 256, 48)
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(1.2, 4)
      case 'octahedron':
        return new THREE.OctahedronGeometry(1.3, 0)
      case 'torus':
        return new THREE.TorusGeometry(1.0, 0.42, 64, 128)
      default:
        return new THREE.SphereGeometry(1.4, 64, 64)
    }
  }, [shape])

  // Chrome/iridescent material — shiny, reflective, metallic
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      metalness: 0.85,
      roughness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      iridescence: 1.0,
      iridescenceIOR: 1.8,
      iridescenceThicknessRange: [200, 1000],
      reflectivity: 1.0,
      envMapIntensity: 6.0,
      sheen: 1.0,
      sheenColor: new THREE.Color(color),
      sheenRoughness: 0.1,
      transparent: true,
      opacity: 0,
    })
  }, [color])

  // Animate in/out on slide change
  useEffect(() => {
    if (!meshRef.current) return
    const mesh = meshRef.current

    if (active) {
      mesh.visible = true
      gsap.fromTo(
        mesh.scale,
        { x: 0.2, y: 0.2, z: 0.2 },
        { x: 1, y: 1, z: 1, duration: 1.4, ease: 'expo.out' },
      )
      gsap.fromTo(
        mesh.rotation,
        { y: direction * -2, z: direction * -0.5 },
        { y: 0, z: 0, duration: 1.6, ease: 'expo.out' },
      )
      gsap.to(material, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      })
    } else {
      gsap.to(mesh.scale, {
        x: 0.1,
        y: 0.1,
        z: 0.1,
        duration: 0.7,
        ease: 'expo.in',
        onComplete: () => {
          mesh.visible = false
        },
      })
      gsap.to(material, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
    }
  }, [active, direction, material])

  // Mouse-reactive rotation + idle spin
  useFrame((_, delta) => {
    if (!meshRef.current || !active) return

    targetRotation.current.y = mouse.smoothX * 0.4
    targetRotation.current.x = mouse.smoothY * 0.3

    meshRef.current.rotation.y += delta * 0.12
    meshRef.current.rotation.y +=
      (targetRotation.current.y - meshRef.current.rotation.y * 0.01) * delta * 2
    meshRef.current.rotation.x +=
      (targetRotation.current.x - meshRef.current.rotation.x * 0.01) * delta * 2

    meshRef.current.position.x += (mouse.smoothX * 0.3 - meshRef.current.position.x) * 0.02
    meshRef.current.position.y += (-mouse.smoothY * 0.2 - meshRef.current.position.y) * 0.02
  })

  return <mesh ref={meshRef} geometry={geometry} material={material} scale={0.2} visible={false} />
}
