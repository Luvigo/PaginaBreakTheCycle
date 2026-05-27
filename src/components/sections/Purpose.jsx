import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ══════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
══════════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.2) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px', amount: threshold })
  return { ref, inView }
}

const revealUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40, filter: 'blur(4px)' },
  animate:    { opacity: 1, y: 0,  filter: 'blur(0px)' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

/** Pixel depth — black outline kept, softer contrast & layered shadows */
const P_BORDER = '2px solid #1A1A1A'
const P_INNER = '1px solid rgba(26,26,26,0.1)'
const P_SHADOW_SM = '2px 2px 0 rgba(26,26,26,0.72)'
const P_SHADOW_MD =
  '3px 3px 0 rgba(26,26,26,0.76), 0 6px 16px rgba(26,26,26,0.07), inset 0 1px 0 rgba(255,255,255,0.72)'
const P_SHADOW_LG =
  '4px 4px 0 rgba(26,26,26,0.78), 0 10px 22px rgba(26,26,26,0.08), inset 0 1px 0 rgba(255,255,255,0.68)'
const P_SHADOW_HOVER =
  '5px 5px 0 rgba(26,26,26,0.8), 0 12px 24px rgba(26,26,26,0.1), inset 0 1px 0 rgba(255,255,255,0.78)'

/* ══════════════════════════════════════════════════════════════════
   PIXEL DECORATIONS
══════════════════════════════════════════════════════════════════ */
function PixelStar({ color = '#FFE566', size = 14, style = {} }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}
      style={{ imageRendering: 'pixelated', ...style }} aria-hidden="true"
    >
      <rect x="7"  y="0"  width="2" height="2" fill={color} />
      <rect x="7"  y="14" width="2" height="2" fill={color} />
      <rect x="0"  y="7"  width="2" height="2" fill={color} />
      <rect x="14" y="7"  width="2" height="2" fill={color} />
      <rect x="4"  y="4"  width="8" height="8" fill={color} />
      <rect x="6"  y="2"  width="4" height="4" fill={color} />
      <rect x="6"  y="10" width="4" height="4" fill={color} />
      <rect x="2"  y="6"  width="4" height="4" fill={color} />
      <rect x="10" y="6"  width="4" height="4" fill={color} />
      <rect x="5"  y="5"  width="6" height="6" fill="rgba(255,255,255,0.4)" />
    </svg>
  )
}

function PixelDivider() {
  return (
    <div
      className="flex w-full max-w-xs items-center justify-center gap-3 mx-auto"
      aria-hidden="true"
    >
      <div className="min-w-0 flex-1 border-b-2 border-dashed border-ink/15" />
      <div className="flex shrink-0 items-center gap-2">
        <PixelStar color="#C9A8E0" size={12} />
        <PixelStar color="#FFE566" size={10} />
        <PixelStar color="#A8D8A8" size={12} />
      </div>
      <div className="min-w-0 flex-1 border-b-2 border-dashed border-ink/15" />
    </div>
  )
}

function CardMoodDecor({ type = 'problem', accent = '#5590C8' }) {
  const particles = type === 'problem'
    ? [
        { top: '18%', right: '20%', size: 5, opacity: 0.22, dur: 3.6, y: 2 },
        { top: '30%', right: '10%', size: 4, opacity: 0.18, dur: 4.2, y: 3 },
        { top: '44%', right: '22%', size: 3, opacity: 0.15, dur: 3.9, y: 2 },
      ]
    : [
        { top: '16%', right: '17%', size: 5, opacity: 0.28, dur: 3.2, y: -2 },
        { top: '28%', right: '8%', size: 4, opacity: 0.24, dur: 3.8, y: -3 },
        { top: '42%', right: '19%', size: 3, opacity: 0.2, dur: 3.4, y: -2 },
      ]

  return (
    <>
      <svg
        viewBox="0 0 120 70"
        width={120}
        height={70}
        className="absolute -right-3 top-2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: type === 'problem' ? 0.22 : 0.28 }}
      >
        {type === 'problem' ? (
          <path
            d="M8 42 Q24 20 40 42 Q56 62 72 42 Q86 26 102 38"
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M8 46 Q24 50 34 42 Q48 30 62 32 Q78 34 98 22"
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}
      </svg>

      {particles.map((p, i) => (
        <motion.span
          key={`${type}-p-${i}`}
          className="absolute rounded-sm pointer-events-none"
          style={{
            top: p.top,
            right: p.right,
            width: p.size,
            height: p.size,
            background: accent,
            opacity: p.opacity,
          }}
          animate={{ y: [0, p.y, 0], opacity: [p.opacity * 0.75, p.opacity, p.opacity * 0.75] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
        />
      ))}
    </>
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
        animate={inView ? { ...revealUp(0).animate, scale: [1, 1.03, 1] } : revealUp(0).initial}
        transition={{ ...revealUp(0).transition, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-fredoka text-sm font-semibold text-ink"
        style={{ background: '#FFE566', border: P_BORDER, boxShadow: P_SHADOW_SM }}
      >
        <PixelStar color="#FF5757" size={10} />
        El Juego
        <PixelStar color="#FF5757" size={10} />
      </motion.div>

      {/* Main title */}
      <motion.div
        {...revealUp(0.1)}
        animate={inView ? revealUp(0.1).animate : revealUp(0.1).initial}
      >
        <h2
          className="font-fredoka font-bold text-ink leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', textAlign: 'center' }}
        >
          El propósito{' '}
          <span
            className="inline-block"
            style={{
              color: '#A678CC',
              WebkitTextStroke: '1.5px #1A1A1A',
              paintOrder: 'stroke fill',
            }}
          >
            detrás
          </span>{' '}
          de la pantalla
        </h2>

        {/* Doodle underline */}
        <div className="flex justify-center mt-2">
          <svg viewBox="0 0 220 12" width={220} height={12} aria-hidden="true">
            <path
              d="M4 8 Q30 2 55 8 Q80 14 105 8 Q130 2 155 8 Q180 14 216 6"
              fill="none" stroke="#FFE566" strokeWidth="3.5" strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        {...revealUp(0.2)}
        animate={inView ? revealUp(0.2).animate : revealUp(0.2).initial}
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <p
          className="font-fredoka text-base md:text-lg font-medium leading-relaxed"
          style={{ color: 'rgba(26,26,26,0.7)', maxWidth: '32rem', textAlign: 'center', width: '100%' }}
        >
          Un videojuego que nació del aula universitaria para cambiar vidas.
        </p>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PROBLEM / SOLUTION CARDS
══════════════════════════════════════════════════════════════════ */
const CARDS = [
  {
    id:      'problem',
    icon:    '😔',
    tag:     'EL PROBLEMA',
    title:   'El ciclo que te atrapa',
    body:    'El acoso y la presión social nos encierran en un ciclo de ansiedad. Al principio, solo podemos reaccionar y huir.',
    bg:      '#A8D4F5',
    accent:  '#5590C8',
    shadow:  '#1A1A1A',
    deco:    ['😰', '💭', '🏃'],
    delay:   0.25,
  },
  {
    id:      'solution',
    icon:    '⭐',
    tag:     'LA SOLUCIÓN',
    title:   'El juego que te libera',
    body:    'Este juego es una representación simbólica de la superación personal. Transformarás la tensión en progreso y libertad.',
    bg:      '#A8D8A8',
    accent:  '#3E8C3E',
    shadow:  '#1A1A1A',
    deco:    ['💪', '🌟', '🏆'],
    delay:   0.38,
  },
]

function PurposeCard({ card, inView }) {
  const { id, icon, tag, title, body, bg, accent, shadow, deco, delay } = card

  return (
    <motion.div
      {...revealUp(delay)}
      animate={inView ? revealUp(delay).animate : revealUp(delay).initial}
      whileHover={{
        y: -6,
        boxShadow: P_SHADOW_HOVER,
        transition: { type: 'spring', stiffness: 320, damping: 16 },
      }}
      className="relative flex h-full flex-col gap-3.5 rounded-2xl cursor-default overflow-hidden"
      style={{
        background: bg,
        border:     P_BORDER,
        boxShadow:  P_SHADOW_MD,
        paddingTop:    '1.25rem',
        paddingBottom: '1.25rem',
        paddingLeft:   'clamp(1.85rem, 5vw, 2.65rem)',
        paddingRight:  'clamp(1.5rem, 4vw, 2.15rem)',
      }}
    >
      <div
        className="absolute inset-[3px] rounded-[0.82rem] pointer-events-none"
        style={{ border: P_INNER, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)' }}
      />

      {/* Subtle inner highlight top edge */}
      <div
        className="absolute top-0 left-7 right-6 sm:left-8 h-px pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.7)' }}
      />

      <CardMoodDecor type={id} accent={accent} />

      {/* Floating mini deco emojis — top right */}
      <div className="absolute top-3.5 right-4 flex gap-1.5 text-[15px] opacity-45 select-none">
        {deco.map((e, i) => (
          <motion.span
            key={i}
            animate={id === 'problem'
              ? { y: [0, -2, 0], rotate: [-2, 1, -2] }
              : { y: [0, -4, 0], rotate: [-1, 2, -1] }
            }
            transition={{ duration: 2.6 + i * 0.45, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      <div className="relative z-[1] flex w-full max-w-full flex-col gap-3 pr-8 sm:pr-9">
        {/* Tag pill */}
        <div className="inline-flex shrink-0 items-center gap-1.5 w-fit max-w-full">
          <motion.span
            className="font-pixelify text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.65)',
              border:     P_BORDER,
              color:      accent,
              boxShadow:  '1.5px 1.5px 0 rgba(26,26,26,0.55)',
            }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {icon} {tag}
          </motion.span>
        </div>

        <div className="flex w-full max-w-full flex-col gap-2 text-left">
          <h3
            className="font-fredoka font-bold text-ink text-pretty leading-[1.2] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(1.25rem, 2.35vw, 1.62rem)' }}
          >
            {title}
          </h3>

          <p className="font-fredoka text-[15px] text-ink/85 text-pretty leading-[1.62] tracking-[0.005em] w-full">
            {body}
          </p>
        </div>
      </div>

      {/* Bottom accent stripe */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}60, ${accent}90, ${accent}60, transparent)`,
        }}
      />
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   CENTRAL EMOTIONAL QUOTE
══════════════════════════════════════════════════════════════════ */
function CentralQuote({ inView }) {
  /* Floating sticker elements inside the quote block */
  const FLOATERS = [
    { emoji: '✏️', top: '10%',  left:  '3%',  delay: 0,   dur: 4.2 },
    { emoji: '📚', top: '15%',  right: '4%',  delay: 0.7, dur: 3.8 },
    { emoji: '🌟', bottom: '18%', left: '5%', delay: 1.2, dur: 5.0 },
    { emoji: '🎯', bottom: '14%', right: '3%',delay: 0.4, dur: 4.5 },
    { emoji: '💡', top: '50%',  left:  '2%',  delay: 1.6, dur: 3.5 },
    { emoji: '🏅', top: '50%',  right: '2%',  delay: 0.9, dur: 4.0 },
  ]

  return (
    <motion.div
      {...revealUp(0.5)}
      animate={inView ? revealUp(0.5).animate : revealUp(0.5).initial}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5EEC8 0%, #FFF8E7 45%, #EEF9E8 100%)',
        border:     P_BORDER,
        boxShadow:  P_SHADOW_LG,
        paddingTop:    'clamp(1.65rem, 3.5vw, 2rem)',
        paddingBottom: 'clamp(1.85rem, 4vw, 2.35rem)',
        paddingLeft:   'clamp(1.85rem, 5vw, 2.65rem)',
        paddingRight:  'clamp(1.5rem, 4vw, 2.15rem)',
      }}
    >
      <div
        className="absolute inset-[3px] rounded-[0.82rem] pointer-events-none"
        style={{ border: P_INNER, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }}
      />

      {/* Pixel grid — fades toward center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(166,120,204,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(166,120,204,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '22px 22px',
          opacity: 0.032,
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, black 100%)',
        }}
      />

      {/* Soft cinematic wash behind main quote */}
      <motion.div
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[88%] h-[46%] pointer-events-none"
        animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.02, 1] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(166,120,204,0.15) 0%, rgba(255,255,255,0) 72%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Inner highlight border */}
      <div
        className="absolute inset-2 rounded-xl pointer-events-none"
        style={{ border: '1.5px dashed rgba(166,120,204,0.2)' }}
      />

      {/* Pixel corner stars */}
      {[
        { top: '8%',    left: '3%',   size: 20, color: '#FFE566', dur: '2.2s', delay: '0s'   },
        { top: '8%',    right: '3%',  size: 16, color: '#C9A8E0', dur: '2.8s', delay: '0.5s' },
        { bottom: '8%', left: '4%',   size: 14, color: '#A8D8A8', dur: '3.0s', delay: '0.3s' },
        { bottom: '8%', right: '3%',  size: 18, color: '#FFB3C6', dur: '2.5s', delay: '0.8s' },
        { top: '45%',   left: '6%',   size: 10, color: '#FFE566', dur: '3.5s', delay: '1.0s' },
        { top: '40%',   right: '6%',  size: 12, color: '#A8D4F5', dur: '2.2s', delay: '0.6s' },
      ].map((s, i) => (
        <motion.div key={i} className="absolute pointer-events-none animate-star"
          style={{ top: s.top, bottom: s.bottom, left: s.left, right: s.right,
                   animationDuration: s.dur, animationDelay: s.delay }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 200 }}
        >
          <PixelStar color={s.color} size={s.size} />
        </motion.div>
      ))}

      {/* Floating sticker emojis */}
      {FLOATERS.map(({ emoji, delay, dur, ...pos }, i) => (
        <motion.div key={i} className="absolute pointer-events-none select-none text-base"
          style={{ ...pos, opacity: 0 }}
          animate={inView
            ? { opacity: 0.3, y: [0, -4, 0], rotate: [-2, 2, -2] }
            : { opacity: 0 }
          }
          transition={{
            opacity:  { delay: 0.8 + delay, duration: 0.5 },
            y:        { duration: dur, repeat: Infinity, ease: 'easeInOut', delay },
            rotate:   { duration: dur * 1.3, repeat: Infinity, ease: 'easeInOut', delay },
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Notebook line — alineada al padding izquierdo de la card */}
      <div
        className="absolute top-6 bottom-8 w-px hidden md:block pointer-events-none"
        style={{
          left: 'clamp(1.15rem, 3.2vw, 1.65rem)',
          background: 'repeating-linear-gradient(to bottom, #FFB3C6 0px, #FFB3C6 6px, transparent 6px, transparent 14px)',
          opacity: 0.38,
        }}
      />

      <div className="relative z-[1] flex w-full max-w-full flex-col items-center gap-2 md:gap-2.5">
        {/* Opening quote mark */}
        <div
          className="flex w-full justify-center"
          aria-hidden="true"
        >
          <span
            className="font-bold select-none -mb-0.5"
            style={{
              color: '#C9A8E0', opacity: 0.17,
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
              lineHeight: 0.88,
            }}
          >❝</span>
        </div>

        {/* Main quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <p
            className="font-fredoka font-bold text-ink leading-[1.2] tracking-[-0.01em] text-pretty w-full"
            style={{
              fontSize: 'clamp(1.32rem, 2.85vw, 2.05rem)',
              textAlign: 'center',
            }}
          >
            Tu avance en el juego{' '}
            <span style={{ color: '#A678CC', WebkitTextStroke: '1px #1A1A1A', paintOrder: 'stroke fill' }}>
              refleja tu avance
            </span>{' '}
            en la historia.
          </p>
        </motion.div>

        {/* Sub-quote */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          <p className="font-pixelify w-full text-xs md:text-[13px] text-ink/60 tracking-wider uppercase" style={{ textAlign: 'center' }}>
            ✦ Prepárate para romper el ciclo ✦
          </p>
        </motion.div>

        {/* Narrative doodle — in flow, above badge */}
        <div className="flex w-full justify-center py-0.5 md:py-1" aria-hidden="true">
          <svg viewBox="0 0 280 20" width="min(240px, 68%)" height={18}>
            <path
              d="M8 12 Q40 5 72 12 Q104 19 136 12 Q168 5 200 12 Q232 19 272 9"
              fill="none"
              stroke="rgba(77,143,58,0.34)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bottom signature */}
        <motion.div
          className="mt-1.5 md:mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-fredoka text-sm font-semibold text-ink"
          style={{ background: '#FFE566', border: P_BORDER, boxShadow: P_SHADOW_SM }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.85, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          🎮 UnderRise Studio
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MINI STATS / DETAILS ROW
══════════════════════════════════════════════════════════════════ */
function PurposeStats({ inView }) {
  const items = [
    { icon: '🏫', label: 'Proyecto universitario', sub: 'Universidad del Norte', tone: '#C9A8E0', tilt: -1.6, sticker: '✦' },
    { icon: '🎯', label: '3 niveles simbólicos',   sub: 'Huida · Parkour · VR', tone: '#FFE566', tilt: 1.2, sticker: '▶' },
    { icon: '💙', label: 'Genera conciencia',       sub: 'Bullying & empatía', tone: '#A8D4F5', tilt: -1.1, sticker: '♥' },
    { icon: '🆓', label: 'Gratis para todos',        sub: 'PC · MacOS · Web', tone: '#A8D8A8', tilt: 1.4, sticker: '★' },
  ]

  return (
    <div
      className="grid w-full shrink-0 grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-3 sm:gap-x-2.5 md:gap-x-3 md:gap-y-3.5 px-2 sm:px-3 md:px-4 box-border"
      style={{
        width: 'min(100%, 64rem)',
        marginInline: 'auto',
      }}
    >
      {items.map(({ icon, label, sub, tone, tilt, sticker }, i) => (
        <motion.div
          key={i}
          className="group relative flex flex-col items-center text-center gap-1.5 p-4.5 md:p-5 rounded-[0.95rem] overflow-hidden cursor-default"
          style={{
            background: '#FFFFFF',
            border:     P_BORDER,
            boxShadow:  P_SHADOW_MD,
          }}
          initial={{ opacity: 0, y: 24, scale: 0.88 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.88 }}
          transition={{ delay: 0.55 + i * 0.1, type: 'spring', stiffness: 200, damping: 14 }}
          whileHover={{
            y: -3,
            rotate: tilt * 0.9,
            scale: 1.014,
            boxShadow: `${P_SHADOW_HOVER}, 0 0 22px ${tone}2e`,
            transition: { type: 'spring', stiffness: 420, damping: 20 },
          }}
          whileTap={{
            y: -1,
            scale: 0.992,
            rotate: tilt * 0.45,
            transition: { type: 'spring', stiffness: 500, damping: 22 },
          }}
        >
          {/* Soft tone glow on hover */}
          <div
            className="absolute inset-0 rounded-[0.95rem] pointer-events-none opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
            style={{
              background: `radial-gradient(ellipse 85% 75% at 50% 35%, ${tone}30 0%, transparent 68%)`,
            }}
            aria-hidden="true"
          />

          <div
            className="absolute inset-[3px] rounded-[0.62rem] pointer-events-none"
            style={{ border: P_INNER, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}
            aria-hidden="true"
          />

          <span
            className="absolute top-0 left-0 w-3.5 h-3.5 pointer-events-none transition-transform duration-300 ease-out group-hover:scale-110"
            style={{ background: `${tone}90`, clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
            aria-hidden="true"
          />
          <span
            className="absolute bottom-0 right-0 w-3.5 h-3.5 pointer-events-none transition-transform duration-300 ease-out group-hover:scale-110"
            style={{ background: `${tone}70`, clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }}
            aria-hidden="true"
          />
          <motion.span
            className="absolute -top-1.5 -right-1.5 z-[2] w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold pointer-events-none transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:rotate-[10deg] group-hover:scale-110"
            style={{ background: tone, border: P_BORDER, boxShadow: P_SHADOW_SM }}
            animate={{ y: [0, -1.2, 0], rotate: [-3, 2, -3] }}
            transition={{ duration: 3.2 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            {sticker}
          </motion.span>

          <div
            className="absolute left-3 right-3 top-0 h-px opacity-80 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `linear-gradient(90deg, transparent, ${tone}, transparent)` }}
            aria-hidden="true"
          />

          <motion.span
            className="relative z-[1] text-[1.62rem] mt-0.5 transition-transform duration-200 ease-out group-hover:scale-[1.07] group-hover:-translate-y-0.5"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3 + i * 0.35, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            {icon}
          </motion.span>
          <span className="relative z-[1] font-fredoka text-[13px] md:text-sm font-bold text-ink leading-tight max-w-[15ch] transition-transform duration-200 group-hover:-translate-y-px">
            {label}
          </span>
          <span className="relative z-[1] font-fredoka text-[11px] md:text-xs font-medium text-ink/65 leading-snug">
            {sub}
          </span>

          <motion.span
            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full pointer-events-none transition-all duration-300 group-hover:w-10 group-hover:opacity-30"
            style={{ background: 'rgba(26,26,26,0.12)' }}
            animate={{ opacity: [0.15, 0.22, 0.15], scaleX: [0.92, 1.04, 0.92] }}
            transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   EMOTIONAL JOURNEY THREAD — one memorable hand-drawn path (problem → quote)
══════════════════════════════════════════════════════════════════ */
function EmotionalJourneyThread({ inView }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-lg md:max-w-2xl pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 72"
        className="mx-auto block h-12 w-full md:h-[4.5rem]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="purposeJourneyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5590C8" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#A678CC" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#4D8F3A" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Notebook-style hand path: ciclo → avance */}
        <motion.path
          d="M28 54 Q108 8 260 36 T492 18"
          fill="none"
          stroke="url(#purposeJourneyGrad)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 2.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
            opacity: { duration: 0.35, delay: 0.5 },
          }}
        />

        <motion.circle
          cx="28"
          cy="54"
          r="3.5"
          fill="#A8D4F5"
          stroke="#1A1A1A"
          strokeWidth="1.25"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 1.15, type: 'spring', stiffness: 320, damping: 14 }}
        />
        <motion.circle
          cx="492"
          cy="18"
          r="3.5"
          fill="#A8D8A8"
          stroke="#1A1A1A"
          strokeWidth="1.25"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 2.05, type: 'spring', stiffness: 320, damping: 14 }}
        />
      </svg>

      <motion.span
        className="absolute right-[4%] top-[8%] font-fredoka text-[11px] font-semibold tracking-wide"
        style={{ color: 'rgba(123,79,160,0.48)' }}
        initial={{ opacity: 0, y: 5 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
        transition={{ delay: 2.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        tu camino ✦
      </motion.span>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════════════ */
export default function Purpose() {
  const { ref, inView } = useReveal(0.1)

  return (
    <section
      id="about"
      ref={ref}
      className="relative section-spacing overflow-hidden"
      style={{ background: '#FEFAE0' }}
    >
      {/* Subtle top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(90deg, #C9A8E0 0px, #C9A8E0 10px, transparent 10px, transparent 20px)',
          opacity: 0.35,
        }}
      />

      {/* Background grid — fades toward center, more visible at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(166,120,204,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(166,120,204,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.04,
          maskImage: 'radial-gradient(ellipse 75% 80% at 50% 50%, transparent 20%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 80% at 50% 50%, transparent 20%, black 100%)',
        }}
      />

      {/* Ambient layer separation — subtle depth haze */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 78% 62% at 50% 48%, rgba(255,255,255,0) 0%, rgba(166,120,204,0.06) 62%, rgba(26,26,26,0.04) 100%)',
        }}
      />

      <div className="container-game relative space-y-14 md:space-y-16">
        {/* ── Section title ── */}
        <SectionTitle inView={inView} />

        {/* ── Two cards + shared decor centered on the pair ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 items-stretch">
          <div className="col-span-1 flex w-full justify-center md:col-span-2">
            <PixelDivider />
          </div>
          {CARDS.map((card) => (
            <PurposeCard key={card.id} card={card} inView={inView} />
          ))}
          <div className="col-span-1 flex w-full justify-center md:col-span-2 -mt-1 md:-mt-2">
            <EmotionalJourneyThread inView={inView} />
          </div>
        </div>

        {/* ── Central quote ── */}
        <CentralQuote inView={inView} />

        {/* ── Stats row — grupo centrado en la sección */}
        <div
          className="flex w-full justify-center"
          style={{ marginTop: '3.5rem' }}
        >
          <PurposeStats inView={inView} />
        </div>

      </div>

      {/* Subtle bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(90deg, #A8D8A8 0px, #A8D8A8 10px, transparent 10px, transparent 20px)',
          opacity: 0.35,
        }}
      />
    </section>
  )
}
