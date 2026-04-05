'use client'

import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'projects', href: '/projects' },
    { label: 'photos',   href: '/photos'   },
    { label: 'say hi',   href: 'mailto:thakur.nilesh307@gmail.com', accent: true },
  ]

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(12,12,12,0.90)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '56px',
        }}>
          <a href="/" style={{
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: 'var(--fg)',
            flexShrink: 0,
          }}>
            home
          </a>

          {/* desktop links */}
          <div className="nav-desktop" style={{ alignItems: 'center', gap: '2rem' }}>
            {links.map(({ label, href, accent }) => (
              <a key={label} href={href} style={{
                fontSize: '13px',
                color: accent ? 'var(--accent)' : 'var(--fg-muted)',
              }}>
                {label}
              </a>
            ))}
          </div>

          {/* hamburger button — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              marginRight: '-8px',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '5px',
              width: '36px',
              height: '36px',
            }}
          >
            <span style={{
              display: 'block',
              height: '1.5px',
              background: 'var(--fg)',
              borderRadius: '2px',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              transformOrigin: 'center',
              transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block',
              height: '1.5px',
              background: 'var(--fg)',
              borderRadius: '2px',
              transition: 'opacity 0.2s ease',
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              height: '1.5px',
              background: 'var(--fg)',
              borderRadius: '2px',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              transformOrigin: 'center',
              transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      <div
        className="nav-mobile-menu"
        style={{
          position: 'sticky',
          top: '56px',
          zIndex: 99,
          background: 'rgba(12,12,12,0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: open ? '1px solid var(--border)' : 'none',
          overflow: 'hidden',
          maxHeight: open ? '200px' : '0px',
          transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease',
        }}
      >
        <div style={{ padding: '0.5rem 0 1.25rem' }}>
          {links.map(({ label, href, accent }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 2rem',
                fontSize: '15px',
                color: accent ? 'var(--accent)' : 'var(--fg-muted)',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
