export default function Now({ items }: { items: any[] }) {
  return (
    <section id="now" style={{ padding: '2rem', borderTop: '0.5px solid var(--border)' }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.06em', color: 'var(--fg-faint)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
        Currently
      </p>
      <h2 style={{ fontSize: '22px', fontWeight: 500, marginBottom: '0.25rem' }}>
        What I'm working on
      </h2>
      <p style={{ fontSize: '13px', color: 'var(--fg-muted)', marginBottom: '1.5rem' }}>
        Ongoing things — career and not. Updated as I go.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map(item => {
          const props = item.properties
          const name = props.Name?.title?.[0]?.plain_text ?? 'Untitled'
          const tagline = props.Tagline?.rich_text?.[0]?.plain_text ?? ''
          const category = props.Category?.select?.name ?? ''
          const progress = props.Progress?.number ?? 0
          const started = props.Started?.date?.start ?? ''

          const catColors: any = {
            engineering: { bg: '#E1F5EE', color: '#0F6E56' },
            cooking: { bg: '#FAEEDA', color: '#854F0B' },
            personal: { bg: '#EEEDFE', color: '#534AB7' },
          }
          const cat = catColors[category] ?? { bg: 'var(--border)', color: 'var(--fg-muted)' }

          return (
            <a key={item.id} href={`/now/${item.id}`} style={{
              border: '0.5px solid var(--border)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '100px',
                      background: cat.bg,
                      color: cat.color,
                      fontWeight: 500,
                    }}>{category}</span>
                    {started && (
                      <span style={{ fontSize: '11px', color: 'var(--fg-faint)' }}>
                        started {new Date(started).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '3px' }}>{name}</p>
                  <p style={{ fontSize: '13px', color: 'var(--fg-muted)', marginBottom: '10px' }}>{tagline}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>Progress</span>
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{Math.round(progress * 100)}%</span>
                  </div>
                  <div style={{ height: '3px', background: 'var(--border)', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{
                      height: '3px',
                      width: `${progress * 100}%`,
                      background: category === 'engineering' ? '#1D9E75' : category === 'cooking' ? '#EF9F27' : '#7F77DD',
                      borderRadius: '100px',
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: '14px', color: 'var(--fg-faint)', marginLeft: '1rem' }}>→</span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}