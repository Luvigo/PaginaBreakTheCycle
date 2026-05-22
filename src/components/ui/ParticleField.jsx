import { useEffect, useRef } from 'react'

const PIXEL_SHAPES = ['star', 'square', 'diamond']
const COLORS = ['#FFE566', '#C9A8E0', '#A8D8A8', '#FFB3C6', '#A8D4F5', '#FFB86C']

function drawPixelStar(ctx, x, y, size, color) {
  ctx.fillStyle = color
  const s = Math.max(2, Math.floor(size))
  ctx.fillRect(x,         y - s,     s,     s    ) // top
  ctx.fillRect(x,         y + s,     s,     s    ) // bottom
  ctx.fillRect(x - s,     y,         s,     s    ) // left
  ctx.fillRect(x + s,     y,         s,     s    ) // right
  ctx.fillRect(x - s + 1, y - s + 1, s * 2 - 2, s * 2 - 2) // center
}

function drawPixelSquare(ctx, x, y, size, color) {
  ctx.fillStyle = color
  ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

function drawPixelDiamond(ctx, x, y, size, color) {
  ctx.fillStyle = color
  const s = Math.max(2, Math.floor(size / 2))
  ctx.fillRect(x,         y - s * 2, s, s)
  ctx.fillRect(x,         y + s,     s, s)
  ctx.fillRect(x - s * 2, y,         s * 2, s)
  ctx.fillRect(x + s,     y,         s * 2, s)
  ctx.fillRect(x - s,     y - s,     s * 3, s * 3)
}

export default function ParticleField({ count = 35 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: count }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      size:  Math.random() * 4 + 2,
      vx:    (Math.random() - 0.5) * 0.3,
      vy:    (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: PIXEL_SHAPES[Math.floor(Math.random() * PIXEL_SHAPES.length)],
      life:  Math.random(),
      speed: Math.random() * 0.004 + 0.002,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x    += p.vx
        p.y    += p.vy
        p.life += p.speed
        if (p.life > 1) p.life = 0

        if (p.x < -20)                p.x = canvas.width + 10
        if (p.x > canvas.width + 20)  p.x = -10
        if (p.y < -20)                p.y = canvas.height + 10
        if (p.y > canvas.height + 20) p.y = -10

        const alpha = Math.sin(p.life * Math.PI) * 0.55
        ctx.globalAlpha = alpha

        if      (p.shape === 'star')    drawPixelStar(ctx, p.x, p.y, p.size, p.color)
        else if (p.shape === 'square')  drawPixelSquare(ctx, p.x, p.y, p.size, p.color)
        else                            drawPixelDiamond(ctx, p.x, p.y, p.size, p.color)
      })

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
