export default function Nav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '0.5px solid #e5e5e5',
    }}>
      <span style={{ fontSize: '15px', fontWeight: 500 }}>Your Name</span>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['work', 'now', 'photos', 'life', 'contact'].map(link => (
          <a key={link} href={`#${link}`} style={{
            fontSize: '13px',
            color: '#666',
            textDecoration: 'none',
          }}>{link}</a>
        ))}
      </div>
    </nav>
  )
}
