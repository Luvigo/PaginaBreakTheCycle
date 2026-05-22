import { useState, useEffect, useRef, useCallback } from 'react'

export function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  const onMouseMove = useCallback((e) => {
    targetRef.current = {
      x: (e.clientX / window.innerWidth  - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    }
  }, [])

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.06)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.06)
      setMouse({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  return mouse
}
