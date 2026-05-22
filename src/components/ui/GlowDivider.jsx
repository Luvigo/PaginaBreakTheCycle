export default function GlowDivider({ color = 'purple' }) {
  const colors = {
    purple: '#C9A8E0',
    yellow: '#FFE566',
    lime:   '#A8D8A8',
    pink:   '#FFB3C6',
  }
  const c = colors[color] || colors.purple

  return (
    <div className="flex items-center gap-3 w-full my-2" aria-hidden="true">
      <div className="flex-1 h-0.5 border-b-2 border-dashed border-ink/15" />
      <span className="text-sm" style={{ color: c }}>✦</span>
      <div className="flex-1 h-0.5 border-b-2 border-dashed border-ink/15" />
    </div>
  )
}
