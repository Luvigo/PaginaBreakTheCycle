import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import nivel1Img from '@/assets/images/Nivel1.png'
import nivel2Img from '@/assets/images/Nivel2.png'
import nivel3Img from '@/assets/images/Level3.png'

/* ══════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
══════════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px', amount: threshold })
  return { ref, inView }
}

const revealUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40, filter: 'blur(4px)' },
  animate:    { opacity: 1, y: 0,  filter: 'blur(0px)' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

/* ══════════════════════════════════════════════════════════════════
   LEVEL DATA
══════════════════════════════════════════════════════════════════ */
const LEVELS = [
  {
    num: '01',
    tag: 'NIVEL 1',
    title: 'HUIDA',
    tagline: 'Corre. Esquiva. Sobrevive.',
    desc: 'El jugador corre, esquiva obstáculos y sobrevive mientras es perseguido. Representa la ansiedad y la presión social.',
    color: '#FF5757',
    bgCard: '#FFF5F5',
    bgScene: '#FFE4E4',
    accent: '#FFB3B3',
    tags: ['Velocidad', 'Tensión', 'Supervivencia'],
    mapIcon: '🏃',
    sticker: '⚡',
    stickerBg: '#FFE566',
  },
  {
    num: '02',
    tag: 'NIVEL 2',
    title: 'SUPERACIÓN',
    tagline: 'Aprende. Adapta. Avanza.',
    desc: 'El jugador aprende a adaptarse y superar obstáculos mediante precisión, control y determinación.',
    color: '#3DA35D',
    bgCard: '#F2FFF5',
    bgScene: '#DCFFE8',
    accent: '#A8D8A8',
    tags: ['Progreso', 'Control', 'Evolución'],
    mapIcon: '🧗',
    sticker: '🌱',
    stickerBg: '#C9A8E0',
  },
  {
    num: '03',
    tag: 'NIVEL 3',
    title: 'ENFRENTAMIENTO',
    tagline: 'Enfrenta. Rompe. Libérate.',
    desc: 'En realidad virtual, el jugador enfrenta directamente el bullying y rompe el ciclo desde la valentía.',
    color: '#A678CC',
    bgCard: '#F8F4FF',
    bgScene: '#EDE8FF',
    accent: '#C9A8E0',
    tags: ['Valentía', 'VR', 'Libertad'],
    mapIcon: '🥽',
    sticker: '✨',
    stickerBg: '#FFB3C6',
  },
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

const LEVEL_IMAGES = [nivel1Img, nivel2Img, nivel3Img]

/* ══════════════════════════════════════════════════════════════════
   PROGRESS MAP — pixel path connecting the 3 levels
══════════════════════════════════════════════════════════════════ */
function ProgressMap({ inView }) {
  const nodes = [
    { icon: '🏃', label: 'HUIDA',          color: '#FF5757', done: true  },
    { icon: '🧗', label: 'SUPERACIÓN',     color: '#3DA35D', done: false },
    { icon: '🥽', label: 'ENFRENTAMIENTO', color: '#A678CC', done: false },
  ]

  return (
    <motion.div
      {...revealUp(0.22)}
      animate={inView ? revealUp(0.22).animate : revealUp(0.22).initial}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div style={{
        background: '#F5EEC8',
        border: '3px solid #1A1A1A',
        boxShadow: '5px 5px 0 #1A1A1A',
        borderRadius: '16px',
        padding: '18px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        maxWidth: '560px',
        width: '100%',
      }}>
        {nodes.map((node, i) => (
          <div key={node.label} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? '1' : 'none' }}>
            {/* Node */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                style={{
                  width: '46px', height: '46px',
                  background: node.color,
                  border: '2.5px solid #1A1A1A',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px',
                  boxShadow: '3px 3px 0 #1A1A1A',
                  cursor: 'default',
                }}
              >
                {node.icon}
              </motion.div>
              <span style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '6px',
                color: node.color,
                letterSpacing: '0.04em',
                textAlign: 'center',
                lineHeight: 1.4,
                maxWidth: '72px',
              }}>
                {node.label}
              </span>
            </div>

            {/* Connector path */}
            {i < 2 && (
              <div style={{ flex: 1, height: '20px', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                <svg viewBox="0 0 80 16" width="100%" height="16" aria-hidden="true">
                  {/* Dashed road */}
                  <rect x="0" y="6" width="80" height="4" fill="#E8D8A0" rx="2" />
                  {/* Dashes */}
                  {[0,1,2,3].map(j => (
                    <rect key={j} x={10 + j * 16} y="7" width="8" height="2" fill="#1A1A1A" opacity="0.25" rx="1" />
                  ))}
                  {/* Arrow tip */}
                  <path d="M70 4 L78 8 L70 12" fill="none"
                    stroke={nodes[i + 1].color} strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   CONNECTORS (between cards)
══════════════════════════════════════════════════════════════════ */
function HConnector({ color }) {
  return (
    <div style={{
      width: '52px', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingTop: '110px', /* align with card midpoint */
    }}>
      <svg viewBox="0 0 52 20" width={52} height={20} aria-hidden="true">
        {[0,1,2,3].map(i => (
          <circle key={i} cx={6 + i * 10} cy={10} r="3" fill={color}
            opacity={i % 2 === 0 ? 0.9 : 0.55} />
        ))}
        <path d="M42 5 L50 10 L42 15" fill="none" stroke={color}
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function VConnector({ color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg viewBox="0 0 20 50" width={20} height={50} aria-hidden="true">
        {[0,1,2,3].map(i => (
          <circle key={i} cx={10} cy={5 + i * 11} r="3" fill={color}
            opacity={i % 2 === 0 ? 0.9 : 0.55} />
        ))}
        <path d="M5 44 L10 50 L15 44" fill="none" stroke={color}
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   LEVEL CARD
══════════════════════════════════════════════════════════════════ */
function LevelCard({ level, index, inView }) {
  const img   = LEVEL_IMAGES[index]
  const delay = 0.1 + index * 0.15

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
      animate={inView
        ? { opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } }
        : { opacity: 0, y: 50, filter: 'blur(4px)' }
      }
      whileHover={{ y: -7, transition: { duration: 0.28, ease: 'easeOut' } }}
      style={{
        background: level.bgCard,
        border: '3px solid #1A1A1A',
        boxShadow: '5px 5px 0 #1A1A1A',
        borderRadius: '18px',
        overflow: 'hidden',
        flex: 1,
        minWidth: 0,
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Screenshot area ── */}
      <div style={{
        position: 'relative',
        background: level.bgScene,
        borderBottom: '3px solid #1A1A1A',
        overflow: 'hidden',
        aspectRatio: '16 / 9',
        flexShrink: 0,
      }}>
        <img
          src={img}
          alt={`Captura del ${level.tag}: ${level.title}`}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            imageRendering: 'pixelated',
          }}
        />

        {/* Number badge */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px', zIndex: 2,
          background: level.color,
          border: '2.5px solid #1A1A1A',
          boxShadow: '3px 3px 0 #1A1A1A',
          borderRadius: '8px',
          padding: '4px 11px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '10px',
          color: '#fff',
          lineHeight: 1.4,
        }}>
          {level.num}
        </div>

        {/* Floating sticker */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
          style={{
            position: 'absolute', top: '9px', right: '10px', zIndex: 2,
            background: level.stickerBg,
            border: '2px solid #1A1A1A',
            boxShadow: '2px 2px 0 #1A1A1A',
            borderRadius: '50%',
            width: '34px', height: '34px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '17px',
          }}
        >
          {level.sticker}
        </motion.div>

        {/* Bottom pixel stripe */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px',
          background: `repeating-linear-gradient(90deg, ${level.color} 0px, ${level.color} 8px, transparent 8px, transparent 16px)`,
          opacity: 0.45,
        }} />
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Level tag pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          background: level.color,
          border: '2px solid #1A1A1A',
          borderRadius: '6px',
          padding: '3px 10px',
          marginBottom: '11px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '7.5px',
          color: '#fff',
          letterSpacing: '0.04em',
          boxShadow: '2px 2px 0 #1A1A1A',
          width: 'fit-content',
        }}>
          {level.tag}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1.55rem, 2.6vw, 2.1rem)',
          color: level.color,
          WebkitTextStroke: '1px #1A1A1A',
          paintOrder: 'stroke fill',
          lineHeight: 1.05,
          marginBottom: '5px',
        }}>
          {level.title}
        </h3>

        {/* Tagline */}
        <p style={{
          fontFamily: '"Patrick Hand", cursive',
          fontSize: '0.85rem',
          color: 'rgba(26,26,26,0.52)',
          marginBottom: '12px',
          fontStyle: 'italic',
          letterSpacing: '0.01em',
        }}>
          {level.tagline}
        </p>

        {/* Description */}
        <p style={{
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.93rem',
          color: 'rgba(26,26,26,0.78)',
          lineHeight: 1.65,
          marginBottom: '18px',
          flex: 1,
        }}>
          {level.desc}
        </p>

        {/* Gameplay tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {level.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
              style={{
                fontFamily: '"Fredoka", sans-serif',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: level.color,
                background: level.bgScene,
                border: `2px solid ${level.color}`,
                borderRadius: '7px',
                padding: '3px 11px',
                letterSpacing: '0.02em',
                cursor: 'default',
                boxShadow: `2px 2px 0 ${level.color}40`,
              }}
            >
              {tag}
            </motion.span>
          ))}
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
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: '1rem', width: '100%',
    }}>
      {/* Badge */}
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
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#1A1A1A',
        }}
      >
        <PixelStar color="#FF5757" size={10} />
        Los Niveles
        <PixelStar color="#FF5757" size={10} />
      </motion.div>

      {/* Title */}
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
        Una aventura en{' '}
        <span style={{
          color: '#A678CC',
          WebkitTextStroke: '1.5px #1A1A1A',
          paintOrder: 'stroke fill',
        }}>
          3 etapas
        </span>
      </motion.h2>

      {/* Doodle underline */}
      <motion.div
        {...revealUp(0.15)}
        animate={inView ? revealUp(0.15).animate : revealUp(0.15).initial}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 220 12" width={220} height={12} aria-hidden="true">
          <path d="M4 8 Q30 2 55 8 Q80 14 105 8 Q130 2 155 8 Q180 14 216 6"
            fill="none" stroke="#FFE566" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Subtitle */}
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
          maxWidth: '36rem',
          textAlign: 'center',
          width: '100%',
        }}>
          Cada nivel representa una etapa emocional del proceso de superación.
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
export default function Levels() {
  const { ref, inView } = useReveal(0.1)

  return (
    <section
      id="levels"
      ref={ref}
      className="relative section-spacing overflow-hidden"
      style={{ background: '#F5F0FF' }}
    >
      {/* Rainbow top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #FF5757 0px, #FF5757 40px, #FFE566 40px, #FFE566 80px, #3DA35D 80px, #3DA35D 120px, #A678CC 120px, #A678CC 160px)',
        opacity: 0.65,
      }} />

      {/* Subtle dot background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(166,120,204,0.1) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Floating pixel stars */}
      {[
        { top: '8%',  left: '4%',  color: '#FF5757', size: 14, delay: 0 },
        { top: '15%', right: '5%', color: '#FFE566', size: 12, delay: 0.6 },
        { top: '70%', left: '2%',  color: '#3DA35D', size: 10, delay: 1.2 },
        { top: '80%', right: '3%', color: '#A678CC', size: 14, delay: 0.9 },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
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

        {/* Progress map */}
        <ProgressMap inView={inView} />

        {/* ── Desktop: 3 columns + connectors ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}
          className="hidden lg:flex">
          <LevelCard level={LEVELS[0]} index={0} inView={inView} />
          <HConnector color={LEVELS[0].color} />
          <LevelCard level={LEVELS[1]} index={1} inView={inView} />
          <HConnector color={LEVELS[1].color} />
          <LevelCard level={LEVELS[2]} index={2} inView={inView} />
        </div>

        {/* ── Mobile / tablet: stacked ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          className="flex lg:hidden">
          <LevelCard level={LEVELS[0]} index={0} inView={inView} />
          <VConnector color={LEVELS[0].color} />
          <LevelCard level={LEVELS[1]} index={1} inView={inView} />
          <VConnector color={LEVELS[1].color} />
          <LevelCard level={LEVELS[2]} index={2} inView={inView} />
        </div>

      </div>

      {/* Rainbow bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #A678CC 0px, #A678CC 40px, #3DA35D 40px, #3DA35D 80px, #FFE566 80px, #FFE566 120px, #FF5757 120px, #FF5757 160px)',
        opacity: 0.65,
      }} />
    </section>
  )
}
