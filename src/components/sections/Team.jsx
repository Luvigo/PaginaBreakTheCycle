import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import fotoOscar from '@/assets/team/oscar.jpeg'
import fotoLuis from '@/assets/team/luis.jpeg'
import fotoJesus from '@/assets/team/jesus.jpeg'
import fotoFranklin from '@/assets/team/franklin.jpeg'
import fotoJoel from '@/assets/team/joel.jpeg'
import fotoMaikel from '@/assets/team/maikel.jpeg'

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
   TEAM DATA
══════════════════════════════════════════════════════════════════ */
const TEAM = [
  {
    name:    'Oscar Vélez',
    role:    'Gerente',
    desc:    'Coordina el proyecto y la visión general del juego Break The Cycle.',
    color:   '#A678CC',
    bg:      '#F8F4FF',
    sticker: '👑',
    stickerBg: '#FFE566',
    tilt:    -2,
    photo:   fotoOscar,
  },
  {
    name:    'Luis Villarreal',
    role:    'Dir. Diseño',
    desc:    'Dirige el diseño visual, la identidad y la coherencia estética del proyecto.',
    color:   '#FF8C00',
    bg:      '#FFF8F0',
    sticker: '🧩',
    stickerBg: '#FFE566',
    tilt:    -1.5,
    photo:   fotoLuis,
  },
  {
    name:    'Jesús De León',
    role:    'Dir. Documentación',
    desc:    'Responsable de la documentación técnica y del material del proyecto.',
    color:   '#1E88E5',
    bg:      '#F0F8FF',
    sticker: '📄',
    stickerBg: '#A8D4F5',
    tilt:    -1,
    photo:   fotoJesus,
  },
  {
    name:    'Franklin Olivero',
    role:    'Dir. Pruebas',
    desc:    'Dirige las pruebas del sistema, reporte de bugs y calidad del producto.',
    color:   '#00ACC1',
    bg:      '#F0FEFF',
    sticker: '🐛',
    stickerBg: '#C9A8E0',
    tilt:    1,
    photo:   fotoFranklin,
  },
  {
    name:    'Joel Trespalacios',
    role:    'Dir. UI/UX',
    desc:    'Dirige la interfaz, la experiencia de usuario y la usabilidad del juego.',
    color:   '#3DA35D',
    bg:      '#F2FFF5',
    sticker: '🎨',
    stickerBg: '#A8D8A8',
    tilt:    1.5,
    photo:   fotoJoel,
  },
  {
    name:    'Maikel Ortiz',
    role:    'Diseñador de Niveles',
    desc:    'Diseña y construye los niveles del juego (Runner, Parkour y entornos).',
    color:   '#FF5757',
    bg:      '#FFF5F5',
    sticker: '🗺️',
    stickerBg: '#FFB3C6',
    tilt:    2,
    photo:   fotoMaikel,
  },
]

/* ══════════════════════════════════════════════════════════════════
   TECH STACK
══════════════════════════════════════════════════════════════════ */
const TECH = [
  { label: 'Unity 6',    icon: '🎮', color: '#1A1A1A', bg: '#FFFFFF', desc: 'Motor de juego' },
  { label: 'C#',         icon: '💻', color: '#A678CC', bg: '#F8F4FF', desc: 'Lenguaje principal' },
  { label: 'VR / XR',   icon: '🥽', color: '#1E88E5', bg: '#F0F8FF', desc: 'Realidad Virtual' },
  { label: 'Git',        icon: '🌿', color: '#3DA35D', bg: '#F2FFF5', desc: 'Control de versiones' },
  { label: 'Planner Teams', icon: '📋', color: '#464EB8', bg: '#EBF5FF', desc: 'Gestión de proyecto' },
  { label: 'POO',        icon: '🧱', color: '#FF5757', bg: '#FFF5F5', desc: 'Prog. Orientada a Objetos' },
  { label: 'Estructuras de Datos', icon: '🗃️', color: '#FF8C00', bg: '#FFF8F0', desc: 'Archivos, listas enlazadas y dobles' },
]

/* ══════════════════════════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════════════════════════ */
const TIMELINE = [
  { icon: '💡', label: 'Idea',       desc: 'La chispa inicial en el aula', color: '#FFE566' },
  { icon: '⚙️', label: 'Desarrollo', desc: 'Unity, C# y muchas noches',    color: '#A678CC' },
  { icon: '🧪', label: 'Testing',    desc: 'Bugs, pruebas y correcciones',  color: '#FF5757' },
  { icon: '🎪', label: 'Feria',      desc: 'Presentación universitaria',    color: '#3DA35D' },
  { icon: '🚀', label: 'Lanzamiento',desc: '¡Break The Cycle está vivo!',   color: '#1E88E5' },
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
   TEAM CARD  (polaroid / sticker style)
══════════════════════════════════════════════════════════════════ */
const CARD_SPRING = { type: 'spring', stiffness: 420, damping: 28, mass: 0.9 }

function TeamCard({ member, delay, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: member.tilt * 0.5, filter: 'blur(4px)' }}
      animate={inView
        ? {
            opacity: 1,
            y: hovered ? -4 : 0,
            rotate: hovered ? member.tilt * 0.55 : member.tilt,
            scale: hovered ? 1.012 : 1,
            filter: 'blur(0px)',
            boxShadow: hovered
              ? `7px 9px 0 #1A1A1A, 0 14px 32px ${member.color}2e`
              : '5px 5px 0 #1A1A1A',
          }
        : { opacity: 0, y: 50, rotate: member.tilt * 0.5, filter: 'blur(4px)' }
      }
      transition={{
        opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        filter: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        y: CARD_SPRING,
        rotate: CARD_SPRING,
        scale: CARD_SPRING,
        boxShadow: { duration: 0.22, ease: 'easeOut' },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.992, y: -1, transition: { duration: 0.1 } }}
      style={{
        background: member.bg,
        border: '3px solid #1A1A1A',
        borderRadius: '16px',
        height: '100%',
        padding: '18px 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '7px',
        position: 'relative',
        cursor: 'default',
        textAlign: 'center',
        willChange: 'transform',
      }}
    >
      {/* Top color stripe (polaroid feel) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
        background: member.color, borderRadius: '13px 13px 0 0',
      }} />

      {/* Sticker */}
      <motion.div
        animate={hovered
          ? { y: -8, rotate: 7, scale: 1.1 }
          : { y: [0, -3, 0], rotate: [-3, 3, -3], scale: 1 }
        }
        transition={hovered
          ? { type: 'spring', stiffness: 480, damping: 24 }
          : {
              y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 },
              rotate: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 },
              scale: { duration: 0.2 },
            }
        }
        style={{
          position: 'absolute', top: '10px', right: '10px',
          background: member.stickerBg,
          border: '2px solid #1A1A1A',
          boxShadow: hovered ? '3px 4px 0 #1A1A1A' : '2px 2px 0 #1A1A1A',
          borderRadius: '50%',
          width: '30px', height: '30px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px',
          zIndex: 2,
        }}
      >
        {member.sticker}
      </motion.div>

      {/* Foto */}
      <motion.div
        animate={{
          y: hovered ? -2 : 0,
          scale: hovered ? 1.04 : 1,
        }}
        transition={CARD_SPRING}
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2.5px solid #1A1A1A',
          boxShadow: hovered
            ? `0 0 0 3px ${member.color}45, 0 6px 16px ${member.color}28`
            : `0 0 0 3px ${member.color}30`,
          marginTop: '6px',
          flexShrink: 0,
          background: '#fff',
        }}
      >
        <img
          src={member.photo}
          alt={member.name}
          width={72}
          height={72}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Name */}
      <h4 style={{
        fontFamily: '"Fredoka", sans-serif',
        fontWeight: 700,
        fontSize: '1.08rem',
        color: '#1A1A1A',
        lineHeight: 1.15,
        margin: 0,
      }}>
        {member.name}
      </h4>

      {/* Role badge */}
      <motion.div
        animate={{ y: hovered ? -1 : 0 }}
        transition={CARD_SPRING}
        style={{
          background: member.color,
          border: '2px solid #1A1A1A',
          boxShadow: hovered ? '3px 3px 0 #1A1A1A' : '2px 2px 0 #1A1A1A',
          borderRadius: '6px',
          padding: '2px 9px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '6.5px',
          color: '#fff',
          letterSpacing: '0.04em',
          lineHeight: 1.5,
          textAlign: 'center',
        }}
      >
        {member.role}
      </motion.div>

      {/* Description — bloque flexible para uniformidad en grid */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        minHeight: '2.75em',
        padding: '2px 2px 6px',
        marginTop: '1px',
      }}>
        <p style={{
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.8125rem',
          color: 'rgba(26,26,26,0.68)',
          lineHeight: 1.42,
          textAlign: 'center',
          margin: 0,
          width: '100%',
          maxWidth: '17.5rem',
        }}>
          {member.desc}
        </p>
      </div>

      {/* Bottom pixel line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
        background: `repeating-linear-gradient(90deg, ${member.color} 0px, ${member.color} 6px, transparent 6px, transparent 12px)`,
        opacity: 0.35,
        borderRadius: '0 0 13px 13px',
      }} />
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAKING OF  (tech stack)
══════════════════════════════════════════════════════════════════ */
function MakingOf({ inView }) {
  return (
    <motion.div
      {...revealUp(0.2)}
      animate={inView ? revealUp(0.2).animate : revealUp(0.2).initial}
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#F5EEC8',
        border: '3px solid #1A1A1A',
        boxShadow: '6px 6px 0 #1A1A1A',
        borderRadius: '20px',
        padding: 'clamp(24px, 4vw, 36px)',
        overflow: 'visible',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px', flexWrap: 'wrap' }}>
        <div style={{
          background: '#1A1A1A',
          border: '2px solid #1A1A1A',
          borderRadius: '8px',
          padding: '4px 12px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '8px',
          color: '#FFE566',
          letterSpacing: '0.05em',
        }}>
          ⚙️ MAKING OF
        </div>
        <div style={{ flex: 1, height: '2px', background: 'repeating-linear-gradient(90deg, #1A1A1A 0px, #1A1A1A 5px, transparent 5px, transparent 11px)', opacity: 0.15 }} />
      </div>

      <h3 style={{
        fontFamily: '"Fredoka", sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
        color: '#1A1A1A',
        marginBottom: '8px',
      }}>
        Cómo nació Break The Cycle
      </h3>
      <p style={{
        fontFamily: '"Fredoka", sans-serif',
        fontSize: '0.95rem',
        color: 'rgba(26,26,26,0.65)',
        lineHeight: 1.6,
        marginBottom: '24px',
        maxWidth: '580px',
      }}>
        Un proyecto universitario construido desde cero con pasión, código y mucha colaboración.
      </p>

      {/* Tech badges — 7 en una fila */}
      <div
        className="w-full"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '4px 10px 10px 4px',
          marginRight: '-6px',
          marginBottom: '-6px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gap: '8px',
            width: '100%',
          }}
        >
          {TECH.map((t, i) => {
            const longLabel = t.label.length > 12
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView
                  ? { opacity: 1, scale: 1,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.07 } }
                  : { opacity: 0, scale: 0.7 }
                }
                whileHover={{
                  filter: 'brightness(1.05)',
                  boxShadow: '4px 5px 0 #1A1A1A',
                  zIndex: 2,
                  transition: { duration: 0.18, ease: 'easeOut' },
                }}
                style={{
                  position: 'relative',
                  background: t.bg,
                  border: '2.5px solid #1A1A1A',
                  boxShadow: '3px 3px 0 #1A1A1A',
                  borderRadius: '12px',
                  padding: '8px 6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '3px',
                  cursor: 'default',
                  minWidth: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: 1 }}>{t.icon}</span>
                <span style={{
                  fontFamily: longLabel ? '"Fredoka", sans-serif' : '"Press Start 2P", monospace',
                  fontWeight: longLabel ? 700 : 400,
                  fontSize: longLabel ? '0.62rem' : '6.5px',
                  color: t.color,
                  letterSpacing: longLabel ? '0' : '0.04em',
                  lineHeight: 1.35,
                  textAlign: 'center',
                  width: '100%',
                }}>
                  {t.label}
                </span>
                <span style={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontSize: '0.65rem',
                  color: 'rgba(26,26,26,0.5)',
                  textAlign: 'center',
                  lineHeight: 1.25,
                  width: '100%',
                }}>
                  {t.desc}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MINI TIMELINE
══════════════════════════════════════════════════════════════════ */
function MiniTimeline({ inView }) {
  return (
    <motion.div
      {...revealUp(0.25)}
      animate={inView ? revealUp(0.25).animate : revealUp(0.25).initial}
    >
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{
          background: '#A678CC',
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
          borderRadius: '8px',
          padding: '4px 12px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '8px',
          color: '#fff',
          letterSpacing: '0.05em',
        }}>
          🗺️ EL CAMINO
        </div>
        <div style={{ flex: 1, height: '2px', background: 'repeating-linear-gradient(90deg, #A678CC 0px, #A678CC 5px, transparent 5px, transparent 11px)', opacity: 0.2 }} />
      </div>

      {/* Desktop timeline */}
      <div className="hidden sm:flex" style={{ alignItems: 'flex-start', position: 'relative' }}>
        {/* Path line */}
        <div style={{
          position: 'absolute',
          top: '28px',
          left: '10%', right: '10%',
          height: '4px',
          background: 'repeating-linear-gradient(90deg, #C9A8E0 0px, #C9A8E0 14px, transparent 14px, transparent 24px)',
          zIndex: 0,
        }} />

        {TIMELINE.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView
              ? { opacity: 1, y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.1 } }
              : { opacity: 0, y: 20 }
            }
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Node */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              style={{
                width: '56px', height: '56px',
                background: step.color,
                border: '3px solid #1A1A1A',
                boxShadow: '3px 3px 0 #1A1A1A',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px',
              }}
            >
              {step.icon}
            </motion.div>
            {/* Label */}
            <span style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '7px',
              color: '#1A1A1A',
              letterSpacing: '0.04em',
              textAlign: 'center',
              lineHeight: 1.5,
            }}>
              {step.label}
            </span>
            {/* Description */}
            <span style={{
              fontFamily: '"Fredoka", sans-serif',
              fontSize: '0.78rem',
              color: 'rgba(26,26,26,0.58)',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '90px',
            }}>
              {step.desc}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Mobile timeline (vertical) */}
      <div className="flex sm:hidden flex-col gap-0" style={{ position: 'relative', paddingLeft: '36px' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: '18px', top: '28px', bottom: '28px', width: '4px',
          background: 'repeating-linear-gradient(to bottom, #C9A8E0 0px, #C9A8E0 10px, transparent 10px, transparent 18px)',
          zIndex: 0,
        }} />

        {TIMELINE.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -20 }}
            animate={inView
              ? { opacity: 1, x: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.1 } }
              : { opacity: 0, x: -20 }
            }
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              position: 'relative', zIndex: 1,
              paddingBottom: i < TIMELINE.length - 1 ? '24px' : '0',
            }}
          >
            {/* Node */}
            <div style={{
              width: '40px', height: '40px', flexShrink: 0,
              background: step.color,
              border: '2.5px solid #1A1A1A',
              boxShadow: '2px 2px 0 #1A1A1A',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '17px',
              position: 'absolute', left: '-36px',
            }}>
              {step.icon}
            </div>
            <div>
              <span style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '7px', color: '#1A1A1A',
                letterSpacing: '0.04em', display: 'block', marginBottom: '4px',
              }}>
                {step.label}
              </span>
              <span style={{
                fontFamily: '"Fredoka", sans-serif',
                fontSize: '0.85rem', color: 'rgba(26,26,26,0.6)',
              }}>
                {step.desc}
              </span>
            </div>
          </motion.div>
        ))}
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
          background: '#FFE566',
          border: '2px solid #1A1A1A',
          boxShadow: '3px 3px 0 #1A1A1A',
          borderRadius: '100px',
          padding: '5px 16px',
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.85rem', fontWeight: 600, color: '#1A1A1A',
        }}
      >
        <PixelStar color="#FF5757" size={10} />
        El Equipo
        <PixelStar color="#FF5757" size={10} />
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
        Conoce a{' '}
        <span style={{ color: '#FFE566', WebkitTextStroke: '1.5px #1A1A1A', paintOrder: 'stroke fill' }}>
          UnderRise
        </span>
        {' '}Studio
      </motion.h2>

      <motion.div
        {...revealUp(0.15)}
        animate={inView ? revealUp(0.15).animate : revealUp(0.15).initial}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 240 12" width={240} height={12} aria-hidden="true">
          <path d="M4 8 Q32 2 60 8 Q88 14 116 8 Q144 2 172 8 Q200 14 236 6"
            fill="none" stroke="#FFE566" strokeWidth="3.5" strokeLinecap="round" />
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
          Un equipo universitario que transformó una idea en una experiencia interactiva contra el bullying.
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
export default function Team() {
  const { ref, inView } = useReveal(0.08)

  return (
    <section
      id="team"
      ref={ref}
      className="relative section-spacing overflow-hidden"
      style={{ background: '#FFFBEF' }}
    >
      {/* Top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #FFE566 0px, #FFE566 30px, #FFB3C6 30px, #FFB3C6 60px, #A8D8A8 60px, #A8D8A8 90px, #C9A8E0 90px, #C9A8E0 120px)',
        opacity: 0.7,
      }} />

      {/* Dot background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,229,102,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Floating stars */}
      {[
        { top: '5%',  left: '3%',  color: '#FFE566', size: 14, delay: 0 },
        { top: '10%', right: '4%', color: '#FF5757', size: 11, delay: 0.6 },
        { top: '68%', left: '2%',  color: '#A678CC', size: 12, delay: 1.2 },
        { top: '76%', right: '3%', color: '#3DA35D', size: 13, delay: 0.9 },
        { top: '40%', left: '1%',  color: '#A8D4F5', size: 10, delay: 1.8 },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          style={{ position: 'absolute', ...s, pointerEvents: 'none', zIndex: 0 }}
          aria-hidden="true"
        >
          <PixelStar color={s.color} size={s.size} />
        </motion.div>
      ))}

      <div className="container-game relative"
        style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', zIndex: 1 }}>

        {/* Title */}
        <SectionTitle inView={inView} />

        {/* Team cards — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={0.08 + i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Studio tagline */}
        <motion.div
          {...revealUp(0.22)}
          animate={inView ? revealUp(0.22).animate : revealUp(0.22).initial}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '14px', flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: '#1A1A1A', opacity: 0.08, maxWidth: '140px' }} />
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: '#1A1A1A',
            borderRadius: '100px',
            padding: '8px 20px',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
          }}>
            <span style={{ fontSize: '20px' }}>🎮</span>
            <span style={{
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              color: '#FFE566',
              letterSpacing: '0.03em',
            }}>
              UnderRise Studio · Universidad del Norte
            </span>
          </div>
          <div style={{ flex: 1, height: '1px', background: '#1A1A1A', opacity: 0.08, maxWidth: '140px' }} />
        </motion.div>

        {/* Making of */}
        <MakingOf inView={inView} />

        {/* Timeline */}
        <MiniTimeline inView={inView} />

      </div>

      {/* Bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #C9A8E0 0px, #C9A8E0 30px, #FFE566 30px, #FFE566 60px, #A8D8A8 60px, #A8D8A8 90px, #FFB3C6 90px, #FFB3C6 120px)',
        opacity: 0.7,
      }} />
    </section>
  )
}
