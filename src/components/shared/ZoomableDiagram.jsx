import { useRef, useState, useEffect, useCallback } from 'react'

const UML_ZOOM_MIN = 1
const UML_ZOOM_MAX = 8

function clampUmlZoom(value) {
  return Math.min(UML_ZOOM_MAX, Math.max(UML_ZOOM_MIN, value))
}

export default function ZoomableDiagram({
  src,
  alt,
  height = '100%',
  showHint = true,
  objectFit = 'contain',
}) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef({ startX: 0, startY: 0, startOx: 0, startOy: 0 })
  const scaleRef = useRef(1)

  useEffect(() => {
    scaleRef.current = scale
  }, [scale])

  const reset = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const adjustZoom = useCallback((delta) => {
    setScale((prev) => {
      const next = clampUmlZoom(prev + delta)
      if (next <= 1) {
        setOffset({ x: 0, y: 0 })
        return 1
      }
      return next
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const delta = -e.deltaY * 0.005
      if (Math.abs(delta) < 0.01) return
      setScale((prev) => {
        const next = clampUmlZoom(prev + delta)
        if (next <= 1) {
          setOffset({ x: 0, y: 0 })
          return 1
        }
        return next
      })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const onPointerDown = (e) => {
    if (scaleRef.current <= 1) return
    e.stopPropagation()
    setDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startOx: offset.x,
      startOy: offset.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    e.stopPropagation()
    setOffset({
      x: dragRef.current.startOx + (e.clientX - dragRef.current.startX),
      y: dragRef.current.startOy + (e.clientY - dragRef.current.startY),
    })
  }

  const endDrag = (e) => {
    if (!dragging) return
    setDragging(false)
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* noop */ }
  }

  const btnStyle = {
    fontFamily: '"Fredoka", sans-serif',
    fontWeight: 700,
    fontSize: '0.75rem',
    lineHeight: 1,
    padding: '6px 9px',
    background: 'rgba(255,255,255,0.95)',
    border: '2px solid #1A1A1A',
    boxShadow: '2px 2px 0 #1A1A1A',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#1A1A1A',
    minWidth: '28px',
  }

  return (
    <div
      ref={containerRef}
      aria-label={alt}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDoubleClick={(e) => { e.stopPropagation(); reset() }}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        background: '#0d0d12',
        touchAction: 'none',
        cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition: 'center',
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: dragging ? 'none' : 'transform 0.08s linear',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      {showHint && scale <= 1 && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '0.65rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.75)',
            background: 'rgba(0,0,0,0.45)',
            padding: '3px 8px',
            borderRadius: '4px',
            pointerEvents: 'none',
          }}
        >
          Rueda o +/- para zoom · arrastra para mover · doble clic restablece
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          display: 'flex',
          gap: 4,
          zIndex: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" style={btnStyle} aria-label="Alejar" onClick={() => adjustZoom(-0.5)}>−</button>
        <button type="button" style={{ ...btnStyle, minWidth: '44px' }} aria-label="Restablecer zoom" onClick={reset}>
          {Math.round(scale * 100)}%
        </button>
        <button type="button" style={btnStyle} aria-label="Acercar" onClick={() => adjustZoom(0.5)}>+</button>
      </div>
    </div>
  )
}
