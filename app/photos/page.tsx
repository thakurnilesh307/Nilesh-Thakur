import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getPhotos } from '../../lib/notion'

export default async function PhotosPage() {
  // @ts-ignore
  const photos = await getPhotos()

  return (
    <main>
      <Nav />
      <div className="container">
        <div style={{ padding: '4rem 0 3rem' }}>
          <p className="section-label">shots</p>
          <h1 style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '-0.02em' }}>
            photos
          </h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '6rem',
        }}>
          {photos.map((photo: any) => {
            const props    = photo.properties
            const name     = props.Name?.title?.[0]?.plain_text ?? ''
            const caption  = props.Caption?.rich_text?.[0]?.plain_text ?? ''
            const location = props.Location?.rich_text?.[0]?.plain_text
              ?? props.Location?.select?.name
              ?? ''
            const date     = props.Date?.date?.start ?? ''

            const featured  = props.Featured?.checkbox ?? false

            const filesProp = props.Photo ?? props.Image ?? props.File
            const file      = filesProp?.files?.[0]
            const src       = file?.type === 'external'
              ? file.external.url
              : file?.type === 'file'
              ? file.file.url
              : null

            return (
              <div key={photo.id} style={{ position: 'relative', background: 'var(--bg-2)', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                {featured && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10,
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(12,12,12,0.65)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                )}
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={caption || name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%', background: 'var(--bg-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '11px', color: 'var(--fg-faint)' }}>no image</span>
                  </div>
                )}

                {(caption || location || date) && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '2rem 1rem 0.75rem',
                    background: 'linear-gradient(to top, rgba(12,12,12,1) 0%, rgba(12,12,12,0.7) 50%, transparent 100%)',
                  }}>
                    {caption && (
                      <p style={{ fontSize: '12px', color: '#fff', marginBottom: '2px', lineHeight: 1.4 }}>{caption}</p>
                    )}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {location && <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{location}</span>}
                      {location && date && <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>·</span>}
                      {date && (
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                          {new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {photos.length === 0 && (
            <div style={{
              gridColumn: '1 / -1',
              padding: '6rem 2rem',
              textAlign: 'center',
              background: 'var(--bg-2)',
            }}>
              <p style={{ fontSize: '13px', color: 'var(--fg-faint)' }}>nothing here yet.</p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </main>
  )
}
