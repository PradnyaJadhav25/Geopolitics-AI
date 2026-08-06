import { useNavigate, Link } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-5">
      <div className="text-center shadow-lg rounded-4 p-5" style={{maxWidth: '600px', background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,249,250,0.9))'}}>
        <div className="display-1 text-muted mb-4">404</div>
        <h1 className="display-4 fw-bold text-dark mb-3">Page Not Found</h1>
        <p className="lead text-muted mb-5">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Button variant="primary" size="lg" className="px-4 shadow-lg" onClick={() => navigate(-1)}>
            ← Go Back
          </Button>
          <Link to="/dashboard" className="btn btn-outline-secondary btn-lg px-4 shadow-lg">
            Dashboard
          </Link>
          <Link to="/geopolitics" className="btn btn-outline-primary btn-lg px-4 shadow-lg">
            Geopolitics
          </Link>
        </div>
        <div className="mt-5 pt-4 border-top">
          <small className="text-muted">
            Try searching or check the sidebar navigation.
          </small>
        </div>
      </div>
    </div>
  );
}

