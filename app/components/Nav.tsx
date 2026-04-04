export default function Nav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '0.5px solid var(--border)',
    }}>
      <a href="/" style={{ fontSize: '15px', fontWeight: 500 }}>
        nilesh thakur
      </a>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['work', 'now', 'contact'].map(link => (
          <a key={link} href={`#${link}`} style={{
            fontSize: '13px',
            color: 'var(--fg-muted)',
          }}>{link}</a>
        ))}
      </div>
    </nav>
  )
}