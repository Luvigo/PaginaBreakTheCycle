import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useScrolled } from '@/hooks/useScrolled'
import { NAV_LINKS } from '@/data/navLinks'

/* Mini colorful logo — coincide con el branding del proyecto */
const LOGO_BREAK  = [
  { char: 'B', color: '#FF5757' },
  { char: 'r', color: '#FF9F43' },
  { char: 'e', color: '#2BC0B4' },
  { char: 'a', color: '#58D68D' },
  { char: 'k', color: '#FF6FC8' },
]
const LOGO_CYCLE  = [
  { char: 'C', color: '#A678CC' },
  { char: 'y', color: '#FF5757' },
  { char: 'c', color: '#FFBD2E' },
  { char: 'l', color: '#58D68D' },
  { char: 'e', color: '#57ABD6' },
]

function NavLogo() {
  return (
    <a href="#hero" className="flex items-center gap-2.5 group">
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: [0, -12, 12, 0], transition: { duration: 0.45 } }}
        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
        style={{ background: '#FFE566', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
      >
        🎮
      </motion.div>

      {/* Colorful text */}
      <div className="flex flex-col leading-none gap-0.5">
        <div className="flex items-center gap-[1px]">
          {LOGO_BREAK.map(({ char, color }, i) => (
            <span
              key={i}
              className="font-fredoka text-[13px] font-bold"
              style={{ color, WebkitTextStroke: '1px #1A1A1A', paintOrder: 'stroke fill' }}
            >
              {char}
            </span>
          ))}
          <span className="font-fredoka text-[13px] font-bold text-ink/40 mx-0.5">·</span>
          {LOGO_CYCLE.map(({ char, color }, i) => (
            <span
              key={i}
              className="font-fredoka text-[13px] font-bold"
              style={{ color, WebkitTextStroke: '1px #1A1A1A', paintOrder: 'stroke fill' }}
            >
              {char}
            </span>
          ))}
        </div>
        <span className="font-fredoka text-[9px] font-medium text-ink/40 tracking-widest uppercase">
          UnderRise Studio
        </span>
      </div>
    </a>
  )
}

function NavLink({ href, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative group font-fredoka text-[15px] font-semibold text-ink/65 hover:text-ink transition-colors duration-200"
    >
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-[#A678CC]"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.18 }}
      />
    </a>
  )
}

function NavButton({ children, bg = '#FFFFFF', primary = false, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="font-pixelify text-xs font-bold text-ink px-4 py-2.5 rounded-lg cursor-pointer select-none"
      style={{
        background: primary ? '#FFE566' : bg,
        border: '2px solid #1A1A1A',
        boxShadow: '3px 3px 0 #1A1A1A',
      }}
      whileHover={{ y: -2, boxShadow: '5px 5px 0 #1A1A1A' }}
      whileTap={{ y: 1,  boxShadow: '1px 1px 0 #1A1A1A' }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.button>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled(60)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled && 'shadow-[0_3px_0_rgba(26,26,26,0.06)]'
        )}
        style={{
          background: scrolled ? 'rgba(254,250,224,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '2px solid rgba(26,26,26,0.08)' : '2px solid transparent',
        }}
      >
        <div className="container-game">
          <div className="flex items-center justify-between h-16">
            <NavLogo />

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <NavButton bg="#FFFFFF">🎬 Trailer</NavButton>
              <NavButton primary>▶ Descargar</NavButton>
            </div>

            {/* Mobile toggle */}
            <motion.button
              className="lg:hidden p-2 rounded-lg text-ink"
              style={{ background: '#FFE566', border: '2px solid #1A1A1A', boxShadow: '2px 2px 0 #1A1A1A' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.92, boxShadow: '1px 1px 0 #1A1A1A' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: '#FEFAE0' }}
          >
            {/* Decorative corners */}
            {['top-6 left-6','top-6 right-6','bottom-6 left-6','bottom-6 right-6'].map((pos, i) => (
              <span key={i} className={`absolute ${pos} text-2xl opacity-15`}>
                {['⭐','✦','🎮','✦'][i]}
              </span>
            ))}

            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-fredoka text-2xl font-bold text-ink hover:text-[#A678CC] transition-colors"
                >
                  {link.label}
                </a>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="flex flex-col gap-3 mt-2 w-52"
            >
              <NavButton bg="#FFFFFF">🎬 Ver Trailer</NavButton>
              <NavButton primary>▶ Descargar Juego</NavButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
