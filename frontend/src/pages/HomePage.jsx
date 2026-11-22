import { ArrowRight, Camera, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <span className="floating-symbol" style={{ top: '12%', left: '8%' }} aria-hidden="true">🔑</span>
        <span className="floating-symbol" style={{ top: '20%', right: '10%', animationDelay: '1s' }} aria-hidden="true">🎒</span>
        <span className="floating-symbol" style={{ top: '65%', left: '12%', animationDelay: '2s' }} aria-hidden="true">💻</span>
        <span className="floating-symbol" style={{ top: '72%', right: '14%', animationDelay: '.5s' }} aria-hidden="true">🪪</span>
        <span className="floating-symbol" style={{ top: '40%', left: '3%', animationDelay: '1.5s' }} aria-hidden="true">🧥</span>
        <span className="floating-symbol" style={{ top: '45%', right: '4%', animationDelay: '2.5s' }} aria-hidden="true">📦</span>
        <div className="home-hero-content">
          <span className="home-hero-tag">🧭 Campus Lost and Found</span>
          <h1>Lost something on campus? <span>FindIT.</span></h1>
          <p>Students post photos of the things they find. You browse the board, spot your item and claim it.</p>
          <div className="home-hero-actions">
            <Link to="/report" className="home-action home-action-primary">
              <Camera size={19} />
              Report a found item
            </Link>
            <Link to="/found-items" className="home-action home-action-secondary">
              <Search size={19} />
              Browse found items
            </Link>
          </div>
        </div>
      </section>

      <section className="how-section">
        <h2>How it works</h2>
        <p>Three quick steps from found to returned.</p>
        <div className="steps-grid">
          <article className="step-card">
            <div className="step-icon" aria-hidden="true">📸</div>
            <h3>Snap a photo</h3>
            <p>Take a picture of the item you found and upload it.</p>
          </article>
          <article className="step-card">
            <div className="step-icon" aria-hidden="true">📝</div>
            <h3>Add the details</h3>
            <p>Tell us what it is, where you found it and when.</p>
          </article>
          <article className="step-card">
            <div className="step-icon" aria-hidden="true">🙌</div>
            <h3>Owner finds it</h3>
            <p>It appears on the bulletin board so the owner can claim it.</p>
          </article>
        </div>
      </section>

      <section className="cta-panel">
        <h2>Found something? Post it in under a minute.</h2>
        <Link to="/report" className="home-action home-action-primary">
          <ArrowRight size={19} />
          Report a found item
        </Link>
      </section>
    </>
  )
}
