'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = 460

    const walls = [
      {x:0,y:0,w:W,h:8},{x:0,y:H-8,w:W,h:8},{x:0,y:0,w:8,h:H},{x:W-8,y:0,w:8,h:H},
      {x:40,y:40,w:10,h:100},{x:80,y:160,w:80,h:10},{x:200,y:60,w:10,h:90},
      {x:150,y:220,w:90,h:10},{x:260,y:140,w:10,h:110},{x:60,y:270,w:70,h:10},
      {x:290,y:40,w:60,h:10},{x:20,y:170,w:10,h:70},
    ]

    // smooth looping waypoints - car follows these in order, loops forever
    const waypoints = [
      {x:60,y:40},{x:160,y:30},{x:260,y:40},{x:340,y:30},
      {x:350,y:120},{x:340,y:200},{x:310,y:290},{x:220,y:310},
      {x:120,y:300},{x:40,y:280},{x:25,y:200},{x:25,y:110},{x:60,y:40},
    ]

    const car = { x:60, y:60, w:22, h:14, angle:0.4, rayCount:24, rayLen:140 }
    let wpIdx = 0
    const SPEED = 1.4

    function rectSegs(r: any) {
      return [
        {x1:r.x,y1:r.y,x2:r.x+r.w,y2:r.y},
        {x1:r.x+r.w,y1:r.y,x2:r.x+r.w,y2:r.y+r.h},
        {x1:r.x+r.w,y1:r.y+r.h,x2:r.x,y2:r.y+r.h},
        {x1:r.x,y1:r.y+r.h,x2:r.x,y2:r.y},
      ]
    }

    function rayIntersect(rx:number,ry:number,rdx:number,rdy:number,x1:number,y1:number,x2:number,y2:number) {
      const dx=x2-x1,dy=y2-y1
      const denom=rdx*dy-rdy*dx
      if(Math.abs(denom)<1e-9) return null
      const t=((x1-rx)*dy-(y1-ry)*dx)/denom
      const u=((x1-rx)*rdy-(y1-ry)*rdx)/denom
      if(t>0&&u>=0&&u<=1) return t
      return null
    }

    function castRay(ox:number,oy:number,angle:number) {
      const dx=Math.cos(angle),dy=Math.sin(angle)
      let minT=car.rayLen
      for(const wall of walls)
        for(const seg of rectSegs(wall)) {
          const t=rayIntersect(ox,oy,dx,dy,seg.x1,seg.y1,seg.x2,seg.y2)
          if(t!==null&&t<minT) minT=t
        }
      return {x:ox+dx*minT,y:oy+dy*minT,t:minT}
    }

    let raf: number
    function loop() {
      const wp = waypoints[wpIdx % waypoints.length]
      const dx = wp.x - car.x
      const dy = wp.y - car.y
      const dist = Math.hypot(dx, dy)

      // advance waypoint when close enough
      if(dist < 12) wpIdx++

      // smoothly steer toward waypoint
      const targetAngle = Math.atan2(dy, dx)
      let diff = targetAngle - car.angle
      while(diff > Math.PI) diff -= Math.PI*2
      while(diff < -Math.PI) diff += Math.PI*2
      car.angle += diff * 0.06

      car.x += Math.cos(car.angle) * SPEED
      car.y += Math.sin(car.angle) * SPEED

      ctx.fillStyle='#0a0a0a'
      ctx.fillRect(0,0,W,H)
      ctx.fillStyle='#1a1a1a'
      for(const wall of walls) ctx.fillRect(wall.x,wall.y,wall.w,wall.h)

      for(let i=0;i<car.rayCount;i++){
        const angle=car.angle+(i/car.rayCount)*Math.PI*2
        const hit=castRay(car.x,car.y,angle)
        const alpha=0.12+(1-hit.t/car.rayLen)*0.25
        ctx.beginPath();ctx.moveTo(car.x,car.y);ctx.lineTo(hit.x,hit.y)
        ctx.strokeStyle=`rgba(29,158,117,${alpha})`;ctx.lineWidth=0.8;ctx.stroke()
        ctx.beginPath();ctx.arc(hit.x,hit.y,1.5,0,Math.PI*2)
        ctx.fillStyle=`rgba(29,158,117,${alpha+0.3})`;ctx.fill()
      }

      ctx.save();ctx.translate(car.x,car.y);ctx.rotate(car.angle)
      ctx.fillStyle='#e5e5e5';ctx.fillRect(-car.w/2,-car.h/2,car.w,car.h)
      ctx.fillStyle='#1D9E75';ctx.fillRect(car.w/2-5,-car.h/2,5,car.h)
      ctx.restore()

      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section style={{ position: 'relative', width: '100%', height: '460px' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 0,
        }}
      />
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '2.5rem',
        background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)',
      }}>
        <span style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '0.75rem' }}>
          cs @ northeastern
        </span>
        <h1 style={{ fontSize: '42px', fontWeight: 500, lineHeight: 1.2, margin: 0, color: '#fff' }}>
          build, break, repeat :)
        </h1>
      </div>
    </section>
  )
}