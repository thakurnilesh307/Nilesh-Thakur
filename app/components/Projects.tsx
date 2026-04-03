export default function Projects({ projects }: { projects: any[] }) {
  return (
    <section style={{ padding: '2rem', borderTop: '0.5px solid #e5e5e5' }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.06em', color: '#999', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Selected work
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
        {projects.map(project => {
          const props = project.properties
          const name = props.Name?.title?.[0]?.plain_text ?? 'Untitled'
          const tagline = props.Tagline?.rich_text?.[0]?.plain_text ?? ''
          const tags = props.Tags?.multi_select?.map((t: any) => t.name) ?? []
          const category = props.Category?.select?.name ?? ''

          return (
            <div key={project.id} style={{
              background: '#fff',
              border: '0.5px solid #e5e5e5',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '11px',
                  padding: '3px 8px',
                  borderRadius: '100px',
                  background: '#E1F5EE',
                  color: '#0F6E56',
                  fontWeight: 500,
                }}>{category}</span>
              </div>
              <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{name}</p>
              <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.5, marginBottom: '10px' }}>{tagline}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {tags.map((tag: string) => (
                  <span key={tag} style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: '#f5f5f5',
                    color: '#666',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

