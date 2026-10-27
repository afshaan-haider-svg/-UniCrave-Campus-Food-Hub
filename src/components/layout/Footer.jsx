const CURRENT_YEAR = new Date().getFullYear()

/**
 * Footer Component
 * Professional semantic footer with branding, university campus hub details,
 * and copyright information.
 */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Footer Section */}
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-logo-mark" aria-hidden="true">UC</div>
              <div className="footer-brand-text">
                <span className="footer-brand-title">UniCrave</span>
                <span className="footer-brand-subtitle">Campus Food Hub</span>
              </div>
            </div>
            <p className="footer-tagline">
              Official university canteen & food ordering portal. Fueling lectures, study sessions,
              and campus life with fresh, fast meals.
            </p>
          </div>

          {/* Quick Hub Details */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Campus Hubs</h4>
            <ul className="footer-list">
              <li>Central Student Canteen (Hub A)</li>
              <li>Engineering Concourse (Hub B)</li>
              <li>Library Cafe Pod (Hub C)</li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Service Hours</h4>
            <ul className="footer-list">
              <li>Monday &ndash; Friday: 8:00 AM &ndash; 7:30 PM</li>
              <li>Saturday: 9:00 AM &ndash; 4:00 PM</li>
              <li>Sunday &amp; Holidays: Closed</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {CURRENT_YEAR} UniCrave &mdash; Campus Food Hub. All rights reserved.
          </p>
          <p className="footer-credit">
            University Web Engineering Project &bull; Frontend Semester Assignment
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
