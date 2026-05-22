import { useRef } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Download, Play } from 'lucide-react'

/* ══════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════════════════════════════════ */
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.8 } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.7 },
  show:   { opacity: 1, scale: 1,
            transition: { type: 'spring', stiffness: 220, damping: 14 } },
}

/* ══════════════════════════════════════════════════════════════════════
   COLORFUL TITLE
   Inspirado directamente en el logo handmade del proyecto.
   ──────────────────────────────────────────────────────────────────────
   NOTA: Cuando tengas el PNG oficial, reemplaza <ColorfulTitle /> con:
   <img src={logoImg} alt="Break The Cycle" className="w-72 md:w-[420px] mx-auto" />
══════════════════════════════════════════════════════════════════════ */
const BREAK_LETTERS = [
  { char: 'B', color: '#FF5757', rotate: -3,   bobDur: '2.8s', bobDelay: '0s'    },
  { char: 'r', color: '#FF9F43', rotate:  2.5, bobDur: '3.2s', bobDelay: '0.15s' },
  { char: 'e', color: '#2BC0B4', rotate: -2,   bobDur: '2.6s', bobDelay: '0.3s'  },
  { char: 'a', color: '#58D68D', rotate:  3,   bobDur: '3.4s', bobDelay: '0.1s'  },
  { char: 'K', color: '#FF6FC8', rotate: -1.5, bobDur: '3.0s', bobDelay: '0.25s' },
]
const CYCLE_LETTERS = [
  { char: 'C', color: '#A678CC', rotate:  2,   bobDur: '3.1s', bobDelay: '0.2s'  },
  { char: 'y', color: '#FF5757', rotate: -3,   bobDur: '2.9s', bobDelay: '0.35s' },
  { char: 'c', color: '#FFBD2E', rotate:  2.5, bobDur: '3.3s', bobDelay: '0s'    },
  { char: 'l', color: '#58D68D', rotate: -2,   bobDur: '2.7s', bobDelay: '0.15s' },
  { char: 'e', color: '#57ABD6', rotate:  3,   bobDur: '3.5s', bobDelay: '0.3s'  },
]

function TitleLetter({ char, color, rotate, bobDur, bobDelay, delay = 0 }) {
  return (
    <motion.span
      className="title-letter select-none"
      style={{
        color,
        '--r':         `${rotate}deg`,
        '--bob-dur':   bobDur,
        '--bob-delay': bobDelay,
        transform:     `rotate(${rotate}deg)`,
        /* Natural horizontal rhythm — Fredoka's own kerning is enough */
        marginLeft:  '-0.01em',
        marginRight: '-0.01em',
      }}
      initial={{ opacity: 0, y: 34, rotate: rotate + 10, scale: 0.7 }}
      animate={{ opacity: 1, y: 0,  rotate,              scale: 1   }}
      transition={{ type: 'spring', stiffness: 210, damping: 15, delay: 0.3 + delay }}
      whileHover={{
        y: -9, scale: 1.16,
        transition: { type: 'spring', stiffness: 440, damping: 10 },
      }}
    >
      {char}
    </motion.span>
  )
}

function ColorfulTitle() {
  /*
    Interlineado compacto: la distancia VERTICAL entre las tres líneas
    se controla con marginBottom en "Break", marginTop/Bottom en "the",
    y marginTop en "Cycle". Objetivo: las tres líneas casi se tocan,
    como un logo de videojuego real.
  */
  const FS = 'clamp(3.2rem, 11vw, 7rem)'

  return (
    <div className="flex flex-col items-center select-none" style={{ overflow: 'visible', gap: 0 }}>

      {/* Línea 1 — "Break" */}
      <div
        className="flex items-baseline"
        style={{ fontSize: FS, overflow: 'visible', marginBottom: '-0.10em' }}
      >
        {BREAK_LETTERS.map((l, i) => (
          <TitleLetter key={i} {...l} delay={i * 0.07} />
        ))}
      </div>

      {/* Línea 2 — "the" */}
      <motion.span
        className="title-word-the"
        style={{
          fontSize:      'clamp(0.85rem, 2.6vw, 1.9rem)',
          letterSpacing: '0.12em',
          lineHeight:    1,
          marginBottom:  '-0.22em',
          zIndex:        1,
        }}
        initial={{ opacity: 0, scaleX: 0.4, y: 4 }}
        animate={{ opacity: 1, scaleX: 1,   y: 0 }}
        transition={{ delay: 0.7, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        the
      </motion.span>

      {/* Línea 3 — "Cycle" */}
      <div
        className="flex items-baseline"
        style={{ fontSize: FS, overflow: 'visible' }}
      >
        {CYCLE_LETTERS.map((l, i) => (
          <TitleLetter key={i} {...l} delay={0.44 + i * 0.07} />
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   SVG PIXEL ELEMENTS
══════════════════════════════════════════════════════════════════════ */
function PixelCloud({ scale = 1 }) {
  const w = 64 * scale
  const h = 32 * scale
  return (
    <svg viewBox="0 0 64 32" width={w} height={h}
      style={{ imageRendering: 'pixelated' }} aria-hidden="true"
    >
      <rect x="16" y="16" width="32" height="8"  fill="rgba(255,255,255,0.95)" />
      <rect x="8"  y="16" width="8"  height="8"  fill="rgba(255,255,255,0.95)" />
      <rect x="48" y="16" width="8"  height="8"  fill="rgba(255,255,255,0.95)" />
      <rect x="16" y="8"  width="16" height="8"  fill="rgba(255,255,255,0.95)" />
      <rect x="24" y="0"  width="16" height="8"  fill="rgba(255,255,255,0.95)" />
      <rect x="8"  y="22" width="48" height="2"  fill="rgba(0,0,0,0.08)" />
    </svg>
  )
}

function PixelStar({ color = '#FFE566', size = 16 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}
      style={{ imageRendering: 'pixelated' }} aria-hidden="true"
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
      <rect x="5"  y="5"  width="6" height="6" fill="rgba(255,255,255,0.35)" />
    </svg>
  )
}

function PixelBird({ top, delay = 0, duration = 22, invertY = false }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{ top, zIndex: 3 }}
      initial={{ x: -60 }}
      animate={{ x: 'calc(100vw + 80px)' }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <motion.svg
        viewBox="0 0 22 12" width={22} height={12}
        style={{ imageRendering: 'pixelated', transform: invertY ? 'scaleY(-1)' : 'none' }}
      >
        {/* Wings flapping via y-transforms would require canvas, use static M-shape */}
        <rect x="0"  y="6"  width="4" height="2" fill="rgba(40,40,70,0.45)" />
        <rect x="4"  y="4"  width="4" height="2" fill="rgba(40,40,70,0.45)" />
        <rect x="8"  y="2"  width="4" height="2" fill="rgba(40,40,70,0.45)" />
        <rect x="12" y="0"  width="2" height="2" fill="rgba(40,40,70,0.45)" />
        <rect x="14" y="2"  width="4" height="2" fill="rgba(40,40,70,0.45)" />
        <rect x="18" y="4"  width="4" height="2" fill="rgba(40,40,70,0.45)" />
      </motion.svg>
    </motion.div>
  )
}

function PixelTree({ w = 64, h = 96 }) {
  const tw = w; const th = h
  const trunkW = Math.round(tw * 0.25)
  const trunkX = Math.round((tw - trunkW) / 2)
  const trunkH = Math.round(th * 0.25)
  const trunkY = th - trunkH
  return (
    <svg viewBox={`0 0 ${tw} ${th}`} width={tw} height={th}
      style={{ imageRendering: 'pixelated', display: 'block' }} aria-hidden="true"
    >
      <rect x={trunkX} y={trunkY} width={trunkW} height={trunkH} fill="#7A4F2A" />
      <rect x={Math.round(tw*0.1)} y={Math.round(th*0.55)} width={Math.round(tw*0.8)} height={Math.round(th*0.22)} fill="#4E8A2E" />
      <rect x={0}                  y={Math.round(th*0.62)} width={tw}                  height={Math.round(th*0.15)} fill="#4E8A2E" />
      <rect x={Math.round(tw*0.2)} y={Math.round(th*0.35)} width={Math.round(tw*0.6)} height={Math.round(th*0.24)} fill="#62A83C" />
      <rect x={Math.round(tw*0.3)} y={Math.round(th*0.15)} width={Math.round(tw*0.4)} height={Math.round(th*0.24)} fill="#7EC850" />
      <rect x={Math.round(tw*0.35)} y={0} width={Math.round(tw*0.3)} height={Math.round(th*0.18)} fill="#9BD96A" />
    </svg>
  )
}

function PixelCoin({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}
      style={{ imageRendering: 'pixelated' }} aria-hidden="true"
    >
      <rect x="8"  y="2"  width="8"  height="2" fill="#FFD93D" />
      <rect x="6"  y="4"  width="12" height="2" fill="#FFD93D" />
      <rect x="4"  y="6"  width="16" height="12" fill="#FFD93D" />
      <rect x="6"  y="18" width="12" height="2" fill="#FFD93D" />
      <rect x="8"  y="20" width="8"  height="2" fill="#FFD93D" />
      <rect x="9"  y="6"  width="3"  height="12" fill="rgba(255,255,255,0.45)" />
      <rect x="4"  y="6"  width="2"  height="12" fill="rgba(0,0,0,0.12)" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   STORYTELLING SVGs — school, silhouettes, dialog
   Sutil, emocional, estilo indie educativo.
══════════════════════════════════════════════════════════════════════ */

/** Pixel school building — appears in midground */
function PixelSchool() {
  return (
    <svg viewBox="0 0 100 72" width={100} height={72}
      style={{ imageRendering: 'pixelated' }} aria-hidden="true"
    >
      {/* Shadow */}
      <rect x="6" y="66" width="88" height="6" fill="rgba(0,0,0,0.08)" rx="2" />
      {/* Body */}
      <rect x="4"  y="26" width="92" height="42" fill="#FFF8E7" />
      <rect x="4"  y="26" width="92" height="42" fill="none" stroke="#1A1A1A" strokeWidth="2" />
      {/* Roof band */}
      <rect x="0"  y="18" width="100" height="10" fill="#FF8080" />
      <rect x="0"  y="18" width="100" height="10" fill="none" stroke="#1A1A1A" strokeWidth="2" />
      {/* Clock tower */}
      <rect x="40" y="4"  width="20" height="16" fill="#FFE566" />
      <rect x="40" y="4"  width="20" height="16" fill="none" stroke="#1A1A1A" strokeWidth="2" />
      {/* Clock circle */}
      <circle cx="50" cy="12" r="5" fill="white" stroke="#1A1A1A" strokeWidth="1.5" />
      <rect x="49" y="9"  width="2" height="4" fill="#1A1A1A" />
      <rect x="49" y="11" width="4" height="2" fill="#1A1A1A" />
      {/* Flag pole */}
      <rect x="48" y="0" width="2" height="6" fill="#1A1A1A" />
      <rect x="50" y="1" width="8" height="4" fill="#FF5757" />
      {/* Window left */}
      <rect x="12" y="32" width="18" height="14" fill="#A8D4F5" />
      <rect x="12" y="32" width="18" height="14" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
      <rect x="20" y="32" width="2"  height="14" fill="rgba(0,0,0,0.15)" />
      <rect x="12" y="39" width="18" height="2"  fill="rgba(0,0,0,0.15)" />
      {/* Window right */}
      <rect x="70" y="32" width="18" height="14" fill="#A8D4F5" />
      <rect x="70" y="32" width="18" height="14" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
      <rect x="78" y="32" width="2"  height="14" fill="rgba(0,0,0,0.15)" />
      <rect x="70" y="39" width="18" height="2"  fill="rgba(0,0,0,0.15)" />
      {/* Door */}
      <rect x="38" y="46" width="24" height="22" fill="#C9A8E0" />
      <rect x="38" y="46" width="24" height="22" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
      {/* Door knob */}
      <circle cx="56" cy="58" r="2" fill="#FFD93D" />
      {/* Steps */}
      <rect x="34" y="66" width="32" height="4" fill="#E0D5B0" />
      <rect x="34" y="66" width="32" height="4" fill="none" stroke="#1A1A1A" strokeWidth="1" />
      {/* Sign */}
      <rect x="30" y="26" width="40" height="8" fill="#FFE566" />
      <rect x="30" y="26" width="40" height="8" fill="none" stroke="#1A1A1A" strokeWidth="1" />
    </svg>
  )
}

/**
 * Pixel silhouettes — two characters telling a story of bullying & empathy.
 * Person A: alone, head slightly down (isolated).
 * Person B: approaching with arm extended (offering help).
 */
function PixelSilhouettes() {
  return (
    <svg viewBox="0 0 80 40" width={88} height={44}
      style={{ imageRendering: 'pixelated' }} aria-hidden="true"
    >
      {/* ── Person A — alone, head down ── */}
      {/* Head */}
      <rect x="6"  y="0"  width="10" height="10" fill="#FF9F80" />
      {/* Hair */}
      <rect x="6"  y="0"  width="10" height="3"  fill="#5C3A1E" />
      {/* Body */}
      <rect x="7"  y="10" width="8"  height="12" fill="#A8D4F5" />
      {/* Arms — down/drooping */}
      <rect x="3"  y="11" width="4"  height="8"  fill="#A8D4F5" />
      <rect x="15" y="11" width="4"  height="8"  fill="#A8D4F5" />
      {/* Hands */}
      <rect x="3"  y="19" width="4"  height="3"  fill="#FF9F80" />
      <rect x="15" y="19" width="4"  height="3"  fill="#FF9F80" />
      {/* Legs */}
      <rect x="7"  y="22" width="4"  height="10" fill="#6B4A30" />
      <rect x="11" y="22" width="4"  height="10" fill="#6B4A30" />
      {/* Feet */}
      <rect x="5"  y="32" width="6"  height="4"  fill="#1A1A1A" />
      <rect x="11" y="32" width="6"  height="4"  fill="#1A1A1A" />
      {/* Sad face */}
      <rect x="8"  y="4"  width="2"  height="2"  fill="#1A1A1A" />
      <rect x="12" y="4"  width="2"  height="2"  fill="#1A1A1A" />
      <rect x="9"  y="8"  width="4"  height="1"  fill="#1A1A1A" />
      {/* Tear */}
      <rect x="9"  y="7"  width="1"  height="2"  fill="#A8D4F5" />

      {/* ── Person B — se acerca con mano extendida (gesto de apoyo/solidaridad) ── */}
      {/* Head */}
      <rect x="58" y="0"  width="10" height="10" fill="#FFCC99" />
      {/* Hair — gorra/pelo diferente para distinguir */}
      <rect x="57" y="0"  width="12" height="4"  fill="#FF5757" />
      <rect x="59" y="4"  width="8"  height="2"  fill="#FF5757" />
      {/* Body */}
      <rect x="59" y="10" width="8"  height="12" fill="#A8D8A8" />
      {/* Brazo izquierdo extendido hacia Person A — horizontal, gesto neutro */}
      <rect x="44" y="11" width="15" height="3"  fill="#A8D8A8" />
      {/* Mano abierta — palma plana, sin corazón */}
      <rect x="40" y="10" width="5"  height="5"  fill="#FFCC99" />
      <rect x="38" y="11" width="3"  height="2"  fill="#FFCC99" />
      {/* Dedos separados (estilo pixel "stop / hola") */}
      <rect x="40" y="8"  width="2"  height="3"  fill="#FFCC99" />
      <rect x="43" y="8"  width="2"  height="3"  fill="#FFCC99" />
      {/* Brazo derecho — normal al costado */}
      <rect x="67" y="11" width="4"  height="8"  fill="#A8D8A8" />
      {/* Legs — walking pose */}
      <rect x="59" y="22" width="4"  height="10" fill="#5C3A1E" />
      <rect x="63" y="22" width="4"  height="8"  fill="#5C3A1E" />
      {/* Feet */}
      <rect x="57" y="32" width="6"  height="4"  fill="#1A1A1A" />
      <rect x="63" y="30" width="6"  height="4"  fill="#1A1A1A" />
      {/* Smile */}
      <rect x="60" y="4"  width="2"  height="2"  fill="#1A1A1A" />
      <rect x="64" y="4"  width="2"  height="2"  fill="#1A1A1A" />
      <rect x="61" y="7"  width="5"  height="2"  fill="#1A1A1A" />
      <rect x="60" y="8"  width="2"  height="1"  fill="#1A1A1A" />
      <rect x="65" y="8"  width="2"  height="1"  fill="#1A1A1A" />
    </svg>
  )
}

/** Pixel speech bubble — floats above the characters */
function PixelBubble({ text = '💙', bg = '#FFB3C6' }) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className="px-2.5 py-1.5 rounded-xl font-fredoka text-sm font-bold text-ink"
        style={{
          background: bg,
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
        }}
      >
        {text}
      </div>
      {/* Tail */}
      <div style={{
        width: 0, height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: `8px solid #1A1A1A`,
        marginTop: -1,
      }} />
      <div style={{
        width: 0, height: 0,
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderTop: `7px solid ${bg}`,
        marginTop: -8,
      }} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   HERO BACKGROUND — 6 parallax layers
══════════════════════════════════════════════════════════════════════ */
function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Layer 0 — Sky gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #9DDBF5 0%, #C4EBF9 22%, #DFF5F0 45%, #EEF9E8 65%, #F8FAE8 85%, #FEFAE0 100%)',
      }} />

      {/* Layer 1 — Sun */}
      <motion.div
        className="absolute"
        style={{ top: '5%', right: '6%' }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1, type: 'spring', stiffness: 80 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 96 96" width={80} height={80} style={{ imageRendering: 'pixelated' }}>
            {/* Rays */}
            {[0,45,90,135,180,225,270,315].map((deg, i) => (
              <rect key={i}
                x="46" y="0" width="4" height="10" fill="#FFD93D"
                transform={`rotate(${deg} 48 48)`}
              />
            ))}
            {/* Body */}
            <rect x="20" y="20" width="56" height="56" rx="2" fill="#FFD93D" />
            <rect x="24" y="24" width="24" height="24" fill="#FFE566" />
            {/* Face */}
            <rect x="30" y="34" width="6" height="6" fill="#1A1A1A" />
            <rect x="52" y="34" width="6" height="6" fill="#1A1A1A" />
            <rect x="32" y="50" width="24" height="4" fill="#1A1A1A" />
            <rect x="36" y="54" width="4"  height="4" fill="#FFD93D" />
            <rect x="48" y="54" width="4"  height="4" fill="#FFD93D" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layer 2 — Far clouds (very slow) */}
      {[
        { scale: 2.2, top: '8%',  left: '2%',  dur: 38, delay: 0   },
        { scale: 1.8, top: '14%', left: '55%', dur: 45, delay: 12  },
      ].map((c, i) => (
        <motion.div key={i} className="absolute" style={{ top: c.top, left: c.left, opacity: 0.7 }}
          animate={{ x: [0, c.dur < 40 ? -40 : -20, 0] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
        >
          <PixelCloud scale={c.scale} />
        </motion.div>
      ))}

      {/* Layer 3 — Near clouds */}
      {[
        { scale: 1.6, top: '18%', left: '28%', dur: 22, delay: 5  },
        { scale: 1.3, top: '10%', right: '20%', dur: 28, delay: 15 },
      ].map((c, i) => (
        <motion.div key={i} className="absolute"
          style={{ top: c.top, left: c.left, right: c.right, opacity: 0.9 }}
          animate={{ x: [0, 22, 0] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
        >
          <PixelCloud scale={c.scale} />
        </motion.div>
      ))}

      {/* Layer 4 — Pixel birds */}
      <PixelBird top="16%"  delay={3}  duration={26} />
      <PixelBird top="22%"  delay={10} duration={32} />
      <PixelBird top="12%"  delay={18} duration={22} />

      {/* Layer 5 — Stars / sparkles */}
      {[
        { top: '12%', left: '20%',  size: 16, color: '#FFE566', delay: 0,   dur: '2.2s' },
        { top: '25%', left: '75%',  size: 12, color: '#FFB3C6', delay: 0.6, dur: '1.8s' },
        { top: '8%',  left: '62%',  size: 20, color: '#A8D8A8', delay: 1.2, dur: '2.5s' },
        { top: '30%', left: '12%',  size: 10, color: '#C9A8E0', delay: 0.4, dur: '3.0s' },
        { top: '20%', right: '30%', size: 14, color: '#FFE566', delay: 1.8, dur: '2.0s' },
        { top: '6%',  left: '40%',  size: 8,  color: '#57ABD6', delay: 0.9, dur: '2.8s' },
      ].map(({ top, left, right, size, color, delay, dur }, i) => (
        <motion.div key={i} className="absolute animate-star"
          style={{ top, left, right, animationDuration: dur, animationDelay: `${delay}s` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + delay, type: 'spring', stiffness: 200 }}
        >
          <PixelStar color={color} size={size} />
        </motion.div>
      ))}

      {/* Layer 5b — Floating coins */}
      {[
        { top: '22%', left: '7%',  size: 28, delay: 0   },
        { top: '38%', right: '5%', size: 22, delay: 1.5 },
        { top: '15%', right: '38%',size: 18, delay: 0.8 },
      ].map(({ top, left, right, size, delay }, i) => (
        <motion.div key={i} className="absolute animate-float"
          style={{ top, left, right, animationDuration: `${4 + i}s`, animationDelay: `${delay}s` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + delay }}
        >
          <PixelCoin size={size} />
        </motion.div>
      ))}

      {/* Layer 6 — Midground hills */}
      <div className="absolute bottom-12 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
          className="w-full" style={{ height: 80 }}
        >
          <path d="M0,80 Q200,20 400,55 Q600,90 800,35 Q1000,-5 1200,40 Q1350,70 1440,50 L1440,80 Z"
            fill="rgba(180,230,160,0.5)" />
          <path d="M0,80 Q150,45 300,65 Q500,85 700,50 Q900,15 1100,55 Q1280,85 1440,60 L1440,80 Z"
            fill="rgba(140,210,130,0.6)" />
        </svg>
      </div>

      {/*
        ┌─────────────────────────────────────────────────────┐
        │  NARRATIVE SCENE — GROUND LEVEL                     │
        │  All elements share bottom: 56px = top of grass     │
        │  (ground layer = h-14 = 56px from screen bottom)    │
        │  School → left edge  |  Lockers → right edge        │
        │  Silhouettes → between school and trees, LEFT side  │
        └─────────────────────────────────────────────────────┘
      */}

      {/* Layer 6b — PIXEL SCHOOL — left side, sitting on grass */}
      <motion.div
        className="absolute pointer-events-none hidden sm:block"
        style={{ bottom: 56, left: '6%', zIndex: 2 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Scale up for better presence */}
        <div style={{ transform: 'scale(1.35)', transformOrigin: 'bottom left' }}>
          <PixelSchool />
        </div>
      </motion.div>

      {/* Layer 6c — PIXEL LOCKERS — right side, sitting on grass */}
      <motion.div
        className="absolute pointer-events-none hidden md:block"
        style={{ bottom: 56, right: '6%', zIndex: 2 }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div style={{ transform: 'scale(1.4)', transformOrigin: 'bottom right' }}>
          <svg viewBox="0 0 54 44" width={54} height={44}
            style={{ imageRendering: 'pixelated' }} aria-hidden="true"
          >
            {[0, 18, 36].map((x, i) => (
              <g key={i}>
                <rect x={x} y="0" width="16" height="44"
                  fill={['#A8D4F5','#FFB3C6','#A8D8A8'][i]} />
                <rect x={x} y="0" width="16" height="44"
                  fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
                <rect x={x+3} y="4"  width="10" height="2" fill="rgba(0,0,0,0.15)" />
                <rect x={x+3} y="8"  width="10" height="2" fill="rgba(0,0,0,0.15)" />
                <rect x={x+3} y="12" width="10" height="2" fill="rgba(0,0,0,0.15)" />
                <rect x={x+6} y="24" width="4" height="6"
                  fill="#FFD93D" stroke="#1A1A1A" strokeWidth="1" />
              </g>
            ))}
            <rect x="0" y="42" width="54" height="2" fill="rgba(0,0,0,0.12)" />
          </svg>
        </div>
      </motion.div>

      {/* Layer 6d — NARRATIVE SILHOUETTES
          Positioned to the RIGHT of the school, same ground level.   */}
      <motion.div
        className="absolute pointer-events-none hidden md:block"
        style={{ bottom: 56, left: '22%', zIndex: 3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
      >
        <div className="flex flex-col items-center" style={{ transform: 'scale(1.2)', transformOrigin: 'bottom center' }}>
          {/* Bubbles — float above heads */}
          <div className="flex items-end gap-10 mb-1">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PixelBubble text="😔" bg="#A8D4F5" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            >
              <PixelBubble text="👋 ¡Oye!" bg="#A8D8A8" />
            </motion.div>
          </div>
          <PixelSilhouettes />
        </div>
      </motion.div>

      {/* Layer 7 — Trees */}
      <div className="absolute bottom-12 left-0 flex items-end pointer-events-none">
        <PixelTree w={44} h={72}  />
        <PixelTree w={58} h={96}  />
        <PixelTree w={36} h={60}  />
        <PixelTree w={50} h={82}  />
      </div>
      <div className="absolute bottom-12 right-0 flex items-end pointer-events-none">
        <PixelTree w={50} h={80}  />
        <PixelTree w={36} h={58}  />
        <PixelTree w={60} h={98}  />
        <PixelTree w={44} h={70}  />
      </div>

      {/* Layer 8 — Pixel ground */}
      <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none">
        <div className="absolute bottom-8  left-0 right-0 h-7 bg-[#7EC850]" />
        <div className="absolute bottom-0  left-0 right-0 h-8 bg-[#5AA040]" />
        <div
          className="absolute bottom-14 left-0 right-0 h-2 opacity-70"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #9BD96A 0px, #9BD96A 8px, transparent 8px, transparent 16px)',
          }}
        />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   GENRE TAGS
══════════════════════════════════════════════════════════════════════ */
function GenreTags() {
  const tags = [
    { label: 'Action RPG',  bg: '#C9A8E0', emoji: '⚔️' },
    { label: 'Narrativo',   bg: '#FFB3C6', emoji: '📖' },
    { label: 'Educativo',   bg: '#A8D8A8', emoji: '🎓' },
    { label: 'PC · Free',   bg: '#FFE566', emoji: '💻' },
  ]
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map(({ label, bg, emoji }, i) => (
        <motion.span
          key={label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 220, damping: 14 }}
          whileHover={{ y: -3, scale: 1.06 }}
          className="font-fredoka text-sm font-semibold text-ink px-3 py-1.5 rounded-lg cursor-default"
          style={{
            background: bg,
            border: '2px solid #1A1A1A',
            boxShadow: '2px 2px 0 #1A1A1A',
          }}
        >
          {emoji} {label}
        </motion.span>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   PIXEL CORNER BRACKETS — decoración retro Nintendo
══════════════════════════════════════════════════════════════════════ */
function PixelCorners({ color = '#1A1A1A', size = 8 }) {
  const s = size
  return (
    <>
      {/* top-left */}
      <span className="absolute pointer-events-none"
        style={{ top: -1, left: -1, width: s, height: s,
          borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
      {/* top-right */}
      <span className="absolute pointer-events-none"
        style={{ top: -1, right: -1, width: s, height: s,
          borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
      {/* bottom-left */}
      <span className="absolute pointer-events-none"
        style={{ bottom: -1, left: -1, width: s, height: s,
          borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
      {/* bottom-right */}
      <span className="absolute pointer-events-none"
        style={{ bottom: -1, right: -1, width: s, height: s,
          borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   HERO BUTTONS — microinteracciones premium + pixel corners
══════════════════════════════════════════════════════════════════════ */
function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">

      {/* Primary — Download */}
      <motion.a
        href="https://drive.google.com/drive/folders/1zdccAdilvZ9PDUmkYI25daNMa3I4qrYD?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center justify-center gap-2.5 font-pixelify font-bold text-[15px] text-ink
                   px-8 py-4 rounded-none cursor-pointer select-none w-full sm:w-auto overflow-hidden"
        style={{
          /*
            Retro Nintendo-style layered button:
            1. Outer black border
            2. Bright top/left inner edge → light bevel
            3. Dark bottom/right inner edge → shadow bevel
            4. Hard drop-shadow (offset square)
          */
          background:   'linear-gradient(175deg, #FFE97A 0%, #FFD93D 60%, #F0C820 100%)',
          border:       '3px solid #1A1A1A',
          boxShadow: [
            '5px 5px 0 #1A1A1A',               /* hard outer shadow */
            'inset 0  3px 0 rgba(255,255,255,0.75)',  /* top inner bevel */
            'inset 0 -3px 0 rgba(0,0,0,0.15)',         /* bottom inner bevel */
            'inset  3px 0 0 rgba(255,255,255,0.4)',    /* left inner bevel */
            'inset -3px 0 0 rgba(0,0,0,0.1)',          /* right inner bevel */
          ].join(', '),
          clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
        }}
        whileHover={{
          y: -4,
          boxShadow: [
            '8px 8px 0 #1A1A1A',
            'inset 0  3px 0 rgba(255,255,255,0.75)',
            'inset 0 -3px 0 rgba(0,0,0,0.15)',
            'inset  3px 0 0 rgba(255,255,255,0.4)',
            'inset -3px 0 0 rgba(0,0,0,0.1)',
          ].join(', '),
          transition: { type: 'spring', stiffness: 380, damping: 14 },
        }}
        whileTap={{
          y: 4, x: 4, scale: 0.97,
          boxShadow: '1px 1px 0 #1A1A1A, inset 0 3px 0 rgba(0,0,0,0.15)',
          transition: { duration: 0.06 },
        }}
      >
        <PixelCorners color="rgba(255,255,255,0.5)" size={8} />

        <motion.span
          animate={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        >
          <Download size={17} strokeWidth={2.5} />
        </motion.span>
        Descargar Juego

        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.55) 50%, transparent 75%)' }}
          animate={{ x: ['-140%', '140%'] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.a>

      {/* Secondary — Trailer */}
      <motion.button
        className="relative inline-flex items-center justify-center gap-2.5 font-pixelify font-bold text-[15px] text-ink
                   px-8 py-4 rounded-none cursor-pointer select-none w-full sm:w-auto overflow-hidden"
        style={{
          background:   'linear-gradient(175deg, #FFFFFF 0%, #EDF5FF 60%, #D8EEFF 100%)',
          border:       '3px solid #1A1A1A',
          boxShadow: [
            '5px 5px 0 #1A1A1A',
            'inset 0  3px 0 rgba(255,255,255,0.9)',
            'inset 0 -3px 0 rgba(0,0,0,0.1)',
            'inset  3px 0 0 rgba(255,255,255,0.6)',
            'inset -3px 0 0 rgba(0,0,0,0.06)',
          ].join(', '),
          clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
        }}
        whileHover={{
          y: -4,
          background: 'linear-gradient(175deg, #C8F5D8 0%, #A8D8A8 60%, #8FC87E 100%)',
          boxShadow: [
            '8px 8px 0 #1A1A1A',
            'inset 0  3px 0 rgba(255,255,255,0.8)',
            'inset 0 -3px 0 rgba(0,0,0,0.12)',
            'inset  3px 0 0 rgba(255,255,255,0.5)',
            'inset -3px 0 0 rgba(0,0,0,0.08)',
          ].join(', '),
          transition: { type: 'spring', stiffness: 380, damping: 14 },
        }}
        whileTap={{
          y: 4, x: 4, scale: 0.97,
          boxShadow: '1px 1px 0 #1A1A1A, inset 0 3px 0 rgba(0,0,0,0.12)',
          transition: { duration: 0.06 },
        }}
      >
        <PixelCorners color="rgba(255,255,255,0.6)" size={8} />

        <motion.span
          className="relative flex items-center justify-center w-7 h-7 shrink-0"
          style={{
            background: '#C9A8E0',
            border: '2px solid #1A1A1A',
            clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Play size={9} className="text-ink fill-ink ml-0.5" />
        </motion.span>
        Ver Trailer
      </motion.button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   STATS ROW
══════════════════════════════════════════════════════════════════════ */
function HeroStats() {
  const stats = [
    { value: '3',    label: 'Niveles',    bg: '#FFB3C6' },
    { value: 'PC',   label: 'Plataforma', bg: '#A8D4F5' },
    { value: 'FREE', label: 'Gratis',     bg: '#A8D8A8' },
    { value: '\'26',  label: 'Release',    bg: '#FFE566' },
  ]
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {stats.map(({ value, label, bg }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 + i * 0.09, type: 'spring', stiffness: 200, damping: 13 }}
          whileHover={{ y: -4, scale: 1.08 }}
          className="flex flex-col items-center px-4 py-2 rounded-xl cursor-default"
          style={{ background: bg, border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          <span className="font-pixelify text-sm md:text-base font-bold text-ink leading-none">
            {value}
          </span>
          <span className="font-fredoka text-[10px] font-semibold text-ink/60 uppercase tracking-wider mt-0.5">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   STUDIO BADGE
══════════════════════════════════════════════════════════════════════ */
function StudioBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-fredoka text-sm font-semibold text-ink"
      style={{ background: '#C9A8E0', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
    >
      <motion.span
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        className="inline-block"
      >
        ⭐
      </motion.span>
      UnderRise Studio · Universidad del Norte
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   SCROLL INDICATOR
══════════════════════════════════════════════════════════════════════ */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-18 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
    >
      <span className="font-pixelify text-[8px] text-ink/35 tracking-widest uppercase">Scroll</span>
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        className="w-5 h-8 rounded-full flex justify-center pt-1.5"
        style={{ border: '2px solid rgba(26,26,26,0.2)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#A678CC]" />
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN HERO
══════════════════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-dvh min-h-[660px] max-h-[1080px] flex flex-col items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center gap-4 md:gap-5 px-4 pb-20"
      >
        {/* Studio badge */}
        <motion.div variants={fadeIn}>
          <StudioBadge />
        </motion.div>

        {/* Colorful title — inspirado en el logo handmade original */}
        <div>
          <ColorfulTitle />
        </div>

        {/* Divider */}
        <motion.div variants={fadeIn} className="flex items-center gap-3 w-full max-w-xs">
          <div className="flex-1 h-px" style={{ background: 'repeating-linear-gradient(90deg, rgba(26,26,26,0.15) 0px, rgba(26,26,26,0.15) 6px, transparent 6px, transparent 12px)' }} />
          <PixelCoin size={18} />
          <div className="flex-1 h-px" style={{ background: 'repeating-linear-gradient(90deg, rgba(26,26,26,0.15) 0px, rgba(26,26,26,0.15) 6px, transparent 6px, transparent 12px)' }} />
        </motion.div>

        {/* Emotional message */}
        <motion.div variants={fadeUp} className="max-w-xs sm:max-w-sm md:max-w-md space-y-1.5">
          <p className="font-fredoka text-base md:text-lg font-medium text-ink/80 leading-snug">
            El bullying no es un juego.{' '}
            <span className="font-semibold" style={{ color: '#7B4FA0' }}>
              Romper el ciclo es un acto de valentía.
            </span>
          </p>
          <p className="font-fredoka text-sm font-semibold tracking-wider" style={{ color: '#5AA040' }}>
            ✦ Transforma la presión en libertad ✦
          </p>
        </motion.div>

        {/* Typewriter */}
        <motion.div variants={fadeIn} className="h-6">
          <div className="font-fredoka text-sm md:text-base text-ink/45 tracking-wide">
            <TypeAnimation
              sequence={[
                '🎮 Un videojuego sobre empatía y superación.',
                2800,
                '💙 No estás solo. Nunca lo estuviste.',
                2800,
                '⭐ Cada decisión cambia el destino.',
                2800,
                '🏆 Rompe el ciclo. Recupera el control.',
                2800,
              ]}
              speed={60}
              repeat={Infinity}
            />
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div variants={fadeUp}>
          <GenreTags />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp}>
          <HeroButtons />
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeIn}>
          <HeroStats />
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
