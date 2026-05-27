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

/** Bordes y sombras — negro suavizado (menos duro que 3px #1A1A1A pleno) */
const L_BORDER      = '2px solid rgba(26,26,26,0.82)'
const L_BORDER_MED  = '2px solid rgba(26,26,26,0.72)'
const L_SHADOW      = '4px 4px 0 rgba(26,26,26,0.7)'
const L_SHADOW_SM   = '3px 3px 0 rgba(26,26,26,0.65)'

/* ══════════════════════════════════════════════════════════════════
   LEVEL DATA
══════════════════════════════════════════════════════════════════ */
const LEVELS = [
  {
    num: '01',
    tag: 'NIVEL 1',
    title: 'HUIDA',
    tagline: 'Corre. Esquiva. Sobrevive.',
    desc: 'El jugador corre, esquiva obstáculos y sobrevive bajo persecución, como metáfora de la ansiedad y la presión social.',
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
   PROGRESS MAP — journey / progression system
══════════════════════════════════════════════════════════════════ */
function ProgressMap({ inView }) {
  const nodes = [
    { icon: '🏃', label: 'HUIDA',          color: '#FF5757', done: true  },
    { icon: '🧗', label: 'SUPERACIÓN',     color: '#3DA35D', done: false },
    { icon: '🥽', label: 'ENFRENTAMIENTO', color: '#A678CC', done: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 28, filter: 'blur(4px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '0 0.25rem' }}
    >
      <motion.div
        animate={{ y: [0, -2.5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          background: 'linear-gradient(180deg, #FFF8E7 0%, #F5EEC8 55%, #F0E9B8 100%)',
          border: L_BORDER,
          borderRadius: '18px',
          boxShadow: `${L_SHADOW}, 0 10px 28px rgba(26,26,26,0.07)`,
          padding: '12px clamp(16px, 4vw, 30px) 14px',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '5px',
            borderRadius: '13px',
            border: '1.5px dashed rgba(26,26,26,0.11)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '12%',
            right: '12%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
            pointerEvents: 'none',
          }}
        />

        <p
          style={{
            position: 'relative',
            margin: '0 0 10px',
            textAlign: 'center',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '6.5px',
            letterSpacing: '0.14em',
            color: 'rgba(123,79,160,0.55)',
          }}
        >
          ✦ TU CAMINO ✦
        </p>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {nodes.map((node, i) => (
            <div
              key={node.label}
              style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? '1' : 'none', minWidth: 0 }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  flexShrink: 0,
                  padding: '0 2px',
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView
                    ? {
                        scale: node.done ? [1, 1.06, 1] : [1, 1.04, 1],
                        opacity: 1,
                        boxShadow: node.done
                          ? [
                              '3px 3px 0 #1A1A1A, 0 0 10px rgba(255,87,87,0.35)',
                              '3px 3px 0 #1A1A1A, 0 0 16px rgba(255,87,87,0.5)',
                              '3px 3px 0 #1A1A1A, 0 0 10px rgba(255,87,87,0.35)',
                            ]
                          : '3px 3px 0 #1A1A1A',
                      }
                    : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    scale:   { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.65 },
                    boxShadow: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.65 },
                    default: { delay: 0.38 + i * 0.12, type: 'spring', stiffness: 260, damping: 16 },
                  }}
                  whileHover={{
                    y: -2,
                    scale: 1.07,
                    boxShadow: `3px 3px 0 #1A1A1A, 0 0 14px ${node.color}42`,
                    transition: { type: 'spring', stiffness: 400, damping: 20 },
                  }}
                  style={{
                    position: 'relative',
                    width: '48px',
                    height: '48px',
                    background: node.color,
                    border: L_BORDER_MED,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    cursor: 'default',
                    opacity: node.done ? 1 : 0.92,
                    boxShadow: L_SHADOW_SM,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: '3px',
                      borderRadius: '50%',
                      boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.35)',
                      pointerEvents: 'none',
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1 }}>{node.icon}</span>
                </motion.div>

                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                  transition={{ delay: 0.48 + i * 0.1, duration: 0.45 }}
                  style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: '6px',
                    color: node.color,
                    letterSpacing: '0.04em',
                    textAlign: 'center',
                    lineHeight: 1.45,
                    maxWidth: '76px',
                    opacity: node.done ? 1 : 0.88,
                  }}
                >
                  {node.label}
                </motion.span>
              </div>

              {i < 2 && (
                <div style={{ flex: 1, height: '20px', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                  <svg viewBox="0 0 80 16" width="100%" height={16} aria-hidden="true">
                    <rect x="0" y="6" width="80" height="4" fill="#E8D8A0" rx="2" />
                    {[0, 1, 2, 3].map((j) => (
                      <rect key={j} x={10 + j * 16} y="7" width="8" height="2" fill="#1A1A1A" opacity="0.25" rx="1" />
                    ))}
                    <path
                      d="M70 4 L78 8 L70 12"
                      fill="none"
                      stroke={nodes[i + 1].color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   CONNECTORS (between cards)
══════════════════════════════════════════════════════════════════ */
/** Ritmo compartido del cuerpo de card — alinea título, texto y tags entre niveles */
const LEVEL_CARD_LAYOUT = {
  bodyPadding: '14px 18px 16px',
  titleMinHeight: '2.05em',
  taglineMinHeight: '1.1rem',
  tagsMinHeight: '1.85rem',
  viewportRatio: '16 / 9',
}

function HConnector({ color }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '52px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <svg viewBox="0 0 52 20" width={52} height={20}>
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={6 + i * 10}
            cy={10}
            r="3"
            fill={color}
            opacity={i % 2 === 0 ? 0.9 : 0.55}
          />
        ))}
        <path
          d="M42 5 L50 10 L42 15"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   GAMEPLAY VIEWPORT — marco arcade / HUD sutil
══════════════════════════════════════════════════════════════════ */
const HUD_CORNERS = ['tl', 'tr', 'bl', 'br']

function HudCorner({ corner, color }) {
  const base = {
    position: 'absolute',
    width: '11px',
    height: '11px',
    zIndex: 4,
    pointerEvents: 'none',
    opacity: 0.72,
    borderColor: color,
    borderStyle: 'solid',
  }
  const map = {
    tl: { top: 13, left: 13, borderWidth: '2px 0 0 2px' },
    tr: { top: 13, right: 13, borderWidth: '2px 2px 0 0' },
    bl: { bottom: 13, left: 13, borderWidth: '0 0 2px 2px' },
    br: { bottom: 13, right: 13, borderWidth: '0 2px 2px 0' },
  }
  return <span aria-hidden="true" style={{ ...base, ...map[corner] }} />
}

function LevelGameplayViewport({ src, alt, color, bgScene, stripeColor, children }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minWidth: 0,
        aspectRatio: LEVEL_CARD_LAYOUT.viewportRatio,
        flex: '0 0 auto',
        flexShrink: 0,
        background: `linear-gradient(180deg, #14141a 0%, ${bgScene} 120%)`,
        borderBottom: L_BORDER,
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-15%',
          background: `radial-gradient(ellipse 72% 62% at 50% 42%, ${color}20, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: '7px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: L_BORDER_MED,
          background: '#08080c',
          boxShadow: `
            inset 0 0 0 1px rgba(255,255,255,0.09),
            inset 0 0 32px rgba(0,0,0,0.22),
            0 0 16px ${color}14
          `,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            imageRendering: 'pixelated',
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.024) 2px, rgba(0,0,0,0.024) 4px)',
            opacity: 0.85,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 94% 88% at 50% 48%, transparent 52%, rgba(0,0,0,0.16) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            background:
              'linear-gradient(140deg, rgba(255,255,255,0.055) 0%, transparent 40%, transparent 68%, rgba(0,0,0,0.05) 100%)',
          }}
        />
      </div>

      {HUD_CORNERS.map((corner) => (
        <HudCorner key={corner} corner={corner} color={color} />
      ))}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 7,
          left: 7,
          right: 7,
          height: '1px',
          zIndex: 3,
          background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '5px',
          zIndex: 3,
          background: `repeating-linear-gradient(90deg, ${stripeColor} 0px, ${stripeColor} 8px, transparent 8px, transparent 16px)`,
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />

      {children}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   GAMEPLAY TAGS — pixel pills con microinteracción
══════════════════════════════════════════════════════════════════ */
function LevelGameplayTag({ tag, color, bgScene, tilt, tagIndex, cardDelay, inView }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 7, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 7, scale: 0.94 }}
      transition={{
        delay: cardDelay + 0.55 + tagIndex * 0.07,
        type: 'spring',
        stiffness: 280,
        damping: 18,
      }}
      whileHover={{
        y: -2,
        scale: 1.042,
        rotate: tilt,
        boxShadow: `3px 3px 0 rgba(26,26,26,0.78), 0 0 14px ${color}34, inset 0 1px 0 rgba(255,255,255,0.62)`,
        transition: { type: 'spring', stiffness: 420, damping: 20 },
      }}
      whileTap={{
        y: -1,
        scale: 0.985,
        rotate: tilt * 0.45,
        transition: { type: 'spring', stiffness: 500, damping: 22 },
      }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: '"Fredoka", sans-serif',
        fontSize: '0.78rem',
        fontWeight: 600,
        color,
        background: bgScene,
        border: '2px solid #1A1A1A',
        borderRadius: '7px',
        padding: '3px 11px 4px',
        letterSpacing: '0.02em',
        lineHeight: 1.2,
        cursor: 'default',
        boxShadow: `2px 2px 0 rgba(26,26,26,0.72), inset 0 1px 0 rgba(255,255,255,0.52)`,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '5px',
          right: '5px',
          top: '2px',
          height: '1px',
          borderRadius: '1px',
          background: `linear-gradient(90deg, transparent, ${color}50, transparent)`,
          opacity: 0.75,
          pointerEvents: 'none',
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '5px',
          boxShadow: `inset 0 -2px 0 ${color}22`,
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{tag}</span>
    </motion.span>
  )
}

/* ══════════════════════════════════════════════════════════════════
   LEVEL CARD
══════════════════════════════════════════════════════════════════ */
function LevelCard({ level, index, inView }) {
  const img   = LEVEL_IMAGES[index]
  const cardDelay   = 0.1 + index * 0.15
  const compactDesc = index === 0

  return (
    <motion.div
      className="w-full shrink-0 min-w-[260px] sm:min-w-0 sm:shrink"
      initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
      animate={inView
        ? { opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: cardDelay } }
        : { opacity: 0, y: 50, filter: 'blur(4px)' }
      }
      whileHover={{ y: -7, transition: { duration: 0.28, ease: 'easeOut' } }}
      style={{
        background: level.bgCard,
        border: L_BORDER,
        boxShadow: L_SHADOW,
        borderRadius: '18px',
        overflow: 'hidden',
        flex: '1 1 0',
        alignSelf: 'stretch',
        minWidth: 0,
        width: '100%',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LevelGameplayViewport
        src={img}
        alt={`Captura del ${level.tag}: ${level.title}`}
        color={level.color}
        bgScene={level.bgScene}
        stripeColor={level.color}
      >
        {/* Number badge */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px', zIndex: 5,
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
            position: 'absolute', top: '9px', right: '10px', zIndex: 5,
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

        {/* Tiny HUD — gameplay indicator */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '14px',
            left: '14px',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '2px 7px 3px',
            background: 'rgba(10,10,14,0.55)',
            border: '1.5px solid rgba(26,26,26,0.65)',
            borderRadius: '4px',
            backdropFilter: 'blur(2px)',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: level.color,
              boxShadow: `0 0 6px ${level.color}`,
            }}
          />
          <span
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '5px',
              color: 'rgba(255,255,255,0.88)',
              letterSpacing: '0.08em',
            }}
          >
            PLAY
          </span>
        </div>
      </LevelGameplayViewport>

      {/* ── Card body — columnas iguales: cabecera fija, desc flexible, tags al fondo ── */}
      <div style={{
        padding: LEVEL_CARD_LAYOUT.bodyPadding,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
      }}>
        <div style={{ flexShrink: 0 }}>
          {/* Level tag pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            background: level.color,
            border: '2px solid #1A1A1A',
            borderRadius: '6px',
            padding: '2px 9px',
            marginBottom: '7px',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '7.5px',
            color: '#fff',
            letterSpacing: '0.04em',
            boxShadow: '2px 2px 0 #1A1A1A',
            width: 'fit-content',
            minHeight: '1.35rem',
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
            margin: '0 0 3px',
            minHeight: LEVEL_CARD_LAYOUT.titleMinHeight,
          }}>
            {level.title}
          </h3>

          {/* Tagline */}
          <p style={{
            fontFamily: '"Patrick Hand", cursive',
            fontSize: '0.82rem',
            color: 'rgba(26,26,26,0.52)',
            margin: '0 0 8px',
            fontStyle: 'italic',
            letterSpacing: '0.01em',
            lineHeight: 1.28,
            minHeight: LEVEL_CARD_LAYOUT.taglineMinHeight,
          }}>
            {level.tagline}
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: '"Fredoka", sans-serif',
          fontSize: compactDesc ? '0.88rem' : '0.9rem',
          color: 'rgba(26,26,26,0.78)',
          lineHeight: compactDesc ? 1.48 : 1.54,
          letterSpacing: compactDesc ? '-0.008em' : '0',
          margin: 0,
          flex: '0 1 auto',
          textWrap: 'pretty',
        }}>
          {level.desc}
        </p>

        {/* Gameplay tags — baseline compartida entre cards */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          marginTop: '10px',
          flexShrink: 0,
          minHeight: LEVEL_CARD_LAYOUT.tagsMinHeight,
          alignItems: 'flex-end',
        }}>
          {level.tags.map((tag, tagIndex) => (
            <LevelGameplayTag
              key={tag}
              tag={tag}
              color={level.color}
              bgScene={level.bgScene}
              tilt={tagIndex % 2 === 0 ? -1.3 : 1.3}
              tagIndex={tagIndex}
              cardDelay={cardDelay}
              inView={inView}
            />
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

        {/* 3 niveles — grid en desktop para columnas y viewports idénticos */}
        <div
          className="flex w-full min-w-0 items-stretch overflow-x-auto pb-2 -mx-2 px-2
            sm:mx-0 sm:grid sm:items-start sm:overflow-visible sm:pb-0 sm:px-0"
          style={{
            gridTemplateColumns: 'minmax(0, 1fr) 52px minmax(0, 1fr) 52px minmax(0, 1fr)',
          }}
        >
          <LevelCard level={LEVELS[0]} index={0} inView={inView} />
          <HConnector color={LEVELS[0].color} />
          <LevelCard level={LEVELS[1]} index={1} inView={inView} />
          <HConnector color={LEVELS[1].color} />
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
