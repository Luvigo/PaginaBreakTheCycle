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
    <div className="flex items-center gap-3 w-full max-w-xs mx-auto" aria-hidden="true">
      <div className="flex-1 border-b-2 border-dashed border-ink/15" />
      <PixelStar color="#C9A8E0" size={12} />
      <PixelStar color="#FFE566" size={10} />
      <PixelStar color="#A8D8A8" size={12} />
      <div className="flex-1 border-b-2 border-dashed border-ink/15" />
    </div>
  )
}

/* Small doodle squiggle as decorative element */
function DoodleArrow({ flip = false }) {
  return (
    <svg viewBox="0 0 48 24" width={48} height={24} aria-hidden="true"
      style={{ transform: flip ? 'scaleX(-1)' : 'none', opacity: 0.3 }}
    >
      <path d="M4 12 Q12 4 20 12 Q28 20 36 12 L44 12" fill="none" stroke="#A678CC" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 7 L44 12 L38 17" fill="none" stroke="#A678CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
        style={{ background: '#FFE566', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
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
  const { icon, tag, title, body, bg, accent, shadow, deco, delay } = card
  return (
    <motion.div
      {...revealUp(delay)}
      animate={inView ? revealUp(delay).animate : revealUp(delay).initial}
      whileHover={{
        y: -7,
        boxShadow:  '8px 8px 0 #1A1A1A',
        transition: { type: 'spring', stiffness: 320, damping: 16 },
      }}
      className="relative flex flex-col gap-5 p-7 md:p-8 rounded-2xl cursor-default overflow-hidden"
      style={{
        background: bg,
        border:     '3px solid #1A1A1A',
        boxShadow:  '5px 5px 0 #1A1A1A',
        minHeight:  260,
      }}
    >
      {/* Subtle inner highlight top edge */}
      <div
        className="absolute top-0 left-4 right-4 h-px pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.7)' }}
      />

      {/* Floating mini deco emojis — top right */}
      <div className="absolute top-4 right-5 flex gap-1.5 text-base opacity-45 select-none">
        {deco.map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 2.8 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      {/* Tag pill */}
      <div className="inline-flex items-center gap-1.5 w-fit">
        <motion.span
          className="font-pixelify text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg"
          style={{
            background: 'rgba(255,255,255,0.65)',
            border:     '2px solid #1A1A1A',
            color:      accent,
            boxShadow:  '2px 2px 0 rgba(0,0,0,0.18)',
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {icon} {tag}
        </motion.span>
      </div>

      {/* Title */}
      <h3
        className="font-fredoka font-bold text-ink leading-tight"
        style={{ fontSize: 'clamp(1.35rem, 2.6vw, 1.8rem)' }}
      >
        {title}
      </h3>

      {/* Body */}
      <p className="font-fredoka text-[15px] md:text-base text-ink/85 leading-relaxed flex-1">
        {body}
      </p>

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
      className="relative text-center py-14 md:py-20 px-8 md:px-16 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5EEC8 0%, #FFF8E7 45%, #EEF9E8 100%)',
        border:     '3px solid #1A1A1A',
        boxShadow:  '6px 6px 0 #1A1A1A',
      }}
    >
      {/* Pixel grid — fades toward center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(166,120,204,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(166,120,204,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          opacity: 0.04,
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, black 100%)',
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
            ? { opacity: 0.35, y: [0, -5, 0], rotate: [-2, 2, -2] }
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

      {/* Notebook line decoration — left margin */}
      <div
        className="absolute left-7 top-8 bottom-8 w-px hidden md:block pointer-events-none"
        style={{ background: 'repeating-linear-gradient(to bottom, #FFB3C6 0px, #FFB3C6 6px, transparent 6px, transparent 14px)', opacity: 0.4 }}
      />

      {/* Opening quote mark */}
      <div
        className="font-bold select-none mb-2"
        style={{
          color: '#C9A8E0', opacity: 0.2,
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(4rem, 10vw, 7rem)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >❝</div>

      {/* Main quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <p
          className="font-fredoka font-semibold text-ink leading-snug"
          style={{ fontSize: 'clamp(1.3rem, 3.2vw, 2.1rem)', maxWidth: '640px', textAlign: 'center', width: '100%' }}
        >
          Tu avance en el juego{' '}
          <span style={{ color: '#A678CC', WebkitTextStroke: '1px #1A1A1A', paintOrder: 'stroke fill' }}>
            refleja tu avance
          </span>{' '}
          en la historia.
        </p>
      </motion.div>

      {/* Sub-quote */}
      <motion.p
        className="font-pixelify text-xs md:text-[13px] text-ink/60 tracking-wider uppercase mt-5"
        style={{ textAlign: 'center' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.75, duration: 0.7 }}
      >
        ✦ Prepárate para romper el ciclo ✦
      </motion.p>

      {/* Doodle wavy line below sub-quote */}
      <div className="flex justify-center mt-3">
        <svg viewBox="0 0 180 10" width={180} height={10} aria-hidden="true">
          <path d="M4 5 Q20 1 36 5 Q52 9 68 5 Q84 1 100 5 Q116 9 132 5 Q148 1 164 5 Q172 7 176 5"
            fill="none" stroke="#A8D8A8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bottom signature */}
      <motion.div
        className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-fredoka text-sm font-semibold text-ink"
        style={{ background: '#FFE566', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.85, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05, y: -2 }}
      >
        🎮 UnderRise Studio
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   MINI STATS / DETAILS ROW
══════════════════════════════════════════════════════════════════ */
function PurposeStats({ inView }) {
  const items = [
    { icon: '🏫', label: 'Proyecto universitario', sub: 'Universidad del Norte' },
    { icon: '🎯', label: '3 niveles simbólicos',   sub: 'Huida · Parkour · VR' },
    { icon: '💙', label: 'Genera conciencia',       sub: 'Bullying & empatía' },
    { icon: '🆓', label: 'Gratis para todos',        sub: 'PC · MacOS · Web' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {items.map(({ icon, label, sub }, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center text-center gap-1.5 p-5 rounded-xl"
          style={{
            background: '#FFFFFF',
            border:     '3px solid #1A1A1A',
            boxShadow:  '4px 4px 0 #1A1A1A',
          }}
          initial={{ opacity: 0, y: 24, scale: 0.88 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.88 }}
          transition={{ delay: 0.55 + i * 0.1, type: 'spring', stiffness: 200, damping: 14 }}
          whileHover={{ y: -5, boxShadow: '6px 6px 0 #1A1A1A', transition: { type: 'spring', stiffness: 360, damping: 16 } }}
        >
          <motion.span
            className="text-2xl"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          >
            {icon}
          </motion.span>
          <span className="font-fredoka text-sm font-bold text-ink leading-tight">{label}</span>
          <span className="font-fredoka text-xs font-medium text-ink/65">{sub}</span>
        </motion.div>
      ))}
    </div>
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

      <div className="container-game relative space-y-14 md:space-y-16">

        {/* ── Section title ── */}
        <SectionTitle inView={inView} />

        <PixelDivider />

        {/* ── Two cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {CARDS.map((card) => (
            <PurposeCard key={card.id} card={card} inView={inView} />
          ))}
        </div>

        {/* ── Doodle arrows pointing toward quote ── */}
        <div className="hidden md:flex justify-center gap-16 -mb-8">
          <DoodleArrow />
          <DoodleArrow flip />
        </div>

        {/* ── Central quote ── */}
        <CentralQuote inView={inView} />

        {/* ── Stats row ── */}
        <div style={{ marginTop: '3.5rem' }}>
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
