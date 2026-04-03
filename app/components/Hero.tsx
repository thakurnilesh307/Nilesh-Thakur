export default function Hero() {
  return (
    <section style={{
      padding: '3rem 2rem 2rem',
      maxWidth: '680px',
    }}>
      <span style={{
        fontSize: '12px',
        color: '#888',
        border: '0.5px solid #ddd',
        padding: '4px 10px',
        borderRadius: '6px',
        display: 'inline-block',
        marginBottom: '1rem',
      }}>
        software engineer + human
      </span>

      <h1 style={{
        fontSize: '36px',
        fontWeight: 500,
        lineHeight: 1.2,
        marginBottom: '1rem',
      }}>
        I build things.<br />
        I also <span style={{ color: '#1D9E75' }}>cook,</span><br />
        shoot & wander.
      </h1>

      <p style={{
        fontSize: '15px',
        color: '#666',
        lineHeight: 1.7,
        marginBottom: '1.5rem',
        maxWidth: '480px',
      }}>
        Senior engineer with a thing for clean systems and messy kitchens.
        This is my work, my hobbies, and everything in between.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['React & TypeScript', 'distributed systems', 'photography', 'cooking', 'Boston, MA'].map(chip => (
          <span key={chip} style={{
            fontSize: '12px',
            padding: '5px 12px',
            borderRadius: '100px',
            border: '0.5px solid #ddd',
            color: '#666',
          }}>{chip}</span>
        ))}
      </div>
    </section>
  )
}
