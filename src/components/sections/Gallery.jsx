import { useRef, useState } from 'react'
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
   GALLERY DATA
══════════════════════════════════════════════════════════════════ */
const ITEMS = [
  {
    id: 'l3',
    image:    nivel3Img,
    level:    'NIVEL 3',
    title:    'ENFRENTAMIENTO',
    desc:     'En realidad virtual, enfrenta el bullying y rompe el ciclo desde la valentía.',
    color:    '#A678CC',
    bgAccent: '#EDE8FF',
    sticker:  '✨',
    stickerBg: '#FFB3C6',
    featured: true,
  },
  {
    id: 'l1',
    image:    nivel1Img,
    level:    'NIVEL 1',
    title:    'HUIDA',
    desc:     'Corre, esquiva obstáculos y sobrevive mientras eres perseguido.',
    color:    '#FF5757',
    bgAccent: '#FFE4E4',
    sticker:  '⚡',
    stickerBg: '#FFE566',
    featured: false,
  },
  {
    id: 'l2',
    image:    nivel2Img,
    level:    'NIVEL 2',
    title:    'SUPERACIÓN',
    desc:     'Aprende, adapta y supera cada plataforma con control y determinación.',
    color:    '#3DA35D',
    bgAccent: '#DCFFE8',
    sticker:  '🌱',
    stickerBg: '#C9A8E0',
    featured: false,
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

/* ══════════════════════════════════════════════════════════════════
   GALLERY CARD
══════════════════════════════════════════════════════════════════ */
function GalleryCard({ item, delay, inView, minHeight = 240 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, filter: 'blur(4px)' }}
      animate={inView
        ? { opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } }
        : { opacity: 0, y: 45, filter: 'blur(4px)' }
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: '3px solid #1A1A1A',
        boxShadow: hovered ? '7px 7px 0 #1A1A1A' : '5px 5px 0 #1A1A1A',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        height: '100%',
        minHeight,
        background: item.bgAccent,
        transition: 'box-shadow 0.2s ease',
        transform: hovered ? 'translate(-2px,-2px)' : 'translate(0,0)',
      }}
    >
      {/* Image */}
      <motion.img
        src={item.image}
        alt={`${item.level}: ${item.title}`}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: 'block',
          imageRendering: 'pixelated',
        }}
      />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, ${item.color}ee 0%, ${item.color}88 40%, transparent 70%)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '20px',
        }}
      >
        <p style={{
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.88rem',
          color: '#fff',
          lineHeight: 1.55,
          textShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}>
          {item.desc}
        </p>
      </motion.div>

      {/* Always-visible top-left badge */}
      <div style={{
        position: 'absolute', top: '10px', left: '10px', zIndex: 3,
        background: item.color,
        border: '2.5px solid #1A1A1A',
        boxShadow: '2px 2px 0 #1A1A1A',
        borderRadius: '7px',
        padding: '3px 10px',
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '7px',
        color: '#fff',
        letterSpacing: '0.03em',
        lineHeight: 1.6,
      }}>
        {item.level}
      </div>

      {/* Floating sticker */}
      <motion.div
        animate={{ y: hovered ? -4 : [0, -5, 0] }}
        transition={hovered
          ? { duration: 0.2 }
          : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{
          position: 'absolute', top: '9px', right: '10px', zIndex: 3,
          background: item.stickerBg,
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
          borderRadius: '50%',
          width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px',
        }}
      >
        {item.sticker}
      </motion.div>

      {/* Bottom title bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        background: `linear-gradient(to top, rgba(26,26,26,0.75) 0%, transparent 100%)`,
        padding: '28px 14px 12px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 700,
          fontSize: '1.15rem',
          color: '#fff',
          textShadow: '0 1px 6px rgba(0,0,0,0.5)',
          letterSpacing: '0.02em',
        }}>
          {item.title}
        </span>
        {item.featured && (
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '6px',
            background: item.color,
            color: '#fff',
            border: '1.5px solid #fff',
            borderRadius: '4px',
            padding: '3px 7px',
            letterSpacing: '0.05em',
          }}>
            FEATURED
          </span>
        )}
      </div>

      {/* Featured glow ring */}
      {item.featured && (
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: '-4px',
            borderRadius: '18px',
            boxShadow: `0 0 20px ${item.color}80`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   TRAILER PLACEHOLDER
══════════════════════════════════════════════════════════════════ */
function TrailerSection({ inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      {...revealUp(0.3)}
      animate={inView ? revealUp(0.3).animate : revealUp(0.3).initial}
    >
      {/* Outer arcade frame */}
      <div style={{
        border: '4px solid #1A1A1A',
        boxShadow: '8px 8px 0 #1A1A1A',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#1A1A1A',
      }}>
        {/* Top arcade bar */}
        <div style={{
          background: '#F5EEC8',
          borderBottom: '3px solid #1A1A1A',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['#FF5757','#FFE566','#3DA35D'].map(c => (
              <div key={c} style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: c, border: '2px solid #1A1A1A',
              }} />
            ))}
          </div>
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '8px',
            color: '#1A1A1A',
            letterSpacing: '0.06em',
          }}>
            🎬  TRAILER OFICIAL
          </span>
          <div style={{
            background: '#A678CC',
            border: '2px solid #1A1A1A',
            borderRadius: '6px',
            padding: '3px 10px',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '7px',
            color: '#fff',
            boxShadow: '2px 2px 0 #1A1A1A',
          }}>
            PRÓXIMAMENTE
          </div>
        </div>

        {/* Screen */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            aspectRatio: '16 / 9',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1A0A2E 0%, #0A0A1A 50%, #0D1A2E 100%)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* CRT scanlines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 4px)',
            zIndex: 3,
          }} />

          {/* Pixel grid floor (VR vibe) */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              linear-gradient(rgba(166,120,204,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(166,120,204,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            zIndex: 1,
          }} />

          {/* BG glow orbs */}
          <div style={{
            position: 'absolute', top: '20%', left: '20%',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, #A678CC44 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none', zIndex: 1,
          }} />
          <div style={{
            position: 'absolute', bottom: '15%', right: '18%',
            width: '160px', height: '160px', borderRadius: '50%',
            background: 'radial-gradient(circle, #FF575744 0%, transparent 70%)',
            filter: 'blur(25px)',
            pointerEvents: 'none', zIndex: 1,
          }} />

          {/* Center content */}
          <div style={{ position: 'relative', zIndex: 4, textAlign: 'center' }}>
            {/* Play button */}
            <motion.div
              animate={hovered
                ? { scale: 1.12 }
                : { scale: [1, 1.04, 1] }
              }
              transition={hovered
                ? { duration: 0.2 }
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }
              style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                background: '#A678CC',
                border: '4px solid #fff',
                boxShadow: `0 0 0 4px #A678CC66, 0 0 30px #A678CC88`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                cursor: 'pointer',
              }}
            >
              {/* Pixel play triangle */}
              <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden="true">
                <polygon points="8,5 20,12 8,19" fill="#fff" />
              </svg>
            </motion.div>

            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 'clamp(0.55rem, 1.4vw, 0.85rem)',
              color: '#fff',
              letterSpacing: '0.08em',
              lineHeight: 1.8,
              textShadow: '0 0 12px rgba(166,120,204,0.8)',
            }}>
              BREAK THE CYCLE
            </p>
            <p style={{
              fontFamily: '"Fredoka", sans-serif',
              fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
              color: 'rgba(255,255,255,0.55)',
              marginTop: '6px',
              letterSpacing: '0.04em',
            }}>
              Trailer oficial · Próximamente
            </p>

            {/* Pixel star decorations */}
            {[
              { top: '-40px', left: '-60px',  color: '#FFE566', size: 14 },
              { top: '-30px', right: '-55px', color: '#FF5757', size: 11 },
              { bottom: '-38px', left: '-50px', color: '#3DA35D', size: 12 },
              { bottom: '-32px', right: '-62px', color: '#A678CC', size: 14 },
            ].map((s, i) => (
              <motion.div
                key={i}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', ...s }}
                aria-hidden="true"
              >
                <PixelStar color={s.color} size={s.size} />
              </motion.div>
            ))}
          </div>

          {/* Corner pixel decorations */}
          {[
            { top: '12px',  left: '14px'  },
            { top: '12px',  right: '14px' },
            { bottom: '12px', left: '14px'  },
            { bottom: '12px', right: '14px' },
          ].map((pos, i) => (
            <div key={i} style={{ position: 'absolute', ...pos, zIndex: 2 }}>
              <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden="true"
                style={{
                  transform: i === 1 ? 'scaleX(-1)' : i === 2 ? 'scaleY(-1)' : i === 3 ? 'scale(-1,-1)' : 'none',
                }}>
                <rect x="0" y="0" width="6" height="2" fill="#A678CC" opacity="0.6" />
                <rect x="0" y="0" width="2" height="6" fill="#A678CC" opacity="0.6" />
              </svg>
            </div>
          ))}
        </div>

        {/* Bottom info bar */}
        <div style={{
          background: '#F5EEC8',
          borderTop: '3px solid #1A1A1A',
          padding: '12px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>🎮</span>
            <span style={{
              fontFamily: '"Fredoka", sans-serif',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: '#1A1A1A',
            }}>
              Break The Cycle — UnderRise Studio
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Runner', 'Parkour', 'VR'].map((tag, i) => (
              <span key={tag} style={{
                fontFamily: '"Fredoka", sans-serif',
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: '6px',
                border: '2px solid #1A1A1A',
                background: ['#FFE4E4','#DCFFE8','#EDE8FF'][i],
                color: ['#FF5757','#3DA35D','#A678CC'][i],
                boxShadow: '2px 2px 0 #1A1A1A',
              }}>
                {tag}
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
      {/* Badge */}
      <motion.div
        {...revealUp(0)}
        animate={inView ? revealUp(0).animate : revealUp(0).initial}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#FFB3C6',
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
        Gameplay &amp; Galería
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
        Así se{' '}
        <span style={{
          color: '#FF5757',
          WebkitTextStroke: '1.5px #1A1A1A',
          paintOrder: 'stroke fill',
        }}>
          vive
        </span>
        {' '}Break The Cycle
      </motion.h2>

      {/* Doodle underline */}
      <motion.div
        {...revealUp(0.15)}
        animate={inView ? revealUp(0.15).animate : revealUp(0.15).initial}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 260 12" width={260} height={12} aria-hidden="true">
          <path d="M4 8 Q35 2 65 8 Q95 14 125 8 Q155 2 185 8 Q215 14 256 6"
            fill="none" stroke="#FFB3C6" strokeWidth="3.5" strokeLinecap="round" />
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
          maxWidth: '38rem',
          textAlign: 'center',
          width: '100%',
        }}>
          Cada escenario representa emociones, decisiones y desafíos distintos.
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
export default function Gallery() {
  const { ref, inView } = useReveal(0.08)

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative section-spacing overflow-hidden"
      style={{ background: '#FFFBF0' }}
    >
      {/* Top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #FFB3C6 0px, #FFB3C6 30px, #FFE566 30px, #FFE566 60px, #A8D4F5 60px, #A8D4F5 90px)',
        opacity: 0.7,
      }} />

      {/* Subtle dot bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,179,198,0.12) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Floating pixel stars */}
      {[
        { top: '6%',  left: '3%',  color: '#FF5757', size: 14, delay: 0 },
        { top: '12%', right: '4%', color: '#FFE566', size: 11, delay: 0.7 },
        { top: '65%', left: '2%',  color: '#A678CC', size: 12, delay: 1.3 },
        { top: '75%', right: '2%', color: '#3DA35D', size: 14, delay: 0.4 },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
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

        {/* ── Gallery grid — asymmetric layout ── */}
        <motion.div
          {...revealUp(0.1)}
          animate={inView ? revealUp(0.1).animate : revealUp(0.1).initial}
        >
          {/* Desktop: featured left + 2 stacked right */}
          <div className="hidden md:grid"
            style={{
              gridTemplateColumns: '1.55fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '16px',
              height: '520px',
            }}>
            {/* Featured (Level 3) — spans both rows */}
            <div style={{ gridRow: '1 / 3' }}>
              <GalleryCard item={ITEMS[0]} delay={0.12} inView={inView} minHeight={520} />
            </div>
            {/* Level 1 */}
            <div style={{ gridRow: '1' }}>
              <GalleryCard item={ITEMS[1]} delay={0.22} inView={inView} minHeight={248} />
            </div>
            {/* Level 2 */}
            <div style={{ gridRow: '2' }}>
              <GalleryCard item={ITEMS[2]} delay={0.32} inView={inView} minHeight={248} />
            </div>
          </div>

          {/* Mobile: single column */}
          <div className="flex md:hidden flex-col gap-4">
            {ITEMS.map((item, i) => (
              <div key={item.id} style={{ height: '240px' }}>
                <GalleryCard item={item} delay={0.1 + i * 0.12} inView={inView} minHeight={240} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Gallery caption ── */}
        <motion.div
          {...revealUp(0.25)}
          animate={inView ? revealUp(0.25).animate : revealUp(0.25).initial}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Runner · Nivel 1',       color: '#FF5757', bg: '#FFE4E4' },
            { label: 'Parkour · Nivel 2',       color: '#3DA35D', bg: '#DCFFE8' },
            { label: 'VR Enfrentamiento · Nivel 3', color: '#A678CC', bg: '#EDE8FF' },
          ].map((tag) => (
            <div key={tag.label} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
            }}>
              <div style={{
                width: '10px', height: '10px', borderRadius: '2px',
                background: tag.color,
                border: '1.5px solid #1A1A1A',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: '"Fredoka", sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'rgba(26,26,26,0.65)',
              }}>
                {tag.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Pixel divider ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} aria-hidden="true">
          <div style={{ flex: 1, height: '2px', background: 'repeating-linear-gradient(90deg, #1A1A1A 0px, #1A1A1A 6px, transparent 6px, transparent 14px)', opacity: 0.12 }} />
          <span style={{ fontSize: '18px' }}>🎬</span>
          <div style={{ flex: 1, height: '2px', background: 'repeating-linear-gradient(90deg, #1A1A1A 0px, #1A1A1A 6px, transparent 6px, transparent 14px)', opacity: 0.12 }} />
        </div>

        {/* ── Trailer placeholder ── */}
        <TrailerSection inView={inView} />

      </div>

      {/* Bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', pointerEvents: 'none',
        background: 'repeating-linear-gradient(90deg, #A8D4F5 0px, #A8D4F5 30px, #FFB3C6 30px, #FFB3C6 60px, #FFE566 60px, #FFE566 90px)',
        opacity: 0.7,
      }} />
    </section>
  )
}
