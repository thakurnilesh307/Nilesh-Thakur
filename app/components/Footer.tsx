export default function Footer() {
  return (
    <footer style={{
      padding: '2.5rem 0',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
    }}>
      <span style={{ fontSize: '13px', color: 'var(--fg-faint)' }}>
        nilesh thakur
      </span>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="mailto:thakur.nilesh307@gmail.com" style={{ fontSize: '13px', color: 'var(--fg-faint)' }}>
          email
        </a>
        <a href="https://github.com/thakurnilesh307" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--fg-faint)' }}>
          github
        </a>
        <a href="https://www.linkedin.com/in/nilesh-thakur-b55776207/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--fg-faint)' }}>
          linkedin
        </a>
      </div>
    </footer>
  )
}
