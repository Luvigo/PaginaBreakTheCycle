import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ══════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
══════════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -50px 0px', amount: threshold })
  return { ref, inView }
}

const revealUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40, filter: 'blur(4px)' },
  animate:    { opacity: 1, y: 0,  filter: 'blur(0px)' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

/* ══════════════════════════════════════════════════════════════════
   DOCUMENTATION DATA
══════════════════════════════════════════════════════════════════ */
const DOCS = [
  {
    id: 'manual',
    icon: '📖',
    title: 'Manual de Usuario',
    desc: 'Guía completa para jugadores. Mecánicas, controles y narrativa.',
    tag: 'PDF',
    tagColor: '#FF5757',
    bgColor: '#FFF5F5',
    borderColor: '#FF5757',
    href: '#',
    locked: false,
  },
  {
    id: 'informe',
    icon: '📄',
    title: 'Informe Técnico',
    desc: 'Documentación técnica del desarrollo y arquitectura del juego.',
    tag: 'PDF',
    tagColor: '#3DA35D',
    bgColor: '#F2FFF5',
    borderColor: '#3DA35D',
    href: '#',
    locked: false,
  },
  {
    id: 'uml',
    icon: '🗂️',
    title: 'Diagramas UML',
    desc: 'Diagramas de clases, secuencia y arquitectura del sistema.',
    tag: 'DOC',
    tagColor: '#1E88E5',
    bgColor: '#F0F8FF',
    borderColor: '#1E88E5',
    href: '#',
    locked: false,
  },
  {
    id: 'ingenieria',
    icon: '🔒',
    title: 'Manual de Ingeniería',
    desc: 'Documentación completa de ingeniería del software.',
    tag: 'PRÓXIMAMENTE',
    tagColor: '#999',
    bgColor: '#F8F8F8',
    borderColor: '#CCC',
    href: null,
    locked: true,
  },
]

const GAME_DOWNLOAD_URL = 'https://drive.google.com/drive/folders/1zdccAdilvZ9PDUmkYI25daNMa3I4qrYD?usp=sharing'

/* ══════════════════════════════════════════════════════════════════
   PIXEL DECORATIONS
══════════════════════════════════════════════════════════════════ */
function PixelStar({ color = '#FFE566', size = 14, style = {} }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}
      style={{ imageRendering: 'pixelated', flexShrink: 0, ...style }} aria-hidden="true">
      <rect x="7"  y="0"  width="2" height="2" fill={color} />
      <rect x="7"  y="14" width="2" height="2" fill={color} />
      <rect x="0"  y="7"  width="2" height="2" fill={color} />
      <rect x="14" y="7"  width="2" height="2" fill={color} />
      <rect x="4"  y="4"  width="8" height="8" fill={color} />
      <rect x="6"  y="2"  width="4" height="4" fill={color} />
      <rect x="6"  y="10" width="4" height="4" fill={color} />
      <rect x="2"  y="6"  width="4" height="4" fill={color} />
      <rect x="10" y="6"  width="4" height="4" fill={color} />
    </svg>
  )
}

/* Pixel folder icon */
function PixelFolder({ color = '#FFE566', size = 32 }) {
  return (
    <svg viewBox="0 0 32 28" width={size} height={size * 28/32}
      style={{ imageRendering: 'pixelated', display: 'block' }} aria-hidden="true">
      <rect x="0"  y="6"  width="32" height="22" fill={color} rx="1" />
      <rect x="0"  y="4"  width="14" height="4"  fill={color} rx="1" />
      <rect x="1"  y="7"  width="30" height="20" fill={color} opacity="0.6" />
      <rect x="2"  y="10" width="28" height="2"  fill="rgba(255,255,255,0.35)" />
    </svg>
  )
}

/* Pixel PC icon */
function PixelPC({ size = 52 }) {
  return (
    <svg viewBox="0 0 40 36" width={size} height={size * 36/40}
      style={{ imageRendering: 'pixelated', display: 'block' }} aria-hidden="true">
      {/* Monitor */}
      <rect x="2"  y="0"  width="36" height="26" fill="#1A1A1A" rx="2" />
      <rect x="4"  y="2"  width="32" height="22" fill="#A678CC" />
      {/* Screen content */}
      <rect x="7"  y="5"  width="18" height="2"  fill="#FFE566" opacity="0.8" />
      <rect x="7"  y="9"  width="26" height="2"  fill="rgba(255,255,255,0.4)" />
      <rect x="7"  y="13" width="20" height="2"  fill="rgba(255,255,255,0.3)" />
      <rect x="7"  y="17" width="14" height="2"  fill="rgba(255,255,255,0.25)" />
      {/* Play indicator */}
      <polygon points="27,8 35,13 27,18" fill="#FFE566" opacity="0.9" />
      {/* Stand */}
      <rect x="16" y="26" width="8"  height="4"  fill="#1A1A1A" />
      <rect x="10" y="30" width="20" height="3"  fill="#1A1A1A" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN DOWNLOAD CARD
══════════════════════════════════════════════════════════════════ */
function MainDownloadCard({ inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      {...revealUp(0.1)}
      animate={inView ? revealUp(0.1).animate : revealUp(0.1).initial}
      style={{
        border: '3px solid #1A1A1A',
        boxShadow: hovered ? '8px 8px 0 #1A1A1A' : '6px 6px 0 #1A1A1A',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1A0A2E 0%, #2D1060 50%, #1A1A2E 100%)',
        position: 'relative',
        transition: 'box-shadow 0.2s, transform 0.2s',
        transform: hovered ? 'translate(-2px,-2px)' : 'translate(0,0)',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Pixel grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(166,120,204,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(166,120,204,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }} />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '-30px', right: '10%',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, #A678CC55 0%, transparent 70%)',
        filter: 'blur(35px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20px', left: '5%',
        width: '150px', height: '150px', borderRadius: '50%',
        background: 'radial-gradient(circle, #FFE56644 0%, transparent 70%)',
        filter: 'blur(28px)', pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(24px, 4vw, 40px)',
        display: 'flex', alignItems: 'center',
        gap: 'clamp(20px, 4vw, 48px)',
        flexWrap: 'wrap',
      }}>
        {/* Left: icon + badges */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PixelPC size={72} />
          </motion.div>
          {/* Available badge */}
          <div style={{
            background: '#4CAF50',
            border: '2px solid #fff',
            borderRadius: '100px',
            padding: '3px 12px',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '7px',
            color: '#fff',
            letterSpacing: '0.05em',
            boxShadow: '0 0 10px rgba(76,175,80,0.5)',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A5D6A7', display: 'inline-block' }} />
            DISPONIBLE
          </div>
          {/* Platform */}
          <div style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: '7px',
            padding: '3px 10px',
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.06em',
          }}>
            🖥️ Windows · PC
          </div>
        </div>

        {/* Right: content */}
        <div style={{ flex: 1, minWidth: '220px' }}>
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{
              background: '#A678CC',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '7px',
              padding: '3px 10px',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '7px',
              color: '#fff',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            }}>
              v1.0.0
            </span>
            <span style={{
              fontFamily: '"Fredoka", sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.04em',
            }}>
              UnderRise Studio · 2025
            </span>
          </div>

          <h3 style={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: '10px',
          }}>
            Break The Cycle
            <br />
            <span style={{ color: '#C9A8E0', fontSize: '0.65em', fontWeight: 500 }}>
              Windows Edition
            </span>
          </h3>

          <p style={{
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.6,
            marginBottom: '22px',
            maxWidth: '420px',
          }}>
            Descarga la versión oficial del juego para PC. Incluye los 3 niveles completos: Huida, Superación y Enfrentamiento VR.
          </p>

          {/* Download button */}
          <motion.a
            href={GAME_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(166,120,204,0.6)' }}
            whileTap={{ y: 1, scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #A678CC, #7C4DFF)',
              border: '2.5px solid #fff',
              borderRadius: '12px',
              padding: '13px 28px',
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(166,120,204,0.4)',
              letterSpacing: '0.02em',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '20px' }}>⬇️</span>
            Descargar Juego
          </motion.a>
        </div>

        {/* Floating sticker */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '16px', right: '18px',
            background: '#FFE566',
            border: '2.5px solid #1A1A1A',
            boxShadow: '3px 3px 0 #1A1A1A',
            borderRadius: '50%',
            width: '42px', height: '42px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
            zIndex: 2,
          }}
        >
          🎮
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   DOCUMENTATION CARD
══════════════════════════════════════════════════════════════════ */
function DocCard({ doc, delay, inView }) {
  const [hovered, setHovered] = useState(false)

  if (doc.locked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
        animate={inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)',
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } }
          : { opacity: 0, y: 35, filter: 'blur(4px)' }
        }
        style={{
          background: '#F8F8F8',
          border: '3px solid #CCC',
          boxShadow: '4px 4px 0 #CCC',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          padding: '22px',
          display: 'flex', flexDirection: 'column', gap: '10px',
          opacity: 0.82,
        }}
      >
        {/* Construction stripes */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
          background: 'repeating-linear-gradient(45deg, #FFE566 0px, #FFE566 8px, #1A1A1A 8px, #1A1A1A 16px)',
          opacity: 0.6,
        }} />

        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px', filter: 'grayscale(0.5)' }}>🔒</span>
          <div style={{
            background: '#666',
            border: '2px solid #999',
            borderRadius: '6px',
            padding: '3px 9px',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '6.5px',
            color: '#fff',
            letterSpacing: '0.04em',
          }}>
            EN DESARROLLO
          </div>
        </div>

        <h4 style={{
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: '#999',
          lineHeight: 1.2,
        }}>
          {doc.title}
        </h4>
        <p style={{
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.85rem',
          color: 'rgba(100,100,100,0.7)',
          lineHeight: 1.5,
        }}>
          {doc.desc}
        </p>

        {/* Disabled button */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#E0E0E0',
          border: '2px solid #CCC',
          borderRadius: '9px',
          padding: '9px 16px',
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 600,
          fontSize: '0.88rem',
          color: '#AAA',
          cursor: 'not-allowed',
          marginTop: '4px',
          width: 'fit-content',
        }}>
          <span>🚧</span>
          Próximamente
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
      animate={inView
        ? { opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } }
        : { opacity: 0, y: 35, filter: 'blur(4px)' }
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: doc.bgColor,
        border: `3px solid #1A1A1A`,
        boxShadow: hovered ? `6px 6px 0 #1A1A1A` : `4px 4px 0 #1A1A1A`,
        borderRadius: '16px',
        padding: '22px',
        display: 'flex', flexDirection: 'column', gap: '10px',
        cursor: 'pointer',
        transition: 'box-shadow 0.18s, transform 0.18s',
        transform: hovered ? 'translate(-2px,-2px)' : 'translate(0,0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top color stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: doc.borderColor, opacity: 0.7,
      }} />

      <div style={{ marginTop: '6px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <motion.span
          animate={hovered ? { y: -4, rotate: -8 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.25 }}
          style={{ fontSize: '30px', display: 'block' }}
        >
          {doc.icon}
        </motion.span>
        <div style={{
          background: doc.tagColor,
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
          borderRadius: '6px',
          padding: '3px 9px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '7px',
          color: '#fff',
          letterSpacing: '0.04em',
        }}>
          {doc.tag}
        </div>
      </div>

      <h4 style={{
        fontFamily: '"Fredoka", sans-serif',
        fontWeight: 700,
        fontSize: '1.1rem',
        color: '#1A1A1A',
        lineHeight: 1.2,
      }}>
        {doc.title}
      </h4>
      <p style={{
        fontFamily: '"Fredoka", sans-serif',
        fontSize: '0.85rem',
        color: 'rgba(26,26,26,0.68)',
        lineHeight: 1.55,
        flex: 1,
      }}>
        {doc.desc}
      </p>

      <motion.a
        href={doc.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={(e) => { if (doc.href === '#') e.preventDefault() }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: doc.tagColor,
          border: '2px solid #1A1A1A',
          boxShadow: '3px 3px 0 #1A1A1A',
          borderRadius: '9px',
          padding: '9px 16px',
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 600,
          fontSize: '0.88rem',
          color: '#fff',
          textDecoration: 'none',
          cursor: 'pointer',
          marginTop: '4px',
          width: 'fit-content',
        }}
      >
        <span>📥</span>
        Ver documento
      </motion.a>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   WEB VERSION CARD
══════════════════════════════════════════════════════════════════ */
function WebVersionCard({ inView }) {
  return (
    <motion.div
      {...revealUp(0.35)}
      animate={inView ? revealUp(0.35).animate : revealUp(0.35).initial}
      style={{
        border: '3px solid #1A1A1A',
        boxShadow: '5px 5px 0 #1A1A1A',
        borderRadius: '18px',
        overflow: 'hidden',
        background: '#F0F8FF',
      }}
    >
      {/* Top bar */}
      <div style={{
        background: '#F5EEC8',
        borderBottom: '3px solid #1A1A1A',
        padding: '10px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['#A8D4F5','#FFE566','#A8D8A8'].map(c => (
            <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, border: '1.5px solid #1A1A1A' }} />
          ))}
        </div>
        <span style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '7.5px', color: '#1A1A1A', letterSpacing: '0.05em',
        }}>
          🌐 WEB VERSION
        </span>
        <div style={{
          background: '#A8D4F5',
          border: '2px solid #1A1A1A',
          borderRadius: '6px',
          padding: '3px 10px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '6.5px', color: '#1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
        }}>
          PRÓXIMAMENTE
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: 'clamp(24px, 4vw, 36px)',
        display: 'flex', alignItems: 'center',
        gap: 'clamp(20px, 4vw, 40px)',
        flexWrap: 'wrap',
      }}>
        {/* Browser pixel art */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ flexShrink: 0 }}
        >
          <svg viewBox="0 0 56 44" width={72} height={56}
            style={{ imageRendering: 'pixelated', display: 'block' }} aria-hidden="true">
            {/* Browser frame */}
            <rect x="0" y="0" width="56" height="44" fill="#1A1A1A" rx="3" />
            <rect x="2" y="2" width="52" height="40" fill="#A8D4F5" rx="2" />
            {/* Top bar */}
            <rect x="2" y="2" width="52" height="8" fill="#F5EEC8" />
            <rect x="4" y="4" width="4" height="4" fill="#FF5757" rx="1" />
            <rect x="10" y="4" width="4" height="4" fill="#FFE566" rx="1" />
            <rect x="16" y="4" width="4" height="4" fill="#A8D8A8" rx="1" />
            <rect x="24" y="3" width="28" height="5" fill="#E0D8C0" rx="2" />
            {/* Screen */}
            <rect x="4" y="12" width="48" height="28" fill="#DCEEFF" />
            {/* Lock overlay */}
            <rect x="4" y="12" width="48" height="28" fill="rgba(26,26,26,0.12)" />
            {/* Lock icon */}
            <rect x="22" y="20" width="12" height="10" fill="#A678CC" rx="1" />
            <path d="M24 20 Q24 16 28 16 Q32 16 32 20" fill="none" stroke="#A678CC" strokeWidth="2.5" />
            <rect x="26" y="23" width="4" height="3" fill="#fff" rx="1" />
          </svg>
        </motion.div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#A8D4F5',
            border: '2px solid #1A1A1A',
            boxShadow: '2px 2px 0 #1A1A1A',
            borderRadius: '6px',
            padding: '3px 10px',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '7px', color: '#1A1A1A',
            marginBottom: '12px',
          }}>
            🌐 NAVEGADOR
          </div>
          <h3 style={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            color: '#1A1A1A',
            marginBottom: '8px',
          }}>
            Juega desde tu navegador
          </h3>
          <p style={{
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '0.92rem',
            color: 'rgba(26,26,26,0.65)',
            lineHeight: 1.6,
            marginBottom: '18px',
            maxWidth: '360px',
          }}>
            Próximamente podrás jugar Break The Cycle directamente desde cualquier navegador, sin instalación.
          </p>

          {/* Disabled play button */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '9px',
            background: 'rgba(26,26,26,0.08)',
            border: '2.5px dashed #CCC',
            borderRadius: '11px',
            padding: '11px 22px',
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 600,
            fontSize: '0.95rem',
            color: '#AAA',
            cursor: 'not-allowed',
          }}>
            <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden="true">
              <polygon points="5,3 13,8 5,13" fill="#CCC" />
            </svg>
            Jugar ahora · En desarrollo
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION TITLE
══════════════════════════════════════════════════════════════════ */
function SectionTitle({ inView }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <motion.div
        {...revealUp(0)}
        animate={inView ? revealUp(0).animate : revealUp(0).initial}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#A8D8A8',
          border: '2px solid #1A1A1A',
          boxShadow: '3px 3px 0 #1A1A1A',
          borderRadius: '100px',
          padding: '5px 16px',
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.85rem', fontWeight: 600, color: '#1A1A1A',
        }}
      >
        <PixelStar color="#3DA35D" size={10} />
        Descargas
        <PixelStar color="#3DA35D" size={10} />
      </motion.div>

      <motion.h2
        {...revealUp(0.1)}
        animate={inView ? revealUp(0.1).animate : revealUp(0.1).initial}
        style={{
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 3.4rem)',
          color: '#1A1A1A',
          lineHeight: 1.1,
          textAlign: 'center',
        }}
      >
        Descarga y{' '}
        <span style={{ color: '#3DA35D', WebkitTextStroke: '1.5px #1A1A1A', paintOrder: 'stroke fill' }}>
          Explora
        </span>
      </motion.h2>

      <motion.div
        {...revealUp(0.15)}
        animate={inView ? revealUp(0.15).animate : revealUp(0.15).initial}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 200 12" width={200} height={12} aria-hidden="true">
          <path d="M4 8 Q28 2 52 8 Q76 14 100 8 Q124 2 148 8 Q172 14 196 6"
            fill="none" stroke="#A8D8A8" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      <motion.div
        {...revealUp(0.2)}
        animate={inView ? revealUp(0.2).animate : revealUp(0.2).initial}
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <p style={{
          fontFamily: '"Fredoka", sans-serif',
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          fontWeight: 500,
          color: 'rgba(26,26,26,0.68)',
          lineHeight: 1.6,
          maxWidth: '38rem',
          textAlign: 'center',
          width: '100%',
        }}>
          Explora el juego, sus manuales y la documentación del proyecto.
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
export default function Download() {
  const { ref, inView } = useReveal(0.08)

  return (
    <section
      id="download"
      ref={ref}
      className="relative section-spacing overflow-hidden"
      style={{ background: '#F0FFF4' }}
    >
      {/* Top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #A8D8A8 0px, #A8D8A8 30px, #FFE566 30px, #FFE566 60px, #A8D4F5 60px, #A8D4F5 90px)',
        opacity: 0.7,
      }} />

      {/* Dot background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(61,163,93,0.1) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Floating stars */}
      {[
        { top: '6%',  left: '3%',  color: '#3DA35D', size: 14, delay: 0 },
        { top: '10%', right: '4%', color: '#FFE566', size: 11, delay: 0.8 },
        { top: '70%', left: '2%',  color: '#A8D4F5', size: 12, delay: 1.4 },
        { top: '78%', right: '3%', color: '#A678CC', size: 13, delay: 0.5 },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], rotate: [0, 14, 0] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          style={{ position: 'absolute', ...s, pointerEvents: 'none', zIndex: 0 }}
          aria-hidden="true"
        >
          <PixelStar color={s.color} size={s.size} />
        </motion.div>
      ))}

      <div className="container-game relative"
        style={{ display: 'flex', flexDirection: 'column', gap: '3rem', zIndex: 1 }}>

        {/* Title */}
        <SectionTitle inView={inView} />

        {/* Main download card */}
        <MainDownloadCard inView={inView} />

        {/* Docs label */}
        <motion.div
          {...revealUp(0.18)}
          animate={inView ? revealUp(0.18).animate : revealUp(0.18).initial}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div style={{ flex: 1, height: '2px', background: 'repeating-linear-gradient(90deg, #1A1A1A 0px, #1A1A1A 6px, transparent 6px, transparent 14px)', opacity: 0.1 }} />
          <div style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: '#F5EEC8',
            border: '2px solid #1A1A1A',
            boxShadow: '2px 2px 0 #1A1A1A',
            borderRadius: '100px',
            padding: '5px 14px',
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: '#1A1A1A',
            flexShrink: 0,
          }}>
            📚 Documentación
          </div>
          <div style={{ flex: 1, height: '2px', background: 'repeating-linear-gradient(90deg, #1A1A1A 0px, #1A1A1A 6px, transparent 6px, transparent 14px)', opacity: 0.1 }} />
        </motion.div>

        {/* Documentation grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOCS.map((doc, i) => (
            <DocCard key={doc.id} doc={doc} delay={0.22 + i * 0.08} inView={inView} />
          ))}
        </div>

        {/* Web version */}
        <WebVersionCard inView={inView} />

      </div>

      {/* Bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #A8D4F5 0px, #A8D4F5 30px, #A8D8A8 30px, #A8D8A8 60px, #FFE566 60px, #FFE566 90px)',
        opacity: 0.7,
      }} />
    </section>
  )
}
