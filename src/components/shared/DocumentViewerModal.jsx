import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ZoomableDiagram from '@/components/shared/ZoomableDiagram'
import imgPrincipalUml from '@/assets/diagrams/principal-uml.png'
import imgUmlAuth from '@/assets/diagrams/uml-auth.png'
import imgUmlMainMenu from '@/assets/diagrams/uml-main-menu.png'

const UML_DIAGRAMS = [
  {
    id: 'main',
    title: 'Sistema Principal',
    desc: 'GameManager, LevelController y el flujo de control central del juego.',
    color: '#1E88E5',
    bg: '#EFF6FF',
    icon: '🎮',
    tag: 'CLASS DIAGRAM',
    image: imgPrincipalUml,
  },
  {
    id: 'auth',
    title: 'Autenticación',
    desc: 'AuthService con LinkedList para historial de login y persistencia JSON.',
    color: '#A678CC',
    bg: '#F8F4FF',
    icon: '🔐',
    tag: 'SEQUENCE DIAGRAM',
    image: imgUmlAuth,
  },
  {
    id: 'ui',
    title: 'Sistema UI / Menú',
    desc: 'NavigationManager, accesibilidad, filtros para daltónicos y flujo de pantallas.',
    color: '#3DA35D',
    bg: '#F2FFF5',
    icon: '🖥️',
    tag: 'COMPONENT DIAGRAM',
    image: imgUmlMainMenu,
  },
]

function useDocumentViewerLayer(active) {
  useEffect(() => {
    if (!active) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.classList.add('doc-viewer-open')
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.classList.remove('doc-viewer-open')
      document.body.style.overflow = prevOverflow
    }
  }, [active])
}

function useEscapeClose(onClose, active) {
  useEffect(() => {
    if (!active) return undefined
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, active])
}

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 10050,
  background: 'rgba(10,10,20,0.78)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'clamp(12px, 3vw, 28px)',
}

const panelStyle = {
  background: '#FEFAE0',
  border: '4px solid #1A1A1A',
  boxShadow: '10px 10px 0 #1A1A1A',
  borderRadius: '20px',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '960px',
  maxHeight: 'min(94vh, 920px)',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'default',
}

function ModalHeader({ title, subtitle, accent, onClose, extra }) {
  return (
    <div style={{
      background: accent,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      flexShrink: 0,
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 'clamp(7px, 1.8vw, 9px)',
          color: '#fff',
          letterSpacing: '0.05em',
          lineHeight: 1.5,
        }}>
          {subtitle}
        </div>
        <div style={{
          fontFamily: '"Fredoka", sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          color: '#fff',
          marginTop: 4,
        }}>
          {title}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {extra}
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid #fff',
            borderRadius: 7,
            padding: '6px 12px',
            fontFamily: '"Fredoka", sans-serif',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          ✕ Cerrar
        </button>
      </div>
    </div>
  )
}

export function PdfViewerModal({ url, title, accent = '#A678CC', onClose }) {
  useEscapeClose(onClose, true)

  return (
    <motion.div
      key="pdf-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={panelStyle}
      >
        <ModalHeader
          title={title}
          subtitle="DOCUMENTO PDF"
          accent={accent}
          onClose={onClose}
          extra={(
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#fff',
                border: '2px solid #1A1A1A',
                boxShadow: '2px 2px 0 #1A1A1A',
                borderRadius: 7,
                padding: '6px 10px',
                fontFamily: '"Fredoka", sans-serif',
                fontWeight: 600,
                fontSize: '0.78rem',
                color: '#1A1A1A',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              ↗ Nueva pestaña
            </a>
          )}
        />
        <div style={{ flex: 1, minHeight: 0, background: '#525252' }}>
          <iframe
            title={title}
            src={url}
            style={{
              width: '100%',
              height: 'min(78vh, 720px)',
              border: 'none',
              display: 'block',
              background: '#fff',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function UmlGalleryModal({ onClose }) {
  const [activeId, setActiveId] = useState(UML_DIAGRAMS[0].id)
  const active = UML_DIAGRAMS.find((d) => d.id === activeId) ?? UML_DIAGRAMS[0]

  useEscapeClose(onClose, true)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-label="Diagramas UML"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={panelStyle}
      >
        <ModalHeader
          title="Diagramas UML"
          subtitle="ARQUITECTURA DEL SISTEMA"
          accent="#1E88E5"
          onClose={onClose}
        />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          padding: '12px 14px',
          borderBottom: '2px dashed rgba(26,26,26,0.12)',
          background: active.bg,
          flexShrink: 0,
        }}>
          {UML_DIAGRAMS.map((d) => {
            const selected = d.id === activeId
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveId(d.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 12px',
                  borderRadius: 9,
                  border: '2px solid #1A1A1A',
                  boxShadow: selected ? '3px 3px 0 #1A1A1A' : '2px 2px 0 #1A1A1A',
                  background: selected ? d.color : '#fff',
                  color: selected ? '#fff' : '#1A1A1A',
                  fontFamily: '"Fredoka", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transform: selected ? 'translate(-1px,-1px)' : 'none',
                }}
              >
                <span>{d.icon}</span>
                {d.title}
              </button>
            )
          })}
        </div>

        <div style={{
          padding: '10px 16px 0',
          fontFamily: '"Fredoka", sans-serif',
          fontSize: '0.82rem',
          color: 'rgba(26,26,26,0.6)',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 6,
            color: active.color,
            marginRight: 8,
          }}>
            {active.tag}
          </span>
          {active.desc}
        </div>

        <div style={{
          flex: 1,
          minHeight: 0,
          margin: '10px 14px 14px',
          border: '3px solid #1A1A1A',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '4px 4px 0 #1A1A1A',
        }}>
          <ZoomableDiagram
            key={active.id}
            src={active.image}
            alt={`Diagrama UML — ${active.title}`}
            height="min(58vh, 520px)"
            objectFit="contain"
            showHint
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function DocumentViewer({ view, onClose }) {
  useDocumentViewerLayer(!!view)

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence mode="wait">
      {view?.type === 'pdf' && (
        <PdfViewerModal
          key={view.url}
          url={view.url}
          title={view.title}
          accent={view.accent}
          onClose={onClose}
        />
      )}
      {view?.type === 'uml' && (
        <UmlGalleryModal key="uml-gallery" onClose={onClose} />
      )}
    </AnimatePresence>,
    document.body,
  )
}

