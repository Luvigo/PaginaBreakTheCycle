import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/** Cuando tengas el embed de YouTube/Vimeo, pégalo aquí */
const TRAILER_EMBED_URL = 'https://www.youtube.com/embed/7k4sQfabBdE'

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

const T_BORDER = '2px solid rgba(26,26,26,0.82)'
const T_SHADOW = '5px 5px 0 rgba(26,26,26,0.65)'

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
   SECTION TITLE — estreno / reveal emocional
══════════════════════════════════════════════════════════════════ */
function SectionTitle({ inView }) {
  const sparkles = [
    { top: '2%',  left: '0%',  color: '#FFE566', size: 10, delay: 0 },
    { top: '12%', right: '0%', color: '#A678CC', size: 9, delay: 0.7 },
  ]

  return (
    <header
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '36rem',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {sparkles.map((s, i) => {
        const { color, size, delay, ...pos } = s
        return (
          <motion.div
            key={i}
            aria-hidden="true"
            animate={inView ? { y: [0, -4, 0], opacity: [0.5, 0.95, 0.5] } : {}}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay }}
            style={{ position: 'absolute', pointerEvents: 'none', ...pos }}
          >
            <PixelStar color={color} size={size} />
          </motion.div>
        )
      })}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(0.45rem, 1.2vw, 0.7rem)',
      }}>
        {/* Badge estreno */}
        <motion.div
          {...revealUp(0)}
          animate={inView ? { ...revealUp(0).animate, scale: [1, 1.04, 1] } : revealUp(0).initial}
          transition={{
            ...revealUp(0).transition,
            scale: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(175deg, #1A1A1A 0%, #2a2038 100%)',
            border: T_BORDER,
            boxShadow: `${T_SHADOW}, 0 0 20px rgba(166,120,204,0.2)`,
            borderRadius: '100px',
            padding: '5px 16px',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#FF5757',
              boxShadow: '0 0 8px rgba(255,87,87,0.7)',
            }}
            aria-hidden="true"
          />
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '7px',
            color: '#FFE566',
            letterSpacing: '0.14em',
          }}>
            TRAILER OFICIAL
          </span>
          <PixelStar color="#A678CC" size={9} />
        </motion.div>

        {/* Título principal */}
        <motion.div
          {...revealUp(0.08)}
          animate={inView ? revealUp(0.08).animate : revealUp(0.08).initial}
          style={{ width: '100%' }}
        >
          <h2
            id="trailer-heading"
            style={{
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4.2vw, 2.65rem)',
              color: '#1A1A1A',
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            El estreno que{' '}
            <span style={{
              color: '#A678CC',
              WebkitTextStroke: '1.5px #1A1A1A',
              paintOrder: 'stroke fill',
            }}>
              te atrapa
            </span>
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.4rem' }}>
            <svg viewBox="0 0 240 14" width="min(180px, 62%)" height={12} aria-hidden="true">
              <path
                d="M4 9 Q38 3 72 9 Q106 14 140 9 Q174 3 236 7"
                fill="none"
                stroke="#A678CC"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M12 11 Q50 8 88 11"
                fill="none"
                stroke="#FFE566"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </div>
        </motion.div>

        {/* Subtítulo emocional */}
        <motion.p
          {...revealUp(0.16)}
          animate={inView ? revealUp(0.16).animate : revealUp(0.16).initial}
          style={{
            fontFamily: '"Fredoka", sans-serif',
            fontSize: 'clamp(0.95rem, 1.65vw, 1.08rem)',
            fontWeight: 500,
            color: 'rgba(26,26,26,0.68)',
            lineHeight: 1.55,
            maxWidth: '30rem',
            margin: 0,
            width: '100%',
          }}
        >
          Descubre el viaje emocional detrás de{' '}
          <span style={{ fontWeight: 700, color: 'rgba(26,26,26,0.85)' }}>Break The Cycle</span>.
        </motion.p>
      </div>
    </header>
  )
}

/* ══════════════════════════════════════════════════════════════════
   TRAILER FRAME — HUD, partículas y capas cinematográficas
══════════════════════════════════════════════════════════════════ */
const TRAILER_HUD = ['tl', 'tr', 'bl', 'br']

const TRAILER_PARTICLES = [
  { top: '14%', left: '12%', size: 2, tone: '#fff',    delay: 0 },
  { top: '22%', left: '78%', size: 3, tone: '#C9A8E0', delay: 0.8 },
  { top: '38%', left: '8%',  size: 2, tone: '#FFE566', delay: 1.4 },
  { top: '55%', left: '88%', size: 2, tone: '#fff',    delay: 0.4 },
  { top: '68%', left: '24%', size: 3, tone: '#FF5757', delay: 1.9 },
  { top: '78%', left: '72%', size: 2, tone: '#A678CC', delay: 1.1 },
]

function TrailerHudCorner({ corner }) {
  const base = {
    position: 'absolute',
    width: 14,
    height: 14,
    zIndex: 6,
    pointerEvents: 'none',
    borderColor: 'rgba(167, 120, 204, 0.75)',
    borderStyle: 'solid',
  }
  const map = {
    tl: { top: 14, left: 14, borderWidth: '2px 0 0 2px' },
    tr: { top: 14, right: 14, borderWidth: '2px 2px 0 0' },
    bl: { bottom: 14, left: 14, borderWidth: '0 0 0 2px' },
    br: { bottom: 14, right: 14, borderWidth: '0 2px 2px 0' },
  }
  return <span aria-hidden="true" style={{ ...base, ...map[corner] }} />
}

function TrailerScreenLayers({ active }) {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(180deg,
              rgba(123,79,160,0.32) 0%,
              rgba(90,55,130,0.18) 22%,
              rgba(20,10,32,0.08) 48%,
              rgba(15,25,45,0.14) 78%,
              rgba(10,14,28,0.28) 100%
            ),
            linear-gradient(125deg,
              rgba(166,120,204,0.2) 0%,
              transparent 35%,
              rgba(255,87,87,0.06) 55%,
              rgba(123,79,160,0.16) 100%
            ),
            linear-gradient(90deg,
              rgba(78,45,130,0.14) 0%,
              rgba(30,18,48,0.04) 50%,
              rgba(100,70,150,0.12) 100%
            ),
            linear-gradient(165deg, #1a0e28 0%, #120a1c 30%, #06060c 55%, #0a1424 100%)
          `,
        }}
      />
      {TRAILER_PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          animate={active ? { opacity: [0.15, 0.5, 0.15], y: [0, -5, 0] } : { opacity: 0.1 }}
          transition={{ duration: 3.8 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.tone,
            boxShadow: `0 0 6px ${p.tone}`,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      ))}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.35,
          backgroundImage: `
            linear-gradient(rgba(166,120,204,0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(166,120,204,0.14) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 4px)',
          opacity: 0.45,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.32) 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 28%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
      {TRAILER_HUD.map((c) => (
        <TrailerHudCorner key={c} corner={c} />
      ))}
      {/* HUD superior */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 14,
          left: 36,
          right: 36,
          zIndex: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <motion.span
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#FF5757',
              boxShadow: '0 0 8px rgba(255,87,87,0.8)',
            }}
          />
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 6,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.14em',
          }}>
            PREVIEW
          </span>
        </div>
        <span style={{
          fontFamily: '"Fredoka", sans-serif',
          fontSize: 10,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.2em',
        }}>
          16:9
        </span>
      </div>
      {/* HUD inferior — barra de progreso decorativa */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 14,
          left: 36,
          right: 36,
          zIndex: 6,
          pointerEvents: 'none',
        }}
      >
        <div style={{
          height: 3,
          borderRadius: 2,
          background: 'rgba(255,255,255,0.12)',
          overflow: 'hidden',
        }}>
          <motion.div
            animate={{ scaleX: [0.12, 0.42, 0.12] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              height: '100%',
              width: '100%',
              transformOrigin: 'left center',
              background: 'linear-gradient(90deg, #A678CC, #FFE566)',
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </>
  )
}

function TrailerPlaceholder({ hovered, focused }) {
  return (
    <div style={{
      position: 'relative',
      zIndex: 5,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      textAlign: 'center',
    }}>
      <motion.div
        animate={hovered || focused ? { scale: 1.08 } : { scale: [1, 1.04, 1] }}
        transition={hovered || focused
          ? { duration: 0.2 }
          : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{
          width: 'clamp(88px, 14vw, 112px)',
          height: 'clamp(88px, 14vw, 112px)',
          borderRadius: '50%',
          background: 'linear-gradient(155deg, #C9A0F0 0%, #7B4FA0 50%, #4E2D82 100%)',
          border: '4px solid #fff',
          boxShadow: '0 0 0 6px rgba(166,120,204,0.28), 0 0 48px rgba(166,120,204,0.5), 0 0 72px rgba(123,79,160,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'clamp(14px, 2.5vw, 22px)',
        }}
      >
        <svg viewBox="0 0 24 24" width={42} height={42} aria-hidden="true">
          <polygon points="8,5 20,12 8,19" fill="#fff" />
        </svg>
      </motion.div>
      <p style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize: 'clamp(0.55rem, 1.35vw, 0.82rem)',
        color: '#fff',
        letterSpacing: '0.16em',
        lineHeight: 1.9,
        textShadow: '0 0 28px rgba(166,120,204,0.75)',
        margin: 0,
      }}>
        BREAK THE CYCLE
      </p>
      <p style={{
        fontFamily: '"Fredoka", sans-serif',
        fontSize: 'clamp(1rem, 1.85vw, 1.2rem)',
        color: 'rgba(255,255,255,0.62)',
        marginTop: 10,
        marginBottom: 0,
      }}>
        Trailer oficial · Próximamente
      </p>
    </div>
  )
}

function TrailerPlayer({ inView }) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const hasEmbed = Boolean(TRAILER_EMBED_URL)
  const screenActive = inView && (hovered || focused || hasEmbed)

  return (
    <motion.div
      {...revealUp(0.1)}
      animate={inView ? revealUp(0.1).animate : revealUp(0.1).initial}
      className="relative w-full"
      style={{ width: '100%', margin: '0 auto' }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ top: '6%', width: '100%', height: '88%', zIndex: 0 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(166,120,204,0.28) 0%, rgba(123,79,160,0.12) 50%, transparent 100%)',
          filter: 'blur(28px)',
        }} />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '-2%',
          width: '62%',
          height: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(26,26,26,0.22) 0%, transparent 70%)',
          filter: 'blur(12px)',
          zIndex: 0,
        }}
      />

      {/* Marco exterior — borde luminoso */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 3,
          borderRadius: 26,
          background: 'linear-gradient(135deg, rgba(166,120,204,0.55) 0%, rgba(255,87,87,0.2) 40%, rgba(255,229,102,0.15) 60%, rgba(166,120,204,0.45) 100%)',
          boxShadow: [
            T_SHADOW,
            '0 24px 56px rgba(26,26,26,0.22)',
            '0 48px 100px rgba(123,79,160,0.2)',
          ].join(', '),
        }}
      >
        <div style={{
          borderRadius: 23,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #16141f 0%, #0a090e 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* Deck superior */}
          <div style={{
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            flexWrap: 'wrap',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {['#FF5757', '#FFE566', '#3DA35D'].map((c) => (
                <div key={c} style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: c,
                  boxShadow: `0 0 6px ${c}88`,
                }} />
              ))}
              <span style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 6,
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.12em',
              }}>
                UNDERRISE
              </span>
            </div>
            <span style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 7,
              color: '#FFE566',
              letterSpacing: '0.14em',
              textShadow: '0 0 12px rgba(255,229,102,0.35)',
            }}>
              ▶ TRAILER OFICIAL
            </span>
          </div>

          {/* Viewport con bezel */}
          <div style={{
          padding: 'clamp(10px, 1.6vw, 14px)',
          background: '#050508',
        }}>
            <div
              role={hasEmbed ? 'region' : 'button'}
              tabIndex={hasEmbed ? undefined : 0}
              aria-label={hasEmbed ? 'Trailer de Break The Cycle' : 'Trailer próximamente'}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onClick={() => !hasEmbed && setFocused(true)}
              onKeyDown={(e) => {
                if (!hasEmbed && (e.key === 'Enter' || e.key === ' ')) setFocused(true)
              }}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                maxHeight: 'min(70vh, 600px)',
                borderRadius: 12,
                overflow: 'hidden',
                border: '2px solid rgba(26,26,26,0.9)',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.06)',
                cursor: hasEmbed ? 'default' : 'pointer',
              }}
            >
              <TrailerScreenLayers active={screenActive} />
              {hasEmbed ? (
                <iframe
                  src={TRAILER_EMBED_URL}
                  title="Trailer oficial — Break The Cycle"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                    zIndex: 4,
                  }}
                />
              ) : (
                <TrailerPlaceholder hovered={hovered} focused={focused} />
              )}
            </div>
          </div>

          {/* Deck inferior */}
          <div style={{
            padding: '9px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, transparent 100%)',
          }}>
            <span style={{
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 600,
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.72)',
            }}>
              Break The Cycle
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Empatía', 'Indie', 'Universitario'].map((tag) => (
                <span key={tag} style={{
                  fontFamily: '"Fredoka", sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.65)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT — Trailer section
══════════════════════════════════════════════════════════════════ */
export default function Gallery() {
  const { ref, inView } = useReveal(0.1)

  return (
    <section
      id="trailer"
      ref={ref}
      aria-labelledby="trailer-heading"
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(3.25rem, 7vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6.5vw, 4.5rem)',
        background: 'linear-gradient(180deg, #E9E2F6 0%, #F7F2FC 38%, #FFFBF5 100%)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          pointerEvents: 'none',
          background: 'linear-gradient(90deg, #A678CC 0%, #FFB3C6 50%, #FFE566 100%)',
          opacity: 0.5,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 72% 58% at 50% 48%, rgba(166,120,204,0.18) 0%, transparent 72%)',
        }}
      />

      <div className="container-game relative z-[1]">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '64rem',
            margin: '0 auto',
            gap: 'clamp(1.1rem, 2.4vw, 1.65rem)',
          }}
        >
          <SectionTitle inView={inView} />
          <TrailerPlayer inView={inView} />
        </div>
      </div>
    </section>
  )
}
