import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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
   DATA
══════════════════════════════════════════════════════════════════ */
const UML_SYSTEMS = [
  {
    id:    'main',
    title: 'Sistema Principal',
    desc:  'GameManager, LevelController y el flujo de control central del juego.',
    color: '#1E88E5',
    bg:    '#EFF6FF',
    icon:  '🎮',
    tag:   'CLASS DIAGRAM',
  },
  {
    id:    'auth',
    title: 'Autenticación',
    desc:  'AuthService con LinkedList para historial de login y persistencia JSON.',
    color: '#A678CC',
    bg:    '#F8F4FF',
    icon:  '🔐',
    tag:   'SEQUENCE DIAGRAM',
  },
  {
    id:    'ui',
    title: 'Sistema UI / Menú',
    desc:  'NavigationManager, accesibilidad, filtros para daltónicos y flujo de pantallas.',
    color: '#3DA35D',
    bg:    '#F2FFF5',
    icon:  '🖥️',
    tag:   'COMPONENT DIAGRAM',
  },
]

const TECH_STACK = [
  { label: 'Unity 6',     icon: '🎮', color: '#1A1A1A', bg: '#F5EEC8' },
  { label: 'C#',          icon: '💻', color: '#A678CC', bg: '#F8F4FF' },
  { label: 'VR / XR',    icon: '🥽', color: '#1E88E5', bg: '#EFF6FF' },
  { label: 'JSON',        icon: '📦', color: '#FF8C00', bg: '#FFF8F0' },
  { label: 'Git',         icon: '🌿', color: '#3DA35D', bg: '#F2FFF5' },
  { label: 'Planner Teams', icon: '📋', color: '#464EB8', bg: '#EBF5FF' },
  { label: 'URP',         icon: '✨', color: '#FF5757', bg: '#FFF5F5' },
  { label: 'OOP',         icon: '🧱', color: '#00ACC1', bg: '#F0FEFF' },
  { label: 'Data Struct', icon: '🗃️', color: '#8E24AA', bg: '#FDF4FF' },
]

const FEATURES = [
  { icon: '🌈', name: 'Daltonism Filters',          desc: 'Accesibilidad visual para todos los jugadores',   color: '#FF8C00', tag: 'ACCESIBILIDAD' },
  { icon: '⏱️', name: 'SlowMotionChoiceTrigger',     desc: 'Cámara lenta para decisiones clave en VR',        color: '#A678CC', tag: 'GAMEPLAY'      },
  { icon: '🔐', name: 'AuthService',                 desc: 'Autenticación con persistencia en JSON local',    color: '#1E88E5', tag: 'SISTEMA'        },
  { icon: '🔗', name: 'LinkedList Login History',    desc: 'Historial de sesiones con lista enlazada',        color: '#3DA35D', tag: 'ESTRUCTURA'     },
  { icon: '🏃', name: 'Parkour Physics',             desc: 'Motor de físicas y colisiones del Nivel 2',       color: '#FF5757', tag: 'FÍSICA'          },
  { icon: '🥽', name: 'VR Immersion System',         desc: 'Integración XR completa para el Nivel 3',        color: '#00ACC1', tag: 'VR'             },
]

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

/* ══════════════════════════════════════════════════════════════════
   UML BLUEPRINT PLACEHOLDER SVG
══════════════════════════════════════════════════════════════════ */
function BlueprintPlaceholder({ color, icon }) {
  const c   = color
  const dim = 'rgba(0,0,0,0.06)'

  return (
    <svg viewBox="0 0 360 200" width="100%" height="100%"
      style={{ display: 'block' }} aria-hidden="true">
      {/* Background */}
      <rect width="360" height="200" fill="#F8FBFF" />

      {/* Blueprint grid */}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="200"
          stroke={c} strokeWidth="0.5" opacity="0.18" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 33} x2="360" y2={i * 33}
          stroke={c} strokeWidth="0.5" opacity="0.18" />
      ))}

      {/* UML class boxes */}
      <rect x="20"  y="20"  width="100" height="60"  fill="white" stroke={c} strokeWidth="1.5" rx="2" opacity="0.9" />
      <rect x="20"  y="20"  width="100" height="16"  fill={c}     rx="2"  opacity="0.8" />
      <line x1="20" y1="50" x2="120" y2="50" stroke={c} strokeWidth="0.8" opacity="0.5" />
      {[0,1,2].map(i => <rect key={i} x="26" y={54 + i*6} width={50 + i*8} height="3" fill={dim} rx="1" />)}

      <rect x="240" y="18"  width="110" height="65"  fill="white" stroke={c} strokeWidth="1.5" rx="2" opacity="0.9" />
      <rect x="240" y="18"  width="110" height="16"  fill={c}     rx="2"  opacity="0.8" />
      <line x1="240" y1="48" x2="350" y2="48" stroke={c} strokeWidth="0.8" opacity="0.5" />
      {[0,1,2,3].map(i => <rect key={i} x="246" y={52 + i*6} width={55 + i*5} height="3" fill={dim} rx="1" />)}

      <rect x="130" y="110" width="100" height="60"  fill="white" stroke={c} strokeWidth="1.5" rx="2" opacity="0.9" />
      <rect x="130" y="110" width="100" height="16"  fill={c}     rx="2"  opacity="0.8" />
      <line x1="130" y1="140" x2="230" y2="140" stroke={c} strokeWidth="0.8" opacity="0.5" />
      {[0,1].map(i => <rect key={i} x="136" y={144 + i*7} width={60 + i*12} height="3" fill={dim} rx="1" />)}

      {/* Connectors */}
      <line x1="120" y1="50" x2="180" y2="118" stroke={c} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.45" />
      <line x1="240" y1="52" x2="230" y2="118" stroke={c} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.45" />
      <polygon points="178,112 183,122 173,122" fill={c} opacity="0.4" />
      <polygon points="229,112 234,122 224,122" fill={c} opacity="0.4" />

      {/* Small attribute hint boxes */}
      <rect x="20"  y="110" width="80"  height="40" fill="white" stroke={c} strokeWidth="1"   rx="2" opacity="0.6" />
      <rect x="20"  y="110" width="80"  height="12" fill={c}     rx="2"  opacity="0.5" />
      <rect x="270" y="110" width="80"  height="40" fill="white" stroke={c} strokeWidth="1"   rx="2" opacity="0.6" />
      <rect x="270" y="110" width="80"  height="12" fill={c}     rx="2"  opacity="0.5" />

      {/* Center icon label */}
      <text x="180" y="30" fontSize="20" textAnchor="middle" fontFamily="sans-serif">{icon}</text>

      {/* Watermark label */}
      <text x="180" y="190" fontSize="9" textAnchor="middle" fontFamily="monospace"
        fill={c} opacity="0.35" letterSpacing="2">
        UML PLACEHOLDER — REEMPLAZAR CON DIAGRAMA REAL
      </text>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════
   UML CARD  (with zoom modal)
══════════════════════════════════════════════════════════════════ */
function UMLCard({ sys, delay, inView, onExpand }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
      animate={inView
        ? { opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } }
        : { opacity: 0, y: 40, filter: 'blur(4px)' }
      }
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        background: sys.bg,
        border: '3px solid #1A1A1A',
        boxShadow: hov ? '7px 7px 0 #1A1A1A' : '5px 5px 0 #1A1A1A',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, transform 0.2s',
        transform: hov ? 'translate(-2px,-2px)' : 'translate(0,0)',
      }}
      onClick={() => onExpand(sys)}
    >
      {/* Image area */}
      <div style={{
        position: 'relative',
        borderBottom: '3px solid #1A1A1A',
        overflow: 'hidden',
        aspectRatio: '16 / 9',
        background: '#F0F6FF',
      }}>
        <motion.div
          animate={{ scale: hov ? 1.03 : 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%' }}
        >
          <BlueprintPlaceholder color={sys.color} icon={sys.icon} />
        </motion.div>

        {/* Hover overlay with zoom hint */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', inset: 0,
            background: `${sys.color}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            background: sys.color,
            border: '2px solid #fff',
            borderRadius: '10px',
            padding: '8px 18px',
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: '#fff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}>
            🔍 Ver diagrama
          </div>
        </motion.div>

        {/* Tag badge */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          background: sys.color,
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
          borderRadius: '6px',
          padding: '3px 9px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '6.5px',
          color: '#fff',
          letterSpacing: '0.04em',
          lineHeight: 1.6,
        }}>
          {sys.tag}
        </div>

        {/* Floating icon sticker */}
        <motion.div
          animate={{ y: hov ? -5 : [0, -4, 0] }}
          transition={hov ? { duration: 0.2 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '9px', right: '10px',
            background: '#F5EEC8',
            border: '2px solid #1A1A1A',
            boxShadow: '2px 2px 0 #1A1A1A',
            borderRadius: '50%',
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '15px',
          }}
        >
          {sys.icon}
        </motion.div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px 20px' }}>
        <h4 style={{
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 700,
          fontSize: '1.15rem',
          color: sys.color,
          WebkitTextStroke: '0.5px #1A1A1A',
          paintOrder: 'stroke fill',
          marginBottom: '6px',
        }}>
          {sys.title}
        </h4>
        <p style={{
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.88rem',
          color: 'rgba(26,26,26,0.7)',
          lineHeight: 1.6,
        }}>
          {sys.desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MODAL  (UML expand)
══════════════════════════════════════════════════════════════════ */
function UMLModal({ sys, onClose }) {
  if (!sys) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(10,10,20,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
          cursor: 'zoom-out',
        }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: sys.bg,
            border: '4px solid #1A1A1A',
            boxShadow: '10px 10px 0 #1A1A1A',
            borderRadius: '20px',
            overflow: 'hidden',
            maxWidth: '900px',
            width: '100%',
            cursor: 'default',
          }}
        >
          {/* Header */}
          <div style={{
            background: sys.color,
            padding: '12px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{sys.icon}</span>
              <span style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '9px', color: '#fff', letterSpacing: '0.05em',
              }}>
                {sys.tag} — {sys.title.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid #fff',
                borderRadius: '7px',
                padding: '5px 12px',
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              ✕ Cerrar
            </button>
          </div>
          {/* Diagram */}
          <div style={{ padding: '4px' }}>
            <BlueprintPlaceholder color={sys.color} icon={sys.icon} />
          </div>
          {/* Footer note */}
          <div style={{
            borderTop: '2px dashed rgba(0,0,0,0.12)',
            padding: '10px 20px',
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '0.82rem',
            color: 'rgba(26,26,26,0.5)',
            textAlign: 'center',
          }}>
            📌 Placeholder — Los diagramas UML reales se integrarán próximamente.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════════════════════════════════
   TECH STACK BADGES
══════════════════════════════════════════════════════════════════ */
function TechBadges({ inView }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
      {TECH_STACK.map((t, i) => (
        <motion.div
          key={t.label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView
            ? { opacity: 1, scale: 1,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.06 } }
            : { opacity: 0, scale: 0.7 }
          }
          whileHover={{ y: -5, scale: 1.08, transition: { duration: 0.18 } }}
          style={{
            background: t.bg,
            border: '2.5px solid #1A1A1A',
            boxShadow: '3px 3px 0 #1A1A1A',
            borderRadius: '12px',
            padding: '10px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            cursor: 'default',
            minWidth: '76px',
          }}
        >
          <span style={{ fontSize: '22px' }}>{t.icon}</span>
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '6.5px',
            color: t.color,
            letterSpacing: '0.04em',
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            {t.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FEATURE CARD  ("system unlocked" style)
══════════════════════════════════════════════════════════════════ */
function FeatureCard({ feat, delay, inView }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
      animate={inView
        ? { opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } }
        : { opacity: 0, y: 30, filter: 'blur(4px)' }
      }
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{
        background: '#fff',
        border: `2.5px solid #1A1A1A`,
        boxShadow: hov ? '5px 5px 0 #1A1A1A' : '3px 3px 0 #1A1A1A',
        borderRadius: '14px',
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.18s, transform 0.18s',
        transform: hov ? 'translate(-1px,-1px)' : 'translate(0,0)',
      }}
    >
      {/* Top color bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: feat.color,
      }} />

      {/* Unlocked badge */}
      <div style={{
        position: 'absolute', top: '10px', right: '10px',
        background: hov ? feat.color : '#F5EEC8',
        border: '1.5px solid #1A1A1A',
        borderRadius: '4px',
        padding: '2px 7px',
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '5.5px',
        color: hov ? '#fff' : '#1A1A1A',
        letterSpacing: '0.04em',
        transition: 'background 0.2s, color 0.2s',
      }}>
        {feat.tag}
      </div>

      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <motion.span
          animate={hov ? { scale: 1.2, rotate: -8 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: '26px', display: 'block', flexShrink: 0 }}
        >
          {feat.icon}
        </motion.span>
      </div>

      <h5 style={{
        fontFamily: '"Fredoka", sans-serif',
        fontWeight: 700,
        fontSize: '0.95rem',
        color: feat.color,
        lineHeight: 1.2,
        wordBreak: 'break-word',
      }}>
        {feat.name}
      </h5>
      <p style={{
        fontFamily: '"Fredoka", sans-serif',
        fontSize: '0.8rem',
        color: 'rgba(26,26,26,0.65)',
        lineHeight: 1.5,
      }}>
        {feat.desc}
      </p>
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
          background: '#A8D4F5',
          border: '2px solid #1A1A1A',
          boxShadow: '3px 3px 0 #1A1A1A',
          borderRadius: '100px',
          padding: '5px 16px',
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.85rem', fontWeight: 600, color: '#1A1A1A',
        }}
      >
        <PixelStar color="#1E88E5" size={10} />
        Arquitectura
        <PixelStar color="#1E88E5" size={10} />
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
        Detrás del{' '}
        <span style={{ color: '#1E88E5', WebkitTextStroke: '1.5px #1A1A1A', paintOrder: 'stroke fill' }}>
          Código
        </span>
      </motion.h2>

      <motion.div
        {...revealUp(0.15)}
        animate={inView ? revealUp(0.15).animate : revealUp(0.15).initial}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 220 12" width={220} height={12} aria-hidden="true">
          <path d="M4 8 Q30 2 55 8 Q80 14 105 8 Q130 2 155 8 Q180 14 216 6"
            fill="none" stroke="#A8D4F5" strokeWidth="3.5" strokeLinecap="round" />
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
          maxWidth: '42rem',
          textAlign: 'center',
          width: '100%',
        }}>
          Explora la arquitectura y los sistemas que hacen funcionar Break The Cycle.
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION DIVIDER LABEL
══════════════════════════════════════════════════════════════════ */
function SectionLabel({ emoji, text, color, bg, delay, inView }) {
  return (
    <motion.div
      {...revealUp(delay)}
      animate={inView ? revealUp(delay).animate : revealUp(delay).initial}
      style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
    >
      <div style={{ flex: 1, height: '2px', background: 'repeating-linear-gradient(90deg, #1A1A1A 0px, #1A1A1A 5px, transparent 5px, transparent 12px)', opacity: 0.1 }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        background: bg,
        border: '2px solid #1A1A1A',
        boxShadow: '2px 2px 0 #1A1A1A',
        borderRadius: '100px',
        padding: '5px 14px',
        fontFamily: '"Fredoka", sans-serif',
        fontWeight: 600,
        fontSize: '0.88rem',
        color: '#1A1A1A',
        flexShrink: 0,
      }}>
        <span>{emoji}</span> {text}
      </div>
      <div style={{ flex: 1, height: '2px', background: 'repeating-linear-gradient(90deg, #1A1A1A 0px, #1A1A1A 5px, transparent 5px, transparent 12px)', opacity: 0.1 }} />
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
export default function CodeBehind() {
  const { ref, inView } = useReveal(0.08)
  const [expandedUML, setExpandedUML] = useState(null)

  return (
    <section
      id="code"
      ref={ref}
      className="relative section-spacing overflow-hidden"
      style={{ background: '#EFF6FF' }}
    >
      {/* Blueprint grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(30,136,229,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(30,136,229,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '36px 36px',
        maskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* Top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #1E88E5 0px, #1E88E5 30px, #A8D4F5 30px, #A8D4F5 60px, #A678CC 60px, #A678CC 90px)',
        opacity: 0.65,
      }} />

      {/* Floating stars */}
      {[
        { top: '5%',  left: '3%',  color: '#1E88E5', size: 13, delay: 0   },
        { top: '9%',  right: '4%', color: '#A678CC', size: 11, delay: 0.7 },
        { top: '70%', left: '2%',  color: '#3DA35D', size: 12, delay: 1.3 },
        { top: '78%', right: '3%', color: '#FFE566', size: 14, delay: 0.4 },
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

      {/* Sticky note decorations */}
      {[
        { text: '💡 POO',       top: '12%', right: '6%',  bg: '#FFE566', rot:  8 },
        { text: '🐛 Debug',     top: '35%', left:  '2%',  bg: '#FFB3C6', rot: -6 },
        { text: '✅ Commit',    top: '65%', right: '5%',  bg: '#A8D8A8', rot:  4 },
      ].map((note, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [note.rot, note.rot + 2, note.rot] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', ...{ top: note.top, [note.right ? 'right' : 'left']: note.right || note.left },
            background: note.bg,
            border: '2px solid #1A1A1A',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
            borderRadius: '4px',
            padding: '6px 10px',
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 600,
            fontSize: '0.78rem',
            color: '#1A1A1A',
            transform: `rotate(${note.rot}deg)`,
            zIndex: 0,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {note.text}
        </motion.div>
      ))}

      <div className="container-game relative"
        style={{ display: 'flex', flexDirection: 'column', gap: '3rem', zIndex: 1 }}>

        {/* Title */}
        <SectionTitle inView={inView} />

        {/* ── UML Diagrams ── */}
        <SectionLabel emoji="📐" text="Diagramas UML" color="#1E88E5" bg="#EFF6FF" delay={0.12} inView={inView} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {UML_SYSTEMS.map((sys, i) => (
            <UMLCard key={sys.id} sys={sys} delay={0.15 + i * 0.1} inView={inView}
              onExpand={setExpandedUML} />
          ))}
        </div>

        {/* ── Tech Stack ── */}
        <SectionLabel emoji="⚙️" text="Stack Tecnológico" color="#A678CC" bg="#F8F4FF" delay={0.18} inView={inView} />

        <motion.div
          {...revealUp(0.22)}
          animate={inView ? revealUp(0.22).animate : revealUp(0.22).initial}
          style={{
            background: '#F5EEC8',
            border: '3px solid #1A1A1A',
            boxShadow: '5px 5px 0 #1A1A1A',
            borderRadius: '18px',
            padding: 'clamp(20px, 3vw, 32px)',
          }}
        >
          <TechBadges inView={inView} />
        </motion.div>

        {/* ── Features ── */}
        <SectionLabel emoji="🔧" text="Sistemas del Juego" color="#3DA35D" bg="#F2FFF5" delay={0.2} inView={inView} />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURES.map((feat, i) => (
            <FeatureCard key={feat.name} feat={feat} delay={0.22 + i * 0.07} inView={inView} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          {...revealUp(0.3)}
          animate={inView ? revealUp(0.3).animate : revealUp(0.3).initial}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            background: '#1A1A1A',
            border: '3px solid #1A1A1A',
            boxShadow: '5px 5px 0 #1E88E5',
            borderRadius: '14px',
            padding: '16px 28px',
            display: 'flex', alignItems: 'center', gap: '12px',
            maxWidth: '600px',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: '22px', flexShrink: 0 }}>💻</span>
            <p style={{
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              color: '#A8D4F5',
              lineHeight: 1.5,
              margin: 0,
            }}>
              "Todo el código fue escrito con{' '}
              <span style={{ color: '#FFE566' }}>C# y Unity 6</span>
              , aplicando{' '}
              <span style={{ color: '#A8D8A8' }}>POO y estructuras de datos</span>
              {' '}del curso universitario."
            </p>
          </div>
        </motion.div>

      </div>

      {/* Bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #A678CC 0px, #A678CC 30px, #A8D4F5 30px, #A8D4F5 60px, #1E88E5 60px, #1E88E5 90px)',
        opacity: 0.65,
      }} />

      {/* UML Modal */}
      {expandedUML && (
        <UMLModal sys={expandedUML} onClose={() => setExpandedUML(null)} />
      )}
    </section>
  )
}
