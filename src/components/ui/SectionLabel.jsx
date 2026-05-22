import { cn } from '@/utils/cn'

export default function SectionLabel({ children, className, color = 'purple' }) {
  const colorMap = {
    purple: { bg: '#C9A8E0', text: '#7B4FA0' },
    yellow: { bg: '#FFE566', text: '#A07800' },
    lime:   { bg: '#A8D8A8', text: '#3A7A3A' },
    pink:   { bg: '#FFB3C6', text: '#A03060' },
  }
  const { bg, text } = colorMap[color] || colorMap.purple

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span
        className="font-pixelify text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-lg border-2 border-ink sticker-shadow-sm"
        style={{ background: bg, color: text, boxShadow: '2px 2px 0 #1A1A1A' }}
      >
        ✦ {children} ✦
      </span>
    </div>
  )
}
