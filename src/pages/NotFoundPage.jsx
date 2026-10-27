import { Link } from 'react-router-dom'

/**
 * NotFoundPage Component
 * Catches all unmatched paths and displays a clean 404 message
 * with a route back to the campus dining menu.
 */
function NotFoundPage() {
  return (
    <div className="not-found-page-wrapper">
      <div className="not-found-card">
        <span className="not-found-status-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The campus dining page you were looking for doesn&rsquo;t exist, was moved,
          or the URL was mistyped.
        </p>

        <Link to="/" className="not-found-back-btn">
          &larr; Return to Campus Menu
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
