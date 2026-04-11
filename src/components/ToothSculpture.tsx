/**
 * ToothSculpture — procedural 3D molar in Three.js.
 *
 * Geometry: LatheGeometry body (smooth molar profile) + four small sphere
 * cusps on the crown. Material: MeshPhysicalMaterial with clearcoat,
 * iridescence and sheen → the pearly look from the reference image.
 *
 * Animation: GSAP scale/opacity in-out on slide change.
 * Interaction: gentle mouse-driven tilt (sway, not spin — teeth don't spin!).
 * Idle:        slow vertical float driven by sin(time).
 */

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import type { MousePosition } from '../hooks/useMouse'

interface ToothSculptureProps {
  active: boolean
  direction: 1 | -1
  mouse: MousePosition
}

export function ToothSculpture({ active, direction, mouse }: ToothSculptureProps) {
  const groupRef = useRef<THREE.Group>(null!)

  // ── Molar body — surface of revolution around Y axis ────────────────────
  const bodyGeo = useMemo(() => {
    // CatmullRom spline: points are (radius, height)
    // Starting from root tip (bottom) up to crown top
    const raw: [number, number][] = [
      [0.015, -1.58],  // root apex (very narrow)
      [0.15,  -1.35],
      [0.26,  -0.90],
      [0.30,  -0.45],
      [0.22,  -0.08],  // cervical constriction (narrow neck)
      [0.50,   0.30],  // crown base widens
      [0.78,   0.72],  // crown belly (widest)
      [0.80,   1.00],
      [0.74,   1.28],  // shoulder
      [0.52,   1.52],  // crown narrows toward top
      [0.20,   1.68],
      [0.01,   1.72],  // flat occlusal center
    ]

    // Build a CatmullRom through the points, then sample many Vector2
    const curve = new THREE.CatmullRomCurve3(
      raw.map(([r, y]) => new THREE.Vector3(r, y, 0)),
      false,
      'catmullrom',
      0.5,
    )
    const sampled = curve.getPoints(120)
    // Clamp radius ≥ 0 to avoid inside-out faces
    const pts = sampled.map(p => new THREE.Vector2(Math.max(0, p.x), p.y))
    return new THREE.LatheGeometry(pts, 96)
  }, [])

  // ── 4 cusps — small domes on the occlusal surface ───────────────────────
  const cuspGeo = useMemo(
    () => new THREE.SphereGeometry(0.20, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
    [],
  )

  // Cusp positions (corners of the occlusal table)
  const cuspPositions: [number, number, number][] = [
    [ 0.32, 1.60,  0.32],
    [-0.32, 1.60,  0.32],
    [ 0.32, 1.60, -0.32],
    [-0.32, 1.60, -0.32],
  ]

  // ── Pearly material ──────────────────────────────────────────────────────
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        // Warm off-white, like natural enamel
        color: new THREE.Color('#f5f0f8'),
        metalness: 0.04,
        roughness: 0.08,
        // Enamel clearcoat — that glassy outer layer
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        // Subtle pearl iridescence (not rainbow — more like nacre/mother-of-pearl)
        iridescence: 0.75,
        iridescenceIOR: 1.45,
        iridescenceThicknessRange: [150, 500],
        reflectivity: 0.9,
        envMapIntensity: 5.5,
        // Pink sheen from the brand palette
        sheen: 0.7,
        sheenColor: new THREE.Color('#EC3B79'),
        sheenRoughness: 0.25,
        transparent: true,
        opacity: 0,
      }),
    [],
  )

  // ── GSAP in / out ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!groupRef.current) return
    const g = groupRef.current

    if (active) {
      g.visible = true
      gsap.fromTo(
        g.scale,
        { x: 0.15, y: 0.15, z: 0.15 },
        { x: 1, y: 1, z: 1, duration: 1.5, ease: 'expo.out' },
      )
      gsap.fromTo(
        g.rotation,
        { y: direction * -1.8, x: 0.3 },
        { y: 0, x: 0, duration: 1.7, ease: 'expo.out' },
      )
      gsap.to(material, { opacity: 1, duration: 1.2, ease: 'power2.out' })
    } else {
      gsap.to(g.scale, {
        x: 0.1, y: 0.1, z: 0.1,
        duration: 0.7,
        ease: 'expo.in',
        onComplete: () => { g.visible = false },
      })
      gsap.to(material, { opacity: 0, duration: 0.4, ease: 'power2.in' })
    }
  }, [active, direction, material])

  // ── Per-frame: mouse tilt + idle float ───────────────────────────────────
  useFrame((state, delta) => {
    if (!groupRef.current || !active) return
    const g = groupRef.current
    const t = state.clock.elapsedTime

    // Gentle tilt following mouse — NOT a full spin
    const targetRotY = mouse.smoothX * 0.55
    const targetRotX = mouse.smoothY * 0.28
    g.rotation.y += (targetRotY - g.rotation.y) * delta * 2.2
    g.rotation.x += (targetRotX - g.rotation.x) * delta * 2.2

    // Slow vertical float
    const floatY = Math.sin(t * 0.7) * 0.06
    g.position.y += (floatY - g.position.y) * 0.04

    // Subtle horizontal drift with mouse
    g.position.x += (mouse.smoothX * 0.22 - g.position.x) * 0.03
  })

  return (
    <group ref={groupRef} scale={0.18} visible={false}>
      {/* Main molar body */}
      <mesh geometry={bodyGeo} material={material} />

      {/* Four occlusal cusps */}
      {cuspPositions.map((pos, i) => (
        <mesh key={i} geometry={cuspGeo} material={material} position={pos} />
      ))}
    </group>
  )
}
