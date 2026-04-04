export default function Contact() {
  return (
    <section id="contact" style={{
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
        <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>got a cool problem?</h2>
        <p style={{ fontSize: '13px', color: '#888' }}>let's talk.</p>
      </div>
      <a href="mailto:thakur.nilesh307@gmail.com" style={{
        fontSize: '13px',
        padding: '8px 18px',
        border: '0.5px solid #ddd',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'inherit',
      }}>
        say hi →
      </a>
    </section>
  )
}