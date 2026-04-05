export default function Nav() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(12,12,12,0.85)',
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
        }}>
          nilesh thakur
        </a>
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
          {[
            { label: 'projects', href: '/projects' },
            { label: 'photos',   href: '/photos' },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontSize: '13px',
              color: 'var(--fg-muted)',
              letterSpacing: '0.01em',
            }}>
              {label}
            </a>
          ))}
          <a href="mailto:thakur.nilesh307@gmail.com" style={{
            fontSize: '13px',
            color: 'var(--accent)',
            letterSpacing: '0.01em',
          }}>
            say hi
          </a>
        </div>
      </div>
    </nav>
  )
}
