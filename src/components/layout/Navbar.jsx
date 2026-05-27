import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'
import { NAV_LINKS } from '@/data/navLinks'

const NAV_CLIP = 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'

const LOGO_BREAK = [
  { char: 'B', color: '#FF5757' },
  { char: 'r', color: '#FF9F43' },
  { char: 'e', color: '#2BC0B4' },
  { char: 'a', color: '#58D68D' },
  { char: 'k', color: '#FF6FC8' },
]
const LOGO_CYCLE = [
  { char: 'C', color: '#A678CC' },
  { char: 'y', color: '#FF5757' },
  { char: 'c', color: '#FFBD2E' },
  { char: 'l', color: '#58D68D' },
  { char: 'e', color: '#57ABD6' },
]

const DOWNLOAD_URL =
  'https://drive.google.com/drive/folders/1zdccAdilvZ9PDUmkYI25daNMa3I4qrYD?usp=sharing'

function NavLogo() {
  const renderLetters = (letters) =>
    letters.map(({ char, color }, i) => (
      <motion.span
        key={`${char}-${i}`}
        className="inline-block font-fredoka text-[13px] font-bold"
        style={{ color, WebkitTextStroke: '1px #1A1A1A', paintOrder: 'stroke fill' }}
        whileHover={{ y: -2, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 420, damping: 12 }}
      >
        {char}
      </motion.span>
    ))

  return (
    <motion.a
      href="#hero"
      className="flex items-center gap-2.5 group"
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 16 }}
    >
      <motion.div
        whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.38 } }}
        animate={{ y: [0, -1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
        style={{
          background: 'linear-gradient(175deg, #FFE97A 0%, #FFD93D 100%)',
          border: '2px solid #1A1A1A',
          boxShadow: '3px 3px 0 #1A1A1A, inset 0 2px 0 rgba(255,255,255,0.5)',
          clipPath: NAV_CLIP,
        }}
      >
        🎮
      </motion.div>

      <div className="flex flex-col leading-none gap-0.5">
        <div className="flex items-center gap-[1px]">
          {renderLetters(LOGO_BREAK)}
          <span className="font-fredoka text-[13px] font-bold text-ink/35 mx-0.5">·</span>
          {renderLetters(LOGO_CYCLE)}
        </div>
        <motion.span
          className="font-fredoka text-[9px] font-semibold text-ink/45 tracking-[0.14em] uppercase"
          whileHover={{ color: 'rgba(123,79,160,0.85)' }}
        >
          UnderRise Studio
        </motion.span>
      </div>
    </motion.a>
  )
}

function NavLink({ href, label, onClick, active = false }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={cn(
        'relative font-fredoka text-[14px] xl:text-[15px] font-semibold px-2.5 py-1.5 rounded-md transition-colors duration-200',
        active ? 'text-ink' : 'text-ink/60 hover:text-ink',
      )}
      style={
        active
          ? {
              background: 'rgba(255,229,102,0.35)',
              border: '2px solid rgba(26,26,26,0.14)',
              boxShadow: '2px 2px 0 rgba(26,26,26,0.08)',
            }
          : undefined
      }
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 16 }}
    >
      {label}
      <motion.span
        className="absolute left-2 right-2 -bottom-px h-[3px] rounded-sm origin-left pointer-events-none"
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          background: active
            ? 'repeating-linear-gradient(90deg, #7B4FA0 0px, #7B4FA0 8px, #FFE566 8px, #FFE566 16px)'
            : 'repeating-linear-gradient(90deg, #A678CC 0px, #A678CC 10px, #C9A8E0 10px, #C9A8E0 20px)',
        }}
      />
      <motion.span
        className="absolute -right-1 -top-1 text-[9px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: active ? 0.85 : 0, scale: active ? 1 : 0.5 }}
        whileHover={{ opacity: 1, scale: 1, rotate: 12 }}
      >
        ✦
      </motion.span>
    </motion.a>
  )
}

function NavButton({ children, bg = '#FFFFFF', primary = false, onClick, className }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        'font-pixelify text-[11px] xl:text-xs font-bold text-ink px-3.5 xl:px-4 py-2 xl:py-2.5 cursor-pointer select-none',
        className,
      )}
      style={{
        background: primary
          ? 'linear-gradient(175deg, #FFE97A 0%, #FFD93D 100%)'
          : `linear-gradient(175deg, #FFFFFF 0%, ${bg} 100%)`,
        border: '2px solid #1A1A1A',
        boxShadow: '3px 3px 0 #1A1A1A, inset 0 2px 0 rgba(255,255,255,0.55)',
        clipPath: NAV_CLIP,
      }}
      whileHover={{
        y: -3,
        scale: 1.03,
        boxShadow: primary
          ? '5px 5px 0 #1A1A1A, 0 0 18px rgba(255,217,61,0.4), inset 0 2px 0 rgba(255,255,255,0.7)'
          : '5px 5px 0 #1A1A1A, 0 0 16px rgba(166,120,204,0.32), inset 0 2px 0 rgba(255,255,255,0.8)',
      }}
      whileTap={{ y: 2, x: 2, scale: 0.98, boxShadow: '1px 1px 0 #1A1A1A' }}
      transition={{ type: 'spring', stiffness: 420, damping: 14 }}
    >
      <motion.span
        className="inline-flex items-center gap-1"
        whileHover={{ x: primary ? 1 : 0 }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled(60)
  const activeHash = useActiveSection(NAV_LINKS.map((l) => l.href))

  const scrollToHash = (hash) => {
    const id = hash.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled && 'shadow-[0_4px_0_rgba(26,26,26,0.05)]',
        )}
        style={{
          background: scrolled ? 'rgba(254,250,224,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '2px solid rgba(26,26,26,0.1)' : 'none',
        }}
      >
        <div className="container-game">
          <div className="flex items-center justify-between gap-4 h-[4.35rem]">
            <NavLogo />

            <nav
              className="hidden lg:flex items-center justify-center flex-1 gap-5 xl:gap-7 px-4"
              aria-label="Principal"
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  {...link}
                  active={activeHash === link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash(link.href)
                  }}
                />
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <NavButton bg="#F0E8FF" onClick={() => scrollToHash('#about')}>
                🎬 Trailer
              </NavButton>
              <NavButton
                primary
                onClick={() => window.open(DOWNLOAD_URL, '_blank', 'noopener,noreferrer')}
              >
                ▶ Descargar
              </NavButton>
            </div>

            <motion.button
              className="lg:hidden p-2.5 text-ink shrink-0"
              style={{
                background: 'linear-gradient(175deg, #FFE97A 0%, #FFD93D 100%)',
                border: '2px solid #1A1A1A',
                boxShadow: '3px 3px 0 #1A1A1A',
                clipPath: NAV_CLIP,
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              whileHover={{ y: -2, scale: 1.04, boxShadow: '4px 4px 0 #1A1A1A' }}
              whileTap={{ scale: 0.94, boxShadow: '1px 1px 0 #1A1A1A' }}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 pt-16"
            style={{ background: 'rgba(254,250,224,0.98)' }}
          >
            {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
              <span key={i} className={`absolute ${pos} text-2xl opacity-15`}>
                {['⭐', '✦', '🎮', '✦'][i]}
              </span>
            ))}

            <nav className="flex flex-col items-center gap-4" aria-label="Menú móvil">
              {NAV_LINKS.map((link, i) => {
                const active = activeHash === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => scrollToHash(link.href)}
                      className={cn(
                        'font-fredoka text-xl font-bold px-4 py-2 rounded-lg',
                        active ? 'text-ink' : 'text-ink/70',
                      )}
                      style={
                        active
                          ? {
                              background: 'rgba(255,229,102,0.4)',
                              border: '2px solid #1A1A1A',
                              boxShadow: '3px 3px 0 #1A1A1A',
                            }
                          : undefined
                      }
                      whileHover={{ y: -2, color: '#7B4FA0' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {link.label}
                      {active && (
                        <span className="ml-2 text-sm opacity-70" aria-hidden="true">
                          ●
                        </span>
                      )}
                    </motion.button>
                  </motion.div>
                )
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-3 mt-2 w-56"
            >
              <NavButton bg="#F0E8FF" onClick={() => scrollToHash('#about')}>
                🎬 Ver Trailer
              </NavButton>
              <NavButton
                primary
                onClick={() => window.open(DOWNLOAD_URL, '_blank', 'noopener,noreferrer')}
              >
                ▶ Descargar Juego
              </NavButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
