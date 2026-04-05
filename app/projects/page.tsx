import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getProjects } from '../../lib/notion'

export default async function ProjectsPage() {
  // @ts-ignore
  const projects = await getProjects()

  return (
    <main>
      <Nav />
      <div className="container">
        <div style={{ padding: '4rem 0 3rem' }}>
          <p className="section-label">work</p>
          <h1 style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '-0.02em' }}>
            projects
          </h1>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '6rem' }}>
          {projects.map((project: any, i: number) => {
            const props    = project.properties
            const name     = props.Name?.title?.[0]?.plain_text ?? 'Untitled'
            const tagline  = props.Tagline?.rich_text?.[0]?.plain_text ?? ''
            const tags     = props.Tags?.multi_select?.map((t: any) => t.name) ?? []
            const category = props.Category?.select?.name ?? ''
            const link     = props.Link?.url ?? ''
            const year     = props.Date?.date?.start
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
                <span style={{ fontSize: '12px', color: 'var(--fg-faint)', fontVariantNumeric: 'tabular-nums' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    {category && <span className="chip">{category}</span>}
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px', color: 'var(--fg)' }}>{name}</p>
                  <p style={{ fontSize: '13px', color: 'var(--fg-muted)', lineHeight: 1.6 }}>{tagline}</p>
                </div>

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

        <Footer />
      </div>
    </main>
  )
}
