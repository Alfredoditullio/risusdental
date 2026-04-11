import { Environment } from '@react-three/drei'
import { Sculpture } from './Sculpture'
import { slides } from '../data/slides'
import type { MousePosition } from '../hooks/useMouse'

interface SceneProps {
  currentSlide: number
  direction: 1 | -1
  mouse: MousePosition
}

export function Scene({ currentSlide, direction, mouse }: SceneProps) {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#fff8f0" />
      <directionalLight position={[-4, -2, 4]} intensity={1.2} color="#c0dcf5" />
      <directionalLight position={[0, -5, -3]} intensity={1.0} color="#EC3B79" />
      <pointLight position={[0, 4, 2]} intensity={2.0} color="#ffffff" />

      {/* HDR environment — background:false keeps canvas transparent */}
      <Environment preset="lobby" background={false} />

      {/* Only slides with a real shape get a sculpture (skips tooth, photo, gallery) */}
      {slides.map((slide, i) => {
        if (slide.shape === 'none' || slide.shape === 'tooth') return null
        if (slide.photo) return null
        return (
          <Sculpture
            key={slide.id}
            shape={slide.shape as 'torusKnot' | 'icosahedron' | 'octahedron' | 'torus'}
            color={slide.accentColor}
            active={i === currentSlide}
            direction={direction}
            mouse={mouse}
          />
        )
      })}
    </>
  )
}
