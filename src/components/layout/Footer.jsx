import { motion } from 'framer-motion'

/* ── Quick-nav links ── */
const NAV_LINKS = [
  { label: 'Inicio',      href: '#hero'     },
  { label: 'El Juego',    href: '#about'    },
  { label: 'Niveles',     href: '#levels'   },
  { label: 'Trailer',     href: '#trailer'  },
  { label: 'Equipo',      href: '#team'     },
  { label: 'Código',      href: '#code'     },
  { label: 'Descargar',   href: '#download' },
]

const SOCIALS = [
  { icon: '🎮', label: 'Itch.io', href: 'https://odvelez.itch.io/break-the-cycle',                                  color: '#FF5757' },
  { icon: '📁', label: 'Drive',   href: 'https://drive.google.com/drive/folders/1zdccAdilvZ9PDUmkYI25daNMa3I4qrYD', color: '#FFE566' },
]

/* ── Colorful title letters (ending screen style) ── */
const BREAK_LETTERS = [
  { ch: 'B', color: '#FF5757' }, { ch: 'R', color: '#FF8C00' },
  { ch: 'E', color: '#FFE566' }, { ch: 'A', color: '#3DA35D' },
  { ch: 'K', color: '#1E88E5' },
]
const CYCLE_LETTERS = [
  { ch: 'C', color: '#A678CC' }, { ch: 'Y', color: '#FF5757' },
  { ch: 'C', color: '#FF8C00' }, { ch: 'L', color: '#FFE566' },
  { ch: 'E', color: '#3DA35D' },
]

/* ── Pixel decorations ── */
function PixelStar({ color = '#FFE566', size = 12 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}
      style={{ imageRendering: 'pixelated', flexShrink: 0 }} aria-hidden="true">
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

/* ── Pixel grass top transition ── */
function PixelGrass() {
  return (
    <div style={{ position: 'relative', height: '60px', overflow: 'hidden', marginBottom: '-1px' }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
        width="100%" height="60" style={{ display: 'block' }} aria-hidden="true">
        {/* Ground fill */}
        <rect x="0" y="30" width="1440" height="30" fill="#1A0F28" />
        {/* Grass bumps — repeating wave */}
        <path d="
          M0 42 Q20 20 40 42 Q60 20 80 42 Q100 20 120 42 Q140 20 160 42
          Q180 20 200 42 Q220 20 240 42 Q260 20 280 42 Q300 20 320 42
          Q340 20 360 42 Q380 20 400 42 Q420 20 440 42 Q460 20 480 42
          Q500 20 520 42 Q540 20 560 42 Q580 20 600 42 Q620 20 640 42
          Q660 20 680 42 Q700 20 720 42 Q740 20 760 42 Q780 20 800 42
          Q820 20 840 42 Q860 20 880 42 Q900 20 920 42 Q940 20 960 42
          Q980 20 1000 42 Q1020 20 1040 42 Q1060 20 1080 42 Q1100 20 1120 42
          Q1140 20 1160 42 Q1180 20 1200 42 Q1220 20 1240 42 Q1260 20 1280 42
          Q1300 20 1320 42 Q1340 20 1360 42 Q1380 20 1400 42 Q1420 20 1440 42
          L1440 60 L0 60 Z"
          fill="#3DA35D" />
        {/* Lighter grass tops */}
        <path d="
          M0 42 Q20 22 40 42 Q60 22 80 42 Q100 22 120 42 Q140 22 160 42
          Q180 22 200 42 Q220 22 240 42 Q260 22 280 42 Q300 22 320 42
          Q340 22 360 42 Q380 22 400 42 Q420 22 440 42 Q460 22 480 42
          Q500 22 520 42 Q540 22 560 42 Q580 22 600 42 Q620 22 640 42
          Q660 22 680 42 Q700 22 720 42 Q740 22 760 42 Q780 22 800 42
          Q820 22 840 42 Q860 22 880 42 Q900 22 920 42 Q940 22 960 42
          Q980 22 1000 42 Q1020 22 1040 42 Q1060 22 1080 42 Q1100 22 1120 42
          Q1140 22 1160 42 Q1180 22 1200 42 Q1220 22 1240 42 Q1260 22 1280 42
          Q1300 22 1320 42 Q1340 22 1360 42 Q1380 22 1400 42 Q1420 22 1440 42"
          fill="none" stroke="#66BB6A" strokeWidth="3" />
        {/* Pixel grass blades */}
        {Array.from({ length: 36 }, (_, i) => (
          <rect key={i} x={i * 40 + 10} y={30 + (i % 3) * 4}
            width="4" height={8 + (i % 4) * 3} fill="#4CAF50" opacity="0.7" />
        ))}
        {/* Small flowers */}
        {[80, 240, 480, 720, 960, 1200].map((x, i) => (
          <g key={i}>
            <rect x={x} y="32" width="3" height="8" fill="#66BB6A" />
            <rect x={x - 3} y="30" width="9" height="5" fill={['#FF5757','#FFE566','#FFB3C6','#A678CC','#A8D4F5','#FFE566'][i]} rx="2" />
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ── Pixel cloud ── */
function FooterCloud({ style }) {
  return (
    <motion.div
      animate={{ x: [0, 12, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', opacity: 0.12, pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 36" width={80} height={36} style={{ imageRendering: 'pixelated' }}>
        <rect x="24" y="18" width="32" height="12" fill="#fff" />
        <rect x="16" y="12" width="48" height="18" fill="#fff" />
        <rect x="8"  y="18" width="64" height="12" fill="#fff" />
        <rect x="20" y="6"  width="24" height="12" fill="#fff" />
        <rect x="36" y="0"  width="20" height="12" fill="#fff" />
      </svg>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FOOTER MAIN
══════════════════════════════════════════════════════════════════ */
export default function Footer() {
  return (
    <footer>
      {/* Grass transition from last section */}
      <PixelGrass />

      {/* ── MAIN DARK BODY ── */}
      <div style={{
        background: 'linear-gradient(180deg, #1A0F28 0%, #120A1E 60%, #0A0712 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Star field */}
        {[
          { top: '8%',  left: '5%',  color: '#FFE566', size: 10, delay: 0   },
          { top: '12%', left: '18%', color: '#C9A8E0', size: 8,  delay: 0.5 },
          { top: '6%',  left: '40%', color: '#FF5757', size: 12, delay: 1   },
          { top: '15%', left: '62%', color: '#A8D4F5', size: 8,  delay: 0.3 },
          { top: '9%',  left: '78%', color: '#FFB3C6', size: 10, delay: 0.8 },
          { top: '20%', left: '90%', color: '#A8D8A8', size: 8,  delay: 1.4 },
          { top: '25%', left: '30%', color: '#FFE566', size: 6,  delay: 1.8 },
          { top: '18%', left: '52%', color: '#C9A8E0', size: 6,  delay: 0.6 },
        ].map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
            style={{ position: 'absolute', top: s.top, left: s.left, zIndex: 0, pointerEvents: 'none' }}
            aria-hidden="true"
          >
            <PixelStar color={s.color} size={s.size} />
          </motion.div>
        ))}

        {/* Floating clouds (very subtle) */}
        <FooterCloud style={{ top: '10%', left: '2%' }} />
        <FooterCloud style={{ top: '8%',  right: '4%' }} />

        {/* Soft glow orbs */}
        <div style={{
          position: 'absolute', top: '-40px', left: '20%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(166,120,204,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '40px', right: '15%',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,229,102,0.08) 0%, transparent 70%)',
          filter: 'blur(30px)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* ── EMOTIONAL QUOTE ── */}
          <div style={{ padding: 'clamp(48px, 7vw, 80px) clamp(20px, 5vw, 60px) clamp(40px, 6vw, 64px)', textAlign: 'center' }}>
            {/* Decorative quote mark */}
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(4rem, 10vw, 7rem)',
              color: '#A678CC',
              opacity: 0.2,
              lineHeight: 1,
              marginBottom: '0',
              userSelect: 'none',
            }} aria-hidden="true">❝</div>

            {/* Main emotional line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.25rem, 3.5vw, 2.2rem)',
                color: '#FFF8E7',
                lineHeight: 1.35,
                maxWidth: '680px',
                margin: '0 auto 16px',
                textAlign: 'center',
              }}
            >
              El bullying no es un juego,{' '}
              <span style={{ color: '#C9A8E0' }}>pero juntos podemos</span>
              {' '}cambiar las reglas.
            </motion.p>

            {/* Sub-line */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{
                fontFamily: '"Patrick Hand", cursive',
                fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
                color: 'rgba(255,255,255,0.5)',
                textAlign: 'center',
                letterSpacing: '0.04em',
                fontStyle: 'italic',
              }}
            >
              "Romper el ciclo es un acto de valentía."
            </motion.p>

            {/* Pixel star divider */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '28px' }}>
              <div style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
              <PixelStar color="#FFE566" size={10} />
              <PixelStar color="#C9A8E0" size={8}  />
              <PixelStar color="#A8D4F5" size={10} />
              <div style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            </div>
          </div>

          {/* ── BRANDING ── */}
          <div style={{ textAlign: 'center', paddingBottom: 'clamp(32px, 5vw, 48px)', paddingLeft: '20px', paddingRight: '20px' }}>
            {/* Colorful game title */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 0, flexWrap: 'wrap', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                {BREAK_LETTERS.map(({ ch, color }, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      fontFamily: '"Fredoka", sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                      color,
                      WebkitTextStroke: '1.5px rgba(255,255,255,0.25)',
                      paintOrder: 'stroke fill',
                      lineHeight: 1,
                      cursor: 'default',
                      display: 'inline-block',
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
              <span style={{
                fontFamily: '"Patrick Hand", cursive',
                fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.15em',
                margin: '0 10px',
                fontStyle: 'italic',
              }}>
                the
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                {CYCLE_LETTERS.map(({ ch, color }, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      fontFamily: '"Fredoka", sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                      color,
                      WebkitTextStroke: '1.5px rgba(255,255,255,0.25)',
                      paintOrder: 'stroke fill',
                      lineHeight: 1,
                      cursor: 'default',
                      display: 'inline-block',
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Studio name */}
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 'clamp(7px, 1.2vw, 10px)',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.18em',
              marginTop: '6px',
              textAlign: 'center',
            }}>
              UNDERRISE STUDIO · UNIVERSIDAD DEL NORTE · 2026
            </p>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{
            height: '1px',
            background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 8px, rgba(255,255,255,0.08) 8px, rgba(255,255,255,0.08) 16px)',
            margin: '0 clamp(20px, 5vw, 60px)',
          }} />

          {/* ── GRID: Nav | Studio | Socials ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'clamp(28px, 4vw, 48px)',
            padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 60px)',
          }}>
            {/* Navigation */}
            <div>
              <p style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '8px',
                color: '#FFE566',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}>
                📍 EXPLORAR
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <motion.a
                      href={l.href}
                      whileHover={{ x: 4, color: '#FFE566' }}
                      transition={{ duration: 0.15 }}
                      style={{
                        fontFamily: '"Fredoka", sans-serif',
                        fontSize: '0.92rem',
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.55)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'color 0.15s',
                      }}
                    >
                      <span style={{ color: '#C9A8E0', fontSize: '10px' }}>▸</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Studio info */}
            <div>
              <p style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '8px',
                color: '#FFE566',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}>
                🎮 ESTUDIO
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: '🏫', text: 'Universidad del Norte' },
                  { icon: '📅', text: 'Proyecto 2026' },
                  { icon: '🎓', text: 'Ingeniería de Sistemas' },
                  { icon: '🌎', text: 'Barranquilla, Colombia' },
                  { icon: '🧩', text: 'Unity 6 · C# · VR' },
                ].map((item) => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{
                      fontFamily: '"Fredoka", sans-serif',
                      fontSize: '0.88rem',
                      color: 'rgba(255,255,255,0.5)',
                    }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <p style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '8px',
                color: '#FFE566',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}>
                🔗 LINKS
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4, scale: 1.03 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{
                      width: '32px', height: '32px',
                      background: `${s.color}20`,
                      border: `1.5px solid ${s.color}50`,
                      borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '15px',
                      flexShrink: 0,
                      transition: 'background 0.2s, border-color 0.2s',
                    }}>
                      {s.icon}
                    </div>
                    <span style={{
                      fontFamily: '"Fredoka", sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.55)',
                      transition: 'color 0.15s',
                    }}>
                      {s.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{
            height: '1px',
            background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 8px, rgba(255,255,255,0.08) 8px, rgba(255,255,255,0.08) 16px)',
            margin: '0 clamp(20px, 5vw, 60px)',
          }} />

          {/* ── BOTTOM BAR ── */}
          <div style={{
            padding: 'clamp(20px, 3vw, 28px) clamp(20px, 5vw, 60px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <p style={{
              fontFamily: '"Fredoka", sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.28)',
              margin: 0,
            }}>
              © 2026 UnderRise Studio. Proyecto universitario sin fines de lucro.
            </p>

            {/* Mini pixel badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: 'rgba(166,120,204,0.15)',
                border: '1.5px solid rgba(166,120,204,0.3)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '6px',
                color: 'rgba(201,168,224,0.6)',
                letterSpacing: '0.05em',
              }}>
                MADE WITH ♥ IN UNITY 6
              </div>
            </div>
          </div>

          {/* Pixel ground */}
          <div style={{
            height: '8px',
            background: 'repeating-linear-gradient(90deg, #A678CC 0px, #A678CC 20px, #FFE566 20px, #FFE566 40px, #3DA35D 40px, #3DA35D 60px, #FF5757 60px, #FF5757 80px, #A8D4F5 80px, #A8D4F5 100px)',
            opacity: 0.3,
          }} />
        </div>
      </div>
    </footer>
  )
}
