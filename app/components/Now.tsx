export default function Now({ items }: { items: any[] }) {
  const catColors: Record<string, { bg: string; color: string }> = {
    engineering: { bg: 'rgba(29,158,117,0.12)', color: '#1D9E75' },
    cooking:     { bg: 'rgba(239,159,39,0.12)',  color: '#EF9F27' },
    personal:    { bg: 'rgba(127,119,221,0.12)', color: '#7F77DD' },
  }
  const progressColors: Record<string, string> = {
    engineering: '#1D9E75',
    cooking:     '#EF9F27',
    personal:    '#7F77DD',
  }

  return (
    <section id="now" style={{ padding: '6rem 0' }}>
      <p className="section-label" style={{ marginBottom: '0.5rem' }}>now</p>
      <h2 style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.01em', marginBottom: '2.5rem' }}>
        what I'm into
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
      }}>
        {items.map(item => {
          const props = item.properties
          const name     = props.Name?.title?.[0]?.plain_text ?? 'Untitled'
          const tagline  = props.Tagline?.rich_text?.[0]?.plain_text ?? ''
          const category = props.Category?.select?.name ?? ''
          const progress = props.Progress?.number ?? 0
          const started  = props.Started?.date?.start ?? ''

          const cat = catColors[category] ?? { bg: 'var(--bg-3)', color: 'var(--fg-muted)' }
          const bar = progressColors[category] ?? 'var(--accent)'

          return (
            <a key={item.id} href={`/now/${item.id}`} className="now-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  background: cat.bg,
                  color: cat.color,
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                }}>
                  {category}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--fg-faint)' }}>→</span>
              </div>

              <p style={{ fontSize: '15px', fontWeight: 500, marginBottom: '5px', color: 'var(--fg)', lineHeight: 1.35 }}>
                {name}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--fg-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {tagline}
              </p>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--fg-faint)' }}>
                    {started ? `since ${new Date(started).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: bar }}>{Math.round(progress * 100)}%</span>
                </div>
                <div style={{ height: '3px', background: 'var(--border)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ height: '3px', width: `${progress * 100}%`, background: bar, borderRadius: '100px' }} />
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
