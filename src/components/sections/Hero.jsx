import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Download } from 'lucide-react'
import { useMouseParallax } from '@/hooks/useMouseParallax'

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
    <div
      className="flex flex-col items-center select-none"
      style={{ overflow: 'visible', gap: 0, lineHeight: 0.88, marginTop: '-0.15em' }}
    >

      {/* Línea 1 — "Break" */}
      <div
        className="flex items-baseline"
        style={{ fontSize: FS, overflow: 'visible', marginBottom: '-0.18em' }}
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
          lineHeight:    0.9,
          marginTop:     '-0.10em',
          marginBottom:  '-0.30em',
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
        style={{ fontSize: FS, overflow: 'visible', marginTop: '-0.06em' }}
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

function PixelButterfly({ size = 16 }) {
  return (
    <svg viewBox="0 0 16 14" width={size} height={size} aria-hidden="true" style={{ imageRendering: 'pixelated' }}>
      {/* Wings */}
      <rect x="1" y="4" width="4" height="4" fill="#FFB3C6" />
      <rect x="0" y="6" width="3" height="3" fill="#FFE566" opacity="0.75" />
      <rect x="11" y="4" width="4" height="4" fill="#C9A8E0" />
      <rect x="13" y="6" width="3" height="3" fill="#FFE566" opacity="0.7" />
      {/* Body */}
      <rect x="7" y="4" width="2" height="7" fill="#1A1A1A" />
      <rect x="6" y="2" width="4" height="2" fill="#1A1A1A" />
      {/* Antennas */}
      <rect x="6" y="0" width="1" height="2" fill="#1A1A1A" />
      <rect x="9" y="0" width="1" height="2" fill="#1A1A1A" />
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
      {/* Grass foundation — merges building into ground */}
      <rect x="0" y="68" width="100" height="4" fill="#6BB848" />
      <rect x="2" y="69" width="96" height="2" fill="#5AA040" opacity="0.5" />
      {/* Contact shadow on grass */}
      <ellipse cx="50" cy="70" rx="46" ry="3" fill="rgba(0,0,0,0.12)" />
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
      {/* Ground contact — feet on grass */}
      <ellipse cx="40" cy="35.5" rx="34" ry="2.5" fill="rgba(0,0,0,0.14)" />
      <rect x="4" y="35" width="72" height="2" fill="#6BB848" opacity="0.35" />
      {/* Smile */}
      <rect x="60" y="4"  width="2"  height="2"  fill="#1A1A1A" />
      <rect x="64" y="4"  width="2"  height="2"  fill="#1A1A1A" />
      <rect x="61" y="7"  width="5"  height="2"  fill="#1A1A1A" />
      <rect x="60" y="8"  width="2"  height="1"  fill="#1A1A1A" />
      <rect x="65" y="8"  width="2"  height="1"  fill="#1A1A1A" />
    </svg>
  )
}

/** Parallax offset — depth 0 = sky, ~1.2 = foreground props */
function ParallaxLayer({ parallax, depth = 1, className = '', style = {}, children }) {
  const x = parallax ? parallax.x * depth * 11 : 0
  const y = parallax ? parallax.y * depth * 5.5 : 0
  return (
    <div
      className={className}
      style={{ ...style, transform: `translate3d(${x}px, ${y}px, 0)`, willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

/** Top of grass layer (px from viewport bottom) — all props align here */
const GROUND_LINE_PX = 56
/** Matches Navbar `h-[4.35rem]` — keep Hero content below the fixed header */
const NAV_CLEARANCE = 'calc(4.35rem + 1rem + env(safe-area-inset-top, 0px))'

/** Dual-layer contact shadow (wide ambient + tight contact) */
function GroundContact({ width = '90%' }) {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -1,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `calc(${typeof width === 'string' ? width : `${width}px`} * 1.15)`,
          maxWidth: '140%',
          height: 16,
          background: 'radial-gradient(ellipse at center, rgba(26,26,26,0.2) 0%, transparent 72%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width,
          height: 6,
          background: 'radial-gradient(ellipse at center, rgba(26,26,26,0.28) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  )
}

/** Prop anchored to ground — sink slightly into grass */
function SceneProp({
  children,
  scale = 1,
  origin = 'bottom left',
  shadowWidth = '90%',
  sinkPx = 2,
}) {
  return (
    <div
      style={{
        position: 'relative',
        transform: `scale(${scale}) translateY(${sinkPx}px)`,
        transformOrigin: origin,
        zIndex: 1,
      }}
    >
      <GroundContact width={shadowWidth} />
      {children}
    </div>
  )
}

/**
 * Unified narrative strip: school · characters · lockers
 * share one ground line so nothing floats.
 */
function NarrativeScene({ parallax }) {
  return (
    <ParallaxLayer
      parallax={parallax}
      depth={1.14}
      className="absolute inset-x-0 pointer-events-none hidden sm:block"
      style={{ bottom: GROUND_LINE_PX, height: 0, zIndex: 5 }}
    >
      <div
        className="relative w-full"
        style={{ height: 1 }}
      >
        {/* Shared playground ground patch */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '5%',
            right: '5%',
            height: 14,
            transform: 'translateY(40%)',
            background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(107,184,72,0.35) 0%, rgba(90,160,64,0.12) 55%, transparent 100%)',
            borderRadius: '50% 50% 0 0',
            zIndex: 0,
          }}
        />
        {/* Subtle path line connecting the three zones */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 1,
            left: '8%',
            right: '8%',
            height: 3,
            background: 'linear-gradient(90deg, transparent 0%, rgba(90,160,64,0.25) 15%, rgba(107,184,72,0.3) 50%, rgba(90,160,64,0.25) 85%, transparent 100%)',
            borderRadius: 2,
            zIndex: 0,
          }}
        />

        {/* School — left anchor */}
        <motion.div
          className="absolute"
          style={{ bottom: 0, left: '3%', zIndex: 2 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ delay: 1.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <SceneProp scale={1.26} origin="bottom left" shadowWidth="98%" sinkPx={3}>
            <PixelSchool />
          </SceneProp>
        </motion.div>

        {/* Characters — between school and center, narrative focal */}
        <motion.div
          className="absolute hidden md:block"
          style={{ bottom: 0, left: '16%', zIndex: 4 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Soft vignette behind the moment */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: -4,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 140,
              height: 48,
              background: 'radial-gradient(ellipse at center bottom, rgba(168,212,245,0.2) 0%, transparent 70%)',
              zIndex: 0,
            }}
          />
          <SceneProp scale={1.06} origin="bottom center" shadowWidth="72%" sinkPx={3}>
            <div className="flex flex-col items-center">
              <div className="flex items-end gap-4 mb-0.5" style={{ marginBottom: 1 }}>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <PixelBubble text="😔" bg="#A8D4F5" tailAlign="left" />
                </motion.div>
                <motion.div
                  className="relative -ml-1"
                  animate={{ y: [0, -2.2, 0], scale: [1, 1.015, 1], rotate: [0, 0.6, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                >
                  <PixelBubble text="👋 ¡Oye!" bg="#A8D8A8" tailAlign="right" />
                  {/* Tiny speech trail to connect dialogue with helper character */}
                  <span className="absolute pointer-events-none" style={{ right: 12, bottom: -11, width: 3, height: 3, background: '#1A1A1A', opacity: 0.45 }} />
                  <span className="absolute pointer-events-none" style={{ right: 8, bottom: -14, width: 2, height: 2, background: '#1A1A1A', opacity: 0.38 }} />
                </motion.div>
              </div>
              <PixelSilhouettes />
            </div>
          </SceneProp>
        </motion.div>

        {/* Lockers — right anchor */}
        <motion.div
          className="absolute hidden md:block"
          style={{ bottom: 0, right: '3%', zIndex: 3 }}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.35, duration: 0.8 }}
        >
          <SceneProp scale={1.3} origin="bottom right" shadowWidth="92%" sinkPx={3}>
            <svg viewBox="0 0 54 48" width={54} height={48}
              style={{ imageRendering: 'pixelated' }} aria-hidden="true"
            >
              {/* Base plinth on grass */}
              <rect x="-2" y="44" width="58" height="4" fill="#6BB848" />
              <ellipse cx="27" cy="46" rx="28" ry="2" fill="rgba(0,0,0,0.1)" />
              <rect x="0" y="42" width="54" height="2" fill="rgba(0,0,0,0.08)" />
              {[0, 18, 36].map((x, i) => (
                <g key={i}>
                  <rect x={x} y="0" width="16" height="42" fill={['#A8D4F5','#FFB3C6','#A8D8A8'][i]} />
                  <rect x={x} y="0" width="16" height="42" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
                  <rect x={x + 3} y="4"  width="10" height="2" fill="rgba(0,0,0,0.15)" />
                  <rect x={x + 3} y="8"  width="10" height="2" fill="rgba(0,0,0,0.15)" />
                  <rect x={x + 3} y="12" width="10" height="2" fill="rgba(0,0,0,0.15)" />
                  <rect x={x + 6} y="22" width="4" height="6" fill="#FFD93D" stroke="#1A1A1A" strokeWidth="1" />
                </g>
              ))}
            </svg>
          </SceneProp>
        </motion.div>
      </div>
    </ParallaxLayer>
  )
}

/** Pixel speech bubble — floats above the characters */
function PixelBubble({ text = '💙', bg = '#FFB3C6', tailAlign = 'center' }) {
  const tailPos = tailAlign === 'left' ? '26%' : tailAlign === 'right' ? '74%' : '50%'
  return (
    <div className="relative inline-flex">
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
      <div
        style={{
          position: 'absolute',
          left: tailPos,
          bottom: -8,
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '8px solid #1A1A1A',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: tailPos,
          bottom: -7,
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: `7px solid ${bg}`,
        }}
      />
    </div>
  )
}

/** Sparse pixel decor on grass — low density, edges + soft center hints */
function GrassAmbientScatter() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Grass tufts */}
      {[
        [95, 42], [310, 40], [420, 44], [1020, 41], [1165, 43], [1320, 40], [580, 46],
      ].map(([x, y], i) => (
        <g key={`tuft-${i}`} opacity={0.5 + (i % 3) * 0.08}>
          <rect x={x} y={y} width="2" height="6" fill="#5AA040" />
          <rect x={x + 3} y={y + 1} width="2" height="5" fill="#6BB848" />
          <rect x={x + 6} y={y + 2} width="2" height="4" fill="#7EC850" />
        </g>
      ))}

      {/* Mini stones */}
      {[
        [145, 47, 5, 3], [385, 49, 4, 2], [1085, 48, 6, 3], [1295, 50, 4, 3], [55, 50, 3, 2],
      ].map(([x, y, w, h], i) => (
        <g key={`stone-${i}`} opacity="0.45">
          <rect x={x} y={y} width={w} height={h} fill="#9AA89A" />
          <rect x={x} y={y + h - 1} width={w + 2} height="1" fill="#6E7A6E" />
          <rect x={x + 1} y={y - 1} width={Math.max(2, w - 2)} height="1" fill="#B8C4B8" opacity="0.7" />
        </g>
      ))}

      {/* Small pixel flowers — mostly sides */}
      {[
        { x: 72,  y: 38, petal: '#FFB3C6', center: '#FFE566' },
        { x: 248, y: 40, petal: '#FFE566', center: '#FFFFFF' },
        { x: 368, y: 42, petal: '#C9A8E0', center: '#FFFFFF' },
        { x: 1095, y: 39, petal: '#FFB3C6', center: '#FFE566' },
        { x: 1248, y: 41, petal: '#FFFFFF', center: '#FFB3C6' },
        { x: 1368, y: 43, petal: '#FFE566', center: '#FF9F43' },
        { x: 698, y: 45, petal: '#FFB3C6', center: '#FFFFFF', faint: true },
      ].map(({ x, y, petal, center, faint }, i) => (
        <g key={`fl-${i}`} opacity={faint ? 0.35 : 0.72}>
          <rect x={x + 4} y={y + 6} width="2" height="5" fill="#5AA040" />
          <rect x={x + 3} y={y + 3} width="2" height="2" fill={petal} />
          <rect x={x + 5} y={y + 3} width="2" height="2" fill={petal} />
          <rect x={x + 4} y={y + 2} width="2" height="2" fill={petal} />
          <rect x={x + 6} y={y + 4} width="2" height="2" fill={petal} />
          <rect x={x + 2} y={y + 4} width="2" height="2" fill={petal} />
          <rect x={x + 4} y={y + 4} width="2" height="2" fill={center} />
        </g>
      ))}

      {/* Tiny sprouts / clover hints */}
      {[
        [178, 44], [455, 46], [980, 45], [1420, 47],
      ].map(([x, y], i) => (
        <g key={`sprout-${i}`} opacity="0.55">
          <rect x={x} y={y} width="2" height="4" fill="#4A9038" />
          <rect x={x - 2} y={y + 1} width="2" height="2" fill="#6BB848" />
          <rect x={x + 2} y={y + 1} width="2" height="2" fill="#6BB848" />
        </g>
      ))}
    </svg>
  )
}

/** Sun + tiny sky friends — avoids isolated corner feel */
function SunCluster() {
  const sparkles = [
    { top: 6,  left: 18, size: 7,  color: '#FFE566', delay: 0 },
    { top: 52, left: 8,  size: 6,  color: '#FFFFFF', delay: 1.1 },
    { top: 22, left: 2,  size: 5,  color: '#FFB3C6', delay: 0.6 },
  ]
  const dust = [
    { top: 38, left: 42, delay: 0.2 },
    { top: 12, left: 88, delay: 0.9 },
    { top: 68, left: 72, delay: 1.5 },
  ]

  return (
    <motion.div
      className="relative pointer-events-none"
      style={{ width: 132, height: 96 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Sky wash — connects sun to atmosphere */}
      <motion.div
        className="absolute -left-8 -top-2"
        style={{
          width: 160,
          height: 88,
          background: 'radial-gradient(ellipse 70% 60% at 65% 45%, rgba(255,229,102,0.14) 0%, rgba(196,235,249,0.08) 45%, transparent 72%)',
        }}
        animate={{ opacity: [0.65, 0.9, 0.65], scale: [1, 1.03, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mini clouds — frame the sun */}
      <motion.div
        className="absolute"
        style={{ top: 34, left: 0, opacity: 0.45 }}
        animate={{ x: [0, 5, 0], y: [0, -2, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PixelCloud scale={0.52} />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: 4, left: 52, opacity: 0.38 }}
        animate={{ x: [0, -4, 0], y: [0, 2, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <PixelCloud scale={0.42} />
      </motion.div>

      {/* Soft sparkles */}
      {sparkles.map(({ top, left, size, color, delay }, i) => (
        <motion.div
          key={`sp-${i}`}
          className="absolute"
          style={{ top, left }}
          animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <PixelStar color={color} size={size} />
        </motion.div>
      ))}

      {/* Tiny floating dust */}
      {dust.map(({ top, left, delay }, i) => (
        <motion.span
          key={`d-${i}`}
          className="absolute block"
          style={{
            top,
            left,
            width: 2,
            height: 2,
            background: 'rgba(255,255,255,0.75)',
            boxShadow: '2px 2px 0 rgba(255,255,255,0.35)',
          }}
          animate={{ y: [0, -5, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay }}
        />
      ))}

      {/* Sun body */}
      <motion.div
        className="absolute top-0 right-0"
        animate={{ opacity: [0.92, 1, 0.94], scale: [1, 1.02, 1], y: [0, -2, 0] }}
        transition={{
          opacity: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ filter: 'drop-shadow(0 0 12px rgba(255,217,61,0.32))' }}
      >
        <motion.div
          className="absolute -inset-5 rounded-full"
          animate={{ opacity: [0.14, 0.24, 0.14], scale: [1, 1.06, 1] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(255,229,102,0.4) 0%, rgba(255,229,102,0.08) 55%, transparent 72%)' }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 96 96" width={74} height={74} style={{ imageRendering: 'pixelated' }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <rect key={i} x="46" y="0" width="4" height="10" fill="#FFD93D" transform={`rotate(${deg} 48 48)`} />
            ))}
            <rect x="20" y="20" width="56" height="56" rx="2" fill="#FFD93D" />
            <rect x="24" y="24" width="24" height="24" fill="#FFE566" />
            <motion.rect
              x="30"
              y="34"
              width="6"
              height="6"
              fill="#1A1A1A"
              animate={{ height: [6, 1.5, 6] }}
              transition={{ duration: 6.8, repeat: Infinity, repeatDelay: 4.6, ease: 'easeInOut' }}
            />
            <motion.rect
              x="52"
              y="34"
              width="6"
              height="6"
              fill="#1A1A1A"
              animate={{ height: [6, 1.5, 6] }}
              transition={{ duration: 6.8, repeat: Infinity, repeatDelay: 4.6, ease: 'easeInOut' }}
            />
            <rect x="32" y="50" width="24" height="4" fill="#1A1A1A" />
            <rect x="36" y="54" width="4" height="4" fill="#FFD93D" />
            <rect x="48" y="54" width="4" height="4" fill="#FFD93D" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Floating dust/pollen — depth layers, very subtle */
function AmbientParticles({ parallax }) {
  const particles = [
    { top: '11%', left: '12%', size: 2, color: 'rgba(255,255,255,0.9)',  op: 0.32, dur: 18, delay: 0,   depth: 0.3,  dy: -14, dx: 10 },
    { top: '22%', left: '50%', size: 3, color: 'rgba(255,229,102,0.8)',  op: 0.28, dur: 15, delay: 1.1, depth: 0.42, dy: -10, dx: -8 },
    { top: '34%', left: '78%', size: 2, color: 'rgba(255,255,255,0.75)', op: 0.26, dur: 20, delay: 0.4, depth: 0.35, dy: -12, dx: 6 },
    { top: '16%', left: '86%', size: 3, color: 'rgba(201,168,224,0.7)', op: 0.24, dur: 17, delay: 2.2, depth: 0.52, dy: -16, dx: -12 },
    { top: '40%', left: '22%', size: 2, color: 'rgba(255,255,255,0.65)', op: 0.22, dur: 16, delay: 3,   depth: 0.48, dy: -8,  dx: 9 },
    { top: '9%',  left: '64%', size: 2, color: 'rgba(168,216,245,0.75)', op: 0.3,  dur: 19, delay: 0.7, depth: 0.38, dy: -11, dx: 5 },
    { top: '30%', left: '6%',  size: 3, color: 'rgba(255,179,198,0.6)',  op: 0.2,  dur: 21, delay: 4,   depth: 0.58, dy: -13, dx: -7 },
    { top: '46%', left: '55%', size: 2, color: 'rgba(255,255,255,0.55)', op: 0.18, dur: 22, delay: 1.6, depth: 0.65, dy: -9,  dx: 11 },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p, i) => (
        <ParallaxLayer key={i} parallax={parallax} depth={p.depth} className="absolute" style={{ top: p.top, left: p.left }}>
          <motion.div
            animate={{
              y: [0, p.dy, 0],
              x: [0, p.dx, 0],
              opacity: [p.op * 0.65, p.op, p.op * 0.65],
            }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          >
            <span
              style={{
                display: 'block',
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `${p.size}px 0 0 ${p.color}`,
                imageRendering: 'pixelated',
              }}
            />
          </motion.div>
        </ParallaxLayer>
      ))}
    </div>
  )
}

/** Grass tufts that sway gently in the wind */
function GrassWindSway() {
  const patches = [
    { left: '10%', delay: 0 },
    { left: '32%', delay: 0.5 },
    { left: '58%', delay: 1 },
    { left: '82%', delay: 1.4 },
  ]
  return (
    <>
      {patches.map(({ left, delay }, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ left, bottom: 34, transformOrigin: 'bottom center' }}
          animate={{ rotate: [0, 2.5, 0, -2, 0], scaleX: [1, 1.03, 1, 0.98, 1] }}
          transition={{ duration: 5.8 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <svg viewBox="0 0 12 10" width={12} height={10} style={{ imageRendering: 'pixelated', opacity: 0.55 }}>
            <rect x="4" y="2" width="2" height="8" fill="#5AA040" />
            <rect x="1" y="4" width="2" height="6" fill="#6BB848" />
            <rect x="7" y="3" width="2" height="7" fill="#7EC850" />
          </svg>
        </motion.div>
      ))}
    </>
  )
}

/** Animated accents — only a few, very gentle */
function GrassAmbientMotion() {
  const flowers = [
    { left: '6%',  bottom: 22, delay: 0 },
    { left: '85%', bottom: 24, delay: 0.6 },
    { left: '18%', bottom: 18, delay: 1.2 },
  ]
  return (
    <>
      {flowers.map(({ left, bottom, delay }, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ left, bottom, zIndex: 1 }}
          animate={{ y: [0, -2, 0], opacity: [0.65, 0.85, 0.65] }}
          transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <svg viewBox="0 0 12 12" width={12} height={12} style={{ imageRendering: 'pixelated' }}>
            <rect x="5" y="7" width="2" height="4" fill="#5AA040" />
            <rect x="4" y="4" width="2" height="2" fill="#FFB3C6" />
            <rect x="6" y="4" width="2" height="2" fill="#FFB3C6" />
            <rect x="5" y="3" width="2" height="2" fill="#FFB3C6" />
            <rect x="5" y="5" width="2" height="2" fill="#FFE566" />
          </svg>
        </motion.div>
      ))}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   HERO BACKGROUND — background · midground · foreground
══════════════════════════════════════════════════════════════════════ */
function HeroBackground({ parallax }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* ── BACKGROUND (sky, sun, far atmosphere) ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #9DDBF5 0%, #C4EBF9 22%, #DFF5F0 45%, #EEF9E8 65%, #F8FAE8 85%, #FEFAE0 100%)',
        }} />
        {/* Horizon haze — pushes depth toward the grass */}
        <div
          className="absolute inset-x-0 bottom-0 h-[42%]"
          style={{
            background: 'linear-gradient(to top, rgba(126,200,80,0.12) 0%, rgba(126,200,80,0.04) 40%, transparent 100%)',
          }}
        />
        {/* Soft sky breath — slow light drift */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.35, 0.55, 0.35], x: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse 70% 45% at 45% 18%, rgba(255,255,255,0.14) 0%, transparent 58%)',
          }}
        />
      </div>

      <AmbientParticles parallax={parallax} />

      <ParallaxLayer parallax={parallax} depth={0.22} className="absolute" style={{ top: '6%', right: '7%', zIndex: 1 }}>
        <SunCluster />
      </ParallaxLayer>

      {/* Far clouds — back plane, softer */}
      <ParallaxLayer parallax={parallax} depth={0.45} className="absolute inset-0" style={{ zIndex: 1 }}>
        {[
          { scale: 2.2, top: '8%',  left: '2%',  dur: 38, delay: 0   },
          { scale: 1.8, top: '14%', left: '55%', dur: 45, delay: 12  },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: c.top, left: c.left, opacity: 0.55, filter: 'blur(0.3px)' }}
            animate={{ x: [0, c.dur < 40 ? -48 : -24, 0], y: [0, -5, 0] }}
            transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
          >
            <PixelCloud scale={c.scale} />
          </motion.div>
        ))}
      </ParallaxLayer>

      {/* ── MIDGROUND (near clouds, hills, distant decor) ── */}
      <ParallaxLayer parallax={parallax} depth={0.72} className="absolute inset-0" style={{ zIndex: 2 }}>
        {[
          { scale: 1.6, top: '18%', left: '28%', dur: 22, delay: 5  },
          { scale: 1.3, top: '10%', right: '20%', dur: 28, delay: 15 },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: c.top, left: c.left, right: c.right, opacity: 0.88 }}
            animate={{ x: [0, 26, 0], y: [0, -6, 0] }}
            transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
          >
            <PixelCloud scale={c.scale} />
          </motion.div>
        ))}
      </ParallaxLayer>

      {/* One memorable detail: slow butterfly crossing the sky */}
      <ParallaxLayer parallax={parallax} depth={0.5} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <motion.div
          className="absolute"
          style={{ top: '24%', left: '18%', opacity: 0.88 }}
          initial={{ opacity: 0, x: -18 }}
          animate={{
            opacity: [0, 0.85, 0.85, 0.15, 0],
            x: [-18, 65, 140, 210, 280],
            y: [0, -6, -2, -8, -4],
          }}
          transition={{
            duration: 24,
            delay: 4,
            repeat: Infinity,
            repeatDelay: 14,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{ rotate: [0, 4, -3, 2, 0], scale: [0.98, 1.02, 0.99, 1.01, 0.98] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PixelButterfly size={15} />
          </motion.div>
        </motion.div>
      </ParallaxLayer>

      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <PixelBird top="16%" delay={3}  duration={26} />
        <PixelBird top="22%" delay={10} duration={32} />
        <PixelBird top="12%" delay={18} duration={22} />
      </div>

      <ParallaxLayer parallax={parallax} depth={0.58} className="absolute inset-0" style={{ zIndex: 2 }}>
        {[
          { top: '12%', left: '20%',  size: 16, color: '#FFE566', delay: 0,   dur: '2.2s' },
          { top: '25%', left: '75%',  size: 12, color: '#FFB3C6', delay: 0.6, dur: '1.8s' },
          { top: '8%',  left: '62%',  size: 20, color: '#A8D8A8', delay: 1.2, dur: '2.5s' },
          { top: '30%', left: '12%',  size: 10, color: '#C9A8E0', delay: 0.4, dur: '3.0s' },
          { top: '20%', right: '30%', size: 14, color: '#FFE566', delay: 1.8, dur: '2.0s' },
          { top: '6%',  left: '40%',  size: 8,  color: '#57ABD6', delay: 0.9, dur: '2.8s' },
        ].map(({ top, left, right, size, color, delay, dur }, i) => (
          <motion.div
            key={i}
            className="absolute animate-star"
            style={{ top, left, right, animationDuration: dur, animationDelay: `${delay}s`, opacity: 0.85 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ delay: 0.6 + delay, type: 'spring', stiffness: 200 }}
          >
            <PixelStar color={color} size={size} />
          </motion.div>
        ))}
        {[
          { top: '22%', left: '7%',  size: 28, delay: 0   },
          { top: '38%', right: '5%', size: 22, delay: 1.5 },
          { top: '15%', right: '38%', size: 18, delay: 0.8 },
        ].map(({ top, left, right, size, delay }, i) => (
          <motion.div
            key={`coin-${i}`}
            className="absolute animate-float"
            style={{ top, left, right, animationDuration: `${4 + i}s`, animationDelay: `${delay}s`, opacity: 0.75 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.8 + delay }}
          >
            <PixelCoin size={size} />
          </motion.div>
        ))}
      </ParallaxLayer>

      {/* Hills — midground anchor + soft fade into grass */}
      <ParallaxLayer parallax={parallax} depth={0.62} className="absolute bottom-12 left-0 right-0" style={{ zIndex: 3 }}>
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: 88, filter: 'drop-shadow(0 -3px 6px rgba(90,160,64,0.18))' }}
        >
          <defs>
            <linearGradient id="hillToGrass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(140,210,130,0.5)" />
              <stop offset="72%" stopColor="rgba(126,200,80,0.35)" />
              <stop offset="100%" stopColor="rgba(107,184,72,0.55)" />
            </linearGradient>
          </defs>
          <path d="M0,80 Q200,20 400,55 Q600,90 800,35 Q1000,-5 1200,40 Q1350,70 1440,50 L1440,80 Z"
            fill="rgba(180,230,160,0.48)" />
          <path d="M0,80 Q150,45 300,65 Q500,85 700,50 Q900,15 1100,55 Q1280,85 1440,60 L1440,80 Z"
            fill="url(#hillToGrass)" />
          {/* Ground roll — merges hill base into playfield */}
          <path d="M0,68 Q360,58 720,64 Q1080,70 1440,62 L1440,80 L0,80 Z"
            fill="rgba(107,184,72,0.28)" />
        </svg>
        </motion.div>
      </ParallaxLayer>

      {/* Hill → grass seam blend */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          zIndex: 3,
          bottom: 48,
          height: 28,
          background: 'linear-gradient(to bottom, rgba(140,210,130,0.18) 0%, rgba(126,200,80,0.32) 45%, rgba(90,160,64,0.42) 100%)',
        }}
      />

      {/* ── MIDGROUND trees (behind school / characters) ── */}
      <ParallaxLayer
        parallax={parallax}
        depth={0.88}
        className="absolute bottom-12 left-0 flex items-end pointer-events-none"
        style={{ zIndex: 4, opacity: 0.92 }}
      >
        <PixelTree w={44} h={72} />
        <PixelTree w={58} h={96} />
        <PixelTree w={36} h={60} />
        <PixelTree w={50} h={82} />
      </ParallaxLayer>
      <ParallaxLayer
        parallax={parallax}
        depth={0.92}
        className="absolute bottom-12 right-0 flex items-end pointer-events-none"
        style={{ zIndex: 4, opacity: 0.88 }}
      >
        <PixelTree w={50} h={80} />
        <PixelTree w={36} h={58} />
        <PixelTree w={60} h={98} />
        <PixelTree w={44} h={70} />
      </ParallaxLayer>

      {/* Grass — single fill, smooth light → dark (no hard band seam) */}
      <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none" style={{ zIndex: 4 }}>
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(90deg, rgba(101,178,68,0.35) 0%, transparent 28%, transparent 72%, rgba(101,178,68,0.35) 100%)',
              'linear-gradient(180deg, #8AD86A 0%, #7EC850 20%, #6BB848 38%, #5AA040 58%, #4E9838 78%, #4A9038 100%)',
            ].join(', '),
          }}
        />
        {/* Soft top highlight — blends into hills, no tiled stripes */}
        <div
          className="absolute top-0 left-0 right-0 h-4 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 45%, transparent 100%)',
          }}
        />
        <GrassAmbientScatter />
        <GrassAmbientMotion />
        <GrassWindSway />
      </div>

      {/* School · characters · lockers — shared ground line */}
      <NarrativeScene parallax={parallax} />

      {/* ── FOREGROUND trees (frame the scene) ── */}
      <ParallaxLayer
        parallax={parallax}
        depth={1.05}
        className="absolute flex items-end pointer-events-none"
        style={{ bottom: GROUND_LINE_PX - 2, left: 0, zIndex: 6, opacity: 0.98 }}
      >
        <div style={{ filter: 'drop-shadow(2px 4px 0 rgba(0,0,0,0.06))' }}>
          <PixelTree w={40} h={64} />
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        parallax={parallax}
        depth={1.08}
        className="absolute flex items-end pointer-events-none"
        style={{ bottom: GROUND_LINE_PX - 2, right: 0, zIndex: 6, opacity: 0.98 }}
      >
        <div style={{ filter: 'drop-shadow(2px 4px 0 rgba(0,0,0,0.06))' }}>
          <PixelTree w={42} h={68} />
        </div>
      </ParallaxLayer>

      {/* Grass front rim — subtle edge, no hard cut */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 7 }}>
        <div
          className="absolute left-0 right-0 h-px opacity-60"
          style={{ bottom: GROUND_LINE_PX, background: 'rgba(255,255,255,0.25)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ background: 'linear-gradient(180deg, rgba(74,144,56,0.2) 0%, rgba(58,120,48,0.35) 100%)' }}
        />
      </div>
    </div>
  )
}

const TAG_CLIP = 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'

/* ══════════════════════════════════════════════════════════════════════
   GENRE TAGS — game labels, breathable layout
══════════════════════════════════════════════════════════════════════ */
function GenreTag({ label, bg, emoji, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.82, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.88 + index * 0.09, type: 'spring', stiffness: 240, damping: 16 }}
      whileHover={{
        y: -4,
        scale: 1.05,
        boxShadow: '4px 4px 0 #1A1A1A, inset 0 2px 0 rgba(255,255,255,0.55)',
        transition: { type: 'spring', stiffness: 420, damping: 14 },
      }}
      whileTap={{ y: 1, scale: 0.98, boxShadow: '1px 1px 0 #1A1A1A' }}
      className="inline-flex items-center gap-2 font-fredoka text-[13px] sm:text-sm font-bold text-ink cursor-default select-none"
      style={{
        padding: '0.5rem 0.85rem 0.5rem 0.7rem',
        background: `linear-gradient(175deg, ${bg} 0%, color-mix(in srgb, ${bg} 88%, #1A1A1A 12%) 100%)`,
        border: '2px solid #1A1A1A',
        boxShadow: '3px 3px 0 #1A1A1A, inset 0 2px 0 rgba(255,255,255,0.45)',
        clipPath: TAG_CLIP,
        letterSpacing: '0.02em',
      }}
    >
      <span
        className="inline-flex items-center justify-center shrink-0 text-base leading-none"
        aria-hidden="true"
        style={{ filter: 'drop-shadow(0 1px 0 rgba(0,0,0,0.08))' }}
      >
        {emoji}
      </span>
      <span className="leading-none">{label}</span>
    </motion.span>
  )
}

function GenreTags() {
  const tags = [
    { label: 'Action RPG', bg: '#C9A8E0', emoji: '⚔️' },
    { label: 'Narrativo',  bg: '#FFB3C6', emoji: '📖' },
    { label: 'Educativo',  bg: '#A8D8A8', emoji: '🎓' },
    { label: 'PC · Free',  bg: '#FFE566', emoji: '💻' },
  ]
  return (
    <div
      className="flex flex-wrap justify-center items-center w-full"
      style={{ gap: '0.6rem 0.75rem', rowGap: '0.65rem' }}
    >
      {tags.map((tag, i) => (
        <GenreTag key={tag.label} {...tag} index={i} />
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

/* Pixel play badge — trailer CTA (sized to match hero button height) */
function TrailerPlayBadge() {
  return (
    <motion.span
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: 40, height: 40 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ border: '2px solid rgba(255,229,102,0.55)' }}
      />
      <span
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 36,
          height: 36,
          background: 'linear-gradient(155deg, #9B6FD4 0%, #6B3FA8 48%, #4E2D82 100%)',
          border: '2.5px solid #1A1A1A',
          boxShadow: [
            '2px 2px 0 #1A1A1A',
            'inset 0 2px 0 rgba(255,255,255,0.4)',
            'inset 0 -4px 8px rgba(0,0,0,0.28)',
          ].join(', '),
        }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          width={20}
          height={20}
          aria-hidden="true"
          style={{ marginLeft: 3 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <polygon
            points="8,5 19,12 8,19"
            fill="#FFE566"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <rect x="7" y="4" width="2" height="16" fill="rgba(255,255,255,0.25)" />
        </motion.svg>
      </span>
    </motion.span>
  )
}

const BTN_CLIP = 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'

/** Shared CTA shell — equal height, padding, alignment */
const HERO_CTA_HEIGHT = '3.5rem'
const heroCtaClass =
  'relative inline-flex items-center justify-center gap-2.5 font-pixelify font-bold text-[15px] leading-none text-ink rounded-none cursor-pointer select-none w-full sm:w-auto box-border'

/* ══════════════════════════════════════════════════════════════════════
   HERO BUTTONS — balanced primary + premium trailer
══════════════════════════════════════════════════════════════════════ */
function HeroButtons() {
  const ctaSize = {
    minHeight: HERO_CTA_HEIGHT,
    height: HERO_CTA_HEIGHT,
    paddingTop: 0,
    paddingBottom: 0,
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full">

      {/* Primary — Download */}
      <motion.a
        href="https://github.com/odvelez/BreaktheCycle/releases/download/v1.0.0/BreakTheCycle.zip"
        target="_blank"
        rel="noopener noreferrer"
        className={`${heroCtaClass} overflow-hidden px-7 sm:px-8`}
        style={{
          ...ctaSize,
          background: 'linear-gradient(175deg, #FFE97A 0%, #FFD93D 55%, #E8C420 100%)',
          border: '3px solid #1A1A1A',
          boxShadow: [
            '3px 3px 0 #1A1A1A',
            'inset 0  3px 0 rgba(255,255,255,0.7)',
            'inset 0 -3px 0 rgba(0,0,0,0.12)',
            'inset  3px 0 0 rgba(255,255,255,0.35)',
            'inset -3px 0 0 rgba(0,0,0,0.08)',
          ].join(', '),
          clipPath: BTN_CLIP,
        }}
        whileHover={{
          y: -3,
          boxShadow: [
            '5px 5px 0 #1A1A1A',
            'inset 0  3px 0 rgba(255,255,255,0.75)',
            'inset 0 -3px 0 rgba(0,0,0,0.15)',
            'inset  3px 0 0 rgba(255,255,255,0.4)',
            'inset -3px 0 0 rgba(0,0,0,0.1)',
          ].join(', '),
          transition: { type: 'spring', stiffness: 380, damping: 14 },
        }}
        whileTap={{
          y: 3, x: 3, scale: 0.98,
          boxShadow: '1px 1px 0 #1A1A1A, inset 0 3px 0 rgba(0,0,0,0.15)',
          transition: { duration: 0.06 },
        }}
      >
        <PixelCorners color="rgba(255,255,255,0.5)" size={8} />
        <span className="inline-flex shrink-0 items-center justify-center w-[18px] h-[18px]">
          <motion.span
            className="inline-flex"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
          >
            <Download size={17} strokeWidth={2.5} />
          </motion.span>
        </span>
        <span className="whitespace-nowrap">Descargar Juego</span>
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.32) 50%, transparent 75%)' }}
          animate={{ x: ['-140%', '140%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
        />
      </motion.a>

      {/* Secondary — Trailer */}
      <motion.button
        type="button"
        onClick={() => {
          document.querySelector('#trailer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
        className={`${heroCtaClass} overflow-visible pl-4 pr-5 sm:pl-5 sm:pr-6`}
        style={{
          ...ctaSize,
          background: 'linear-gradient(175deg, #FFFFFF 0%, #EDE0FF 38%, #C9A8E0 100%)',
          border: '3px solid #1A1A1A',
          boxShadow: [
            '4px 4px 0 #1A1A1A',
            '0 0 0 1px rgba(255,255,255,0.65)',
            '0 0 18px rgba(123,79,160,0.22)',
            'inset 0  3px 0 rgba(255,255,255,0.92)',
            'inset 0 -4px 0 rgba(107,63,160,0.22)',
            'inset  3px 0 0 rgba(255,255,255,0.6)',
            'inset -3px 0 0 rgba(78,45,130,0.18)',
          ].join(', '),
          clipPath: BTN_CLIP,
        }}
        whileHover={{
          y: -4,
          scale: 1.025,
          boxShadow: [
            '5px 5px 0 #1A1A1A',
            '0 0 0 1px rgba(255,255,255,0.75)',
            '0 0 26px rgba(123,79,160,0.42)',
            'inset 0  3px 0 rgba(255,255,255,0.95)',
            'inset 0 -4px 0 rgba(107,63,160,0.28)',
            'inset  3px 0 0 rgba(255,255,255,0.65)',
            'inset -3px 0 0 rgba(78,45,130,0.22)',
          ].join(', '),
          transition: { type: 'spring', stiffness: 400, damping: 13 },
        }}
        whileTap={{
          y: 2, x: 2, scale: 0.98,
          boxShadow: '2px 2px 0 #1A1A1A, 0 0 14px rgba(123,79,160,0.3), inset 0 2px 0 rgba(0,0,0,0.1)',
          transition: { duration: 0.06 },
        }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute -inset-1 pointer-events-none -z-[1]"
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(123,79,160,0.35) 0%, transparent 72%)',
            filter: 'blur(4px)',
          }}
        />
        <PixelCorners color="rgba(255,255,255,0.75)" size={8} />
        <span
          aria-hidden="true"
          className="absolute left-0 top-1 bottom-1 w-1.5 pointer-events-none opacity-70"
          style={{
            background: 'repeating-linear-gradient(180deg, #1A1A1A 0px, #1A1A1A 3px, transparent 3px, transparent 6px)',
          }}
        />
        <TrailerPlayBadge />
        <span className="relative z-[1] flex flex-col items-start justify-center leading-none gap-0.5 pr-0.5 text-left">
          <span className="whitespace-nowrap" style={{ letterSpacing: '0.03em' }}>
            Ver Trailer
          </span>
          <span
            className="font-fredoka text-[10px] font-semibold leading-none"
            style={{ color: 'rgba(78,45,130,0.7)', letterSpacing: '0.08em' }}
          >
            ▶ PLAY
          </span>
        </span>
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: BTN_CLIP,
            background: 'linear-gradient(105deg, transparent 15%, rgba(255,255,255,0.45) 50%, transparent 85%)',
          }}
          initial={{ x: '-130%', opacity: 0 }}
          whileHover={{ x: '130%', opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </motion.button>
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
   HERO EMOTIONAL COPY — clear hierarchy
══════════════════════════════════════════════════════════════════════ */
function HeroEmotionalBlock() {
  return (
    <motion.div variants={fadeUp} className="w-full">
      <div className="mx-auto flex w-full max-w-[34rem] flex-col items-center gap-2.5 sm:gap-3 text-center px-2 sm:px-3">
        {/* Setup line — context, lighter */}
        <p
          className="font-fredoka"
          style={{
            margin: 0,
            width: '100%',
            fontSize: 'clamp(0.95rem, 2.1vw, 1.12rem)',
            fontWeight: 500,
            color: 'rgba(26,26,26,0.62)',
            lineHeight: 1.48,
            letterSpacing: '0.01em',
            textAlign: 'center',
          }}
        >
          El bullying no es un juego.
        </p>

        {/* Hero quote — emotional focal point */}
        <div className="relative w-full">
          <p
            className="font-fredoka"
            style={{
              margin: 0,
              width: '100%',
              fontSize: 'clamp(1.45rem, 4.2vw, 2.35rem)',
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              color: '#7B4FA0',
              WebkitTextStroke: '1.25px #1A1A1A',
              paintOrder: 'stroke fill',
              textAlign: 'center',
            }}
          >
            Romper el ciclo es un acto de valentía.
          </p>
          {/* Handmade underline */}
          <svg
            viewBox="0 0 280 10"
            width="min(280px, 88%)"
            height={10}
            aria-hidden="true"
            style={{ display: 'block', margin: '0.35rem auto 0' }}
          >
            <path
              d="M6 7 Q70 2 140 6 Q210 10 274 4"
              fill="none"
              stroke="#FFE566"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Accent tagline */}
        <p
          className="font-fredoka"
          style={{
            margin: 0,
            width: '100%',
            fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)',
            fontWeight: 600,
            color: '#4D8F3A',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          ✦ Transforma la presión en libertad ✦
        </p>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN HERO
══════════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const parallax = useMouseParallax()

  return (
    <section
      id="hero"
      className="relative flex h-dvh min-h-[680px] max-h-[1080px] flex-col overflow-hidden"
    >
      <HeroBackground parallax={parallax} />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-center px-4 sm:px-6"
        style={{
          paddingTop: NAV_CLEARANCE,
          paddingBottom: `max(4rem, calc(${GROUND_LINE_PX}px + 2.5rem + env(safe-area-inset-bottom, 0px)))`,
        }}
      >
          <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center gap-3.5 sm:gap-4 md:gap-[1.125rem]">
            <motion.div variants={fadeIn} className="flex w-full justify-center">
              <StudioBadge />
            </motion.div>

            <div className="flex w-full justify-center">
              <ColorfulTitle />
            </div>

            <motion.div
              variants={fadeIn}
              className="mx-auto flex w-full max-w-[16rem] items-center justify-center gap-3 sm:max-w-xs"
            >
              <div
                className="h-px flex-1"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(26,26,26,0.15) 0px, rgba(26,26,26,0.15) 6px, transparent 6px, transparent 12px)',
                }}
              />
              <PixelCoin size={18} />
              <div
                className="h-px flex-1"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(26,26,26,0.15) 0px, rgba(26,26,26,0.15) 6px, transparent 6px, transparent 12px)',
                }}
              />
            </motion.div>

            <HeroEmotionalBlock />

            <motion.div
              variants={fadeIn}
              className="flex w-full min-h-[1.25rem] items-center justify-center"
            >
              <p
                className="font-fredoka w-full text-center tracking-wide"
                style={{
                  margin: 0,
                  fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)',
                  color: 'rgba(26,26,26,0.42)',
                  lineHeight: 1.35,
                }}
              >
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
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex w-full justify-center pt-0.5">
              <GenreTags />
            </motion.div>

            <motion.div variants={fadeUp} className="flex w-full justify-center pt-0.5 sm:pt-1">
              <HeroButtons />
            </motion.div>
          </div>
      </motion.div>
    </section>
  )
}
