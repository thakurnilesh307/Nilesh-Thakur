export default function Photos({ photos }: { photos: any[] }) {
  if (!photos.length) return null

  return (
    <section id="photos" style={{ padding: '5rem 0' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: 'var(--fg-faint)',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          Captured
        </p>
        <h2 style={{ fontSize: '28px', fontWeight: 500, color: 'var(--fg)' }}>
          Photos
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1px',
        background: 'var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        {photos.map((photo) => {
          const props = photo.properties
          const name = props.Name?.title?.[0]?.plain_text ?? ''
          const caption = props.Caption?.rich_text?.[0]?.plain_text ?? ''
          const location = props.Location?.rich_text?.[0]?.plain_text
            ?? props.Location?.select?.name
            ?? ''
          const date = props.Date?.date?.start ?? ''

          // Notion files can be type "file" (expiring URL) or "external"
          const filesProp = props.Photo ?? props.Image ?? props.File
          const file = filesProp?.files?.[0]
          const src = file?.type === 'external'
            ? file.external.url
            : file?.type === 'file'
            ? file.file.url
            : null

          return (
            <div
              key={photo.id}
              style={{
                position: 'relative',
                background: 'var(--bg-2)',
                aspectRatio: '4 / 3',
                overflow: 'hidden',
              }}
            >
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={caption || name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--bg-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--fg-faint)' }}>no image</span>
                </div>
              )}

              {(caption || location || date) && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem 1rem 0.75rem',
                  background: 'linear-gradient(to top, rgba(12,12,12,0.9) 0%, transparent 100%)',
                }}>
                  {caption && (
                    <p style={{ fontSize: '12px', color: 'var(--fg)', marginBottom: '2px', lineHeight: 1.4 }}>{caption}</p>
                  )}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {location && (
                      <span style={{ fontSize: '11px', color: 'var(--fg-muted)' }}>{location}</span>
                    )}
                    {location && date && (
                      <span style={{ fontSize: '11px', color: 'var(--fg-faint)' }}>·</span>
                    )}
                    {date && (
                      <span style={{ fontSize: '11px', color: 'var(--fg-faint)' }}>
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
