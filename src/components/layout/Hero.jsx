/**
 * Hero Component
 * Premium university food ordering hero section with strong typography,
 * responsive two-column composition, call-to-action, and modern visual vector artwork.
 */
function Hero() {
  const handleScrollToMenu = (e) => {
    e.preventDefault()
    const menuSection = document.getElementById('menu')
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-container" aria-labelledby="hero-main-heading">
      <div className="hero-grid">
        {/* Left Column: Typography & CTAs */}
        <div className="hero-copy-column">
          <div className="hero-badge">
            <span className="badge-pulse" aria-hidden="true"></span>
            <span className="badge-text">Campus Dining Redefined</span>
          </div>

          <h1 id="hero-main-heading" className="hero-title">
            Your Campus. <br />
            <span className="hero-title-accent">Your Cravings.</span>
          </h1>

          <p className="hero-description">
            Fresh bites, quick picks, and your favourite campus meals &mdash; all in one place.
          </p>

          <div className="hero-cta-wrapper">
            <a
              href="#menu"
              onClick={handleScrollToMenu}
              className="hero-primary-btn"
              aria-label="Browse UniCrave campus canteen menu"
            >
              <span>Browse Menu</span>
              <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <div className="hero-pickup-pill">
              <svg className="pill-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Avg. 10 Min Pickup</span>
            </div>
          </div>

          {/* Value Highlights */}
          <div className="hero-highlights-row">
            <div className="highlight-item">
              <span className="highlight-number">100%</span>
              <span className="highlight-label">Fresh & Made Daily</span>
            </div>
            <div className="highlight-divider" aria-hidden="true"></div>
            <div className="highlight-item">
              <span className="highlight-number">3 Hubs</span>
              <span className="highlight-label">Across Campus</span>
            </div>
            <div className="highlight-divider" aria-hidden="true"></div>
            <div className="highlight-item">
              <span className="highlight-number">0 Rush</span>
              <span className="highlight-label">Skip Canteen Lines</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Composition */}
        <div className="hero-visual-column" aria-hidden="true">
          <div className="visual-stage-card">
            <div className="ambient-radial-glow"></div>

            {/* Main Centerpiece Vector Artwork: Campus Meal Platter */}
            <div className="meal-artwork-container">
              <svg
                viewBox="0 0 340 340"
                className="meal-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="plateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                  <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1E3E62" />
                    <stop offset="100%" stopColor="#0B1E38" />
                  </linearGradient>
                  <linearGradient id="tealAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="100%" stopColor="#0D9488" />
                  </linearGradient>
                  <linearGradient id="warmFoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                  <filter id="shadowFilter" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#071324" floodOpacity="0.35" />
                  </filter>
                </defs>

                {/* Outer Base Platter */}
                <circle cx="170" cy="170" r="145" fill="url(#plateGrad)" filter="url(#shadowFilter)" />
                <circle cx="170" cy="170" r="128" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 4" />

                {/* Inner Ceramic Bowl */}
                <circle cx="170" cy="170" r="115" fill="url(#bowlGrad)" />

                {/* Meal Ingredients Composition */}
                {/* Steamed Jasmine Rice Bed */}
                <ellipse cx="140" cy="155" rx="55" ry="42" fill="#F8FAFC" />
                <circle cx="120" cy="140" r="4" fill="#E2E8F0" />
                <circle cx="145" cy="145" r="3.5" fill="#E2E8F0" />
                <circle cx="130" cy="165" r="4" fill="#CBD5E1" />

                {/* Golden Crispy Bites / Protein */}
                <path
                  d="M160 120 C180 110, 215 130, 220 155 C225 180, 190 200, 170 195 Z"
                  fill="url(#warmFoodGrad)"
                />
                <path
                  d="M175 132 C185 125, 205 138, 208 152 C210 168, 185 178, 175 170 Z"
                  fill="#FBBF24"
                  opacity="0.8"
                />

                {/* Fresh Avocado / Healthy Greens */}
                <path
                  d="M135 195 C145 220, 190 225, 205 200 C215 185, 185 175, 160 185 Z"
                  fill="url(#tealAccentGrad)"
                />
                <path
                  d="M148 200 C155 212, 175 215, 185 202 Z"
                  fill="#5EEAD4"
                  opacity="0.9"
                />

                {/* Microgreens and Herb Garnish */}
                <circle cx="160" cy="160" r="4" fill="#10B981" />
                <circle cx="172" cy="148" r="3" fill="#34D399" />
                <circle cx="185" cy="165" r="3.5" fill="#10B981" />
                <circle cx="195" cy="150" r="3" fill="#6EE7B7" />

                {/* Toasted Sesame Sprinkles */}
                <ellipse cx="135" cy="135" rx="3" ry="1.5" fill="#475569" transform="rotate(30 135 135)" />
                <ellipse cx="150" cy="130" rx="3" ry="1.5" fill="#475569" transform="rotate(-20 150 130)" />
                <ellipse cx="180" cy="140" rx="3" ry="1.5" fill="#475569" transform="rotate(45 180 140)" />
              </svg>
            </div>

            {/* Floating Info Card 1: Fast Pickup */}
            <div className="floating-badge badge-top-left">
              <div className="floating-icon-box teal-icon-box">
                <svg viewBox="0 0 20 20" fill="currentColor" className="floating-svg">
                  <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                </svg>
              </div>
              <div className="floating-text-group">
                <span className="floating-label">Express Canteen Pickup</span>
                <span className="floating-value">Ready in 10 mins</span>
              </div>
            </div>

            {/* Floating Info Card 2: Student Favorite */}
            <div className="floating-badge badge-bottom-right">
              <div className="floating-icon-box gold-icon-box">
                <svg viewBox="0 0 20 20" fill="currentColor" className="floating-svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="floating-text-group">
                <span className="floating-label">Top Rated Choice</span>
                <span className="floating-value">4.9 / 5.0 Student Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
