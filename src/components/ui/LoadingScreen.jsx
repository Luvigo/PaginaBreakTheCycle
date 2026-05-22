import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = [
  { ch: 'B', color: '#FF5757' }, { ch: 'R', color: '#FF8C00' },
  { ch: 'E', color: '#FFE566' }, { ch: 'A', color: '#3DA35D' },
  { ch: 'K', color: '#1E88E5' },
  { ch: ' ', color: 'transparent' },
  { ch: 'T', color: '#A678CC' }, { ch: 'H', color: '#FF5757' },
  { ch: 'E', color: '#FF8C00' },
  { ch: ' ', color: 'transparent' },
  { ch: 'C', color: '#FFE566' }, { ch: 'Y', color: '#3DA35D' },
  { ch: 'C', color: '#1E88E5' }, { ch: 'L', color: '#A678CC' },
  { ch: 'E', color: '#FF5757' },
]

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [visible,  setVisible]  = useState(true)

  useEffect(() => {
    /* Animate progress bar 0 → 100 over ~1.4 s */
    const start = performance.now()
    const duration = 1400

    const tick = (now) => {
      const p = Math.min(((now - start) / duration) * 100, 100)
      setProgress(p)
      if (p < 100) {
        requestAnimationFrame(tick)
      } else {
        /* Short pause then fade out */
        setTimeout(() => {
          setVisible(false)
          setTimeout(onDone, 500)
        }, 200)
      }
    }
    requestAnimationFrame(tick)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#FEFAE0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
          }}
        >
          {/* Subtle dot background */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(166,120,204,0.1) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          {/* Animated title */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', gap: 0 }}
          >
            {LETTERS.map(({ ch, color }, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.055 }}
                style={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 6vw, 3.2rem)',
                  color,
                  WebkitTextStroke: color !== 'transparent' ? '1.5px #1A1A1A' : 'none',
                  paintOrder: 'stroke fill',
                  lineHeight: 1,
                  display: 'inline-block',
                  width: ch === ' ' ? '0.35em' : 'auto',
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>

          {/* Studio label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 'clamp(7px, 1.5vw, 9px)',
              color: 'rgba(26,26,26,0.4)',
              letterSpacing: '0.15em',
              textAlign: 'center',
            }}
          >
            UNDERRISE STUDIO
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              width: 'clamp(200px, 40vw, 320px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {/* Bar track */}
            <div style={{
              width: '100%',
              height: '10px',
              background: 'rgba(26,26,26,0.1)',
              border: '2px solid #1A1A1A',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '2px 2px 0 #1A1A1A',
            }}>
              {/* Bar fill */}
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'repeating-linear-gradient(90deg, #FF5757 0px, #FF8C00 30px, #FFE566 60px, #3DA35D 90px, #1E88E5 120px, #A678CC 150px)',
                transition: 'width 0.05s linear',
                borderRadius: '2px',
              }} />
            </div>

            {/* Label */}
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '7px',
              color: 'rgba(26,26,26,0.35)',
              textAlign: 'center',
              letterSpacing: '0.08em',
            }}>
              CARGANDO... {Math.round(progress)}%
            </p>
          </motion.div>

          {/* Floating pixel star */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: '12%', right: '8%' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 16 16" width={18} height={18}
              style={{ imageRendering: 'pixelated' }}>
              <rect x="7"  y="0"  width="2" height="2" fill="#FFE566" />
              <rect x="7"  y="14" width="2" height="2" fill="#FFE566" />
              <rect x="0"  y="7"  width="2" height="2" fill="#FFE566" />
              <rect x="14" y="7"  width="2" height="2" fill="#FFE566" />
              <rect x="4"  y="4"  width="8" height="8" fill="#FFE566" />
              <rect x="6"  y="2"  width="4" height="4" fill="#FFE566" />
              <rect x="6"  y="10" width="4" height="4" fill="#FFE566" />
              <rect x="2"  y="6"  width="4" height="4" fill="#FFE566" />
              <rect x="10" y="6"  width="4" height="4" fill="#FFE566" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
