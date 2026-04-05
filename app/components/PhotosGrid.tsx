'use client'

import { useState, useEffect } from 'react'

type Photo = {
  id: string
  src: string | null
  caption: string
  location: string
  date: string
  name: string
  featured?: boolean
}

export default function PhotosGrid({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<Photo | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <>
      {/* grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1px',
        background: 'var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '6rem',
      }}>
        {photos.map(photo => (
          <div
            key={photo.id}
            onClick={() => photo.src && setActive(photo)}
            style={{
              position: 'relative',
              background: 'var(--bg-2)',
              aspectRatio: '4 / 3',
              overflow: 'hidden',
              cursor: photo.src ? 'zoom-in' : 'default',
            }}
          >
            {photo.featured && (
              <div style={{
                position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'rgba(12,12,12,0.65)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            )}
            {photo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.src}
                alt={photo.caption || photo.name}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%', background: 'var(--bg-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '11px', color: 'var(--fg-faint)' }}>no image</span>
              </div>
            )}

            {(photo.caption || photo.location || photo.date) && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '2rem 1rem 0.75rem',
                background: 'linear-gradient(to top, rgba(12,12,12,1) 0%, rgba(12,12,12,0.7) 50%, transparent 100%)',
              }}>
                {photo.caption && (
                  <p style={{ fontSize: '12px', color: '#fff', marginBottom: '2px', lineHeight: 1.4 }}>
                    {photo.caption}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {photo.location && <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{photo.location}</span>}
                  {photo.location && photo.date && <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>·</span>}
                  {photo.date && (
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                      {new Date(photo.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {photos.length === 0 && (
          <div style={{
            gridColumn: '1 / -1', padding: '6rem 2rem',
            textAlign: 'center', background: 'var(--bg-2)',
          }}>
            <p style={{ fontSize: '13px', color: 'var(--fg-faint)' }}>nothing here yet.</p>
          </div>
        )}
      </div>

      {/* lightbox */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* close button */}
          <button
            onClick={() => setActive(null)}
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '50%',
              width: '36px', height: '36px',
              color: '#fff', fontSize: '18px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            ×
          </button>

          {/* image */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 'min(90vw, 960px)',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src!}
              alt={active.caption || active.name}
              style={{
                maxWidth: '100%',
                maxHeight: '72vh',
                objectFit: 'contain',
                borderRadius: '8px',
                display: 'block',
              }}
            />

            {(active.caption || active.location || active.date) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '6px' }}>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                  {active.caption}
                </p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                  {active.location && <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{active.location}</span>}
                  {active.location && active.date && <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>·</span>}
                  {active.date && (
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                      {new Date(active.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
}
