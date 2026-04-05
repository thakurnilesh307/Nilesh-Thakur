export default function Projects({ projects }: { projects: any[] }) {
  return (
    <section id="work" style={{ padding: '6rem 0' }}>
      <div style={{ marginBottom: '3rem' }}>
        <p className="section-label">Selected work</p>
        <h2 style={{ fontSize: '32px', fontWeight: 500, color: 'var(--fg)', letterSpacing: '-0.02em' }}>
          Things I've built
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--fg-muted)', marginTop: '0.5rem', lineHeight: 1.6 }}>
          A mix of side projects, research tools, and things that got out of hand.
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        {projects.map((project, i) => {
          const props = project.properties
          const name = props.Name?.title?.[0]?.plain_text ?? 'Untitled'
          const tagline = props.Tagline?.rich_text?.[0]?.plain_text ?? ''
          const tags = props.Tags?.multi_select?.map((t: any) => t.name) ?? []
          const category = props.Category?.select?.name ?? ''
          const link = props.Link?.url ?? ''
          const year = props.Date?.date?.start
            ? new Date(props.Date.date.start).getFullYear()
            : null

          return (
            <a
              key={project.id}
              href={link || undefined}
              target={link ? '_blank' : undefined}
              rel={link ? 'noopener noreferrer' : undefined}
              className="project-row"
              style={{ cursor: link ? 'pointer' : 'default' }}
            >
              {/* row number */}
              <span style={{ fontSize: '12px', color: 'var(--fg-faint)', fontVariantNumeric: 'tabular-nums' }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* main content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <span className="chip">{category}</span>
                </div>
                <p style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px', color: 'var(--fg)' }}>{name}</p>
                <p style={{ fontSize: '13px', color: 'var(--fg-muted)', lineHeight: 1.6 }}>{tagline}</p>
              </div>

              {/* right side: tags + year */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {tags.map((tag: string) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
                {year && (
                  <span style={{ fontSize: '12px', color: 'var(--fg-faint)', fontVariantNumeric: 'tabular-nums' }}>
                    {year}
                  </span>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
