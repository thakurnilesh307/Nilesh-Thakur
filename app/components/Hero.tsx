'use client'

import { useEffect, useRef } from 'react'

const TARGET_CELL = 62   // target tunnel width in px — scales grid to screen
const LIDAR_RAYS  = 180
const POINT_LIFE  = 200
const CAR_SPEED   = 1.4

const N = 1, S = 2, E = 4, W = 8
const OPP: Record<number, number> = { [N]: S, [S]: N, [E]: W, [W]: E }
const DX:  Record<number, number> = { [N]: 0, [S]: 0, [E]: 1, [W]: -1 }
const DY:  Record<number, number> = { [N]: -1,[S]: 1, [E]: 0, [W]: 0 }

function generateMaze(cols: number, rows: number) {
  const cells   = new Array(cols * rows).fill(N | S | E | W)
  const visited = new Array(cols * rows).fill(false)
  function carve(x: number, y: number) {
    visited[y * cols + x] = true
    const dirs = [N, S, E, W].sort(() => Math.random() - 0.5)
    for (const d of dirs) {
      const nx = x + DX[d], ny = y + DY[d]
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && !visited[ny * cols + nx]) {
        cells[y * cols + x] &= ~d
        cells[ny * cols + nx] &= ~OPP[d]
        carve(nx, ny)
      }
    }
  }
  carve(0, 0)
  return cells
}

function bfs(cells: number[], cols: number, rows: number, start: number, end: number) {
  const prev = new Int32Array(cols * rows).fill(-1)
  prev[start] = start
  const q = [start]
  while (q.length) {
    const cur = q.shift()!
    if (cur === end) break
    const cx = cur % cols, cy = Math.floor(cur / cols)
    for (const [d, nx, ny] of [
      [N, cx, cy - 1], [S, cx, cy + 1], [E, cx + 1, cy], [W, cx - 1, cy],
    ] as [number, number, number][]) {
      if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue
      if (cells[cur] & d) continue
      const nxt = ny * cols + nx
      if (prev[nxt] === -1) { prev[nxt] = cur; q.push(nxt) }
    }
  }
  const path: number[] = []
  let c = end
  while (c !== start) { path.unshift(c); c = prev[c]; if (c === -1) return [] }
  path.unshift(start)
  return path
}

function buildWalls(cells: number[], cols: number, rows: number, cW: number, cH: number) {
  const s: number[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = cells[y * cols + x], px = x * cW, py = y * cH
      if (cell & N) s.push(px, py, px + cW, py)
      if (cell & W) s.push(px, py, px, py + cH)
    }
  }
  for (let y = 0; y < rows; y++)
    if (cells[y * cols + cols - 1] & E) s.push(cols * cW, y * cH, cols * cW, (y + 1) * cH)
  for (let x = 0; x < cols; x++)
    if (cells[(rows - 1) * cols + x] & S) s.push(x * cW, rows * cH, (x + 1) * cW, rows * cH)
  return new Float32Array(s)
}

function castRay(ox: number, oy: number, cos: number, sin: number, walls: Float32Array) {
  let minT = 9999
  for (let i = 0; i < walls.length; i += 4) {
    const dx = walls[i + 2] - walls[i], dy = walls[i + 3] - walls[i + 1]
    const denom = cos * dy - sin * dx
    if (Math.abs(denom) < 1e-8) continue
    const t = ((walls[i] - ox) * dy - (walls[i + 1] - oy) * dx) / denom
    const u = ((walls[i] - ox) * sin - (walls[i + 1] - oy) * cos) / denom
    if (t > 1 && u >= 0 && u <= 1 && t < minT) minT = t
  }
  return minT
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let raf: number

    function init() {
      cancelAnimationFrame(raf)

      const c      = canvas!
      const parent = c.parentElement!
      const W      = c.width  = parent.offsetWidth
      const H      = c.height = parent.offsetHeight

      const COLS = Math.max(6,  Math.round(W / TARGET_CELL))
      const ROWS = Math.max(4,  Math.round(H / TARGET_CELL))
      const maxDist = Math.hypot(W, H)

      const cW = W / COLS
      const cH = H / ROWS

      const cells = generateMaze(COLS, ROWS)
      const walls = buildWalls(cells, COLS, ROWS, cW, cH)

      const start = 0
      const end   = (ROWS - 1) * COLS + (COLS - 1)
      let fullPath = bfs(cells, COLS, ROWS, start, end)
      let reversing = false

      let pathIdx    = 0
      let carX       = (fullPath[0] % COLS + 0.5) * cW
      let carY       = (Math.floor(fullPath[0] / COLS) + 0.5) * cH
      let carAngle   = 0
      let lidarAngle = 0

      const MAX_PTS = 14000
      const ptX   = new Float32Array(MAX_PTS)
      const ptY   = new Float32Array(MAX_PTS)
      const ptAge = new Uint16Array(MAX_PTS)
      let ptHead = 0, ptCount = 0

      function addPoint(x: number, y: number) {
        ptX[ptHead] = x; ptY[ptHead] = y; ptAge[ptHead] = 0
        ptHead = (ptHead + 1) % MAX_PTS
        if (ptCount < MAX_PTS) ptCount++
      }

      function loop() {
      // ── move car ──
      const path = fullPath
      if (pathIdx < path.length - 1) {
        const tgt  = path[pathIdx + 1]
        const tx   = (tgt % COLS + 0.5) * cW
        const ty   = (Math.floor(tgt / COLS) + 0.5) * cH
        const dx   = tx - carX, dy = ty - carY
        const dist = Math.hypot(dx, dy)
        if (dist < CAR_SPEED) {
          carX = tx; carY = ty; pathIdx++
        } else {
          const targetAngle = Math.atan2(dy, dx)
          let diff = targetAngle - carAngle
          if (diff > Math.PI)  diff -= Math.PI * 2
          if (diff < -Math.PI) diff += Math.PI * 2
          carAngle += diff * 0.12
          carX += (dx / dist) * CAR_SPEED
          carY += (dy / dist) * CAR_SPEED
        }
      } else {
        // ping-pong: reverse direction
        fullPath  = [...fullPath].reverse()
        reversing = !reversing
        pathIdx   = 0
      }

      // ── lidar scan ──
      lidarAngle += 0.055

      // store this frame's endpoints so we can draw them with angular fade
      const frameEnds = new Float32Array(LIDAR_RAYS * 2)
      for (let i = 0; i < LIDAR_RAYS; i++) {
        const a   = lidarAngle + (i / LIDAR_RAYS) * Math.PI * 2
        const cos = Math.cos(a), sin = Math.sin(a)
        const t   = castRay(carX, carY, cos, sin, walls)
        const ex  = carX + cos * Math.min(t, maxDist)
        const ey  = carY + sin * Math.min(t, maxDist)
        frameEnds[i * 2]     = ex
        frameEnds[i * 2 + 1] = ey
        if (t < maxDist) addPoint(ex, ey)
      }

      // age points
      const oldest = (ptHead - ptCount + MAX_PTS) % MAX_PTS
      for (let i = 0; i < ptCount; i++) {
        const idx = (oldest + i) % MAX_PTS
        ptAge[idx]++
      }
      // remove expired (all at front of ring buffer since we add in order)
      while (ptCount > 0) {
        const idx = (ptHead - ptCount + MAX_PTS) % MAX_PTS
        if (ptAge[idx] > POINT_LIFE) ptCount--
        else break
      }

      // ── draw ──
      ctx.fillStyle = '#0c0c0c'
      ctx.fillRect(0, 0, W, H)

      // maze walls
      ctx.strokeStyle = '#232323'
      ctx.lineWidth = 1.5
      ctx.lineCap = 'square'
      ctx.beginPath()
      for (let i = 0; i < walls.length; i += 4) {
        ctx.moveTo(walls[i], walls[i + 1])
        ctx.lineTo(walls[i + 2], walls[i + 3])
      }
      ctx.stroke()


      const oldest2 = (ptHead - ptCount + MAX_PTS) % MAX_PTS

      // ── sweep rays: angular fade (i=0 freshest → brightest) ──
      ctx.lineWidth = 0.6
      for (let i = 0; i < LIDAR_RAYS; i++) {
        const fade  = 1 - i / LIDAR_RAYS
        const alpha = fade * 0.32
        if (alpha < 0.01) break
        ctx.beginPath()
        ctx.moveTo(carX, carY)
        ctx.lineTo(frameEnds[i * 2], frameEnds[i * 2 + 1])
        ctx.strokeStyle = `rgba(29,158,117,${alpha.toFixed(2)})`
        ctx.stroke()
      }

      // ── forward navigation cone ──
      // 7 rays in ±30° ahead of car — active obstacle sensing
      const coneOffsets = [-0.52, -0.32, -0.16, 0, 0.16, 0.32, 0.52]
      for (const off of coneOffsets) {
        const a   = carAngle + off
        const cos = Math.cos(a), sin = Math.sin(a)
        const t   = castRay(carX, carY, cos, sin, walls)
        if (t >= maxDist) continue
        const ex     = carX + cos * t
        const ey     = carY + sin * t
        const bright = 1 - Math.abs(off) / 0.56
        ctx.beginPath()
        ctx.moveTo(carX, carY)
        ctx.lineTo(ex, ey)
        ctx.strokeStyle = `rgba(90,230,170,${(0.28 * bright).toFixed(2)})`
        ctx.lineWidth = 0.9
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(ex, ey, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(90,230,170,${(0.75 * bright).toFixed(2)})`
        ctx.fill()
      }

      // ── point cloud ──
      for (let i = 0; i < ptCount; i++) {
        const idx   = (oldest2 + i) % MAX_PTS
        const ratio = 1 - ptAge[idx] / POINT_LIFE
        const alpha = ratio * 0.85
        const r     = ratio > 0.85 ? 2 : 1.5
        ctx.beginPath()
        ctx.arc(ptX[idx], ptY[idx], r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(29,158,117,${alpha})`
        ctx.fill()
      }

      // car body
      ctx.save()
      ctx.translate(carX, carY)
      ctx.rotate(carAngle)
      ctx.fillStyle = 'rgba(235,235,235,0.92)'
      ctx.beginPath()
      ctx.rect(-9, -5, 18, 10)
      ctx.fill()
      // direction dot
      ctx.fillStyle = '#1D9E75'
      ctx.beginPath()
      ctx.arc(6, 0, 2.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // lidar spinner on car
      ctx.save()
      ctx.translate(carX, carY)
      ctx.rotate(lidarAngle)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(14, 0)
      ctx.strokeStyle = 'rgba(29,158,117,0.55)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()

        raf = requestAnimationFrame(loop)
      }

      loop()
    }

    const ro = new ResizeObserver(init)
    ro.observe(canvas.parentElement ?? canvas)
    init()

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      maxHeight: '640px',
      minHeight: '480px',
    }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#0c0c0c' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '3.5rem 3rem',
        background: 'linear-gradient(to top, rgba(12,12,12,0.96) 0%, rgba(12,12,12,0.3) 55%, transparent 100%)',
      }}>
        <div className="container" style={{ width: '100%' }}>
          <p style={{ fontSize: '13px', color: 'var(--fg-muted)', marginBottom: '1rem', letterSpacing: '0.01em' }}>
            bscs @ northeastern&nbsp;&nbsp;|&nbsp;&nbsp;swe + robotics!
          </p>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 62px)',
            fontWeight: 500,
            lineHeight: 1.1,
            margin: '0 0 1rem',
            color: 'var(--fg)',
            letterSpacing: '-0.02em',
          }}>
            Nilesh's Base
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--fg-muted)', letterSpacing: '0.01em' }}>
            build, break, repeat :)
          </p>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '1.75rem',
        right: '2.5rem',
        fontSize: '11px',
        color: 'var(--fg-faint)',
        letterSpacing: '0.06em',
      }}>
        scroll ↓
      </div>
    </section>
  )
}
