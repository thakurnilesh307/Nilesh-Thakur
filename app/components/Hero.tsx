'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width = canvas.offsetWidth || window.innerWidth
    const H = canvas.height = canvas.offsetHeight || 560
    const COLS = 40, ROWS = 30

    const field: number[] = []
    for (let i = 0; i < COLS * ROWS; i++) {
      const x = (i % COLS) / COLS
      const y = Math.floor(i / COLS) / ROWS
      field.push(
        Math.sin(x * Math.PI * 2) * Math.cos(y * Math.PI * 2) * Math.PI +
        Math.sin(y * Math.PI * 3 + 1.2) * 0.8
      )
    }

    function getAngle(x: number, y: number, t: number) {
      const cx = x / W * COLS | 0
      const cy = y / H * ROWS | 0
      const idx = Math.min(cy, ROWS - 1) * COLS + Math.min(cx, COLS - 1)
      return field[idx] + t * 0.0008
    }

    const COUNT = 600
    const px = new Float32Array(COUNT)
    const py = new Float32Array(COUNT)
    const pa = new Float32Array(COUNT)
    const plife = new Float32Array(COUNT)
    const pmaxlife = new Float32Array(COUNT)

    function initParticle(i: number) {
      px[i] = Math.random() * W
      py[i] = Math.random() * H
      plife[i] = 0
      pmaxlife[i] = 80 + Math.random() * 120
      pa[i] = 0
    }

    for (let i = 0; i < COUNT; i++) {
      initParticle(i)
      plife[i] = Math.random() * 200
    }

    let frame = 0
    let raf: number

    function loop() {
      frame++
      ctx.fillStyle = 'rgba(12,12,12,0.18)'
      ctx.fillRect(0, 0, W, H)

      for (let i = 0; i < COUNT; i++) {
        plife[i]++
        if (plife[i] > pmaxlife[i]) { initParticle(i); continue }

        const lifeRatio = plife[i] / pmaxlife[i]
        pa[i] = lifeRatio < 0.1
          ? lifeRatio * 10
          : lifeRatio > 0.8
          ? (1 - lifeRatio) * 5
          : 1

        const angle = getAngle(px[i], py[i], frame)
        px[i] += Math.cos(angle) * 1.2
        py[i] += Math.sin(angle) * 1.2

        if (px[i] < 0 || px[i] > W || py[i] < 0 || py[i] > H) {
          initParticle(i)
          continue
        }

        ctx.beginPath()
        ctx.arc(px[i], py[i], 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(29,158,117,${pa[i] * 0.55})`
        ctx.fill()
      }

      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(raf)
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
          <p style={{
            fontSize: '15px',
            color: 'var(--fg-muted)',
            letterSpacing: '0.01em',
          }}>
            build, break, repeat :)
          </p>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '1.75rem',
        right: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '11px',
        color: 'var(--fg-faint)',
        letterSpacing: '0.06em',
      }}>
        scroll ↓
      </div>
    </section>
  )
}
