import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { DocumentViewer } from '@/components/shared/DocumentViewerModal'

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
    href: '/docs/manual-usuario.pdf',
    view: 'pdf',
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
    href: '/docs/informe-tecnico.pdf',
    view: 'pdf',
    locked: false,
  },
  {
    id: 'uml',
    icon: '🗂️',
    title: 'Diagramas UML',
    desc: 'Diagramas de clases, secuencia y arquitectura del sistema.',
    tag: 'UML',
    tagColor: '#1E88E5',
    bgColor: '#F0F8FF',
    borderColor: '#1E88E5',
    href: null,
    view: 'uml',
    locked: false,
  },
  {
    id: 'ingenieria',
    icon: '⚙️',
    title: 'Manual de Ingeniería',
    desc: 'Documentación completa de ingeniería del software.',
    tag: 'PDF',
    tagColor: '#7B5EA7',
    bgColor: '#F8F4FF',
    borderColor: '#7B5EA7',
    href: '/docs/manual-ingenieria.pdf',
    view: 'pdf',
    locked: false,
  },
]

/** Acentos y decoración por card — sin cambiar estructura */
const DOC_PERSONALITY = {
  manual: {
    stripe: 'linear-gradient(90deg, #FF5757 0%, #FFB3C6 45%, #FF5757 100%)',
    glow: 'radial-gradient(ellipse 80% 70% at 100% 0%, rgba(255,87,87,0.14) 0%, transparent 60%)',
    iconBg: '#FFF8F8',
    iconBorder: '#FF5757',
    sticker: '✨',
    decorChar: '📌',
    decorPos: { bottom: 14, right: 14 },
    titleAccent: '#D84343',
    btnGradient: 'linear-gradient(175deg, #FF7070 0%, #FF5757 100%)',
  },
  informe: {
    stripe: 'linear-gradient(90deg, #3DA35D 0%, #A8D8A8 50%, #3DA35D 100%)',
    glow: 'radial-gradient(ellipse 75% 65% at 0% 100%, rgba(61,163,93,0.13) 0%, transparent 58%)',
    iconBg: '#F0FFF4',
    iconBorder: '#3DA35D',
    sticker: '📊',
    decorChar: '✓',
    decorPos: { bottom: 18, right: 16 },
    titleAccent: '#2E7D32',
    btnGradient: 'linear-gradient(175deg, #5CBF6A 0%, #3DA35D 100%)',
  },
  uml: {
    stripe: 'linear-gradient(90deg, #1E88E5 0%, #A8D4F5 48%, #1E88E5 100%)',
    glow: 'radial-gradient(ellipse 70% 60% at 100% 100%, rgba(30,136,229,0.12) 0%, transparent 55%)',
    iconBg: '#F5FAFF',
    iconBorder: '#1E88E5',
    sticker: '◆',
    decorChar: '⬡',
    decorPos: { bottom: 18, right: 16 },
    titleAccent: '#1565C0',
    btnGradient: 'linear-gradient(175deg, #42A5F5 0%, #1E88E5 100%)',
  },
  ingenieria: {
    stripe: 'linear-gradient(90deg, #7B5EA7 0%, #C9A8E0 48%, #7B5EA7 100%)',
    glow: 'radial-gradient(ellipse 75% 65% at 0% 100%, rgba(123,94,167,0.13) 0%, transparent 58%)',
    iconBg: '#F3EEFF',
    iconBorder: '#7B5EA7',
    sticker: '⚙️',
    decorChar: '⟨⟩',
    decorPos: { bottom: 18, right: 16 },
    titleAccent: '#5E35A8',
    btnGradient: 'linear-gradient(175deg, #9B7BC8 0%, #7B5EA7 100%)',
  },
}

const GAME_DOWNLOAD_URL = 'https://github.com/odvelez/BreaktheCycle/releases/download/v1.0.0/BreakTheCycle.zip'
const WEB_GAME_URL = 'https://odvelez.itch.io/break-the-cycle'

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

const DL_LEVELS = [
  { icon: '🏃', label: 'Huida', tone: '#FF5757' },
  { icon: '🧗', label: 'Superación', tone: '#3DA35D' },
  { icon: '🥽', label: 'VR', tone: '#1E88E5' },
]

const DL_PARTICLES = [
  { top: '18%', right: '14%', size: 3, color: '#FFE566', delay: 0 },
  { top: '32%', right: '24%', size: 2, color: '#C9A8E0', delay: 0.6 },
  { top: '54%', right: '12%', size: 2, color: '#fff',    delay: 1.1 },
  { top: '70%', right: '20%', size: 3, color: '#FF5757', delay: 0.4 },
]

const CTA_SHADOW_REST = '0 4px 18px rgba(166,120,204,0.45), 0 0 0 1px rgba(255,255,255,0.12), 4px 4px 0 rgba(26,26,26,0.32), inset 0 1px 0 rgba(255,255,255,0.35)'
const CTA_SHADOW_PULSE = '0 8px 30px rgba(166,120,204,0.62), 0 0 28px rgba(201,168,224,0.28), 5px 5px 0 rgba(26,26,26,0.38), inset 0 1px 0 rgba(255,255,255,0.45)'
const CTA_SHADOW_HOVER = '0 14px 40px rgba(166,120,204,0.72), 0 0 36px rgba(255,229,102,0.12), 6px 6px 0 rgba(26,26,26,0.42), inset 0 1px 0 rgba(255,255,255,0.5)'

function DownloadCTAButton() {
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.3, 0.58, 0.3], scale: [0.96, 1.05, 0.96] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-12px -16px',
          borderRadius: 18,
          background: 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(167,120,204,0.55) 0%, rgba(124,77,255,0.18) 50%, transparent 72%)',
          filter: 'blur(16px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <motion.a
        href={GAME_DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        animate={{
          scale: [1, 1.012, 1],
          boxShadow: [CTA_SHADOW_REST, CTA_SHADOW_PULSE, CTA_SHADOW_REST],
        }}
        transition={{
          scale: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          boxShadow: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{
          y: -4,
          scale: 1.025,
          boxShadow: CTA_SHADOW_HOVER,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
        whileTap={{ y: 1, scale: 0.985, boxShadow: CTA_SHADOW_REST }}
        style={{
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'linear-gradient(135deg, #B48AD4 0%, #A678CC 40%, #7C4DFF 100%)',
          border: '2.5px solid #fff',
          borderRadius: 12,
          padding: '12px 26px',
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 700,
          fontSize: '1.02rem',
          color: '#fff',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          cursor: 'pointer',
          textShadow: '0 1px 2px rgba(26,26,26,0.2)',
        }}
      >
        <motion.span
          aria-hidden="true"
          animate={{ x: ['-130%', '230%'] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 1.8,
          }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '42%',
            background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.28) 48%, transparent 100%)',
            pointerEvents: 'none',
            transform: 'skewX(-14deg)',
          }}
        />

        <motion.span
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 18, lineHeight: 1, position: 'relative', zIndex: 1 }}
          aria-hidden="true"
        >
          ⬇️
        </motion.span>
        <span style={{ position: 'relative', zIndex: 1 }}>Descargar Juego</span>
      </motion.a>
    </div>
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
        background: 'linear-gradient(128deg, #1A0A2E 0%, #2D1060 42%, #241050 72%, #1A1A2E 100%)',
        position: 'relative',
        transition: 'box-shadow 0.2s, transform 0.2s',
        transform: hovered ? 'translate(-2px,-2px)' : 'translate(0,0)',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Grid + scanlines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(166,120,204,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(166,120,204,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(90deg, black 0%, black 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 55%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.2,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
        }}
      />

      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-20%', right: '-5%',
        width: '55%', height: '90%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 70% 40%, rgba(166,120,204,0.45) 0%, transparent 68%)',
        filter: 'blur(24px)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-15%', left: '0%',
        width: '40%', height: '60%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(255,229,102,0.2) 0%, transparent 70%)',
        filter: 'blur(32px)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(105deg, rgba(0,0,0,0.15) 0%, transparent 45%, rgba(167,120,204,0.08) 100%)',
      }} />

      {/* Partículas derecha */}
      {DL_PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          animate={{ y: [0, -6, 0], opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 3.2 + i * 0.35, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          style={{
            position: 'absolute',
            top: p.top,
            right: p.right,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      <div
        className="relative z-[1] w-full box-border"
        style={{
          padding: 'clamp(24px, 3.5vw, 40px)',
        }}
      >
        <div
          className="grid items-center justify-items-center w-full max-w-[72rem] mx-auto
            gap-x-[clamp(20px,3vw,32px)] gap-y-[clamp(18px,2.5vw,24px)]
            grid-cols-1 md:grid-cols-[auto_1fr]
            lg:grid-cols-[minmax(88px,auto)_minmax(0,1fr)_minmax(188px,216px)]"
        >
        {/* Columna izquierda — icono */}
        <div className="flex flex-col items-center gap-3 w-full md:w-auto justify-self-center md:justify-self-start">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PixelPC size={68} />
          </motion.div>
          <div style={{
            background: '#4CAF50',
            border: '2px solid #fff',
            borderRadius: '100px',
            padding: '3px 12px',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '7px',
            color: '#fff',
            letterSpacing: '0.05em',
            boxShadow: '0 0 10px rgba(76,175,80,0.45)',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A5D6A7' }} />
            DISPONIBLE
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1.5px solid rgba(255,255,255,0.22)',
            borderRadius: '7px',
            padding: '3px 10px',
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.68)',
          }}>
            🖥️ Windows · PC
          </div>
        </div>

        {/* Centro — copy + CTA */}
        <div className="min-w-0 w-full justify-self-stretch">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{
              background: '#A678CC',
              border: '2px solid rgba(255,255,255,0.28)',
              borderRadius: 7,
              padding: '3px 10px',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 7,
              color: '#fff',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.28)',
            }}>
              v1.0.0
            </span>
            <span style={{
              fontFamily: '"Fredoka", sans-serif',
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.42)',
            }}>
              UnderRise Studio · 2026
            </span>
          </div>

          <h3 style={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.35rem, 2.8vw, 1.95rem)',
            color: '#fff',
            lineHeight: 1.12,
            marginBottom: 10,
          }}>
            Break The Cycle
            <span style={{ display: 'block', color: '#C9A8E0', fontSize: '0.62em', fontWeight: 500, marginTop: 4 }}>
              Windows Edition
            </span>
          </h3>

          <p style={{
            fontFamily: '"Fredoka", sans-serif',
            fontSize: 'clamp(0.88rem, 1.5vw, 0.95rem)',
            color: 'rgba(255,255,255,0.62)',
            lineHeight: 1.55,
            marginBottom: 18,
            maxWidth: '36rem',
          }}>
            Descarga la versión oficial del juego para PC. Incluye los 3 niveles completos: Huida, Superación y Enfrentamiento VR.
          </p>

          <DownloadCTAButton />
        </div>

        {/* Derecha — panel gamer / profundidad */}
        <div
          className="hidden lg:flex flex-col gap-2.5 w-full max-w-[216px] justify-self-center"
          style={{ position: 'relative' }}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box',
            background: 'rgba(255,255,255,0.07)',
            border: '2px solid rgba(255,255,255,0.14)',
            borderRadius: 14,
            padding: '16px 14px 14px',
            backdropFilter: 'blur(6px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 6px 20px rgba(0,0,0,0.18)',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 22,
              height: 22,
              borderTop: '2px solid rgba(201,168,224,0.55)',
              borderRight: '2px solid rgba(201,168,224,0.55)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              width: 22,
              height: 22,
              borderBottom: '2px solid rgba(201,168,224,0.4)',
              borderLeft: '2px solid rgba(201,168,224,0.4)',
              pointerEvents: 'none',
            }} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: 12,
              paddingRight: 2,
            }}>
              <span style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 6,
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.1em',
                flexShrink: 0,
              }}>
                CONTENIDO
              </span>
              <motion.span
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: '#FFE566',
                  border: '2px solid #1A1A1A',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  boxShadow: '2px 2px 0 #1A1A1A',
                }}
              >
                🎮
              </motion.span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DL_LEVELS.map((lv) => (
                <div
                  key={lv.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '7px 10px',
                    borderRadius: 8,
                    background: 'rgba(0,0,0,0.22)',
                    border: `1px solid ${lv.tone}44`,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{lv.icon}</span>
                  <span style={{
                    fontFamily: '"Fredoka", sans-serif',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    color: '#fff',
                    flex: 1,
                  }}>
                    {lv.label}
                  </span>
                  <PixelStar color={lv.tone} size={9} />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 5,
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 5.5,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.08em',
              }}>
                <span>PROGRESO</span>
                <span>3 / 3</span>
              </div>
              <div style={{
                height: 5,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                  style={{
                    height: '100%',
                    width: '100%',
                    transformOrigin: 'left center',
                    background: 'linear-gradient(90deg, #A678CC, #FFE566)',
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: 6,
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
            paddingTop: 2,
          }}>
            {['Indie', 'Empático', 'Universitario'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: 100,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Móvil/tablet — chips compactos bajo CTA */}
        <div className="flex lg:hidden flex-wrap gap-2 justify-center md:col-span-2 w-full">
          {DL_LEVELS.map((lv) => (
            <span
              key={lv.label}
              style={{
                fontFamily: '"Fredoka", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid ${lv.tone}55`,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {lv.icon} {lv.label}
            </span>
          ))}
        </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   DOCUMENTATION CARD
══════════════════════════════════════════════════════════════════ */
function DocCardAccent({ docId, color }) {
  if (docId === 'uml') {
    return (
      <svg
        viewBox="0 0 48 32"
        width={40}
        height={26}
        aria-hidden="true"
        style={{ position: 'absolute', top: 36, left: 12, opacity: 0.2 }}
      >
        <rect x="2" y="4" width="18" height="12" fill="none" stroke={color} strokeWidth="1.5" rx="2" />
        <rect x="26" y="16" width="18" height="12" fill="none" stroke={color} strokeWidth="1.5" rx="2" />
        <line x1="20" y1="10" x2="26" y2="22" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    )
  }
  if (docId === 'informe') {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 40,
          left: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          opacity: 0.22,
        }}
      >
        {[28, 36, 22].map((w, i) => (
          <div key={i} style={{ width: w, height: 3, borderRadius: 2, background: color }} />
        ))}
      </div>
    )
  }
  if (docId === 'manual') {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 38,
          left: 10,
          width: 36,
          height: 28,
          border: `2px solid ${color}`,
          borderRadius: 3,
          opacity: 0.18,
          borderLeftWidth: 5,
        }}
      />
    )
  }
  if (docId === 'ingenieria') {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 42,
          left: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          opacity: 0.2,
          fontFamily: 'monospace',
          fontSize: 9,
          fontWeight: 700,
          color,
          letterSpacing: '0.05em',
        }}
      >
        <span>{'{ }'}</span>
        <span>{'< />'}</span>
      </div>
    )
  }
  return null
}

function DocCard({ doc, delay, inView }) {
  const [hovered, setHovered] = useState(false)
  const [viewer, setViewer] = useState(null)
  const p = DOC_PERSONALITY[doc.id] ?? DOC_PERSONALITY.manual

  const openDocument = () => {
    if (doc.view === 'uml') {
      setViewer({ type: 'uml' })
      return
    }
    if (doc.href) {
      setViewer({
        type: 'pdf',
        url: doc.href,
        title: doc.title,
        accent: doc.borderColor,
      })
    }
  }

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
          background: doc.bgColor,
          border: '3px solid #CCC',
          boxShadow: '4px 4px 0 #CCC',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          padding: '22px',
          display: 'flex', flexDirection: 'column', gap: '10px',
          opacity: 0.88,
        }}
      >
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: p.glow, pointerEvents: 'none' }}
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 6,
          background: 'repeating-linear-gradient(45deg, #FFE566 0px, #FFE566 8px, #1A1A1A 8px, #1A1A1A 16px)',
          opacity: 0.55,
        }} />

        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
          <div style={{
            background: p.iconBg,
            border: `2.5px solid ${p.iconBorder}`,
            borderRadius: 10,
            padding: '6px 8px',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.12)',
          }}>
            <span style={{ fontSize: 26, filter: 'grayscale(0.45)', display: 'block' }}>{doc.icon}</span>
          </div>
          <div style={{
            background: '#666',
            border: '2px solid #999',
            borderRadius: 6,
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
          color: p.titleAccent,
          lineHeight: 1.2,
          position: 'relative',
          zIndex: 1,
        }}>
          {doc.title}
        </h4>
        <p style={{
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.85rem',
          color: 'rgba(100,100,100,0.7)',
          lineHeight: 1.5,
          position: 'relative',
          zIndex: 1,
        }}>
          {doc.desc}
        </p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#E0E0E0',
          border: '2px solid #CCC',
          borderRadius: 9,
          padding: '9px 16px',
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 600,
          fontSize: '0.88rem',
          color: '#AAA',
          cursor: 'not-allowed',
          marginTop: 4,
          width: 'fit-content',
          position: 'relative',
          zIndex: 1,
        }}>
          <span>🚧</span>
          Próximamente
        </div>

        <motion.span
          aria-hidden="true"
          animate={{ rotate: [0, 12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            ...p.decorPos,
            fontSize: 16,
            opacity: 0.35,
            pointerEvents: 'none',
          }}
        >
          {p.sticker}
        </motion.span>
      </motion.div>
    )
  }

  return (
    <>
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
        border: '3px solid #1A1A1A',
        boxShadow: hovered ? '6px 6px 0 #1A1A1A' : '4px 4px 0 #1A1A1A',
        borderRadius: '16px',
        padding: '22px',
        display: 'flex', flexDirection: 'column', gap: '10px',
        transition: 'box-shadow 0.18s, transform 0.18s',
        transform: hovered ? 'translate(-2px,-2px)' : 'translate(0,0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: p.glow, pointerEvents: 'none' }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 5,
        background: p.stripe,
      }} />
      <DocCardAccent docId={doc.id} color={doc.borderColor} />

      <div style={{
        marginTop: 6,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          animate={hovered ? { y: -4, rotate: -6 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background: p.iconBg,
            border: `2.5px solid ${p.iconBorder}`,
            borderRadius: 12,
            padding: '7px 9px',
            boxShadow: hovered ? '3px 3px 0 #1A1A1A' : '2px 2px 0 #1A1A1A',
          }}
        >
          <span style={{ fontSize: 28, display: 'block', lineHeight: 1 }}>{doc.icon}</span>
        </motion.div>
        <div style={{
          background: doc.tagColor,
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
          borderRadius: 6,
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
        color: p.titleAccent,
        lineHeight: 1.2,
        position: 'relative',
        zIndex: 1,
      }}>
        {doc.title}
      </h4>
      <div
        aria-hidden="true"
        style={{
          width: '2.5rem',
          height: 3,
          borderRadius: 2,
          background: doc.borderColor,
          opacity: 0.45,
          marginTop: -6,
        }}
      />
      <p style={{
        fontFamily: '"Fredoka", sans-serif',
        fontSize: '0.85rem',
        color: 'rgba(26,26,26,0.68)',
        lineHeight: 1.55,
        flex: 1,
        position: 'relative',
        zIndex: 1,
      }}>
        {doc.desc}
      </p>

      <motion.button
        type="button"
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={openDocument}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          background: p.btnGradient,
          border: '2px solid #1A1A1A',
          boxShadow: hovered ? '4px 4px 0 #1A1A1A' : '3px 3px 0 #1A1A1A',
          borderRadius: 9,
          padding: '9px 16px',
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 600,
          fontSize: '0.88rem',
          color: '#fff',
          cursor: 'pointer',
          marginTop: 4,
          width: 'fit-content',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span>{doc.view === 'uml' ? '🔍' : '📥'}</span>
        Ver documento
      </motion.button>

      <motion.span
        aria-hidden="true"
        animate={hovered ? { y: 1, scale: 1.08 } : { y: [0, 2, 0] }}
        transition={hovered
          ? { duration: 0.2 }
          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{
          position: 'absolute',
          ...p.decorPos,
          fontSize: 15,
          lineHeight: 1,
          opacity: hovered ? 0.7 : 0.45,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {p.sticker}
      </motion.span>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: p.decorPos.bottom ?? 18,
          right: (p.decorPos.right ?? 16) + 26,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 8,
          color: doc.borderColor,
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      >
        {p.decorChar}
      </span>
    </motion.div>

    <DocumentViewer view={viewer} onClose={() => setViewer(null)} />
    </>
  )
}

const WEB_TEASERS = [
  { icon: '⚡', label: 'Sin instalación' },
  { icon: '🌍', label: 'HTML5 en itch.io' },
  { icon: '🎮', label: 'Misma experiencia' },
]

const WEB_PARTICLES = [
  { top: '22%', right: '8%', size: 3, color: '#A8D4F5', delay: 0 },
  { top: '55%', right: '18%', size: 2, color: '#A678CC', delay: 0.8 },
  { top: '38%', right: '4%', size: 2, color: '#FFE566', delay: 1.4 },
]

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
        position: 'relative',
        background: 'linear-gradient(128deg, #F0F8FF 0%, #E6F2FF 45%, #F5FBFF 100%)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 70% at 88% 40%, rgba(168,212,245,0.35) 0%, transparent 65%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 40% 50% at 12% 80%, rgba(166,120,204,0.1) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
          backgroundImage: 'radial-gradient(circle, rgba(30,136,229,0.12) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 55%, black 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 55%, black 100%)',
        }}
      />

      {WEB_PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          animate={{ y: [0, -5, 0], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          style={{
            position: 'absolute',
            top: p.top,
            right: p.right,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* Top bar */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, #F8F4E8 0%, #F5EEC8 100%)',
        borderBottom: '3px solid #1A1A1A',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['#A8D4F5', '#FFE566', '#A8D8A8'].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, border: '1.5px solid #1A1A1A' }} />
          ))}
        </div>
        <span style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '7.5px',
          color: '#1A1A1A',
          letterSpacing: '0.06em',
        }}>
          🌐 WEB VERSION
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: '#4CAF50',
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
          borderRadius: 6,
          padding: '3px 10px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '6.5px',
          color: '#fff',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A5D6A7', display: 'inline-block' }} />
          DISPONIBLE
        </div>
      </div>

      {/* Body */}
      <div
        className="relative z-[2] w-full box-border"
        style={{ padding: 'clamp(22px, 3vw, 32px)' }}
      >
        <div
          className="grid w-full max-w-[72rem] mx-auto items-start
            gap-x-[clamp(16px,2.5vw,28px)] gap-y-[clamp(14px,2vw,22px)]
            grid-cols-1
            sm:grid-cols-[72px_minmax(0,1fr)]
            lg:grid-cols-[72px_minmax(0,1fr)_minmax(200px,220px)]"
        >
        {/* Browser */}
        <div
          className="flex justify-center sm:justify-start sm:items-start"
          style={{ position: 'relative' }}
        >
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.4, 0.65, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: '-8px -10px',
              borderRadius: 14,
              background: 'radial-gradient(circle, rgba(30,136,229,0.22) 0%, transparent 70%)',
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'relative' }}
          >
            <svg viewBox="0 0 56 44" width={68} height={53}
              style={{ imageRendering: 'pixelated', display: 'block' }} aria-hidden="true">
              <rect x="0" y="0" width="56" height="44" fill="#1A1A1A" rx="3" />
              <rect x="2" y="2" width="52" height="40" fill="#A8D4F5" rx="2" />
              <rect x="2" y="2" width="52" height="8" fill="#F5EEC8" />
              <rect x="4" y="4" width="4" height="4" fill="#FF5757" rx="1" />
              <rect x="10" y="4" width="4" height="4" fill="#FFE566" rx="1" />
              <rect x="16" y="4" width="4" height="4" fill="#A8D8A8" rx="1" />
              <rect x="24" y="3" width="28" height="5" fill="#E0D8C0" rx="2" />
              <rect x="4" y="12" width="48" height="28" fill="#DCEEFF" />
              <polygon points="24,18 34,24 24,30" fill="#1E88E5" />
              <polygon points="24,18 34,24 24,30" fill="none" stroke="#1A1A1A" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>

        {/* Copy + progreso */}
        <div className="min-w-0 w-full justify-self-stretch">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#A8D4F5',
            border: '2px solid #1A1A1A',
            boxShadow: '2px 2px 0 #1A1A1A',
            borderRadius: 6,
            padding: '3px 10px',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 7,
            color: '#1A1A1A',
            marginBottom: 10,
          }}>
            🌐 NAVEGADOR
          </div>

          <h3 style={{
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
            color: '#1A1A1A',
            lineHeight: 1.12,
            marginBottom: 6,
          }}>
            Juega desde tu navegador
          </h3>

          <p style={{
            fontFamily: '"Patrick Hand", cursive',
            fontSize: '1.05rem',
            color: 'rgba(30,136,229,0.85)',
            marginBottom: 8,
            lineHeight: 1.3,
          }}>
            Ya puedes jugar la build web en itch.io ✦
          </p>

          <p style={{
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '0.9rem',
            color: 'rgba(26,26,26,0.62)',
            lineHeight: 1.55,
            marginBottom: 14,
            maxWidth: '28rem',
          }}>
            Se abre en itch.io en una pestaña nueva. Pulsa «Run game» y listo.
          </p>

          <div style={{ marginBottom: 16, maxWidth: 300 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 5,
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 5.5,
              color: 'rgba(26,26,26,0.45)',
              letterSpacing: '0.06em',
            }}>
              <span>VERSIÓN WEB</span>
              <span>PUBLICADA</span>
            </div>
            <div style={{
              height: 6,
              borderRadius: 4,
              background: 'rgba(26,26,26,0.08)',
              border: '1.5px solid rgba(26,26,26,0.12)',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                style={{
                  height: '100%',
                  width: '100%',
                  transformOrigin: 'left center',
                  background: 'linear-gradient(90deg, #1E88E5, #58D68D)',
                  borderRadius: 3,
                }}
              />
            </div>
          </div>

          <motion.a
            href={WEB_GAME_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.03, boxShadow: '5px 5px 0 #1A1A1A' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              background: 'linear-gradient(175deg, #42A5F5 0%, #1E88E5 100%)',
              border: '2.5px solid #1A1A1A',
              boxShadow: '3px 3px 0 #1A1A1A',
              borderRadius: 11,
              padding: '12px 28px',
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#fff',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <svg viewBox="0 0 16 16" width={18} height={18} aria-hidden="true">
              <polygon points="5,3 13,8 5,13" fill="#fff" />
            </svg>
            Jugar ahora
          </motion.a>
        </div>

        {/* Panel derecho — anticipación */}
        <div
          className="hidden lg:flex flex-col gap-2.5 w-full max-w-[220px] justify-self-end"
          style={{
            background: 'rgba(255,255,255,0.45)',
            border: '2px solid rgba(26,26,26,0.12)',
            borderRadius: 14,
            padding: '14px 14px 12px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 3px 3px 0 rgba(26,26,26,0.06)',
            boxSizing: 'border-box',
          }}
        >
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 6,
            color: 'rgba(26,26,26,0.4)',
            letterSpacing: '0.1em',
            marginBottom: 4,
          }}>
            LISTO PARA JUGAR
          </span>
          {WEB_TEASERS.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, x: 8 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
              transition={{ delay: 0.45 + i * 0.08, duration: 0.5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 10px',
                borderRadius: 8,
                background: 'rgba(168,212,245,0.25)',
                border: '1px solid rgba(30,136,229,0.2)',
              }}
            >
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              <span style={{
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 600,
                fontSize: '0.8rem',
                color: 'rgba(26,26,26,0.75)',
              }}>
                {t.label}
              </span>
            </motion.div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
            <PixelStar color="#1E88E5" size={11} />
          </div>
        </div>

        {/* Teasers móvil / tablet */}
        <div className="flex lg:hidden flex-wrap gap-2 justify-center sm:justify-start col-span-full sm:col-span-2">
          {WEB_TEASERS.map((t) => (
            <span
              key={t.label}
              style={{
                fontFamily: '"Fredoka", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 100,
                background: 'rgba(168,212,245,0.35)',
                border: '1px solid rgba(30,136,229,0.25)',
                color: 'rgba(26,26,26,0.7)',
              }}
            >
              {t.icon} {t.label}
            </span>
          ))}
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
