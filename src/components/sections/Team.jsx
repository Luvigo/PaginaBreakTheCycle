import { useRef } from 'react'
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
   TEAM DATA
══════════════════════════════════════════════════════════════════ */
const TEAM = [
  {
    name:    'Oscar Vélez',
    role:    'Lead · Unity Dev',
    desc:    'Arquitecto del proyecto. Diseñó la estructura del juego y coordinó el equipo.',
    color:   '#A678CC',
    bg:      '#F8F4FF',
    sticker: '👑',
    stickerBg: '#FFE566',
    tilt:    -2,
    avatar:  { skin: '#FDDCAC', hair: '#4A2C0A', shirt: '#A678CC', feature: 'smile' },
  },
  {
    name:    'Joel Trespalacios',
    role:    'Gameplay · Programming',
    desc:    'Desarrolló las mecánicas de juego y la lógica de los niveles Runner y Parkour.',
    color:   '#3DA35D',
    bg:      '#F2FFF5',
    sticker: '⚡',
    stickerBg: '#A8D8A8',
    tilt:    1.5,
    avatar:  { skin: '#FDDCAC', hair: '#1A1A1A', shirt: '#3DA35D', feature: 'glasses' },
  },
  {
    name:    'Jesús De León',
    role:    'VR · Unity Dev',
    desc:    'Implementó el nivel de realidad virtual y las interacciones inmersivas del Nivel 3.',
    color:   '#1E88E5',
    bg:      '#F0F8FF',
    sticker: '🥽',
    stickerBg: '#A8D4F5',
    tilt:    -1,
    avatar:  { skin: '#C68642', hair: '#1A1A1A', shirt: '#1E88E5', feature: 'sunglasses' },
  },
  {
    name:    'Maikel Ortiz',
    role:    'UI/UX · Design',
    desc:    'Diseñó la interfaz, experiencia de usuario y el estilo visual del juego.',
    color:   '#FF5757',
    bg:      '#FFF5F5',
    sticker: '🎨',
    stickerBg: '#FFB3C6',
    tilt:    2,
    avatar:  { skin: '#FDDCAC', hair: '#8B4513', shirt: '#FF5757', feature: 'smile' },
  },
  {
    name:    'Luis Villarreal',
    role:    'Systems · Data Structures',
    desc:    'Diseñó las estructuras de datos, sistemas del juego y la arquitectura de software.',
    color:   '#FF8C00',
    bg:      '#FFF8F0',
    sticker: '🧩',
    stickerBg: '#FFE566',
    tilt:    -1.5,
    avatar:  { skin: '#C68642', hair: '#1A1A1A', shirt: '#FF8C00', feature: 'cool' },
  },
  {
    name:    'Franklin Olivero',
    role:    'Testing · QA',
    desc:    'Realizó las pruebas del sistema, reportó bugs y verificó la calidad del producto final.',
    color:   '#00ACC1',
    bg:      '#F0FEFF',
    sticker: '🐛',
    stickerBg: '#C9A8E0',
    tilt:    1,
    avatar:  { skin: '#FDDCAC', hair: '#333', shirt: '#00ACC1', feature: 'happy' },
  },
]

/* ══════════════════════════════════════════════════════════════════
   TECH STACK
══════════════════════════════════════════════════════════════════ */
const TECH = [
  { label: 'Unity 6',    icon: '🎮', color: '#1A1A1A', bg: '#F5EEC8', desc: 'Motor de juego' },
  { label: 'C#',         icon: '💻', color: '#A678CC', bg: '#F8F4FF', desc: 'Lenguaje principal' },
  { label: 'VR / XR',   icon: '🥽', color: '#1E88E5', bg: '#F0F8FF', desc: 'Realidad Virtual' },
  { label: 'Git',        icon: '🌿', color: '#3DA35D', bg: '#F2FFF5', desc: 'Control de versiones' },
  { label: 'Trello',     icon: '📋', color: '#0079BF', bg: '#EBF5FF', desc: 'Gestión de proyecto' },
  { label: 'POO',        icon: '🧱', color: '#FF5757', bg: '#FFF5F5', desc: 'Prog. Orientada a Objetos' },
  { label: 'Estructuras de Datos', icon: '🗃️', color: '#FF8C00', bg: '#FFF8F0', desc: 'Listas, pilas, colas' },
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

/* Pixel avatar generator */
function PixelAvatar({ skin, hair, shirt, feature, size = 64 }) {
  return (
    <svg viewBox="0 0 32 36" width={size} height={size * 36/32}
      style={{ imageRendering: 'pixelated', display: 'block' }} aria-hidden="true">
      {/* Body/shirt */}
      <rect x="6"  y="24" width="20" height="12" fill={shirt} />
      {/* Collar */}
      <rect x="13" y="24" width="6"  height="4"  fill="rgba(255,255,255,0.3)" />
      {/* Neck */}
      <rect x="13" y="20" width="6"  height="5"  fill={skin} />
      {/* Head */}
      <rect x="8"  y="8"  width="16" height="14" fill={skin} />
      {/* Hair */}
      <rect x="7"  y="6"  width="18" height="5"  fill={hair} />
      <rect x="7"  y="8"  width="3"  height="6"  fill={hair} />
      <rect x="22" y="8"  width="3"  height="6"  fill={hair} />
      {/* Eyes */}
      {feature === 'sunglasses' ? (
        <>
          <rect x="10" y="13" width="5" height="3" fill="#1A1A1A" rx="1" />
          <rect x="17" y="13" width="5" height="3" fill="#1A1A1A" rx="1" />
          <rect x="15" y="14" width="2" height="1" fill="#555" />
        </>
      ) : feature === 'glasses' ? (
        <>
          <rect x="10" y="13" width="4" height="3" fill="none"
            stroke="#1A1A1A" strokeWidth="0.8" />
          <rect x="17" y="13" width="4" height="3" fill="none"
            stroke="#1A1A1A" strokeWidth="0.8" />
          <rect x="14" y="14" width="3" height="1" fill="#1A1A1A" />
          <rect x="11" y="14" width="2" height="1" fill="#1A1A1A" />
          <rect x="18" y="14" width="2" height="1" fill="#1A1A1A" />
        </>
      ) : (
        <>
          <rect x="11" y="13" width="3" height="3" fill="#1A1A1A" />
          <rect x="18" y="13" width="3" height="3" fill="#1A1A1A" />
          <rect x="12" y="13" width="1" height="1" fill="rgba(255,255,255,0.6)" />
          <rect x="19" y="13" width="1" height="1" fill="rgba(255,255,255,0.6)" />
        </>
      )}
      {/* Mouth */}
      {feature === 'happy' ? (
        <>
          <rect x="12" y="18" width="8" height="1" fill="#1A1A1A" />
          <rect x="11" y="17" width="2" height="2" fill="#1A1A1A" />
          <rect x="19" y="17" width="2" height="2" fill="#1A1A1A" />
        </>
      ) : feature === 'cool' ? (
        <rect x="13" y="18" width="6" height="1.5" fill="#1A1A1A" />
      ) : (
        <>
          <rect x="13" y="18" width="6" height="1"  fill="#1A1A1A" />
          <rect x="12" y="17" width="2" height="1"  fill="#1A1A1A" />
          <rect x="18" y="17" width="2" height="1"  fill="#1A1A1A" />
        </>
      )}
      {/* Cheeks */}
      <rect x="9"  y="16" width="3" height="2" fill="rgba(255,150,150,0.35)" />
      <rect x="20" y="16" width="3" height="2" fill="rgba(255,150,150,0.35)" />
      {/* Arms */}
      <rect x="2"  y="24" width="5"  height="8" fill={shirt} />
      <rect x="25" y="24" width="5"  height="8" fill={shirt} />
      <rect x="2"  y="30" width="5"  height="4" fill={skin} />
      <rect x="25" y="30" width="5"  height="4" fill={skin} />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════
   TEAM CARD  (polaroid / sticker style)
══════════════════════════════════════════════════════════════════ */
function TeamCard({ member, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: member.tilt * 0.5, filter: 'blur(4px)' }}
      animate={inView
        ? { opacity: 1, y: 0, rotate: member.tilt, filter: 'blur(0px)',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } }
        : { opacity: 0, y: 50, rotate: member.tilt * 0.5, filter: 'blur(4px)' }
      }
      whileHover={{
        y: -8, rotate: 0, scale: 1.03,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      style={{
        background: member.bg,
        border: '3px solid #1A1A1A',
        boxShadow: '5px 5px 0 #1A1A1A',
        borderRadius: '16px',
        padding: '20px 18px 22px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        position: 'relative',
        cursor: 'default',
        textAlign: 'center',
      }}
    >
      {/* Top color stripe (polaroid feel) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
        background: member.color, borderRadius: '13px 13px 0 0',
      }} />

      {/* Sticker */}
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
        style={{
          position: 'absolute', top: '10px', right: '10px',
          background: member.stickerBg,
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
          borderRadius: '50%',
          width: '30px', height: '30px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px',
          zIndex: 2,
        }}
      >
        {member.sticker}
      </motion.div>

      {/* Avatar */}
      <div style={{
        background: 'rgba(255,255,255,0.6)',
        border: `2.5px solid #1A1A1A`,
        borderRadius: '50%',
        padding: '10px',
        boxShadow: `0 0 0 3px ${member.color}30`,
        marginTop: '8px',
      }}>
        <PixelAvatar {...member.avatar} size={52} />
      </div>

      {/* Name */}
      <h4 style={{
        fontFamily: '"Fredoka", sans-serif',
        fontWeight: 700,
        fontSize: '1.1rem',
        color: '#1A1A1A',
        lineHeight: 1.1,
      }}>
        {member.name}
      </h4>

      {/* Role badge */}
      <div style={{
        background: member.color,
        border: '2px solid #1A1A1A',
        boxShadow: '2px 2px 0 #1A1A1A',
        borderRadius: '6px',
        padding: '3px 10px',
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '6.5px',
        color: '#fff',
        letterSpacing: '0.04em',
        lineHeight: 1.6,
        textAlign: 'center',
      }}>
        {member.role}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: '"Fredoka", sans-serif',
        fontSize: '0.83rem',
        color: 'rgba(26,26,26,0.68)',
        lineHeight: 1.55,
        textAlign: 'center',
      }}>
        {member.desc}
      </p>

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
        background: '#F5EEC8',
        border: '3px solid #1A1A1A',
        boxShadow: '6px 6px 0 #1A1A1A',
        borderRadius: '20px',
        padding: 'clamp(24px, 4vw, 36px)',
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

      {/* Tech badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {TECH.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView
              ? { opacity: 1, scale: 1,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.07 } }
              : { opacity: 0, scale: 0.7 }
            }
            whileHover={{ y: -4, scale: 1.06, transition: { duration: 0.18 } }}
            style={{
              background: t.bg,
              border: '2.5px solid #1A1A1A',
              boxShadow: '3px 3px 0 #1A1A1A',
              borderRadius: '12px',
              padding: '10px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'default',
              minWidth: '80px',
            }}
          >
            <span style={{ fontSize: '22px' }}>{t.icon}</span>
            <span style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '7px',
              color: t.color,
              letterSpacing: '0.04em',
              lineHeight: 1.5,
              textAlign: 'center',
            }}>
              {t.label}
            </span>
            <span style={{
              fontFamily: '"Fredoka", sans-serif',
              fontSize: '0.72rem',
              color: 'rgba(26,26,26,0.5)',
              textAlign: 'center',
              lineHeight: 1.3,
            }}>
              {t.desc}
            </span>
          </motion.div>
        ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
