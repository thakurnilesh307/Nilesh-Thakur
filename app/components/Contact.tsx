export default function Contact() {
  return (
    <section id="contact" style={{ padding: '6rem 0' }}>
      <div style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '4rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* accent glow */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29,158,117,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="section-label">Contact</p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 500,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            maxWidth: '480px',
            lineHeight: 1.2,
          }}>
            Got a cool problem?<br />Let's work on it.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--fg-muted)', marginBottom: '2.5rem', maxWidth: '400px', lineHeight: 1.7 }}>
            I'm open to interesting projects, internships, and conversations that start with "hear me out."
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="mailto:thakur.nilesh307@gmail.com" style={{
              fontSize: '13px',
              fontWeight: 500,
              padding: '11px 22px',
              borderRadius: '8px',
              background: 'var(--accent)',
              color: '#fff',
            }}>
              say hi →
            </a>
            <a href="https://github.com/thakurnilesh307" target="_blank" rel="noopener noreferrer" style={{
              fontSize: '13px',
              padding: '11px 22px',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--fg-muted)',
              border: '1px solid var(--border-2)',
            }}>
              github
            </a>
            <a href="https://www.linkedin.com/in/nilesh-thakur-b55776207/" target="_blank" rel="noopener noreferrer" style={{
              fontSize: '13px',
              padding: '11px 22px',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--fg-muted)',
              border: '1px solid var(--border-2)',
            }}>
              linkedin
            </a>
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '3rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border)',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <span style={{ fontSize: '13px', color: 'var(--fg-faint)' }}>
          © {new Date().getFullYear()} Nilesh Thakur
        </span>
        <span style={{ fontSize: '13px', color: 'var(--fg-faint)' }}>
          built with Next.js + Notion
        </span>
      </div>
    </section>
  )
}
