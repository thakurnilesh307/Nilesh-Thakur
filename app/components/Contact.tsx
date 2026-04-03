export default function Contact() {
  return (
    <section style={{
      padding: '2rem',
      borderTop: '0.5px solid #e5e5e5',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: '2rem',
    }}>
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>Let's talk</h2>
        <p style={{ fontSize: '13px', color: '#888' }}>Open to interesting projects, collabs, or a good restaurant rec.</p>
      </div>
      <a href="mailto:your@email.com" style={{
        fontSize: '13px',
        padding: '8px 18px',
        border: '0.5px solid #ddd',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'inherit',
      }}>
        Get in touch
      </a>
    </section>
  )
}
